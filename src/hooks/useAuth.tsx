
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'couple' | 'vendor' | 'admin';
  profile?: {
    company?: string;
    services?: string[];
    weddingDate?: string;
    partnerName?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, userType: 'couple' | 'vendor' | 'admin') => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'couple' | 'vendor' | 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('wedding_app_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, userType: 'couple' | 'vendor' | 'admin') => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: `${userType}_${Date.now()}`,
        email,
        firstName: userType === 'couple' ? 'Sarah' : userType === 'vendor' ? 'John' : 'Admin',
        lastName: userType === 'couple' ? 'Johnson' : userType === 'vendor' ? 'Smith' : 'User',
        userType,
        profile: userType === 'vendor' ? {
          company: 'Perfect Moments Photography',
          services: ['Photography', 'Videography']
        } : userType === 'couple' ? {
          weddingDate: '2024-08-15',
          partnerName: 'Michael Johnson'
        } : undefined
      };

      setUser(mockUser);
      localStorage.setItem('wedding_app_user', JSON.stringify(mockUser));
      console.log('Login successful:', mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: `${data.userType}_${Date.now()}`,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        userType: data.userType,
      };

      setUser(mockUser);
      localStorage.setItem('wedding_app_user', JSON.stringify(mockUser));
      console.log('Registration successful:', mockUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wedding_app_user');
    console.log('User logged out');
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
