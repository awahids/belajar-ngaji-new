import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Play, Upload } from 'lucide-react';

interface HijaiyahLetter {
  id: string;
  letter: string;
  name_id: string;
  name_en?: string;
  order_index: number;
  audio_url?: string;
  created_at: string;
  updated_at: string;
}

const HijaiyahAdmin = () => {
  const [letters, setLetters] = useState<HijaiyahLetter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLetter, setEditingLetter] = useState<HijaiyahLetter | null>(null);
  const [formData, setFormData] = useState({
    letter: '',
    name_id: '',
    name_en: '',
    order_index: 0,
    audio_url: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    try {
      const { data, error } = await supabase
        .from('hijaiyah_letters')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setLetters(data || []);
    } catch (error) {
      console.error('Error fetching letters:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal memuat data huruf hijaiyah',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingLetter) {
        const { error } = await supabase
          .from('hijaiyah_letters')
          .update({
            letter: formData.letter,
            name_id: formData.name_id,
            name_en: formData.name_en || null,
            order_index: formData.order_index,
            audio_url: formData.audio_url || null,
          })
          .eq('id', editingLetter.id);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Huruf hijaiyah berhasil diperbarui',
        });
      } else {
        const { error } = await supabase
          .from('hijaiyah_letters')
          .insert({
            letter: formData.letter,
            name_id: formData.name_id,
            name_en: formData.name_en || null,
            order_index: formData.order_index,
            audio_url: formData.audio_url || null,
          });

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Huruf hijaiyah berhasil ditambahkan',
        });
      }

      await fetchLetters();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving letter:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal menyimpan huruf hijaiyah',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (letter: HijaiyahLetter) => {
    setEditingLetter(letter);
    setFormData({
      letter: letter.letter,
      name_id: letter.name_id,
      name_en: letter.name_en || '',
      order_index: letter.order_index,
      audio_url: letter.audio_url || '',
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingLetter(null);
    setFormData({
      letter: '',
      name_id: '',
      name_en: '',
      order_index: letters.length + 1,
      audio_url: '',
    });
  };

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal memutar audio',
      });
    });
  };

  if (loading && letters.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Huruf Hijaiyah</h1>
          <p className="text-muted-foreground">
            Kelola huruf-huruf hijaiyah dan audio pelafalan
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setFormData({ ...formData, order_index: letters.length + 1 })}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Huruf
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingLetter ? 'Edit Huruf Hijaiyah' : 'Tambah Huruf Hijaiyah'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="letter">Huruf Arab</Label>
                  <Input
                    id="letter"
                    value={formData.letter}
                    onChange={(e) => setFormData({ ...formData, letter: e.target.value })}
                    placeholder="ا"
                    required
                    className="text-right text-2xl"
                    dir="rtl"
                  />
                </div>
                <div>
                  <Label htmlFor="order_index">Urutan</Label>
                  <Input
                    id="order_index"
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="name_id">Nama (Indonesia)</Label>
                <Input
                  id="name_id"
                  value={formData.name_id}
                  onChange={(e) => setFormData({ ...formData, name_id: e.target.value })}
                  placeholder="Alif"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="name_en">Nama (English)</Label>
                <Input
                  id="name_en"
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  placeholder="Alif"
                />
              </div>
              
              <div>
                <Label htmlFor="audio_url">URL Audio</Label>
                <Input
                  id="audio_url"
                  value={formData.audio_url}
                  onChange={(e) => setFormData({ ...formData, audio_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Batal
                </Button>
                <Button type="submit" disabled={loading}>
                  {editingLetter ? 'Perbarui' : 'Tambah'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Huruf Hijaiyah ({letters.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Urutan</TableHead>
                <TableHead>Huruf</TableHead>
                <TableHead>Nama (ID)</TableHead>
                <TableHead>Nama (EN)</TableHead>
                <TableHead>Audio</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {letters.map((letter) => (
                <TableRow key={letter.id}>
                  <TableCell>{letter.order_index}</TableCell>
                  <TableCell className="text-2xl font-bold" dir="rtl">
                    {letter.letter}
                  </TableCell>
                  <TableCell>{letter.name_id}</TableCell>
                  <TableCell>{letter.name_en || '-'}</TableCell>
                  <TableCell>
                    {letter.audio_url ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => playAudio(letter.audio_url!)}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(letter)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HijaiyahAdmin;