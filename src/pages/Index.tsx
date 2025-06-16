
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Heart, Users, Calendar, Gift, DollarSign, Camera } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { hasAdmin, isLoading } = useAdminCheck();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if we're in an auth flow (password reset, etc.)
    const type = searchParams.get('type');
    const accessToken = searchParams.get('access_token');
    
    if (type === 'recovery' && accessToken) {
      // This is a password reset flow, redirect to auth page
      navigate('/auth');
      return;
    }

    // If no admin exists, redirect ONLY for users who are not authenticated
    if (!isLoading && hasAdmin === false && !user) {
      navigate('/admin-setup');
    }
    // If an admin exists, do not redirect anyone, regardless of login status
    // If the logged-in user is an admin, they can access the homepage as well
  }, [hasAdmin, isLoading, navigate, user, searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-8 w-8 text-pink-500 mx-auto mb-4 animate-pulse" />
          <p>Loading WeddingPro...</p>
        </div>
      </div>
    );
  }

  // If no admin exists, this will redirect (above); otherwise, homepage is visible to all.
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              WeddingPro
            </span>
          </div>
          <div className="space-x-4">
            <Link to="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Plan Your Perfect Wedding
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          From vendor bookings to guest management, WeddingPro helps you organize every detail of your special day with ease and elegance.
        </p>
        <div className="space-x-4">
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600">
              Start Planning
            </Button>
          </Link>
          <Link to="/vendors">
            <Button size="lg" variant="outline">
              Browse Vendors
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Everything You Need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <Users className="h-12 w-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Vendor Management</h3>
            <p className="text-gray-600">Find, book, and manage all your wedding vendors in one place.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <Calendar className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Timeline Planning</h3>
            <p className="text-gray-600">Create and track your wedding timeline and important milestones.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Budget Tracking</h3>
            <p className="text-gray-600">Stay on top of your wedding expenses with detailed budget management.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <Gift className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Gift Registry</h3>
            <p className="text-gray-600">Create and manage your wedding gift registry with ease.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <Users className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Guest Management</h3>
            <p className="text-gray-600">Track RSVPs, dietary requirements, and seating arrangements.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <Camera className="h-12 w-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Virtual Try-On</h3>
            <p className="text-gray-600">Visualize your wedding look with our virtual try-on feature.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Planning?</h2>
          <p className="text-xl mb-6">Join thousands of couples who have planned their perfect day with WeddingPro.</p>
          <Link to="/auth">
            <Button size="lg" variant="secondary">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-white/20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-pink-500" />
            <span className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              WeddingPro
            </span>
          </div>
          <p>&copy; 2024 WeddingPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
