import React, { useState } from 'react';
import { Shield, Eye, EyeOff, UserCheck, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';

interface RegistrationPageProps {
  onNavigate: (page: string) => void;
}

interface FormData {
  fullName: string;
  phoneNumber: string;
  aadhaar: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  aadhaar?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
}

export function RegistrationPage({ onNavigate }: RegistrationPageProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    aadhaar: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState<'form' | 'aadhaar-verification' | 'success'>('form');
  const [verifying, setVerifying] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [genderVerified, setGenderVerified] = useState(false);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Full name must be at least 2 characters';
        break;
      
      case 'phoneNumber':
        if (!value) return 'Phone number is required';
        const phoneRegex = /^[+]?[1-9][\d\s\-()]{8,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Invalid phone number format';
        break;
      
      case 'aadhaar':
        if (!value) return 'Aadhaar number is required for gender verification';
        if (value.replace(/\s/g, '').length !== 12) return 'Aadhaar must be exactly 12 digits';
        if (!/^\d+$/.test(value.replace(/\s/g, ''))) return 'Aadhaar can only contain digits';
        break;
      
      case 'email':
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Invalid email format';
        break;
      
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-zA-Z])/.test(value)) return 'Password must contain at least one letter';
        if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
        break;
      
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        break;
      
      case 'username':
        if (!value) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        break;
      
      default:
        break;
    }
    return undefined;
  };

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Real-time validation for better UX
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAadhaarVerification = async () => {
    if (!formData.aadhaar || formData.aadhaar.replace(/\s/g, '').length !== 12) {
      setErrors(prev => ({ ...prev, aadhaar: 'Please enter a valid 12-digit Aadhaar number' }));
      return;
    }

    setVerifying(true);
    toast.info('🔍 Verifying Aadhaar for gender check...');

    // Simulate API call for Aadhaar verification
    // IMPORTANT: In real implementation, Aadhaar number is NEVER stored
    setTimeout(() => {
      // Mock gender verification - in real app, this would call official UIDAI API
      // For demo purposes, we'll simulate female verification for certain patterns
      const aadhaarDigits = formData.aadhaar.replace(/\s/g, '');
      const lastDigit = parseInt(aadhaarDigits.slice(-1));
      const isFemale = lastDigit % 2 === 0; // Even last digit = female for demo
      
      setVerifying(false);
      
      if (isFemale) {
        setGenderVerified(true);
        setAadhaarVerified(true);
        toast.success('✅ Gender verification successful - Female user confirmed');
        
        // CRITICAL: Clear Aadhaar from memory immediately after verification
        setFormData(prev => ({ ...prev, aadhaar: '' }));
        
        // Move to success step
        setStep('success');
      } else {
        toast.error('❌ Registration rejected - Only female users are allowed');
        setErrors(prev => ({ 
          ...prev, 
          aadhaar: 'Registration is restricted to female users only. Please contact support if this is an error.' 
        }));
        
        // Clear Aadhaar from memory
        setFormData(prev => ({ ...prev, aadhaar: '' }));
      }
    }, 2000);
  };

  const handleRegistration = async () => {
    if (!validateForm()) {
      toast.error('Please fix all validation errors');
      return;
    }

    if (!genderVerified) {
      toast.error('Please complete Aadhaar verification first');
      return;
    }

    toast.info('Creating your account...');

    // Simulate API call to register user
    setTimeout(() => {
      // In real implementation, this would:
      // 1. Hash the password with bcrypt/argon2
      // 2. Store user data in database with is_female: true
      // 3. Generate JWT token
      // 4. NEVER store Aadhaar number anywhere
      
      toast.success('🎉 Registration successful! Welcome to SafeRail Women');
      onNavigate('login');
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-800">Verification Complete!</CardTitle>
              <CardDescription className="text-green-700">
                Your gender has been verified successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-green-200 bg-green-50">
                <UserCheck className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  ✅ Female user confirmed<br />
                  ✅ Aadhaar verification completed<br />
                  ✅ Data privacy maintained<br />
                  ✅ Ready to proceed with registration
                </AlertDescription>
              </Alert>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Privacy Notice</h4>
                <p className="text-sm text-gray-600">
                  Your Aadhaar number was used only for one-time gender verification and has been 
                  immediately discarded from our system. We do not store or log Aadhaar numbers.
                </p>
              </div>

              <Button
                onClick={handleRegistration}
                className="w-full bg-pink-600 hover:bg-pink-700"
              >
                Complete Registration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Shield className="mx-auto h-12 w-12 text-pink-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create Your Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join SafeRail Women - Secure registration with Aadhaar verification
          </p>
        </div>

        <Card className="border-2 border-pink-200">
          <CardHeader>
            <CardTitle className="text-2xl">Registration Details</CardTitle>
            <CardDescription>
              Please provide accurate information for account creation
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!genderVerified && (
              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  <strong>Privacy Policy:</strong> Your Aadhaar number is used only for one-time gender verification 
                  and is immediately discarded. We never store Aadhaar numbers in our database or logs.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'border-red-500' : ''}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value.toLowerCase())}
                  placeholder="Choose a username"
                  className={errors.username ? 'border-red-500' : ''}
                />
                {errors.username && (
                  <p className="text-sm text-red-600">{errors.username}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="+91 98765 43210"
                  className={errors.phoneNumber ? 'border-red-500' : ''}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@gmail.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Aadhaar */}
            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Number * (For Gender Verification Only)</Label>
              <Input
                id="aadhaar"
                type="text"
                value={formData.aadhaar}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                  const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                  handleInputChange('aadhaar', formatted);
                }}
                placeholder="XXXX XXXX XXXX"
                className={errors.aadhaar ? 'border-red-500' : ''}
                disabled={genderVerified}
              />
              {errors.aadhaar && (
                <p className="text-sm text-red-600">{errors.aadhaar}</p>
              )}
              {!genderVerified && (
                <div className="flex justify-end">
                  <Button
                    onClick={handleAadhaarVerification}
                    disabled={verifying || !formData.aadhaar || formData.aadhaar.replace(/\s/g, '').length !== 12}
                    variant="outline"
                    size="sm"
                  >
                    {verifying ? 'Verifying...' : 'Verify Gender'}
                  </Button>
                </div>
              )}
              {genderVerified && (
                <p className="text-sm text-green-600 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Gender verified successfully
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter password"
                    className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
                <p className="text-xs text-gray-500">
                  Minimum 8 characters with at least one letter and one number
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm password"
                    className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => onNavigate('login')}
                className="flex-1"
              >
                Already have an account?
              </Button>
              <Button
                onClick={() => setStep('aadhaar-verification')}
                disabled={!genderVerified || !validateForm()}
                className="flex-1 bg-pink-600 hover:bg-pink-700"
              >
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="mt-6 bg-gray-50 border-gray-200">
          <CardContent className="py-4">
            <h4 className="font-medium text-gray-900 mb-2">🔒 Security & Privacy</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Passwords are securely hashed and never stored in plain text</p>
              <p>• Aadhaar numbers are used only for verification and immediately discarded</p>
              <p>• Only female users are allowed to register on this platform</p>
              <p>• All data transmission is encrypted with HTTPS</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}