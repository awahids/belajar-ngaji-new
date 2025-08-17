-- Fix profiles table security vulnerability
-- Remove overly broad policies and create more restrictive ones

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins can update their cafe staff profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view their cafe staff profiles" ON public.profiles;
DROP POLICY IF EXISTS "Superadmins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Superadmins can update any profile" ON public.profiles;
DROP POLICY IF EXISTS "Superadmins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create new secure policies

-- 1. Users can only view and update their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 2. Superadmins can view and manage all profiles (system administration)
CREATE POLICY "Superadmins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (is_superadmin());

CREATE POLICY "Superadmins can update all profiles" 
ON public.profiles 
FOR UPDATE 
USING (is_superadmin());

CREATE POLICY "Superadmins can insert profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (is_superadmin());

CREATE POLICY "Superadmins can delete profiles" 
ON public.profiles 
FOR DELETE 
USING (is_superadmin());

-- 3. Cafe admins can only view/update STAFF profiles (ADMIN/CASHIER roles) in their own cafe
-- NOT customer profiles or profiles without roles
CREATE POLICY "Cafe admins can view staff profiles" 
ON public.profiles 
FOR SELECT 
USING (
  get_current_user_role() = 'ADMIN'::text 
  AND get_current_user_cafe_id() = cafe_id 
  AND role IN ('ADMIN'::role, 'CASHIER'::role)
);

CREATE POLICY "Cafe admins can update staff profiles" 
ON public.profiles 
FOR UPDATE 
USING (
  get_current_user_role() = 'ADMIN'::text 
  AND get_current_user_cafe_id() = cafe_id 
  AND role IN ('ADMIN'::role, 'CASHIER'::role)
)
WITH CHECK (
  get_current_user_role() = 'ADMIN'::text 
  AND get_current_user_cafe_id() = cafe_id 
  AND role IN ('ADMIN'::role, 'CASHIER'::role)
);