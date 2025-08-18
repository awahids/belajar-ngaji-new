import { supabase } from '@/integrations/supabase/client';

export async function getMetrics() {
  try {
    const { data, error } = await supabase
      .from('metrics')
      .select('key, value');
    
    if (error) throw error;
    
    const metrics = data.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      sessionsCount: metrics.sessions || 0,
      learnersCount: metrics.learners || 0
    };
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return {
      sessionsCount: 50000,
      learnersCount: 12000
    };
  }
}

export async function getModules() {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('is_active', true)
      .order('order_index');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching modules:', error);
    return [];
  }
}

export async function getValuePillars() {
  try {
    const { data, error } = await supabase
      .from('value_pillars')
      .select('*')
      .order('order_index');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching value pillars:', error);
    return [];
  }
}

export async function getFeatures() {
  try {
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .eq('is_active', true)
      .order('order_index');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching features:', error);
    return [];
  }
}

export async function getArticles() {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(6);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([formData]);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

export async function subscribeNewsletter(email: string) {
  try {
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }]);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
}