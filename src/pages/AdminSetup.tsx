
import React, { useState } from 'react';
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import AdminRegistration from "@/components/auth/AdminRegistration";
import LoginForm from "@/components/auth/LoginForm";

const AdminSetup = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-pink-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            WeddingPro
          </span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {showLogin ? "Admin Sign In" : "Admin Setup"}
          </h1>
          <p className="text-gray-600">
            {showLogin ? "Sign in with your admin account" : "Create your admin account to manage the platform"}
          </p>
        </div>
        
        {showLogin ? <LoginForm /> : <AdminRegistration />}
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {showLogin ? "Need to create an admin account?" : "Already have an admin account?"}
          </p>
          <button 
            onClick={() => setShowLogin(!showLogin)}
            className="text-pink-600 hover:text-pink-700 font-medium"
          >
            {showLogin ? "Create admin account" : "Sign in here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
