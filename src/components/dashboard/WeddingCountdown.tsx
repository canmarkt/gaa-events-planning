
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function WeddingCountdown() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Wedding Countdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-4xl font-bold text-pink-600 mb-2">150</div>
          <p className="text-gray-600">Days until your special day!</p>
        </div>
      </CardContent>
    </Card>
  );
}
