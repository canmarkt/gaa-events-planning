
import React, { useState } from 'react';
import { Heart, Calendar, Users, DollarSign, Gift, CheckSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import ProfileMenu from "@/components/layout/ProfileMenu";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, profile, isLoading, updateProfile } = useAuth();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Minimal fallback: create profile for logged in user if missing
  const handleCreateProfile = async () => {
    if (!user) return;
    setCreating(true);
    setError(null);

    const newProfile = {
      id: user.id,
      email: user.email,
      first_name: "New",
      last_name: "User",
      role: "couple",
      is_approved: true,
    };
    try {
      // Insert row (if doesn't exist)
      const { error: insertError } = await supabase
        .from('profiles')
        .insert(newProfile);
      if (insertError && !insertError.message.includes('duplicate key')) {
        setError(insertError.message);
        setCreating(false);
        return;
      }
      // Prompt refetch via profile reload
      await updateProfile({});
    } catch (e: any) {
      setError(e.message);
    }
    setCreating(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // If user logged in but profile missing
  if (user && !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-6 w-6 text-pink-500" />
              Create Your WeddingPro Profile
            </CardTitle>
            <CardDescription>
              We couldn't find your profile on the server. Click below to create one and unlock your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              onClick={handleCreateProfile}
              disabled={creating}
            >
              {creating ? "Creating..." : "Create My Profile"}
            </Button>
            {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="mx-auto h-8 w-8 text-pink-500 mb-2" />
          <p className="text-xl">You must be logged in to view your dashboard.</p>
          <Link to="/auth">
            <Button className="mt-4">Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Normal dashboard below

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                WeddingPro
              </span>
            </Link>
            <ProfileMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Wedding Dashboard</h1>
            <p className="text-gray-600">Plan your perfect day with our comprehensive wedding tools.</p>
          </div>

          {/* Wedding Countdown */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Wedding Countdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600 mb-2">150</div>
                <p className="text-gray-600">Days until your special day!</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="mr-2 h-5 w-5 text-blue-500" />
                  Guest Management
                </CardTitle>
                <CardDescription>Manage your guest list and RSVPs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Guests:</span>
                    <span className="font-semibold">120</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Confirmed:</span>
                    <span className="font-semibold text-green-600">85</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Pending:</span>
                    <span className="font-semibold text-yellow-600">35</span>
                  </div>
                </div>
                <Link to="/seating">
                  <Button className="w-full">Manage Seating</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <DollarSign className="mr-2 h-5 w-5 text-green-500" />
                  Budget Tracker
                </CardTitle>
                <CardDescription>Track your wedding expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Budget:</span>
                    <span className="font-semibold">$25,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Spent:</span>
                    <span className="font-semibold text-red-600">$18,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Remaining:</span>
                    <span className="font-semibold text-green-600">$6,500</span>
                  </div>
                </div>
                <Link to="/budget">
                  <Button className="w-full">View Budget</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Gift className="mr-2 h-5 w-5 text-purple-500" />
                  Gift Registry
                </CardTitle>
                <CardDescription>Manage your wedding registry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Items:</span>
                    <span className="font-semibold">42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Purchased:</span>
                    <span className="font-semibold text-green-600">28</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Remaining:</span>
                    <span className="font-semibold">14</span>
                  </div>
                </div>
                <Link to="/registry">
                  <Button className="w-full">Manage Registry</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/vendors">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Find Vendors</h3>
                  <p className="text-sm text-gray-600">Browse wedding vendors</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/booking">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Bookings</h3>
                  <p className="text-sm text-gray-600">Manage appointments</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/tryon">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Virtual Try-On</h3>
                  <p className="text-sm text-gray-600">Try wedding attire</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/forum">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <CheckSquare className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Community</h3>
                  <p className="text-sm text-gray-600">Join discussions</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

