import React, { useState, useEffect } from "react";
import {
  Shield,
  Home,
  Users,
  MessageSquare,
  BarChart3,
  Phone,
  User,
  LogOut,
  ChevronDown
} from "lucide-react";
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({
  currentPage,
  onNavigate,
}: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setIsLoggedIn(user.isLoggedIn || false);
      setUsername(user.username || '');
    }
  }, [currentPage]); // Re-check when page changes

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "safety", label: "Safety", icon: Shield },
    { id: "stations", label: "Stations", icon: BarChart3 },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "about", label: "About", icon: Users },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    setShowUserMenu(false);
    onNavigate('home');
  };

  return (
    <header className="bg-white shadow-md border-b-2 border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-pink-600" />
            <h1 className="text-xl font-bold text-pink-700">
              Safar Guardia
            </h1>
          </div>

          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? "bg-pink-100 text-pink-700"
                      : "text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Authentication Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-pink-100 text-pink-700 text-sm">
                      {username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-700 hidden sm:block">{username}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onNavigate('profile');
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
                      >
                        <User className="h-4 w-4 mr-2" />
                        My Profile
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={() => onNavigate("login")}
                  variant="outline"
                  className="border-pink-600 text-pink-700 hover:bg-pink-50"
                >
                  Login
                </Button>
                <Button
                  onClick={() => onNavigate("register")}
                  className="bg-pink-600 text-white hover:bg-pink-700"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
