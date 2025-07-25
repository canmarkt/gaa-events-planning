import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'couple' | 'vendor' | 'admin';
  is_approved: boolean;
  company_name?: string;
  services?: string[];
  wedding_date?: string;
  partner_name?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'couple' | 'vendor' | 'admin';
  companyName?: string;
  services?: string[];
  weddingDate?: string;
  partnerName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const ensureProfileExists = async (user: User) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();

    if (error) {
      console.error('[Auth] Failed to check for profile:', error);
      toast({ title: "Error", description: "Failed to load profile (" + error.message + ")", variant: "destructive" });
      return;
    }
    if (!data) {
      // Insert a barebones profile for this user using their metadata if possible.
      let role: 'couple' | 'vendor' | 'admin' = 'couple';
      if (user.user_metadata && user.user_metadata.role && ['admin', 'vendor', 'couple'].includes(user.user_metadata.role)) {
        role = user.user_metadata.role;
      }
      const newProfile = {
        id: user.id,
        email: user.email || "",
        first_name: user.user_metadata?.first_name || "",
        last_name: user.user_metadata?.last_name || "",
        role: role,
        is_approved: role === 'vendor' ? false : true,
      };
      const { error: createError } = await supabase.from('profiles').insert(newProfile);
      if (createError && !createError.message.includes('duplicate key')) {
        toast({ title: "Create Profile Error", description: createError.message, variant: "destructive" });
        console.error('[Auth] Profile auto-creation failed:', createError);
      }
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error, status } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      if (error && status !== 406) {
        // 406 Not Acceptable, usually means policy block or not found
        console.error('Profile fetch error:', error, 'Status:', status);
        setProfile(null);
        return;
      }

      if (!data) {
        console.warn('Profile not found for user:', userId);
        setProfile(null);
        return;
      }
      
      console.log('Profile data received:', data);
      if (data && (data.role === 'admin' || data.role === 'vendor' || data.role === 'couple')) {
        console.log('Setting profile with role:', data.role);
        setProfile(data as UserProfile);
      } else {
        console.error('Invalid role received from database:', data?.role);
        setProfile(null);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    }
  };

  useEffect(() => {
    let mounted = true;
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && event !== 'SIGNED_OUT') {
          // Ensure profile exists!
          await ensureProfileExists(session.user);
          setTimeout(() => {
            if (mounted) {
              fetchProfile(session.user.id);
            }
          }, 100);
        } else {
          console.log('No session or signed out, clearing profile');
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
        setIsLoading(false);
        return;
      }
      
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user && mounted) {
        ensureProfileExists(session.user).then(() => {
          fetchProfile(session.user.id);
        });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Attempting login for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }
      
      console.log('Login successful for user:', data.user?.id);
      
      // The auth state change listener will handle profile fetching
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      console.log('Starting registration for:', data.email, 'as role:', data.userType);
      
      const redirectUrl = `${window.location.origin}/auth`;
      
      // First, create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            role: data.userType,
          }
        }
      });

      if (authError) {
        console.error('Auth signup error:', authError);
        throw authError;
      }

      console.log('Auth user created:', authData.user?.id, 'with role:', data.userType);

      // If we have additional data, update the profile after the trigger creates it
      if (authData.user && (data.companyName || data.services || data.weddingDate || data.partnerName)) {
        console.log('Updating profile with additional data');
        
        // Wait a moment for the trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const updateData: any = {};
        if (data.companyName) updateData.company_name = data.companyName;
        if (data.services && data.services.length > 0) updateData.services = data.services;
        if (data.weddingDate) updateData.wedding_date = data.weddingDate;
        if (data.partnerName) updateData.partner_name = data.partnerName;

        const { error: updateError } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', authData.user.id);

        if (updateError) {
          console.error('Profile update error:', updateError);
          // Don't throw here, the user was created successfully
        } else {
          console.log('Profile updated successfully');
        }
      }

      // The auth state change listener will handle the rest
    } catch (error) {
      console.error('Registration failed:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/auth`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        console.error('Password reset error:', error);
        throw error;
      }
      
      console.log('Password reset email sent to:', email);
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Signing out user...');
      
      // Clear state first
      setUser(null);
      setProfile(null);
      setSession(null);
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        // Don't throw here as we've already cleared the state
      }
      
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      // Don't throw here, we want to ensure the user is logged out locally
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) throw error;
      
      // Refresh profile data
      await fetchProfile(user.id);
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    session,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
    isAuthenticated: !!user && !!session,
    updateProfile,
  };

  console.log('AuthProvider value:', { 
    user: !!user, 
    profile: profile?.role, 
    isAuthenticated: !!user && !!session,
    isLoading 
  });

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
