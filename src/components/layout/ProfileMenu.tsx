
import React from 'react';
import { LogOut, User, Settings, HelpCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    return user?.email || 'User';
  };

  const getRoleLabel = () => {
    switch (profile?.role) {
      case 'admin':
        return 'Administrator';
      case 'vendor':
        return 'Vendor';
      case 'couple':
        return 'Couple';
      default:
        return 'User';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-medium">
            {getDisplayName().charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium">{getDisplayName()}</div>
            <div className="text-xs text-gray-500">{getRoleLabel()}</div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Account Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help Center</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
