import React, { useState } from 'react';
import { BarChart3, Camera, AlertTriangle, CheckCircle, MapPin, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function StationAnalysisPage() {
  const [selectedTrain, setSelectedTrain] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const trains = [
    'Virar Local',
    'Borivali Local', 
    'Andheri Local',
    'Churchgate Local',
    'CST Local'
  ];

  const stations = [
    { name: 'Churchgate', crowd: 15, safety: 92, status: 'safe' },
    { name: 'Marine Lines', crowd: 25, safety: 88, status: 'safe' },
    { name: 'Charni Road', crowd: 35, safety: 85, status: 'caution' },
    { name: 'Grant Road', crowd: 45, safety: 78, status: 'caution' },
    { name: 'Mumbai Central', crowd: 65, safety: 82, status: 'caution' },
    { name: 'Mahalaxmi', crowd: 40, safety: 86, status: 'safe' },
    { name: 'Lower Parel', crowd: 70, safety: 75, status: 'unsafe' },
    { name: 'Prabhadevi', crowd: 55, safety: 80, status: 'caution' },
    { name: 'Dadar', crowd: 85, safety: 70, status: 'unsafe' },
    { name: 'Matunga', crowd: 45, safety: 88, status: 'safe' },
    { name: 'Mahim', crowd: 50, safety: 84, status: 'caution' },
    { name: 'Bandra', crowd: 75, safety: 76, status: 'unsafe' },
    { name: 'Khar', crowd: 35, safety: 90, status: 'safe' },
    { name: 'Santacruz', crowd: 40, safety: 87, status: 'safe' },
    { name: 'Vile Parle', crowd: 60, safety: 82, status: 'caution' },
    { name: 'Andheri', crowd: 80, safety: 73, status: 'unsafe' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'caution': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'unsafe': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        analyzeCompartment();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCompartment = () => {
    setAnalyzing(true);
    toast.info('🔍 Analyzing compartment crowd density...');
    
    // Simulate AI analysis
    setTimeout(() => {
      const crowdLevel = Math.random() > 0.7 ? 'low' : 'medium';
      setAnalyzing(false);
      
      if (crowdLevel === 'low') {
        toast.error('⚠️ Low crowd detected! Sending constable request to police...');
        setTimeout(() => {
          toast.success('✅ Constable has been notified and is on the way');
        }, 2000);
      } else {
        toast.success('✅ Compartment has adequate crowd - You are safe!');
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Station & Compartment Analysis</h1>
          <p className="text-xl text-gray-600">Real-time crowd prediction and safety analysis</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Station-wise Crowd Prediction */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <CardTitle>Station-wise Crowd Prediction</CardTitle>
                </div>
                <CardDescription>
                  Select your train and destination to see crowd levels and safety scores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Train</label>
                    <Select value={selectedTrain} onValueChange={setSelectedTrain}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your train" />
                      </SelectTrigger>
                      <SelectContent>
                        {trains.map((train) => (
                          <SelectItem key={train} value={train}>{train}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Destination</label>
                    <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {stations.map((station) => (
                          <SelectItem key={station.name} value={station.name}>{station.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedTrain && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Route Analysis - {selectedTrain}</h3>
                    <div className="space-y-3">
                      {stations.slice(0, 10).map((station, index) => (
                        <div key={station.name} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">{station.name}</span>
                            </div>
                            <Badge className={getStatusColor(station.status)}>
                              {station.status.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-6">
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Crowd Level</div>
                              <Progress value={station.crowd} className="w-20" />
                              <div className="text-xs text-gray-500">{station.crowd}%</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Safety Score</div>
                              <div className="text-lg font-semibold text-green-600">{station.safety}/100</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Station Safety Index */}
            <Card>
              <CardHeader>
                <CardTitle>Station Safety Rankings</CardTitle>
                <CardDescription>
                  Based on feedback, complaints, and incident reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700">Safest Stations (Night Time)</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {stations
                      .filter(s => s.status === 'safe')
                      .sort((a, b) => b.safety - a.safety)
                      .slice(0, 6)
                      .map((station, index) => (
                        <div key={station.name} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                              {index + 1}
                            </div>
                            <span>{station.name}</span>
                          </div>
                          <div className="text-green-700 font-semibold">{station.safety}/100</div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compartment Analysis */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Camera className="h-6 w-6 text-purple-600" />
                  <CardTitle>Compartment Analysis</CardTitle>
                </div>
                <CardDescription>
                  Upload a photo to analyze crowd density and request constable if needed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="compartment-upload"
                  />
                  <label htmlFor="compartment-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Click to upload compartment photo</p>
                    <p className="text-sm text-gray-500">JPG, PNG up to 10MB</p>
                  </label>
                </div>

                {uploadedImage && (
                  <div className="space-y-4">
                    <ImageWithFallback
                      src={uploadedImage}
                      alt="Uploaded compartment"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    
                    {analyzing && (
                      <div className="text-center space-y-2">
                        <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
                        <p className="text-purple-600">Analyzing crowd density...</p>
                      </div>
                    )}
                  </div>
                )}

                <Button
                  onClick={analyzeCompartment}
                  disabled={!uploadedImage || analyzing}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {analyzing ? 'Analyzing...' : 'Analyze Compartment'}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-blue-800">How It Works</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-blue-700 space-y-2 text-sm">
                <p>• Upload a photo of your current compartment</p>
                <p>• AI analyzes crowd density using computer vision</p>
                <p>• If under-crowded, automatic constable request is sent</p>
                <p>• Police dispatch the nearest available constable</p>
                <p>• You receive confirmation and ETA</p>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-800">Current Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-1" />
                  <div className="text-sm text-orange-700">
                    <p className="font-medium">Dadar Station</p>
                    <p>High crowd levels reported between 11 PM - 12 AM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                  <div className="text-sm text-green-700">
                    <p className="font-medium">Bandra Station</p>
                    <p>Additional security deployed for night hours</p>
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