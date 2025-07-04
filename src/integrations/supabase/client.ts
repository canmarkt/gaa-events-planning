
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ooymxtntllwtdqolrhwm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9veW14dG50bGx3dGRxb2xyaHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1Mjg5OTMsImV4cCI6MjA2NDEwNDk5M30.Qg6VadhNnaOI6Qs7dGKcw_1ugrglUSt1hasumWyr1AQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'wedding-pro-app'
    }
  }
});
