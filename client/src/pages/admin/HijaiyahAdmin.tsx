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

import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Play, Upload } from 'lucide-react';

interface HijaiyahLetter {
  id: string;
  letter: string;
  nameId: string;
  nameEn?: string;
  orderIndex: number;
  audioUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const HijaiyahAdmin = () => {
  const [letters, setLetters] = useState<HijaiyahLetter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLetter, setEditingLetter] = useState<HijaiyahLetter | null>(null);
  const [formData, setFormData] = useState({
    letter: '',
    nameId: '',
    nameEn: '',
    orderIndex: 0,
    audioUrl: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    try {
      const response = await fetch('/api/hijaiyah-letters');
      if (!response.ok) throw new Error('Failed to fetch letters');
      
      const data = await response.json();
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
        const response = await fetch(`/api/hijaiyah-letters/${editingLetter.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            letter: formData.letter,
            nameId: formData.nameId,
            nameEn: formData.nameEn || undefined,
            orderIndex: formData.orderIndex,
            audioUrl: formData.audioUrl || undefined,
          }),
        });

        if (!response.ok) throw new Error('Failed to update letter');

        toast({
          title: 'Berhasil',
          description: 'Huruf hijaiyah berhasil diperbarui',
        });
      } else {
        const response = await fetch('/api/hijaiyah-letters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            letter: formData.letter,
            nameId: formData.nameId,
            nameEn: formData.nameEn || undefined,
            orderIndex: formData.orderIndex,
            audioUrl: formData.audioUrl || undefined,
          }),
        });

        if (!response.ok) throw new Error('Failed to create letter');

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
      nameId: letter.nameId,
      nameEn: letter.nameEn || '',
      orderIndex: letter.orderIndex,
      audioUrl: letter.audioUrl || '',
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingLetter(null);
    setFormData({
      letter: '',
      nameId: '',
      nameEn: '',
      orderIndex: letters.length + 1,
      audioUrl: '',
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
            <Button onClick={() => setFormData({ ...formData, orderIndex: letters.length + 1 })}>
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
                  <Label htmlFor="orderIndex">Urutan</Label>
                  <Input
                    id="orderIndex"
                    type="number"
                    value={formData.orderIndex}
                    onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="nameId">Nama (Indonesia)</Label>
                <Input
                  id="nameId"
                  value={formData.nameId}
                  onChange={(e) => setFormData({ ...formData, nameId: e.target.value })}
                  placeholder="Alif"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="nameEn">Nama (English)</Label>
                <Input
                  id="nameEn"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  placeholder="Alif"
                />
              </div>
              
              <div>
                <Label htmlFor="audioUrl">URL Audio</Label>
                <Input
                  id="audioUrl"
                  value={formData.audioUrl}
                  onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
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
                  <TableCell>{letter.orderIndex}</TableCell>
                  <TableCell className="text-2xl font-bold" dir="rtl">
                    {letter.letter}
                  </TableCell>
                  <TableCell>{letter.nameId}</TableCell>
                  <TableCell>{letter.nameEn || '-'}</TableCell>
                  <TableCell>
                    {letter.audioUrl ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => playAudio(letter.audioUrl!)}
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