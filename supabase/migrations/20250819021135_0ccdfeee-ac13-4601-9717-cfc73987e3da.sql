-- Create admin allowlist table
CREATE TABLE public.admin_allowlist (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.admin_allowlist ENABLE ROW LEVEL SECURITY;

-- Only super admins can manage allowlist
CREATE POLICY "Only super admins can manage allowlist" 
ON public.admin_allowlist 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'SUPERADMIN'::role
  )
);

-- Add super admin check function
CREATE OR REPLACE FUNCTION public.is_admin_user(email_to_check text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_allowlist 
    WHERE email = email_to_check
  ) OR EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.email = email_to_check AND role = 'SUPERADMIN'::role
  );
$$;

-- Insert default admin emails (replace with actual admin emails)
INSERT INTO public.admin_allowlist (email) VALUES 
('admin@belajarngaji.com'),
('superadmin@belajarngaji.com');