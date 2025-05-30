
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Clock, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const PendingApproval = () => {
  const { profile, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                WeddingPro
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {profile?.first_name}</span>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-100px)]">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Approval Pending
            </CardTitle>
            <CardDescription>
              Your vendor account is under review
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">What's Next?</h3>
              <p className="text-sm text-yellow-700">
                Our admin team is reviewing your vendor application. You'll receive an email notification once your account is approved.
              </p>
            </div>

            <div className="text-left space-y-2">
              <h4 className="font-medium">Your Application Details:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Company:</strong> {profile?.company_name}</p>
                <p><strong>Email:</strong> {profile?.email}</p>
                {profile?.services && profile.services.length > 0 && (
                  <div>
                    <strong>Services:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.services.map((service, index) => (
                        <span
                          key={index}
                          className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button className="w-full" variant="outline" asChild>
                <Link to="/">
                  Browse Marketplace
                </Link>
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Mail className="h-4 w-4" />
                <span>Check your email for updates</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PendingApproval;
