import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, AlertTriangle, Star, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner@2.0.3';

interface Feedback {
  id: string;
  user: string;
  station: string;
  category: string;
  message: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'hidden';
}

export function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      user: 'Priya S.',
      station: 'Dadar',
      category: 'Safety Concern',
      message: 'Poor lighting near platform 3 after 11 PM. Very unsafe for women traveling alone. Request immediate attention.',
      timestamp: '2024-01-15 23:30',
      upvotes: 15,
      downvotes: 2,
      priority: 'high',
      status: 'active'
    },
    {
      id: '2',
      user: 'Anita M.',
      station: 'Bandra',
      category: 'Positive',
      message: 'Excellent security arrangements during late hours. Female constable was very helpful and approachable.',
      timestamp: '2024-01-15 22:45',
      upvotes: 8,
      downvotes: 0,
      priority: 'low',
      status: 'active'
    },
    {
      id: '3',
      user: 'Meera K.',
      station: 'Andheri',
      category: 'Harassment',
      message: 'Experienced inappropriate behavior from a group near the ticket counter. Station staff should be more vigilant.',
      timestamp: '2024-01-14 21:15',
      upvotes: 12,
      downvotes: 1,
      priority: 'high',
      status: 'active'
    },
    {
      id: '4',
      user: 'Kavya P.',
      station: 'Churchgate',
      category: 'Facility',
      message: 'Ladies waiting room is well-maintained and feels safe. Good job by the authorities!',
      timestamp: '2024-01-14 20:30',
      upvotes: 6,
      downvotes: 0,
      priority: 'low',
      status: 'active'
    }
  ]);

  const [newFeedback, setNewFeedback] = useState({
    station: '',
    category: '',
    message: ''
  });

  const stations = [
    'Churchgate', 'Marine Lines', 'Charni Road', 'Grant Road', 'Mumbai Central',
    'Mahalaxmi', 'Lower Parel', 'Prabhadevi', 'Dadar', 'Matunga',
    'Mahim', 'Bandra', 'Khar', 'Santacruz', 'Vile Parle', 'Andheri'
  ];

  const categories = [
    'Safety Concern',
    'Harassment',
    'Poor Lighting',
    'Facility Issue',
    'Staff Behavior',
    'Positive Feedback',
    'Emergency'
  ];

  const handleSubmitFeedback = () => {
    if (newFeedback.station && newFeedback.category && newFeedback.message) {
      const feedback: Feedback = {
        id: Date.now().toString(),
        user: 'You',
        station: newFeedback.station,
        category: newFeedback.category,
        message: newFeedback.message,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        upvotes: 0,
        downvotes: 0,
        priority: newFeedback.category === 'Emergency' || newFeedback.category === 'Harassment' ? 'high' : 'medium',
        status: 'active'
      };

      setFeedbacks([feedback, ...feedbacks]);
      setNewFeedback({ station: '', category: '', message: '' });
      toast.success('✅ Feedback submitted successfully!');

      if (feedback.priority === 'high') {
        toast.info('🚨 High priority feedback flagged for immediate police review');
      }
    }
  };

  const handleVote = (id: string, type: 'up' | 'down') => {
    setFeedbacks(prev => prev.map(feedback => {
      if (feedback.id === id) {
        const updated = {
          ...feedback,
          upvotes: type === 'up' ? feedback.upvotes + 1 : feedback.upvotes,
          downvotes: type === 'down' ? feedback.downvotes + 1 : feedback.downvotes
        };
        
        // Hide feedback if it gets 5 downvotes
        if (updated.downvotes >= 5) {
          updated.status = 'hidden';
          toast.info('Feedback hidden due to multiple downvotes');
        }
        
        return updated;
      }
      return feedback;
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Safety Concern': 'bg-red-100 text-red-800',
      'Harassment': 'bg-purple-100 text-purple-800',
      'Poor Lighting': 'bg-orange-100 text-orange-800',
      'Facility Issue': 'bg-blue-100 text-blue-800',
      'Staff Behavior': 'bg-indigo-100 text-indigo-800',
      'Positive Feedback': 'bg-green-100 text-green-800',
      'Emergency': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const activeFeedbacks = feedbacks.filter(f => f.status === 'active');
  const highPriorityCount = activeFeedbacks.filter(f => f.priority === 'high').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Women-Only Feedback Portal</h1>
          <p className="text-xl text-gray-600">Share your experiences and help make travel safer for all women</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Submit New Feedback */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                  <CardTitle>Share Your Experience</CardTitle>
                </div>
                <CardDescription>
                  Your feedback helps improve safety for all women travelers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Station</label>
                  <Select value={newFeedback.station} onValueChange={(value) => setNewFeedback({ ...newFeedback, station: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select station" />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.map((station) => (
                        <SelectItem key={station} value={station}>{station}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select value={newFeedback.category} onValueChange={(value) => setNewFeedback({ ...newFeedback, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Experience</label>
                  <Textarea
                    value={newFeedback.message}
                    onChange={(e) => setNewFeedback({ ...newFeedback, message: e.target.value })}
                    placeholder="Describe your experience in detail..."
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleSubmitFeedback}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={!newFeedback.station || !newFeedback.category || !newFeedback.message}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{activeFeedbacks.length}</div>
                    <div className="text-sm opacity-90">Total Reports</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{highPriorityCount}</div>
                    <div className="text-sm opacity-90">High Priority</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm opacity-90">Weekly police reports generated</div>
                  <div className="text-lg font-semibold">Station-wise safety summaries sent to authorities</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Display */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Community Feedback</h2>
              <Badge className="bg-blue-100 text-blue-800">
                {activeFeedbacks.length} Active Reports
              </Badge>
            </div>

            <div className="space-y-4">
              {activeFeedbacks.map((feedback) => (
                <Card key={feedback.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-purple-100 text-purple-700">
                            {feedback.user.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-900">{feedback.user}</div>
                          <div className="text-sm text-gray-500">{feedback.timestamp}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(feedback.priority)}>
                          {feedback.priority.toUpperCase()}
                        </Badge>
                        <Badge className={getCategoryColor(feedback.category)}>
                          {feedback.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        📍 {feedback.station} Station
                      </Badge>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleVote(feedback.id, 'up')}
                          className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{feedback.upvotes}</span>
                        </button>
                        <button
                          onClick={() => handleVote(feedback.id, 'down')}
                          className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          <span>{feedback.downvotes}</span>
                        </button>
                      </div>
                      
                      {feedback.priority === 'high' && (
                        <div className="flex items-center space-x-1 text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-sm">Police Review</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Weekly Report Info */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <CardTitle className="text-yellow-800">Weekly Safety Reports</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-yellow-700 space-y-2">
                <p>All feedback is compiled into weekly safety reports sent to Mumbai Police and Railway authorities.</p>
                <p>Station-wise safety rankings are updated based on community feedback and incident reports.</p>
                <p className="text-sm font-medium">Next report generation: Every Sunday at 11:59 PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}