
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, DollarSign, Users, MessageSquare, Settings, Bell, Camera, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const upcomingBookings = [
    {
      id: 1,
      coupleName: "Sarah & Michael Johnson",
      eventDate: "2024-08-15",
      service: "Photography",
      status: "confirmed",
      payment: "paid",
      amount: 2500
    },
    {
      id: 2,
      coupleName: "Emma & David Wilson",
      eventDate: "2024-09-22",
      service: "Photography + Videography",
      status: "pending",
      payment: "deposit",
      amount: 3500
    },
    {
      id: 3,
      coupleName: "Lisa & Robert Brown",
      eventDate: "2024-10-05",
      service: "Photography",
      status: "confirmed",
      payment: "pending",
      amount: 2200
    }
  ];

  const recentMessages = [
    {
      id: 1,
      from: "Sarah Johnson",
      message: "Can we schedule a pre-wedding photoshoot?",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      from: "Emma Wilson",
      message: "Thank you for the proposal! We'd like to proceed.",
      time: "1 day ago",
      unread: false
    }
  ];

  const stats = {
    totalBookings: 12,
    thisMonthRevenue: 8750,
    pendingPayments: 3,
    avgRating: 4.9
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              WeddingPro
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-600" />
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Welcome, {user?.firstName}</span>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Vendor Dashboard
          </h1>
          <p className="text-gray-600">Manage your bookings, payments, and client communications</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-pink-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month Revenue</p>
                  <p className="text-2xl font-bold">${stats.thisMonthRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                  <p className="text-2xl font-bold">{stats.pendingPayments}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold">{stats.avgRating}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{booking.coupleName}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(booking.eventDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">${booking.amount.toLocaleString()}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                              {booking.status}
                            </Badge>
                            <Badge variant={booking.payment === 'paid' ? 'default' : booking.payment === 'deposit' ? 'secondary' : 'destructive'}>
                              {booking.payment}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{booking.service}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600">
                          Contact Client
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Messages & Quick Actions */}
          <div className="space-y-6">
            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Recent Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="border-b pb-3 last:border-b-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{message.from}</span>
                        {message.unread && (
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{message.message}</p>
                      <p className="text-xs text-gray-400">{message.time}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Messages
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="h-4 w-4 mr-2" />
                  Update Portfolio
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Payment History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
