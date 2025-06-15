
import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileMenu from "@/components/layout/ProfileMenu";

export default function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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
  );
}
