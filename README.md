

# 🛡️ SafarGuardia: Women's Safety in Mumbai Locals

A specialized web-based safety prototype designed for women commuters in Mumbai. Created for the Smart India Hackathon (SIH). This project focuses on real-time crowd analytics and community-driven safety alerts for the Mumbai Local train network.


## 📌 Project Overview

**SafarGuardia** is a prototype developed for the Smart India Hackathon (SIH). Built with a modern Vite + React (TypeScript) frontend and a Python/MongoDB backend integration, it addresses specific security challenges like late-night travel and deserted train compartments. It combines standard safety tools with innovative features like compartment density analysis and station-wise safety indices.

## 🎯 Project Objective

The main objective is to provide women with predictive safety data. By knowing station safety indices and using AI-simulated compartment analysis, women can make informed travel decisions and instantly connect with authorities when needed.

## 🛠 Technologies Used

* **Frontend:** Vite, React, TypeScript 
* **Logic:** JavaScript (ES6+)
* **Backend & Data:** Python (Flask), MongoDB
* **Version Control:** Git/GitHub
* **Computer Vision:** YOLO (You Only Look Once) for real-time object detection and crowd analysis.
* **Data Analysis:** Pandas (for processing Mumbai local station datasets).

---

## 🌟 Key Features & Innovation

### 🚀 Unique SIH Features

* **Station-wise Crowd Prediction:** A color-coded safety index (🟢 Safe, 🟡 Moderate, 🔴 Unsafe) for every station on a selected route to guide late-night commuters.
* **Compartment Analysis:** Users can upload a photo of their coach. A simulated AI logic analyzes the crowd and offers a "Request Constable" button if the area is deserted.
* **Community Feedback Portal:** A women-only forum to post safety complaints with an upvote/downvote system to verify legitimacy and auto-hide spam.
* **Aadhaar-based Verification:** Simulated secure onboarding to ensure the platform remains a dedicated space for women.

### 🛡️ Standard Safety Features

* **One-Tap SOS Alert:** Immediate emergency trigger for high-stress situations.
* **Guardian Updates:** Automated real-time alerts sent to trusted contacts.
* **Nearby Safe Spots:** Interactive map showing the nearest Police Stations and Hospitals.
* **Fake Call:** A tool to simulate an incoming call to discourage potential harassers.

---

## 🗂 Project Structure

```text
/
├── src/                # React components (Dashboard, ProfilePage)
├── main.py             # Flask API Entry Point (Port 5001)
├── index.html
├── connect_mongo.py    # MongoDB connection & logging
├── mongo_events.py     # Safety event handling
├── vite.config.ts      # Frontend configuration
├── package.json        # Node.js dependencies
└── README.md           # Documentation

```

---

## ▶ How to Run the Project

1. **Clone the Repository:**
```bash
git clone https://github.com/your-username/SafarGuardia.git

```
---
2. **Frontend Setup:**

    Run `npm i` to install the dependencies.

    Run `npm run dev` to start the development server.
---

3. **Backend & API Setup:**
   * *Ensure you have Python installed, then run:*
```bash
# Install dependencies
pip install flask pandas pymongo ultralytics

# Start the Flask server
python main.py
```
*The API will run on ```http://127.0.0.1:5001.```*

## 🚀 Future Enhancements

* **Live CCTV Stream Integration: Connecting the YOLO model directly to railway station camera feeds.**
* **RPF Emergency Dashboard: A dedicated interface for Railway Police to track YOLO-triggered alerts.**
* **Multilingual Support: Localizing the platform in Marathi and Hindi.**
---

## 📄 Conclusion

**SafarGuardia** redefines women’s safety by shifting the focus from reactive emergency alerts to proactive risk prevention. By leveraging crowd analytics and community insights, the platform identifies potential threats before they escalate. This prototype serves as a scalable bridge between commuters and Railway authorities (RPF), proving that thoughtful technology can eliminate fear and ensure every woman travels with confidence in the Mumbai Local network.

---

