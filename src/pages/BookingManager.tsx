
import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import BookingCalendar from "@/components/calendar/BookingCalendar";

const BookingManager = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to={user?.userType === 'vendor' ? '/vendor-dashboard' : '/dashboard'} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                WeddingPro
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.firstName}</span>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Booking Manager
          </h1>
          <p className="text-gray-600">Schedule appointments and manage your availability</p>
        </div>

        <BookingCalendar />
      </div>
    </div>
  );
};

export default BookingManager;
