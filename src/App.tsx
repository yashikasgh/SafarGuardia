import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { SafetyPage } from './components/SafetyPage';
import { StationAnalysisPage } from './components/StationAnalysisPage';
import { FeedbackPage } from './components/FeedbackPage';
import { LoginPage } from './components/LoginPage';
import { RegistrationPage } from './components/RegistrationPage';
import { ProfilePage } from './components/ProfilePage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Toaster } from './components/ui/sonner';

// If you want to include Feedback component separately, import it here
import Feedback from "./components/Feedback";

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'safety':
        return <SafetyPage />;
      case 'stations':
        return <StationAnalysisPage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegistrationPage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {renderPage()}
        {/* Optionally include Feedback component here if you want it visible on all pages */}
        {/* <Feedback /> */}
      </main>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#ffffff',
            border: '1px solid #e91e63',
            color: '#2d1b16',
          },
        }}
      />
    </div>
  );
}