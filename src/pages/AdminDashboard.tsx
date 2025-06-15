
import React from 'react';
import { Heart } from "lucide-react";
import ProfileMenu from "@/components/layout/ProfileMenu";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                WeddingPro
              </span>
              <span className="text-sm text-gray-500 ml-2">Admin Dashboard</span>
            </div>
            
            {/* Profile Menu */}
            <ProfileMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Admin Dashboard
              </h1>
              <p className="text-gray-600 mb-8">
                Manage users, vendors, events, and platform settings from here.
              </p>
              
              {/* Admin Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">User Management</h3>
                  <p className="text-gray-600">Manage user accounts and permissions</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Vendor Approvals</h3>
                  <p className="text-gray-600">Review and approve vendor applications</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Platform Analytics</h3>
                  <p className="text-gray-600">View platform usage and statistics</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Event Management</h3>
                  <p className="text-gray-600">Oversee wedding events and bookings</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Payment Oversight</h3>
                  <p className="text-gray-600">Monitor transactions and payments</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Reports</h3>
                  <p className="text-gray-600">Generate platform reports and insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
