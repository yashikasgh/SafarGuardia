import React, { useState } from 'react';
import { Shield, Eye, EyeOff, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

interface LoginForm {
  username: string;
  password: string;
}

interface LoginErrors {
  username?: string;
  password?: string;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [loginData, setLoginData] = useState<LoginForm>({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    if (!loginData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginForm, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoggingIn(true);
    toast.info('🔐 Authenticating...');

    // Simulate API call for login
    setTimeout(() => {
      setIsLoggingIn(false);
      
      // Mock authentication - in real app, this would validate against backend
      if (loginData.username && loginData.password) {
        // Store user session (in real app, this would be JWT or secure session)
        localStorage.setItem('user', JSON.stringify({
          username: loginData.username,
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        }));
        
        toast.success('🎉 Welcome back to SafeRail Women!');
        onNavigate('home');
      } else {
        toast.error('Invalid username or password');
      }
    }, 1500);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-pink-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your SafeRail Women account
          </p>
        </div>

        <Card className="border-2 border-pink-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your username and password to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Username</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={loginData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={errors.username ? 'border-red-500' : ''}
                />
                {errors.username && (
                  <p className="text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Password</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onKeyPress={handleKeyPress}
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
              </div>

              {/* Login Button */}
              <Button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="w-full bg-pink-600 hover:bg-pink-700"
              >
                {isLoggingIn ? 'Signing In...' : 'Sign In'}
              </Button>

              {/* Forgot Password */}
              <Button variant="link" className="w-full text-sm text-pink-600">
                Forgot your password?
              </Button>

              {/* Register Link */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => onNavigate('register')}
                    className="text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Create an account
                  </button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-4">
            <h4 className="font-medium text-blue-800 mb-2">🔒 Security Notice</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• This is a women-only platform verified through Aadhaar</p>
              <p>• Your login credentials are securely encrypted</p>
              <p>• Session expires automatically for security</p>
              <p>• Report any suspicious activity immediately</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}