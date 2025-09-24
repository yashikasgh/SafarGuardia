import React from 'react';
import { Shield, AlertTriangle, Users, BarChart3, MessageSquare, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: AlertTriangle,
      title: 'SOS Emergency Alert',
      description: 'Instant emergency alerts to guardians and police with GPS location',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      icon: BarChart3,
      title: 'Station Crowd Prediction',
      description: 'Real-time crowd levels and safety analysis for each station',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: MessageSquare,
      title: 'Women-Only Feedback',
      description: 'Share and read safety experiences from other women travelers',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Shield,
      title: 'Compartment Analysis',
      description: 'AI-powered crowd detection to request police constable assistance',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Safe Travel for
                  <span className="text-pink-600 block">Women in Mumbai</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Your trusted companion for safe late-night travel in Mumbai local trains. 
                  Get real-time safety insights, emergency assistance, and community support.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => onNavigate('safety')}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg"
                >
                  Get Started
                </Button>
                <Button
                  onClick={() => onNavigate('login')}
                  variant="outline"
                  className="border-pink-600 text-pink-700 hover:bg-pink-50 px-8 py-4 text-lg"
                >
                  Sign In
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1710693250794-f0ef6d41aea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNhZmV0eSUyMHNlY3VyaXR5JTIwcGluayUyMGZsb3dlcnN8ZW58MXx8fHwxNzU4NzI4OTA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Women's Safety"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Innovative Safety Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combining traditional safety measures with cutting-edge technology for comprehensive protection
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-pink-200 transition-colors">
                  <CardHeader className="space-y-4">
                    <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-pink-600">24/7</div>
              <div className="text-gray-600">Emergency Support</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-pink-600">100+</div>
              <div className="text-gray-600">Stations Covered</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-pink-600">95%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to Travel Safely?
          </h2>
          <p className="text-xl opacity-90">
            Join thousands of women who trust SafeRail for their daily commute
          </p>
          <Button
            onClick={() => onNavigate('login')}
            className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 text-lg"
          >
            Start Your Safe Journey
          </Button>
        </div>
      </section>
    </div>
  );
}