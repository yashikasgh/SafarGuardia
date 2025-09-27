import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Shield, Edit, Save, X, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner@2.0.3';

interface UserProfile {
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  isFemale: boolean;
  createdAt: string;
  lastLogin: string;
}

interface EditableFields {
  email: string;
  phoneNumber: string;
}

interface FieldErrors {
  email?: string;
  phoneNumber?: string;
}

export function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'Yashika Singh',
    username: 'sgh.yashika455',
    email: 'yashika.singh@gmail.com',
    phoneNumber: '+91 98765 43210',
    isFemale: true,
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: new Date().toISOString()
  });

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<EditableFields>({
    email: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // In real app, fetch user profile from API using JWT token
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      // Mock profile data - in real app, this would come from backend
      setProfile(prev => ({ ...prev, username: user.username, lastLogin: user.loginTime }));
    }
  }, []);

  const validateField = (field: keyof EditableFields, value: string): string | undefined => {
    switch (field) {
      case 'email':
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Invalid email format';
        break;
      
      case 'phoneNumber':
        if (!value) return 'Phone number is required';
        const phoneRegex = /^[+]?[1-9][\d\s\-()]{8,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Invalid phone number format';
        break;
    }
    return undefined;
  };

  const handleEdit = () => {
    setEditData({
      email: profile.email,
      phoneNumber: profile.phoneNumber
    });
    setEditMode(true);
    setErrors({});
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditData({
      email: '',
      phoneNumber: ''
    });
    setErrors({});
  };

  const handleInputChange = (field: keyof EditableFields, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Real-time validation
    const error = validateField(field, value);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FieldErrors = {};
    
    Object.keys(editData).forEach(key => {
      const error = validateField(key as keyof EditableFields, editData[key as keyof EditableFields]);
      if (error) {
        newErrors[key as keyof FieldErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error('Please fix all validation errors');
      return;
    }

    setSaving(true);
    toast.info('Updating profile...');

    // Simulate API call
    setTimeout(() => {
      setProfile(prev => ({
        ...prev,
        email: editData.email,
        phoneNumber: editData.phoneNumber
      }));
      
      setSaving(false);
      setEditMode(false);
      toast.success('✅ Profile updated successfully!');
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
          <p className="text-xl text-gray-600">Manage your account information and settings</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="bg-pink-100 text-pink-700 text-2xl">
                    {profile.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{profile.fullName}</CardTitle>
                <CardDescription className="text-lg">@{profile.username}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <Badge className={profile.isFemale ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {profile.isFemale ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Female Verified
                      </>
                    ) : (
                      'Gender Unverified'
                    )}
                  </Badge>
                </div>
                
                <div className="text-center space-y-2 text-sm text-gray-600">
                  <p>Member since: {formatDate(profile.createdAt)}</p>
                  <p>Last login: {formatDate(profile.lastLogin)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-blue-800">Account Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-blue-700 space-y-2 text-sm">
                <p>✅ Aadhaar verified (Female)</p>
                <p>✅ Secure password protection</p>
                <p>✅ Login activity monitored</p>
                <p>✅ Two-factor authentication ready</p>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Privacy Notice</CardTitle>
              </CardHeader>
              <CardContent className="text-yellow-700 text-sm">
                <p>
                  Your Aadhaar number was used only for one-time gender verification and 
                  is not stored in our system. We maintain strict privacy standards.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Your account details and contact information
                  </CardDescription>
                </div>
                {!editMode && (
                  <Button onClick={handleEdit} variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name (Read-only) */}
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Full Name</span>
                    </Label>
                    <Input
                      value={profile.fullName}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500">Full name cannot be modified</p>
                  </div>

                  {/* Username (Read-only) */}
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Username</span>
                    </Label>
                    <Input
                      value={profile.username}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500">Username cannot be modified</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Email (Editable) */}
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email Address</span>
                    </Label>
                    <Input
                      type="email"
                      value={editMode ? editData.email : profile.email}
                      onChange={(e) => editMode && handleInputChange('email', e.target.value)}
                      disabled={!editMode}
                      className={editMode ? (errors.email ? 'border-red-500' : '') : 'bg-gray-50'}
                    />
                    {editMode && errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Number (Editable) */}
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Phone Number</span>
                    </Label>
                    <Input
                      type="tel"
                      value={editMode ? editData.phoneNumber : profile.phoneNumber}
                      onChange={(e) => editMode && handleInputChange('phoneNumber', e.target.value)}
                      disabled={!editMode}
                      className={editMode ? (errors.phoneNumber ? 'border-red-500' : '') : 'bg-gray-50'}
                    />
                    {editMode && errors.phoneNumber && (
                      <p className="text-sm text-red-600">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                {/* Aadhaar Notice */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Aadhaar Verification</h4>
                  <p className="text-sm text-gray-600">
                    Your Aadhaar was verified during registration to confirm gender. 
                    The Aadhaar number is not stored in our system for privacy protection. 
                    Aadhaar re-verification is not supported through the profile page.
                  </p>
                </div>

                {/* Action Buttons */}
                {editMode && (
                  <div className="flex space-x-4 pt-4 border-t">
                    <Button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-pink-600 hover:bg-pink-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      disabled={saving}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>
                  Manage your account settings and security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Update Emergency Contacts
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Preferences
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Privacy Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>
                  Your activity on SafeRail Women platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-pink-600">12</div>
                    <div className="text-sm text-gray-600">Safety Reports Submitted</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-blue-600">45</div>
                    <div className="text-sm text-gray-600">Station Checks Performed</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-green-600">8</div>
                    <div className="text-sm text-gray-600">Community Feedbacks</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
