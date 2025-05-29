
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Users, DollarSign, Star, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const VendorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const vendors = [
    {
      id: 1,
      name: "Perfect Moments Photography",
      category: "photographer",
      rating: 4.9,
      reviews: 127,
      price: 2500,
      location: "Downtown",
      image: "/placeholder.svg",
      description: "Capturing your special moments with artistic flair",
      contact: { phone: "(555) 123-4567", email: "info@perfectmoments.com" }
    },
    {
      id: 2,
      name: "Elegant Eats Catering",
      category: "catering",
      rating: 4.8,
      reviews: 89,
      price: 75,
      location: "City Center",
      image: "/placeholder.svg",
      description: "Gourmet cuisine for your perfect wedding day",
      contact: { phone: "(555) 234-5678", email: "events@eleganteats.com" }
    },
    {
      id: 3,
      name: "Bella Flora Designs",
      category: "florist",
      rating: 4.7,
      reviews: 156,
      price: 800,
      location: "Garden District",
      image: "/placeholder.svg",
      description: "Beautiful floral arrangements for every occasion",
      contact: { phone: "(555) 345-6789", email: "flowers@bellaflora.com" }
    },
    {
      id: 4,
      name: "Sound Waves DJ",
      category: "entertainment",
      rating: 4.6,
      reviews: 94,
      price: 1200,
      location: "Uptown",
      image: "/placeholder.svg",
      description: "Professional DJ services to keep your party going",
      contact: { phone: "(555) 456-7890", email: "booking@soundwavesdj.com" }
    }
  ];

  const categories = [
    { id: "all", name: "All Vendors" },
    { id: "photographer", name: "Photography" },
    { id: "catering", name: "Catering" },
    { id: "florist", name: "Florists" },
    { id: "entertainment", name: "Entertainment" },
    { id: "venue", name: "Venues" }
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || vendor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalBudget = 15000;
  const spentAmount = vendors.reduce((sum, vendor) => sum + vendor.price, 0);
  const remainingBudget = totalBudget - spentAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
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
            <Link to="/budget" className="text-gray-600 hover:text-gray-900 transition-colors">Budget</Link>
          </nav>
          <Button variant="outline">Profile</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Vendor Marketplace
          </h1>
          <p className="text-gray-600">Find and book the perfect vendors for your special day</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Budget Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Spent</span>
                      <span>${spentAmount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full" 
                        style={{width: `${(spentAmount / totalBudget) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${remainingBudget.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search & Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Search & Filter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVendors.map((vendor) => (
                <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <img 
                      src={vendor.image} 
                      alt={vendor.name}
                      className="w-full h-48 object-cover rounded-t-lg mb-4"
                    />
                    <CardTitle className="flex items-center justify-between">
                      {vendor.name}
                      <Badge variant="secondary">{vendor.category}</Badge>
                    </CardTitle>
                    <CardDescription>{vendor.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{vendor.rating}</span>
                        <span className="text-gray-500">({vendor.reviews} reviews)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{vendor.location}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-green-600">
                        ${vendor.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {vendor.category === "catering" ? "per person" : "starting from"}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{vendor.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{vendor.contact.email}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600">
                        Book Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredVendors.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No vendors found matching your criteria</div>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorManagement;
