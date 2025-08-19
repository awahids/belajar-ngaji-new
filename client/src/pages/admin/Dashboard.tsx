import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import {
  BookOpen,
  Heart,
  FileText,
  MessageSquare,
  HelpCircle,
  Users,
} from 'lucide-react';

interface DashboardStats {
  hijaiyahCount: number;
  dhikrCount: number;
  articlesCount: number;
  messagesCount: number;
  quizCount: number;
  featuresCount: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    hijaiyahCount: 0,
    dhikrCount: 0,
    articlesCount: 0,
    messagesCount: 0,
    quizCount: 0,
    featuresCount: 0,
  });
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Get counts for each content type
      const [
        { count: hijaiyahCount },
        { count: articlesCount },
        { count: messagesCount },
        { count: featuresCount },
      ] = await Promise.all([
        supabase.from('hijaiyah_letters').select('*', { count: 'exact', head: true }),
        supabase.from('articles').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
        supabase.from('features').select('*', { count: 'exact', head: true }),
      ]);

      // Get recent contact messages
      const { data: messages } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        hijaiyahCount: hijaiyahCount || 0,
        dhikrCount: 0, // Will add when dhikr table is created
        articlesCount: articlesCount || 0,
        messagesCount: messagesCount || 0,
        quizCount: 0, // Will add when quiz tables are created
        featuresCount: featuresCount || 0,
      });

      setRecentMessages(messages || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const statCards = [
    {
      title: 'Huruf Hijaiyah',
      count: stats.hijaiyahCount,
      icon: BookOpen,
      color: 'text-blue-600',
    },
    {
      title: 'Artikel',
      count: stats.articlesCount,
      icon: FileText,
      color: 'text-green-600',
    },
    {
      title: 'Pesan Masuk',
      count: stats.messagesCount,
      icon: MessageSquare,
      color: 'text-orange-600',
    },
    {
      title: 'Fitur',
      count: stats.featuresCount,
      icon: Users,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Selamat datang di panel admin Belajar Ngaji
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Pesan Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          {recentMessages.length === 0 ? (
            <p className="text-muted-foreground">Belum ada pesan masuk</p>
          ) : (
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-start justify-between border-b pb-3 last:border-b-0"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{message.name}</p>
                      <Badge variant={message.is_read ? 'secondary' : 'default'}>
                        {message.is_read ? 'Dibaca' : 'Baru'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {message.email}
                    </p>
                    <p className="text-sm line-clamp-2">{message.message}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(message.created_at).toLocaleDateString('id-ID')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;