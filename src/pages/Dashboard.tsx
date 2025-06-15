
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";
import ProfileCreationPrompt from "@/components/dashboard/ProfileCreationPrompt";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WeddingCountdown from "@/components/dashboard/WeddingCountdown";
import QuickActionsGrid from "@/components/dashboard/QuickActionsGrid";
import AdditionalFeaturesGrid from "@/components/dashboard/AdditionalFeaturesGrid";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

// MAIN Dashboard page
const Dashboard = () => {
  const { user, profile, isLoading, updateProfile } = useAuth();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Minimal fallback: create profile for logged in user if missing
  const handleCreateProfile = async () => {
    if (!user) return;
    setCreating(true);
    setError(null);
    const newProfile: TablesInsert<"profiles"> = {
      id: user.id,
      email: user.email || "",
      first_name: "New",
      last_name: "User",
      role: "couple",
      is_approved: true,
    };
    try {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert(newProfile);
      if (insertError && !insertError.message.includes('duplicate key')) {
        setError(insertError.message);
        setCreating(false);
        return;
      }
      await updateProfile({});
    } catch (e: any) {
      setError(e.message);
    }
    setCreating(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (user && !profile) {
    return (
      <ProfileCreationPrompt
        creating={creating}
        error={error}
        onCreate={handleCreateProfile}
      />
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="mx-auto h-8 w-8 text-pink-500 mb-2" />
          <p className="text-xl">You must be logged in to view your dashboard.</p>
          <Link to="/auth">
            <Button className="mt-4">Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Normal dashboard below
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Wedding Dashboard</h1>
            <p className="text-gray-600">Plan your perfect day with our comprehensive wedding tools.</p>
          </div>
          <WeddingCountdown />
          <QuickActionsGrid />
          <AdditionalFeaturesGrid />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
