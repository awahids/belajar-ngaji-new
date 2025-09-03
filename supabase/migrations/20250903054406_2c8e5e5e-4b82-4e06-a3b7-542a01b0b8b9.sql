-- Fix security vulnerability: Add RLS policies for contact_messages table
-- Only allow authorized admin staff to read/manage contact messages

-- Policy to allow admins and superadmins to view contact messages
CREATE POLICY "Admins can view contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND (
    is_superadmin() OR 
    get_current_user_role() = 'ADMIN'
  )
);

-- Policy to allow admins and superadmins to update contact messages (mark as read)
CREATE POLICY "Admins can update contact messages" 
ON public.contact_messages 
FOR UPDATE 
USING (
  auth.uid() IS NOT NULL AND (
    is_superadmin() OR 
    get_current_user_role() = 'ADMIN'
  )
);

-- Policy to allow superadmins to delete contact messages if needed
CREATE POLICY "Superadmins can delete contact messages" 
ON public.contact_messages 
FOR DELETE 
USING (is_superadmin());