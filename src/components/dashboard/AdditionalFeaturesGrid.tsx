
import React from "react";
import { Users, Calendar, Heart, CheckSquare, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function AdditionalFeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Link to="/vendors">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-pink-500 mx-auto mb-2" />
            <h3 className="font-semibold">Find Vendors</h3>
            <p className="text-sm text-gray-600">Browse wedding vendors</p>
          </CardContent>
        </Card>
      </Link>
      <Link to="/booking">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold">Bookings</h3>
            <p className="text-sm text-gray-600">Manage appointments</p>
          </CardContent>
        </Card>
      </Link>
      <Link to="/tryon">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-semibold">Virtual Try-On</h3>
            <p className="text-sm text-gray-600">Try wedding attire</p>
          </CardContent>
        </Card>
      </Link>
      <Link to="/forum">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <CheckSquare className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold">Community</h3>
            <p className="text-sm text-gray-600">Join discussions</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
