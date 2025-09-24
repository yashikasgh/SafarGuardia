// src/components/Feedback.tsx

import React, { useState, useEffect, FormEvent } from "react";

interface FeedbackItem {
  id: string;
  type: "thumbs_up" | "thumbs_down" | "alert" | "star";
  message?: string;
}

const API_URL = "http://localhost:8000";

async function fetchFeedback(): Promise<FeedbackItem[]> {
  const res = await fetch(`${API_URL}/feedback`);
  if (!res.ok) {
    throw new Error("Failed to fetch feedback");
  }
  return res.json();
}

async function submitFeedback(type: FeedbackItem["type"], message?: string): Promise<FeedbackItem> {
  const res = await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, message }),
  });
  if (!res.ok) {
    throw new Error("Failed to submit feedback");
  }
  return res.json();
}

const Feedback: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newType, setNewType] = useState<FeedbackItem["type"]>("thumbs_up");
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetchFeedback()
      .then(setFeedbackList)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      setError("Message cannot be empty");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const newFeedback = await submitFeedback(newType, newMessage.trim());
      setFeedbackList((prev) => [...prev, newFeedback]);
      setNewMessage("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Feedback</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {feedbackList.map((fb) => (
          <li key={fb.id}>
            <strong>{fb.type}</strong>: {fb.message || "(no message)"}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <select value={newType} onChange={(e) => setNewType(e.target.value as FeedbackItem["type"])}>
            <option value="thumbs_up">Thumbs Up</option>
            <option value="thumbs_down">Thumbs Down</option>
            <option value="alert">Alert</option>
            <option value="star">Star</option>
          </select>
        </label>
        <br />
        <label>
          Message:
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={3}
            cols={40}
            placeholder="Enter your feedback message"
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;