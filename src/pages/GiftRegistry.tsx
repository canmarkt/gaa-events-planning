
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Gift, Plus, Search, ShoppingCart, Check, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const GiftRegistry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const registryItems = [
    {
      id: 1,
      name: "KitchenAid Stand Mixer",
      price: 299.99,
      purchased: false,
      quantity: 1,
      purchasedQuantity: 0,
      category: "Kitchen",
      store: "Williams Sonoma",
      image: "🍰",
      priority: "High"
    },
    {
      id: 2,
      name: "Egyptian Cotton Sheet Set",
      price: 189.99,
      purchased: true,
      quantity: 1,
      purchasedQuantity: 1,
      category: "Bedroom",
      store: "Pottery Barn",
      image: "🛏️",
      priority: "Medium",
      purchasedBy: "Aunt Linda"
    },
    {
      id: 3,
      name: "Dyson Vacuum Cleaner",
      price: 449.99,
      purchased: false,
      quantity: 1,
      purchasedQuantity: 0,
      category: "Home",
      store: "Best Buy",
      image: "🧹",
      priority: "High"
    },
    {
      id: 4,
      name: "Wine Glasses Set (8)",
      price: 79.99,
      purchased: true,
      quantity: 1,
      purchasedQuantity: 1,
      category: "Dining",
      store: "Crate & Barrel",
      image: "🍷",
      priority: "Low",
      purchasedBy: "College Friends"
    },
    {
      id: 5,
      name: "Coffee Machine",
      price: 159.99,
      purchased: false,
      quantity: 1,
      purchasedQuantity: 0,
      category: "Kitchen",
      store: "Target",
      image: "☕",
      priority: "Medium"
    }
  ];

  const suggestedItems = [
    { name: "Blender", price: 89.99, store: "Amazon", image: "🥤" },
    { name: "Picture Frames Set", price: 34.99, store: "Target", image: "🖼️" },
    { name: "Throw Pillows", price: 49.99, store: "West Elm", image: "🛋️" },
    { name: "Candle Set", price: 24.99, store: "Bath & Body Works", image: "🕯️" }
  ];

  const stats = {
    totalItems: registryItems.length,
    purchasedItems: registryItems.filter(item => item.purchased).length,
    totalValue: registryItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    remainingValue: registryItems.filter(item => !item.purchased).reduce((sum, item) => sum + (item.price * item.quantity), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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
            <Link to="/budget" className="text-gray-600 hover:text-gray-900 transition-colors">Budget</Link>
          </nav>
          <Button className="bg-gradient-to-r from-green-500 to-blue-600">Share Registry</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Gift Registry
          </h1>
          <p className="text-gray-600">Manage your wedding gift registry and track purchases</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Gift className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalItems}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Check className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.purchasedItems}</div>
              <div className="text-sm text-gray-600">Purchased</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">${stats.totalValue.toFixed(0)}</div>
              <div className="text-sm text-gray-600">Total Value</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <ShoppingCart className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">${stats.remainingValue.toFixed(0)}</div>
              <div className="text-sm text-gray-600">Remaining</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="registry" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="registry">My Registry</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="thank-you">Thank You Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="registry" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search registry items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-gradient-to-r from-green-500 to-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            {/* Registry Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registryItems.map((item) => (
                <Card key={item.id} className={`relative ${item.purchased ? 'bg-green-50 border-green-200' : ''}`}>
                  {item.purchased && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 text-white">
                        <Check className="h-3 w-3 mr-1" />
                        Purchased
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-2">{item.image}</div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-green-600">
                      ${item.price}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Store:</span>
                      <span className="font-medium">{item.store}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Category:</span>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Priority:</span>
                      <Badge variant={item.priority === 'High' ? 'destructive' : item.priority === 'Medium' ? 'default' : 'secondary'}>
                        {item.priority}
                      </Badge>
                    </div>
                    
                    {item.purchased && item.purchasedBy && (
                      <div className="text-sm text-green-700 bg-green-100 p-2 rounded">
                        Gift from: {item.purchasedBy}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Suggested Items</h3>
              <p className="text-gray-600 mb-6">Popular items based on your preferences and similar couples</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedItems.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{item.image}</div>
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-green-600">
                      ${item.price}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="text-sm text-gray-600 mb-3">
                      Available at {item.store}
                    </div>
                    <Button size="sm" className="w-full bg-gradient-to-r from-green-500 to-blue-600">
                      Add to Registry
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="thank-you" className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Thank You Notes</h3>
              <p className="text-gray-600 mb-6">Track and send thank you notes for received gifts</p>
            </div>

            <div className="space-y-4">
              {registryItems.filter(item => item.purchased).map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">Gift from: {item.purchasedBy}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Send Thank You
                        </Button>
                        <Badge variant="secondary">Pending</Badge>
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

export default GiftRegistry;
