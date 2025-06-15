
import React from 'react';
import { Heart, Calendar, DollarSign, Users, MessageCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import ProfileMenu from "@/components/layout/ProfileMenu";

const VendorDashboard = () => {
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
              <span className="text-sm text-gray-500 ml-2">Vendor Portal</span>
            </Link>
            
            {/* Profile Menu */}
            <ProfileMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Dashboard</h1>
            <p className="text-gray-600">Manage your bookings, clients, and business profile.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,500</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 new this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">3 unread</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your scheduled events and bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Sarah & John Wedding</h4>
                      <p className="text-sm text-gray-600">June 15, 2024 • Photography</p>
                    </div>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Emma & Mike Reception</h4>
                      <p className="text-sm text-gray-600">June 22, 2024 • Catering</p>
                    </div>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Lisa & David Ceremony</h4>
                      <p className="text-sm text-gray-600">July 5, 2024 • Flowers</p>
                    </div>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/booking">
                    <Button className="w-full">View All Bookings</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Communication with your clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      S
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">Sarah Johnson</h4>
                      <p className="text-sm text-gray-600">Can we schedule a consultation for next week?</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      E
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">Emma Wilson</h4>
                      <p className="text-sm text-gray-600">Thank you for the beautiful flowers!</p>
                      <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View All Messages</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold">Calendar</h3>
                <p className="text-sm text-gray-600">Manage your schedule</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold">Payments</h3>
                <p className="text-sm text-gray-600">Track earnings</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Settings className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                <h3 className="font-semibold">Profile</h3>
                <p className="text-sm text-gray-600">Update your info</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
