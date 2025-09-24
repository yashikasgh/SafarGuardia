import React from 'react';
import { Shield, Users, Heart, Award, Target, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: 'Advanced Safety Technology',
      description: 'AI-powered crowd analysis, real-time alerts, and smart prediction systems'
    },
    {
      icon: Users,
      title: 'Community-Driven',
      description: 'Built by women, for women - with community feedback at its core'
    },
    {
      icon: Heart,
      title: 'Empowering Women',
      description: 'Creating safe spaces and confidence for women traveling alone'
    },
    {
      icon: Award,
      title: 'Award-Winning Innovation',
      description: 'Smart India Hackathon project focused on real-world solutions'
    }
  ];

  const team = [
    { name: 'Priya Sharma', role: 'Lead Developer', expertise: 'AI & Machine Learning' },
    { name: 'Anita Desai', role: 'UX Designer', expertise: 'User Experience & Safety Research' },
    { name: 'Meera Patel', role: 'Backend Engineer', expertise: 'Security & Data Protection' },
    { name: 'Kavya Singh', role: 'Mobile Developer', expertise: 'Emergency Systems & APIs' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              About <span className="text-pink-600">SafeRail Women</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing women's safety in Mumbai local trains through innovative technology, 
              community support, and data-driven insights.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="border-2 border-pink-200">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-pink-600" />
                <CardTitle className="text-2xl text-pink-700">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To create a comprehensive safety ecosystem for women travelers in Mumbai local trains, 
                combining cutting-edge technology with community-driven insights to ensure every woman 
                feels secure and empowered during her journey, especially during late-night hours.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Eye className="h-6 w-6 text-purple-600" />
                <CardTitle className="text-2xl text-purple-700">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To transform Mumbai's local train network into the safest urban transportation system 
                for women globally, where technology and community collaboration create an environment 
                where every woman can travel with confidence, dignity, and peace of mind.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combining traditional safety measures with innovative technology solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-pink-600" />
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
        </section>

        {/* Smart India Hackathon */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardContent className="py-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">Smart India Hackathon 2024</h2>
                  <p className="text-lg opacity-90 leading-relaxed">
                    SafeRail Women was born from the Smart India Hackathon, addressing the critical 
                    challenge of women's safety in public transportation. Our solution combines 
                    real-world needs with cutting-edge technology to create meaningful impact.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Problem Statement: Women's Safety in Late-Night Travel</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Focus: Mumbai Local Train Network</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Solution: Tech + Community Approach</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1603224078746-dceb86168b58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdW1iYWklMjBsb2NhbCUyMHRyYWluJTIwd29tZW4lMjBjb21wYXJ0bWVudHxlbnwxfHx8fDE3NTg3Mjg5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Mumbai Local Train"
                    className="rounded-lg shadow-2xl w-full h-64 object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600">
              Passionate women technologists committed to creating safer spaces
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-20 h-20 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-pink-700">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-pink-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{member.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Impact Stats */}
        <section className="mb-16">
          <Card className="bg-pink-50 border-pink-200">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-pink-700">Our Impact (Prototype)</CardTitle>
              <CardDescription className="text-lg">
                Demonstrating potential for real-world deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-pink-600">100+</div>
                  <div className="text-gray-600">Stations Mapped</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-pink-600">24/7</div>
                  <div className="text-gray-600">Emergency Support</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-pink-600">AI</div>
                  <div className="text-gray-600">Crowd Analysis</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-pink-600">Real-time</div>
                  <div className="text-gray-600">Safety Insights</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Future Plans */}
        <section>
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Future Roadmap</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-700">Phase 1: Prototype</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>✅ Core safety features</p>
                  <p>✅ Community feedback system</p>
                  <p>✅ AI crowd analysis</p>
                  <p>✅ Emergency protocols</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-pink-700">Phase 2: Pilot Launch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>🔄 Real API integrations</p>
                  <p>🔄 Police system connectivity</p>
                  <p>🔄 Mobile app development</p>
                  <p>🔄 User testing & feedback</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Phase 3: Scale</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>⏳ City-wide deployment</p>
                  <p>⏳ IoT sensor integration</p>
                  <p>⏳ Predictive analytics</p>
                  <p>⏳ Multi-city expansion</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}