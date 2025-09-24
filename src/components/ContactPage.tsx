import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Shield, MessageSquare, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const emergencyContacts = [
    {
      title: 'Women Helpline',
      number: '1091',
      description: '24/7 support for women in distress',
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Railway Police',
      number: '182',
      description: 'Railway security and emergency response',
      icon: Phone,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Mumbai Police',
      number: '100',
      description: 'General emergency and police assistance',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Medical Emergency',
      number: '108',
      description: 'Ambulance and medical assistance',
      icon: Phone,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const supportCategories = [
    'Technical Support',
    'Safety Concern',
    'Feature Request',
    'Bug Report',
    'Partnership Inquiry',
    'Media Inquiry',
    'General Feedback'
  ];

  const handleSubmitContact = () => {
    if (contactForm.name && contactForm.email && contactForm.message) {
      toast.success('✅ Message sent successfully! We\'ll respond within 24 hours.');
      setContactForm({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      });
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact & Support</h1>
          <p className="text-xl text-gray-600">Get help, share feedback, or reach out to our team</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                  <CardTitle>Send us a Message</CardTitle>
                </div>
                <CardDescription>
                  We're here to help and would love to hear from you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={contactForm.category} onValueChange={(value) => setContactForm({ ...contactForm, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {supportCategories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="Brief subject line"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                  />
                </div>

                <Button
                  onClick={handleSubmitContact}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Office Information */}
            <Card>
              <CardHeader>
                <CardTitle>Development Team</CardTitle>
                <CardDescription>Smart India Hackathon 2024 Project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <div className="font-medium">Project Location</div>
                        <div className="text-gray-600">Mumbai, Maharashtra, India</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <div className="font-medium">Email Support</div>
                        <div className="text-gray-600">support@saferailwomen.in</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-purple-600 mt-1" />
                      <div>
                        <div className="font-medium">Response Time</div>
                        <div className="text-gray-600">Within 24 hours</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-orange-600 mt-1" />
                      <div>
                        <div className="font-medium">Support Hours</div>
                        <div className="text-gray-600">9 AM - 6 PM (Prototype Phase)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Contacts & Support */}
          <div className="space-y-6">
            {/* Emergency Numbers */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-red-600" />
                  <CardTitle className="text-red-800">Emergency Contacts</CardTitle>
                </div>
                <CardDescription className="text-red-700">
                  For immediate assistance, contact these numbers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyContacts.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <div key={index} className={`p-4 ${contact.bgColor} rounded-lg border`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-5 w-5 ${contact.color}`} />
                          <div>
                            <div className="font-medium text-gray-900">{contact.title}</div>
                            <div className="text-sm text-gray-600">{contact.description}</div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-bold"
                          onClick={() => toast.info(`Calling ${contact.number}...`)}
                        >
                          {contact.number}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Support */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Support</CardTitle>
                <CardDescription>Common questions and quick actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View FAQ
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Report Technical Issue
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Safety Guidelines
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Partnership Inquiry
                </Button>
              </CardContent>
            </Card>

            {/* Social & Community */}
            <Card className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
              <CardHeader>
                <CardTitle>Join Our Community</CardTitle>
                <CardDescription className="text-white/90">
                  Connect with other women travelers and stay updated
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm opacity-90">
                    Follow our journey and get safety tips, updates, and community stories.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Twitter
                  </Button>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Project Status */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Project Status</CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700 space-y-2 text-sm">
                <p>🚧 <strong>Current Phase:</strong> Prototype Development</p>
                <p>🎯 <strong>Target:</strong> Smart India Hackathon 2024</p>
                <p>📱 <strong>Platform:</strong> Web App (Mobile Coming Soon)</p>
                <p>🔄 <strong>Status:</strong> Active Development</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <section className="mt-16">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="py-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-yellow-800">Important Notice</h3>
                <p className="text-yellow-700 max-w-4xl mx-auto">
                  SafeRail Women is currently a prototype developed for the Smart India Hackathon 2024. 
                  While we demonstrate real safety features and innovations, some functionalities are simulated 
                  for demonstration purposes. In a real deployment, all emergency services would be fully integrated 
                  with actual police and railway authorities.
                </p>
                <div className="flex justify-center">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1620654462660-e5a8792eabad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpY2UlMjBzdGF0aW9uJTIwc2FmZXR5JTIwc2VjdXJpdHl8ZW58MXx8fHwxNzU4NzI4OTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Police Station"
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}