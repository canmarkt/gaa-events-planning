
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Calendar, Gift, DollarSign, Camera, MessageSquare, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Personalized Landing Page",
      description: "Create beautiful custom pages with photos, videos, and countdown timers",
      color: "bg-pink-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Virtual Seating Planner",
      description: "Drag-and-drop seating with real-time collaboration",
      color: "bg-blue-500"
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: "Smart Gift Registry",
      description: "Integrated registry with retailer connections and tracking",
      color: "bg-green-500"
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Budget Tracker",
      description: "Real-time expense tracking with visual charts and alerts",
      color: "bg-yellow-500"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Vendor Management",
      description: "Automated payments and vendor portal integration",
      color: "bg-purple-500"
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Virtual Try-On",
      description: "AR/3D virtual try-on for wedding attire and accessories",
      color: "bg-red-500"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Community Forum",
      description: "Connect with other couples and wedding experts",
      color: "bg-indigo-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Platform",
      description: "Multi-factor authentication with future blockchain integration",
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              WeddingPro
            </span>
            <Badge variant="secondary" className="ml-2">PROTOTYPE</Badge>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
            <Link to="/seating" className="text-gray-600 hover:text-gray-900 transition-colors">Seating</Link>
            <Link to="/registry" className="text-gray-600 hover:text-gray-900 transition-colors">Registry</Link>
            <Link to="/budget" className="text-gray-600 hover:text-gray-900 transition-colors">Budget</Link>
            <Link to="/vendors" className="text-gray-600 hover:text-gray-900 transition-colors">Vendors</Link>
            <Link to="/forum" className="text-gray-600 hover:text-gray-900 transition-colors">Forum</Link>
          </nav>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Dream Wedding
            <br />
            Planned Perfectly
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The next-generation wedding coordinator platform combining AI, AR, and real-time collaboration 
            to make your special day unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-8 py-4" asChild>
              <Link to="/dashboard">Start Planning</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
              <Link to="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Revolutionary Wedding Planning Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to plan, coordinate, and execute your perfect wedding day
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-white/40">
                <CardHeader className="text-center">
                  <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-pink-100">Couples Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-pink-100">Trusted Vendors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-pink-100">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-pink-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-pink-500" />
                <span className="text-xl font-bold">WeddingPro</span>
              </div>
              <p className="text-gray-400">
                The future of wedding planning is here. Plan your perfect day with cutting-edge technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/seating" className="hover:text-white transition-colors">Seating Planner</Link></li>
                <li><Link to="/registry" className="hover:text-white transition-colors">Gift Registry</Link></li>
                <li><Link to="/budget" className="hover:text-white transition-colors">Budget Tracker</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/forum" className="hover:text-white transition-colors">Forum</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WeddingPro. All rights reserved. Prototype version.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
