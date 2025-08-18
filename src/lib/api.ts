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
      sessionsCount: metrics.sessions || 50000,
      learnersCount: metrics.learners || 12000,
      lettersCount: metrics.letters || 28,
      dhikrEntries: metrics.dhikr_entries || 8,
      quizQuestions: metrics.quiz_questions || 40
    };
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return {
      sessionsCount: 50000,
      learnersCount: 12000,
      lettersCount: 28,
      dhikrEntries: 8,
      quizQuestions: 40
    };
  }
}

export async function getHijaiyahLetters() {
  try {
    const { data, error } = await supabase
      .from('hijaiyah_letters')
      .select('*')
      .order('order_index');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching hijaiyah letters:', error);
    return [];
  }
}

export async function getDhikr(type?: 'morning' | 'evening') {
  try {
    let query = supabase
      .from('dhikr')
      .select('*')
      .order('order_index');
    
    if (type) {
      query = query.eq('type', type);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching dhikr:', error);
    return [];
  }
}

export async function getQuizCategories() {
  try {
    const { data, error } = await supabase
      .from('quiz_categories')
      .select('*')
      .eq('is_active', true)
      .order('order_index');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching quiz categories:', error);
    return [];
  }
}

export async function getQuizQuestions(categoryId: string) {
  try {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select(`
        *,
        quiz_options (*)
      `)
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .order('order_index');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return [];
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