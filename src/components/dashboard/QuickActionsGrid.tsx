
import React from "react";
import { Users, DollarSign, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function QuickActionsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Users className="mr-2 h-5 w-5 text-blue-500" />
            Guest Management
          </CardTitle>
          <CardDescription>Manage your guest list and RSVPs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Guests:</span>
              <span className="font-semibold">120</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Confirmed:</span>
              <span className="font-semibold text-green-600">85</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Pending:</span>
              <span className="font-semibold text-yellow-600">35</span>
            </div>
          </div>
          <Link to="/seating">
            <Button className="w-full">Manage Seating</Button>
          </Link>
        </CardContent>
      </Card>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <DollarSign className="mr-2 h-5 w-5 text-green-500" />
            Budget Tracker
          </CardTitle>
          <CardDescription>Track your wedding expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Budget:</span>
              <span className="font-semibold">$25,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Spent:</span>
              <span className="font-semibold text-red-600">$18,500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Remaining:</span>
              <span className="font-semibold text-green-600">$6,500</span>
            </div>
          </div>
          <Link to="/budget">
            <Button className="w-full">View Budget</Button>
          </Link>
        </CardContent>
      </Card>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Gift className="mr-2 h-5 w-5 text-purple-500" />
            Gift Registry
          </CardTitle>
          <CardDescription>Manage your wedding registry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Items:</span>
              <span className="font-semibold">42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Purchased:</span>
              <span className="font-semibold text-green-600">28</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Remaining:</span>
              <span className="font-semibold">14</span>
            </div>
          </div>
          <Link to="/registry">
            <Button className="w-full">Manage Registry</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
