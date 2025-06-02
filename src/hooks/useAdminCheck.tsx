
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export const useAdminCheck = () => {
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkForAdmin();
  }, []);

  const checkForAdmin = async () => {
    try {
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
