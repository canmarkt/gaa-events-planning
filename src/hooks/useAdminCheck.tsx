
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from 'react-router-dom';

export const useAdminCheck = () => {
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    checkForAdmin();
  }, []);

  const checkForAdmin = async () => {
    try {
      // Don't redirect if we're in an auth flow (password reset, etc.)
      const type = searchParams.get('type');
      const accessToken = searchParams.get('access_token');
      
      if (type === 'recovery' && accessToken) {
        // This is a password reset flow, don't check for admin
        setHasAdmin(true); // Pretend admin exists to avoid redirect
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin')
        .limit(1);

      if (error) throw error;
      
      setHasAdmin(data && data.length > 0);
    } catch (error) {
      console.error('Error checking for admin:', error);
      setHasAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { hasAdmin, isLoading, checkForAdmin };
};
