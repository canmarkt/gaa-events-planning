
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, DollarSign, Calendar, CheckCircle, Clock, AlertTriangle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const VendorManagement = () => {
  const vendors = [
    {
      id: 1,
      name: "Grand Ballroom",
      category: "Venue",
      contact: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah@grandballroom.com",
      contractSigned: true,
      totalAmount: 8000,
      paidAmount: 3000,
      nextPayment: { amount: 2500, dueDate: "2024-06-15" },
      status: "confirmed",
      rating: 4.8,
      notes: "Beautiful venue with excellent service"
    },
    {
      id: 2,
      name: "Gourmet Catering Co.",
      category: "Catering",
      contact: "Mike Chen",
      phone: "(555) 234-5678",
      email: "mike@gourmetcatering.com",
      contractSigned: true,
      totalAmount: 6000,
      paidAmount: 2000,
      nextPayment: { amount: 2000, dueDate: "2024-07-01" },
      status: "confirmed",
      rating: 4.6,
      notes: "Amazing food quality, great for dietary restrictions"
    },
    {
      id: 3,
      name: "Smith Photography",
      category: "Photography",
      contact: "David Smith",
      phone: "(555) 345-6789",
      email: "david@smithphoto.com",
      contractSigned: true,
      totalAmount: 3000,
      paidAmount: 3000,
      nextPayment: null,
      status: "paid",
      rating: 5.0,
      notes: "Fantastic portfolio, very professional"
    },
    {
      id: 4,
      name: "Bloom & Blossom",
      category: "Flowers",
      contact: "Lisa Martinez",
      phone: "(555) 456-7890",
      email: "lisa@bloomblossom.com",
      contractSigned: false,
      totalAmount: 1500,
      paidAmount: 500,
      nextPayment: { amount: 1000, dueDate: "2024-08-01" },
      status: "pending",
      rating: 4.4,
      notes: "Waiting for final floral arrangement confirmation"
    },
    {
      id: 5,
      name: "DJ Beats",
      category: "Music",
      contact: "Alex Rodriguez",
      phone: "(555) 567-8901",
      email: "alex@djbeats.com",
      contractSigned: true,
      totalAmount: 1200,
      paidAmount: 600,
      nextPayment: { amount: 600, dueDate: "2024-08-10" },
      status: "confirmed",
      rating: 4.3,
      notes: "Great music selection, very responsive"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const totalBudget = vendors.reduce((sum, vendor) => sum + vendor.totalAmount, 0);
  const totalPaid = vendors.reduce((sum, vendor) => sum + vendor.paidAmount, 0);
  const totalRemaining = totalBudget - totalPaid;

  const upcomingPayments = vendors
    .filter(vendor => vendor.nextPayment)
    .sort((a, b) => new Date(a.nextPayment.dueDate) - new Date(b.nextPayment.dueDate));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              WeddingPro
            </span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
            <Link to="/seating" className="text-gray-600 hover:text-gray-900 transition-colors">Seating</Link>
            <Link to="/registry" className="text-gray-600 hover:text-gray-900 transition-colors">Registry</Link>
          </nav>
          <Button className="bg-gradient-to-r from-purple-500 to-indigo-600">Add Vendor</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Vendor Management
          </h1>
          <p className="text-gray-600">Manage contracts, payments, and communications with your vendors</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{vendors.length}</div>
              <div className="text-sm text-gray-600">Total Vendors</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Contract Value</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">${totalPaid.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Paid</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">${totalRemaining.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Remaining Payments</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="vendors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vendors">All Vendors</TabsTrigger>
            <TabsTrigger value="payments">Payment Schedule</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
          </TabsList>

          <TabsContent value="vendors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {vendors.map((vendor) => (
                <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{vendor.name}</CardTitle>
                        <CardDescription>{vendor.category}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(vendor.status)}>
                        {getStatusIcon(vendor.status)}
                        <span className="ml-1 capitalize">{vendor.status}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Contact Info */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-medium text-sm mb-2">{vendor.contact}</div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{vendor.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{vendor.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Payment Progress</span>
                        <span>${vendor.paidAmount.toLocaleString()} / ${vendor.totalAmount.toLocaleString()}</span>
                      </div>
                      <Progress value={(vendor.paidAmount / vendor.totalAmount) * 100} className="h-2" />
                    </div>

                    {/* Next Payment */}
                    {vendor.nextPayment && (
                      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-sm text-yellow-800">Next Payment</div>
                            <div className="text-xs text-yellow-600">Due: {vendor.nextPayment.dueDate}</div>
                          </div>
                          <div className="text-lg font-bold text-yellow-800">
                            ${vendor.nextPayment.amount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contract Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Contract Signed:</span>
                      <Badge variant={vendor.contractSigned ? "default" : "destructive"}>
                        {vendor.contractSigned ? "Yes" : "Pending"}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rating:</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{vendor.rating}</span>
                        <span className="text-yellow-500">⭐</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {vendor.notes && (
                      <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {vendor.notes}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Contact
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600">
                        Pay Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
                <CardDescription>Stay on top of your payment schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingPayments.map((vendor) => (
                    <div key={vendor.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{vendor.name}</div>
                        <div className="text-sm text-gray-600">{vendor.category}</div>
                        <div className="text-xs text-gray-500">Due: {vendor.nextPayment.dueDate}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">${vendor.nextPayment.amount.toLocaleString()}</div>
                        <Button size="sm" className="mt-2 bg-gradient-to-r from-purple-500 to-indigo-600">
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vendors.map((vendor) => (
                <Card key={vendor.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{vendor.name}</CardTitle>
                        <CardDescription>{vendor.category}</CardDescription>
                      </div>
                      <Badge variant={vendor.contractSigned ? "default" : "destructive"}>
                        {vendor.contractSigned ? "Signed" : "Pending"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Contract Value:</span>
                        <span className="font-medium">${vendor.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Contact:</span>
                        <span className="font-medium">{vendor.contact}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          View Contract
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorManagement;
