
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    // Check if this is a password reset flow
    const type = searchParams.get('type');
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (type === 'recovery' && accessToken && refreshToken) {
      setIsPasswordReset(true);
      toast({
        title: "Password Reset",
        description: "You can now set your new password",
      });
    }
  }, [searchParams, toast]);

  if (isPasswordReset) {
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
          <NewPasswordForm />
        </div>
      </div>
    );
  }

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
        {isLogin ? <LoginForm /> : <RegisterForm />}
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-600 hover:text-pink-700"
          >
            {isLogin ? "Create account" : "Sign in"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
