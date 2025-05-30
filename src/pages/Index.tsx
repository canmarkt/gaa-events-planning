
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, Users, DollarSign, Camera, Gift, MapPin, Star, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { isAuthenticated, user, profile } = useAuth();

  const features = [
    {
      icon: Calendar,
      title: "Smart Planning",
      description: "AI-powered timeline and task management for your perfect day"
    },
    {
      icon: Users,
      title: "Guest Management",
      description: "RSVP tracking, seating arrangements, and communication tools"
    },
    {
      icon: DollarSign,
      title: "Budget Tracker",
      description: "Real-time expense tracking with smart recommendations"
    },
    {
      icon: Camera,
      title: "Vendor Marketplace",
      description: "Connect with top-rated photographers, caterers, and more"
    },
    {
      icon: Gift,
      title: "Gift Registry",
      description: "Integrated registry with multiple retailers and cash options"
    },
    {
      icon: MapPin,
      title: "Virtual Tools",
      description: "3D venue tours, AR try-ons, and interactive planning"
    }
  ];

  const testimonials = [
    {
      name: "Sarah & Michael",
      text: "WeddingPro made our planning so much easier! The vendor marketplace helped us find amazing photographers.",
      rating: 5
    },
    {
      name: "Emma & David",
      text: "The budget tracker kept us on track, and the seating planner was a lifesaver!",
      rating: 5
    },
    {
      name: "Lisa & Robert",
      text: "We loved the virtual try-on feature. It saved us so much time!",
      rating: 5
    }
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
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Reviews</a>
            <Link to="/vendors" className="text-gray-600 hover:text-gray-900 transition-colors">Vendors</Link>
            <Link to="/forum" className="text-gray-600 hover:text-gray-900 transition-colors">Community</Link>
          </nav>
          <div className="flex space-x-2">
            {isAuthenticated ? (
              <Link to={profile?.role === 'vendor' ? '/vendor-dashboard' : '/dashboard'}>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600 flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          We Make Things Happen
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Unlock the secrets to a stress-free wedding.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isAuthenticated && (
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 text-lg px-8 py-4">
                Start Planning Today
              </Button>
            </Link>
          )}
          <Link to="/vendors">
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              Browse Vendors
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          All-In-One Tools for Your Wedding
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          We combine all the tools and services you need.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-pink-500 mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-white/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Loved by Couples Everywhere
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-pink-600">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Ready to Start Planning?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands who planned their perfect day.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 text-lg px-8 py-4">
              Create Your Free Account
            </Button>
          </Link>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-8 w-8 text-pink-500" />
                <span className="text-2xl font-bold">WeddingPro</span>
              </div>
              <p className="text-gray-400">
                We Make Things Happen 
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/budget" className="hover:text-white transition-colors">Budget Tracker</Link></li>
                <li><Link to="/vendors" className="hover:text-white transition-colors">Vendor Marketplace</Link></li>
                <li><Link to="/seating" className="hover:text-white transition-colors">Seating Planner</Link></li>
                <li><Link to="/registry" className="hover:text-white transition-colors">Gift Registry</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/forum" className="hover:text-white transition-colors">Forum</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@weddingpro.com</li>
                <li>1-800-WEDDING</li>
                <li>Follow us on social media</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 GAA Events. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
