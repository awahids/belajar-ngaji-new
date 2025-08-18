
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/integrations/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { data: metrics, error } = await supabase
      .from('metrics')
      .select('key, value');

    if (error) {
      console.error('Metrics API error:', error);
      return res.status(500).json({ message: 'Failed to fetch metrics' });
    }

    const metricsObject = metrics?.reduce((acc, metric) => {
      acc[metric.key] = metric.value;
      return acc;
    }, {} as Record<string, number>) || {};

    res.status(200).json({
      sessionsCount: metricsObject.sessions || 0,
      learnersCount: metricsObject.learners || 0,
    });
  } catch (error) {
    console.error('Metrics API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
