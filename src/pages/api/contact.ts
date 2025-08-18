
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/integrations/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const { error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, message }]);

    if (error) {
      console.error('Contact form error:', error);
      return res.status(500).json({ message: 'Failed to send message' });
    }

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
