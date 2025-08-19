import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail, Search, Filter, Download } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal memuat pesan',
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, is_read: true } : msg
        )
      );

      toast({
        title: 'Berhasil',
        description: 'Pesan ditandai sudah dibaca',
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal menandai pesan sebagai dibaca',
      });
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = 
      filterRead === 'all' ||
      (filterRead === 'read' && message.is_read) ||
      (filterRead === 'unread' && !message.is_read);

    return matchesSearch && matchesFilter;
  });

  const exportToCSV = () => {
    const csvContent = [
      ['Nama', 'Email', 'Pesan', 'Status', 'Tanggal'],
      ...filteredMessages.map(msg => [
        msg.name,
        msg.email,
        msg.message.replace(/"/g, '""'), // Escape quotes
        msg.is_read ? 'Dibaca' : 'Belum dibaca',
        new Date(msg.created_at).toLocaleString('id-ID')
      ])
    ]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `pesan-kontak-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pesan Masuk</h1>
          <p className="text-muted-foreground">
            Kelola pesan dari form kontak
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama, email, atau pesan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'unread', 'read'].map((filter) => (
                <Button
                  key={filter}
                  variant={filterRead === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterRead(filter as any)}
                >
                  {filter === 'all' && 'Semua'}
                  {filter === 'unread' && 'Belum dibaca'}
                  {filter === 'read' && 'Sudah dibaca'}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Daftar Pesan ({filteredMessages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Pesan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium">{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">{message.message}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={message.is_read ? 'secondary' : 'default'}>
                      {message.is_read ? 'Dibaca' : 'Baru'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(message.created_at).toLocaleDateString('id-ID')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedMessage(message)}
                      >
                        Detail
                      </Button>
                      {!message.is_read && (
                        <Button
                          size="sm"
                          onClick={() => markAsRead(message.id)}
                        >
                          Tandai Dibaca
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Message Detail Dialog */}
      <Dialog 
        open={!!selectedMessage} 
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Pesan</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Nama</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedMessage.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedMessage.email}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Pesan</label>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap mt-2">
                  {selectedMessage.message}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    const subject = `Re: Pesan dari ${selectedMessage.name}`;
                    const body = `Halo ${selectedMessage.name},\n\nTerima kasih atas pesan Anda:\n"${selectedMessage.message}"\n\nSalam,\nTim Belajar Ngaji`;
                    window.open(`mailto:${selectedMessage.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Balas via Email
                </Button>
                {!selectedMessage.is_read && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      markAsRead(selectedMessage.id);
                      setSelectedMessage(null);
                    }}
                  >
                    Tandai Dibaca
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMessages;