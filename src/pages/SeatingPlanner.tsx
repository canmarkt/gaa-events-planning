
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Users, Plus, Download, Share2, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const SeatingPlanner = () => {
  const [tables, setTables] = useState([
    { id: 1, x: 100, y: 100, seats: 8, guests: ['John Smith', 'Jane Doe', 'Bob Wilson'] },
    { id: 2, x: 300, y: 100, seats: 6, guests: ['Alice Johnson', 'Mike Brown'] },
    { id: 3, x: 200, y: 250, seats: 10, guests: ['Sarah Connor', 'Tom Hardy', 'Emma Stone', 'Ryan Gosling'] },
  ]);
  
  const [draggedTable, setDraggedTable] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedTable, setSelectedTable] = useState(null);
  const [newGuestName, setNewGuestName] = useState('');

  const guestList = [
    'Michael Johnson', 'Emily Davis', 'David Miller', 'Lisa Anderson', 'Robert Taylor',
    'Jennifer Martinez', 'Christopher Wilson', 'Amanda Thompson', 'Matthew Garcia',
    'Ashley Rodriguez', 'Joshua Lewis', 'Stephanie Lee', 'Andrew Walker', 'Michelle Hall'
  ];

  const handleMouseDown = useCallback((e, tableId) => {
    const table = tables.find(t => t.id === tableId);
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggedTable(tableId);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, [tables]);

  const handleMouseMove = useCallback((e) => {
    if (draggedTable) {
      const container = e.currentTarget.getBoundingClientRect();
      const newX = e.clientX - container.left - dragOffset.x;
      const newY = e.clientY - container.top - dragOffset.y;
      
      setTables(prev => prev.map(table => 
        table.id === draggedTable 
          ? { ...table, x: Math.max(0, Math.min(newX, 800)), y: Math.max(0, Math.min(newY, 600)) }
          : table
      ));
    }
  }, [draggedTable, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setDraggedTable(null);
  }, []);

  const addTable = () => {
    const newTable = {
      id: Date.now(),
      x: 50,
      y: 50,
      seats: 8,
      guests: []
    };
    setTables([...tables, newTable]);
  };

  const addGuestToTable = (tableId, guestName) => {
    setTables(prev => prev.map(table => 
      table.id === tableId 
        ? { ...table, guests: [...table.guests, guestName] }
        : table
    ));
  };

  const removeGuestFromTable = (tableId, guestIndex) => {
    setTables(prev => prev.map(table => 
      table.id === tableId 
        ? { ...table, guests: table.guests.filter((_, index) => index !== guestIndex) }
        : table
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
            <Link to="/registry" className="text-gray-600 hover:text-gray-900 transition-colors">Registry</Link>
            <Link to="/budget" className="text-gray-600 hover:text-gray-900 transition-colors">Budget</Link>
          </nav>
          <Button variant="outline">Save Changes</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Virtual Seating Planner
          </h1>
          <p className="text-gray-600">Drag and drop tables to create the perfect seating arrangement</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Seating Chart Canvas */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold">Reception Layout</h2>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {tables.reduce((sum, table) => sum + table.guests.length, 0)} guests seated
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              
              <div 
                className="relative bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-dashed border-amber-200 rounded-lg"
                style={{ height: '600px', width: '800px' }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Stage/Altar */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-pink-200 rounded-lg px-6 py-3 text-sm font-medium text-pink-800">
                  🎭 Stage / Altar
                </div>

                {tables.map((table) => (
                  <div
                    key={table.id}
                    className={`absolute cursor-move transition-shadow duration-200 ${
                      selectedTable === table.id ? 'ring-2 ring-blue-500' : ''
                    } hover:shadow-lg`}
                    style={{ left: table.x, top: table.y }}
                    onMouseDown={(e) => handleMouseDown(e, table.id)}
                    onClick={() => setSelectedTable(table.id)}
                  >
                    <div className="bg-white rounded-full border-2 border-gray-300 shadow-md flex items-center justify-center"
                         style={{ width: '80px', height: '80px' }}>
                      <div className="text-center">
                        <div className="text-xs font-bold text-gray-700">Table {table.id}</div>
                        <div className="text-xs text-gray-500">{table.guests.length}/{table.seats}</div>
                      </div>
                    </div>
                    
                    {/* Guest dots around table */}
                    {Array.from({ length: table.seats }).map((_, index) => {
                      const angle = (index * 360) / table.seats;
                      const radian = (angle * Math.PI) / 180;
                      const x = 50 + 45 * Math.cos(radian);
                      const y = 50 + 45 * Math.sin(radian);
                      const hasGuest = index < table.guests.length;
                      
                      return (
                        <div
                          key={index}
                          className={`absolute w-3 h-3 rounded-full border ${
                            hasGuest ? 'bg-blue-500 border-blue-600' : 'bg-gray-200 border-gray-300'
                          }`}
                          style={{ 
                            left: x - 6, 
                            top: y - 6,
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Add Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Table
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={addTable} className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                  Add New Table
                </Button>
              </CardContent>
            </Card>

            {/* Guest List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Unassigned Guests
                </CardTitle>
                <CardDescription>
                  Drag guests to tables or click a table to assign
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {guestList.map((guest, index) => (
                    <div 
                      key={index}
                      className="bg-gray-50 rounded-lg p-2 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                      draggable
                    >
                      {guest}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Input
                    placeholder="Add new guest"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                  />
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Table Details */}
            {selectedTable && (
              <Card>
                <CardHeader>
                  <CardTitle>Table {selectedTable} Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const table = tables.find(t => t.id === selectedTable);
                    return (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Capacity</label>
                          <Input 
                            type="number" 
                            value={table?.seats || 8} 
                            onChange={(e) => {
                              const newSeats = parseInt(e.target.value);
                              setTables(prev => prev.map(t => 
                                t.id === selectedTable ? { ...t, seats: newSeats } : t
                              ));
                            }}
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Seated Guests</label>
                          <div className="mt-2 space-y-1">
                            {table?.guests.map((guest, index) => (
                              <div key={index} className="flex justify-between items-center bg-gray-50 rounded px-2 py-1">
                                <span className="text-sm">{guest}</span>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => removeGuestFromTable(selectedTable, index)}
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="w-full">Add Guest</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Guest to Table {selectedTable}</DialogTitle>
                              <DialogDescription>
                                Select a guest to add to this table
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2">
                              {guestList.map((guest, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  className="w-full justify-start"
                                  onClick={() => addGuestToTable(selectedTable, guest)}
                                >
                                  {guest}
                                </Button>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            {/* Collaboration */}
            <Card>
              <CardHeader>
                <CardTitle>Live Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Sarah (Bride) - Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Michael (Groom) - Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">Mom - Offline</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Invite Collaborators
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatingPlanner;
