
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Users, Gift, DollarSign, Camera, Upload, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [weddingDate, setWeddingDate] = useState("2024-08-15");
  const [coupleNames, setCoupleNames] = useState("Sarah & Michael");
  const [countdownDays, setCountdownDays] = useState(142);

  const quickActions = [
    { title: "Seating Chart", icon: <Users className="h-5 w-5" />, link: "/seating", color: "bg-blue-500" },
    { title: "Gift Registry", icon: <Gift className="h-5 w-5" />, link: "/registry", color: "bg-green-500" },
    { title: "Budget Tracker", icon: <DollarSign className="h-5 w-5" />, link: "/budget", color: "bg-yellow-500" },
    { title: "Virtual Try-On", icon: <Camera className="h-5 w-5" />, link: "/tryon", color: "bg-purple-500" },
  ];

  const recentActivity = [
    { action: "Guest RSVP received", time: "2 hours ago", type: "rsvp" },
    { action: "Vendor payment scheduled", time: "1 day ago", type: "payment" },
    { action: "Seating chart updated", time: "2 days ago", type: "seating" },
    { action: "New gift added to registry", time: "3 days ago", type: "gift" },
  ];

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
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
            <Link to="/seating" className="text-gray-600 hover:text-gray-900 transition-colors">Seating</Link>
            <Link to="/registry" className="text-gray-600 hover:text-gray-900 transition-colors">Registry</Link>
            <Link to="/budget" className="text-gray-600 hover:text-gray-900 transition-colors">Budget</Link>
            <Link to="/vendors" className="text-gray-600 hover:text-gray-900 transition-colors">Vendors</Link>
          </nav>
          <Button variant="outline">Profile</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back, {coupleNames}!
          </h1>
          <p className="text-gray-600">Your wedding planning dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Countdown Card */}
            <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  Wedding Countdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">{countdownDays}</div>
                  <div className="text-pink-100">Days to go!</div>
                  <div className="mt-4">
                    <Input
                      type="date"
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder-pink-100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customizable Landing Page */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5" />
                  Your Wedding Page
                </CardTitle>
                <CardDescription>
                  Customize your personal wedding page for guests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Couple Names</label>
                  <Input
                    value={coupleNames}
                    onChange={(e) => setCoupleNames(e.target.value)}
                    placeholder="Enter couple names"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Photos
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Add Videos
                  </Button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Preview</h3>
                  <div className="text-sm text-gray-600">
                    Your guests will see a beautiful page with your photos, wedding details, 
                    RSVP form, and countdown timer.
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600">
                  Customize Page
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Jump to your most-used features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-20 flex flex-col items-center gap-2 hover:bg-gray-50"
                      asChild
                    >
                      <Link to={action.link}>
                        <div className={`${action.color} p-2 rounded-full text-white`}>
                          {action.icon}
                        </div>
                        <span className="text-sm">{action.title}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Planning Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span>68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full" style={{width: '68%'}}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Venue</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Catering</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Photography</span>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-800">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weather Widget */}
            <Card>
              <CardHeader>
                <CardTitle>Wedding Day Weather</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl mb-2">☀️</div>
                  <div className="font-medium">Sunny, 75°F</div>
                  <div className="text-sm text-gray-500">Perfect weather for your big day!</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
