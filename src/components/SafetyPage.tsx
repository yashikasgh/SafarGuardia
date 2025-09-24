import React, { useState } from 'react';
import { AlertTriangle, Phone, Shield, MapPin, Camera, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

export function SafetyPage() {
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Mom', number: '+91 98765 43210' },
    { name: 'Dad', number: '+91 98765 43211' },
  ]);
  const [newContact, setNewContact] = useState({ name: '', number: '' });
  const [sosActive, setSosActive] = useState(false);
  const [fakeCallActive, setFakeCallActive] = useState(false);

  const handleSOS = () => {
    setSosActive(true);
    toast.error('🚨 SOS Alert Activated! Notifying emergency contacts and police...');
    
    // Simulate API call
    setTimeout(() => {
      toast.success('✅ Emergency alerts sent successfully');
      setSosActive(false);
    }, 3000);
  };

  const handleFakeCall = () => {
    setFakeCallActive(true);
    toast.info('📞 Fake call initiated...');
    
    setTimeout(() => {
      setFakeCallActive(false);
    }, 10000);
  };

  const addEmergencyContact = () => {
    if (newContact.name && newContact.number) {
      setEmergencyContacts([...emergencyContacts, newContact]);
      setNewContact({ name: '', number: '' });
      toast.success('Emergency contact added successfully');
    }
  };

  const callPolice = () => {
    toast.info('📞 Connecting to Mumbai Police Women Helpline...');
    // In real app, this would initiate a call
  };

  const findSafeSpots = () => {
    toast.info('🗺️ Finding nearest police stations and hospitals...');
    // In real app, this would open maps with safe locations
  };

  if (fakeCallActive) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white space-y-6">
          <div className="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center mx-auto">
            <Phone className="h-16 w-16" />
          </div>
          <h2 className="text-2xl">Incoming Call</h2>
          <p className="text-xl">Mom</p>
          <p className="text-lg text-gray-300">+91 98765 43210</p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => setFakeCallActive(false)}
              className="bg-green-500 hover:bg-green-600 rounded-full w-16 h-16"
            >
              <Phone className="h-6 w-6" />
            </Button>
            <Button
              onClick={() => setFakeCallActive(false)}
              className="bg-red-500 hover:bg-red-600 rounded-full w-16 h-16"
            >
              <Phone className="h-6 w-6 rotate-45" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety Dashboard</h1>
          <p className="text-xl text-gray-600">Your emergency tools and safety features</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Emergency Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* SOS Alert */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <CardTitle className="text-red-800">Emergency SOS</CardTitle>
                </div>
                <CardDescription>
                  Immediately alert your emergency contacts and local police with your GPS location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleSOS}
                  disabled={sosActive}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg"
                >
                  {sosActive ? 'Sending Alerts...' : '🚨 ACTIVATE SOS'}
                </Button>
              </CardContent>
            </Card>

            {/* Police Contact */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <CardTitle>Police Helpline</CardTitle>
                </div>
                <CardDescription>
                  Direct connection to Mumbai Police Women Helpline
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={callPolice} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Women Helpline (103)
                </Button>
                <Button onClick={callPolice} variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency (100)
                </Button>
              </CardContent>
            </Card>

            {/* Distraction Tools */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Camera className="h-6 w-6 text-purple-600" />
                  <CardTitle>Distraction Tools</CardTitle>
                </div>
                <CardDescription>
                  Tools to help you in uncomfortable situations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleFakeCall} className="w-full bg-purple-600 hover:bg-purple-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Trigger Fake Call
                </Button>
                <Button onClick={findSafeSpots} variant="outline" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Safe Spots Nearby
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Contacts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-green-600" />
                  <CardTitle>Emergency Contacts</CardTitle>
                </div>
                <CardDescription>
                  Quick access to your trusted contacts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-gray-600">{contact.number}</div>
                    </div>
                    <Button size="sm" onClick={() => toast.info(`Calling ${contact.name}...`)}>
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Add New Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Add Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    placeholder="Contact name"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-number">Phone Number</Label>
                  <Input
                    id="contact-number"
                    value={newContact.number}
                    onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
                    placeholder="+91 xxxxx xxxxx"
                  />
                </div>
                <Button onClick={addEmergencyContact} className="w-full">
                  Add Contact
                </Button>
              </CardContent>
            </Card>

            {/* Guardian Alerts */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Guardian Notifications</CardTitle>
                <CardDescription>
                  Your guardian will receive automatic updates about your journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-yellow-700 space-y-2">
                  <p>✅ Journey started: 11:30 PM</p>
                  <p>📍 Current location: Dadar Station</p>
                  <p>🚂 Train: Virar Local</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}