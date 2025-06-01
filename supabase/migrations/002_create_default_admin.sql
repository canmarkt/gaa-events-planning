
-- Create a default admin user directly in the auth.users table
-- This bypasses the normal registration flow
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@weddingpro.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Insert the corresponding profile for the admin user
INSERT INTO public.profiles (
  id,
  email,
  first_name,
  last_name,
  role,
  is_approved,
  created_at,
  updated_at
) 
SELECT 
  u.id,
  u.email,
  'Default',
  'Admin',
  'admin'::app_role,
  true,
  now(),
  now()
FROM auth.users u 
WHERE u.email = 'admin@weddingpro.com'
ON CONFLICT (id) DO NOTHING;
