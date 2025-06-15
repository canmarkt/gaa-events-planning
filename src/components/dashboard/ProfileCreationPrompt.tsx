
import React from 'react';
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileCreationPromptProps {
  error: string | null;
  creating: boolean;
  onCreate: () => void;
}

export default function ProfileCreationPrompt({ error, creating, onCreate }: ProfileCreationPromptProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="mr-2 h-6 w-6 text-pink-500" />
            Create Your WeddingPro Profile
          </CardTitle>
          <CardDescription>
            We couldn't find your profile on the server. Click below to create one and unlock your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            onClick={onCreate}
            disabled={creating}
          >
            {creating ? "Creating..." : "Create My Profile"}
          </Button>
          {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
