
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, CheckCircle, XCircle, ArrowLeft, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'vendor' | 'couple';
  is_approved: boolean;
  company_name?: string;
  services?: string[];
  created_at: string;
}

const AdminDashboard = () => {
  const { profile, logout } = useAuth();
  const { toast } = useToast();
  const [pendingVendors, setPendingVendors] = useState<Profile[]>([]);
  const [allUsers, setAllUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch pending vendors
      const { data: pending, error: pendingError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, role, is_approved, company_name, services, created_at')
        .eq('role', 'vendor')
        .eq('is_approved', false)
        .order('created_at', { ascending: false });

      if (pendingError) throw pendingError;

      // Fetch all users
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, role, is_approved, company_name, services, created_at')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      // Filter out invalid roles and ensure type safety
      const validPending = (pending || [])
        .filter(user => user.role === 'admin' || user.role === 'vendor' || user.role === 'couple')
        .map(user => ({
          ...user,
          role: user.role as 'admin' | 'vendor' | 'couple',
          company_name: user.company_name || undefined,
          services: user.services || undefined
        } as Profile));
      
      const validUsers = (users || [])
        .filter(user => user.role === 'admin' || user.role === 'vendor' || user.role === 'couple')
        .map(user => ({
          ...user,
          role: user.role as 'admin' | 'vendor' | 'couple',
          company_name: user.company_name || undefined,
          services: user.services || undefined
        } as Profile));

      setPendingVendors(validPending);
      setAllUsers(validUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (userId: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_approved: approved })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Vendor ${approved ? 'approved' : 'rejected'} successfully`,
      });

      // Refresh data
      fetchData();
    } catch (error) {
      console.error('Error updating approval:', error);
      toast({
        title: "Error",
        description: "Failed to update vendor status",
        variant: "destructive"
      });
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'vendor': return 'default';
      case 'couple': return 'secondary';
      default: return 'outline';
    }
  };

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
            <Link to="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                WeddingPro Admin
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {profile?.first_name}</span>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage users and vendor approvals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Vendors</p>
                  <p className="text-2xl font-bold">{pendingVendors.length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{allUsers.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved Vendors</p>
                  <p className="text-2xl font-bold">
                    {allUsers.filter(u => u.role === 'vendor' && u.is_approved).length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Couples</p>
                  <p className="text-2xl font-bold">
                    {allUsers.filter(u => u.role === 'couple').length}
                  </p>
                </div>
                <Heart className="h-8 w-8 text-pink-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'pending' ? 'default' : 'outline'}
            onClick={() => setActiveTab('pending')}
          >
            Pending Approvals ({pendingVendors.length})
          </Button>
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
          >
            All Users ({allUsers.length})
          </Button>
        </div>

        {/* Content */}
        {loading ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p>Loading...</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'pending' ? 'Pending Vendor Approvals' : 'All Users'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'pending' 
                  ? 'Review and approve vendor applications'
                  : 'Manage all user accounts'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(activeTab === 'pending' ? pendingVendors : allUsers).map((user) => (
                  <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">
                            {user.first_name} {user.last_name}
                          </h3>
                          <Badge variant={getRoleBadgeVariant(user.role)}>
                            {user.role}
                          </Badge>
                          {user.role === 'vendor' && (
                            <Badge variant={user.is_approved ? 'default' : 'secondary'}>
                              {user.is_approved ? 'Approved' : 'Pending'}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                        {user.company_name && (
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Company:</strong> {user.company_name}
                          </p>
                        )}
                        {user.services && user.services.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {user.services.map((service, index) => (
                              <span
                                key={index}
                                className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          Joined: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      
                      {user.role === 'vendor' && !user.is_approved && (
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            onClick={() => handleApproval(user.id, true)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleApproval(user.id, false)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {(activeTab === 'pending' ? pendingVendors : allUsers).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    {activeTab === 'pending' 
                      ? 'No pending vendor approvals'
                      : 'No users found'
                    }
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
