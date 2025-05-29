
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Camera, Upload, Share2, Download, Palette, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const VirtualTryOn = () => {
  const [selectedCategory, setSelectedCategory] = useState('dresses');
  const [selectedItem, setSelectedItem] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const categories = [
    { id: 'dresses', name: 'Wedding Dresses', icon: '👗' },
    { id: 'suits', name: 'Suits & Tuxedos', icon: '🤵' },
    { id: 'shoes', name: 'Shoes', icon: '👠' },
    { id: 'accessories', name: 'Accessories', icon: '💎' },
    { id: 'veils', name: 'Veils & Headpieces', icon: '👰' }
  ];

  const items = {
    dresses: [
      { id: 1, name: 'Classic A-Line Gown', brand: 'Elegant Bridal', price: 1200, style: 'Traditional', color: 'Ivory', image: '👗' },
      { id: 2, name: 'Mermaid Silhouette', brand: 'Glamour Collection', price: 1800, style: 'Modern', color: 'White', image: '👗' },
      { id: 3, name: 'Bohemian Lace Dress', brand: 'Boho Bride', price: 950, style: 'Bohemian', color: 'Champagne', image: '👗' },
      { id: 4, name: 'Ball Gown Princess', brand: 'Royal Designs', price: 2200, style: 'Princess', color: 'Pure White', image: '👗' }
    ],
    suits: [
      { id: 5, name: 'Classic Black Tuxedo', brand: 'Formal Wear Co.', price: 800, style: 'Classic', color: 'Black', image: '🤵' },
      { id: 6, name: 'Navy Blue Suit', brand: 'Modern Groom', price: 650, style: 'Contemporary', color: 'Navy', image: '🤵' },
      { id: 7, name: 'Charcoal Grey Tux', brand: 'Elegant Men', price: 720, style: 'Modern', color: 'Charcoal', image: '🤵' }
    ],
    shoes: [
      { id: 8, name: 'Satin Heels', brand: 'Bridal Steps', price: 180, style: 'Classic', color: 'Ivory', image: '👠' },
      { id: 9, name: 'Leather Oxfords', brand: 'Groom Shoes', price: 220, style: 'Traditional', color: 'Black', image: '👞' },
      { id: 10, name: 'Pearl Flats', brand: 'Comfort Bride', price: 150, style: 'Comfort', color: 'White', image: '🥿' }
    ],
    accessories: [
      { id: 11, name: 'Diamond Necklace', brand: 'Sparkling Jewels', price: 450, style: 'Elegant', color: 'Silver', image: '💎' },
      { id: 12, name: 'Pearl Earrings', brand: 'Classic Pearls', price: 180, style: 'Traditional', color: 'White', image: '📿' },
      { id: 13, name: 'Vintage Brooch', brand: 'Antique Beauty', price: 95, style: 'Vintage', color: 'Gold', image: '✨' }
    ],
    veils: [
      { id: 14, name: 'Cathedral Veil', brand: 'Veil Dreams', price: 320, style: 'Traditional', color: 'Ivory', image: '👰' },
      { id: 15, name: 'Fingertip Veil', brand: 'Modern Bride', price: 180, style: 'Contemporary', color: 'White', image: '👰' },
      { id: 16, name: 'Birdcage Veil', brand: 'Vintage Charm', price: 120, style: 'Vintage', color: 'Champagne', image: '👰' }
    ]
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentItems = items[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
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
          <Button className="bg-gradient-to-r from-purple-500 to-pink-600">Save Look</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Virtual Try-On Studio
          </h1>
          <p className="text-gray-600">Experience AR/3D virtual try-on for your perfect wedding look</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Virtual Mirror */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Virtual Mirror
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Live Camera
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {uploadedPhoto ? (
                    <div className="relative w-full h-full">
                      <img 
                        src={uploadedPhoto} 
                        alt="Uploaded" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {selectedItem && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                            <div className="text-6xl mb-2">{selectedItem.image}</div>
                            <div className="text-sm font-medium">{selectedItem.name}</div>
                            <div className="text-xs text-gray-600">{selectedItem.brand}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl mb-4">📸</div>
                      <h3 className="text-xl font-semibold mb-2">Start Your Virtual Try-On</h3>
                      <p className="text-gray-600 mb-4">Upload a photo or use live camera to begin</p>
                      <div className="flex gap-2 justify-center">
                        <Button onClick={() => fileInputRef.current?.click()}>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Photo
                        </Button>
                        <Button variant="outline">
                          <Camera className="h-4 w-4 mr-2" />
                          Use Camera
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* AR Controls */}
                <div className="mt-4 flex justify-center gap-2">
                  <Button variant="outline" size="sm">
                    <Palette className="h-4 w-4 mr-2" />
                    Adjust Colors
                  </Button>
                  <Button variant="outline" size="sm">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AR Effects
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Look
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Save Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Selection */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {categories.find(c => c.id === selectedCategory)?.name}
                </CardTitle>
                <CardDescription>
                  Select an item to try on virtually
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {currentItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedItem?.id === item.id ? 'bg-purple-50 border-purple-300' : 'bg-white border-gray-200'
                      }`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{item.image}</div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-gray-600">{item.brand}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{item.style}</Badge>
                            <Badge variant="outline" className="text-xs">{item.color}</Badge>
                          </div>
                          <div className="font-semibold text-green-600 text-sm mt-1">
                            ${item.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Item Details */}
            {selectedItem && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Item</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-4xl mb-2">{selectedItem.image}</div>
                      <div className="font-semibold">{selectedItem.name}</div>
                      <div className="text-sm text-gray-600">{selectedItem.brand}</div>
                      <div className="text-lg font-bold text-green-600 mt-2">
                        ${selectedItem.price.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Badge variant="outline">{selectedItem.style}</Badge>
                      <Badge variant="outline">{selectedItem.color}</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600">
                        Add to Favorites
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                      <Button variant="outline" className="w-full">
                        Find Similar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 3D View */}
            <Card>
              <CardHeader>
                <CardTitle>3D Product View</CardTitle>
                <CardDescription>
                  Rotate and examine the product in 3D
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-40 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔄</div>
                    <div className="text-sm text-gray-600">3D View</div>
                    <div className="text-xs text-gray-500">Select an item to view in 3D</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
