
-- Manually create a profile for your test user (update data as needed)
INSERT INTO public.profiles (
  id,
  email,
  first_name,
  last_name,
  role,
  is_approved
) VALUES (
  '93ca540e-7ed8-43f7-b494-121275d4a48d',
  'canadamarketplacedevops@gmail.com',
  'Admin',
  'User',
  'admin'::app_role,
  true
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  role = EXCLUDED.role,
  is_approved = EXCLUDED.is_approved;
