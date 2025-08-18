
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/integrations/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') { // Unique violation
        return res.status(400).json({ message: 'Email already subscribed' });
      }
      console.error('Subscribe error:', error);
      return res.status(500).json({ message: 'Failed to subscribe' });
    }

    res.status(200).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscribe API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
