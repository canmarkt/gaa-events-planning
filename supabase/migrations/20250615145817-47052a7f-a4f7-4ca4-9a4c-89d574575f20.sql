
-- Enable Row Level Security on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Authenticated users can read their own profile"
  ON public.profiles
  FOR SELECT
  USING (id = auth.uid());

-- Policy: Users can update their own profile
CREATE POLICY "Authenticated users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (id = auth.uid());

-- Policy: Admins can access all profiles (read/update)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

CREATE POLICY "Admins can read any profile"
  ON public.profiles
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update any profile"
  ON public.profiles
  FOR UPDATE
  USING (public.is_admin());
