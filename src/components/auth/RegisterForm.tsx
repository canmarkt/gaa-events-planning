
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Eye, EyeOff, Building, Calendar, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    userType: "couple" as "couple" | "vendor" | "admin",
    companyName: "",
    services: [] as string[],
    weddingDate: "",
    partnerName: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [serviceInput, setServiceInput] = useState("");
  const { register, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match!",
        variant: "destructive"
      });
      return;
    }

    if (formData.userType === 'vendor' && !formData.companyName) {
      toast({
        title: "Error", 
        description: "Company name is required for vendors",
        variant: "destructive"
      });
      return;
    }

    try {
      await register(formData);
      toast({
        title: "Success",
        description: formData.userType === 'vendor' 
          ? "Account created! Your vendor account is pending approval." 
          : "Account created successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive"
      });
    }
  };

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addService = () => {
    if (serviceInput.trim() && !formData.services.includes(serviceInput.trim())) {
      updateFormData('services', [...formData.services, serviceInput.trim()]);
      setServiceInput("");
    }
  };

  const removeService = (service: string) => {
    updateFormData('services', formData.services.filter(s => s !== service));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Create Account
        </CardTitle>
        <CardDescription className="text-center">
          Join our wedding planning community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userType">I am a...</Label>
            <select
              id="userType"
              value={formData.userType}
              onChange={(e) => updateFormData('userType', e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="couple">Couple</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          {formData.userType === 'vendor' && (
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="companyName"
                  placeholder="Your company name"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          {formData.userType === 'vendor' && (
            <div className="space-y-2">
              <Label htmlFor="services">Services Offered</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Photography, Catering"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                />
                <Button type="button" onClick={addService} variant="outline">Add</Button>
              </div>
              {formData.services.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs cursor-pointer"
                      onClick={() => removeService(service)}
                    >
                      {service} ×
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {formData.userType === 'couple' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="partnerName">Partner's Name</Label>
                <div className="relative">
                  <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="partnerName"
                    placeholder="Your partner's name"
                    value={formData.partnerName}
                    onChange={(e) => updateFormData('partnerName', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weddingDate">Wedding Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="weddingDate"
                    type="date"
                    value={formData.weddingDate}
                    onChange={(e) => updateFormData('weddingDate', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
