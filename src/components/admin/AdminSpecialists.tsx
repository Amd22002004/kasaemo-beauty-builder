import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Upload } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Specialist = Tables<"specialists">;

const emptySpec = { name: "", role: "", description: "", photo_url: "", sort_order: 0, is_active: true };

const AdminSpecialists = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Specialist | null>(null);
  const [form, setForm] = useState(emptySpec);
  const [uploading, setUploading] = useState(false);

  const { data: specialists = [], isLoading } = useQuery({
    queryKey: ["admin-specialists"],
    queryFn: async () => {
      const { data, error } = await supabase.from("specialists").select("*").order("sort_order");
      if (error) throw error;
      return data as Specialist[];
    },
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("specialists").upload(path, file);
    if (error) {
      toast({ title: "Ошибка загрузки", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("specialists").getPublicUrl(path);
    setForm({ ...form, photo_url: urlData.publicUrl });
    setUploading(false);
  };

  const saveMutation = useMutation({
    mutationFn: async (data: typeof form & { id?: string }) => {
      if (data.id) {
        const { error } = await supabase.from("specialists").update(data).eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("specialists").insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-specialists"] });
      queryClient.invalidateQueries({ queryKey: ["specialists"] });
      setOpen(false);
      setEditing(null);
      setForm(emptySpec);
      toast({ title: "Сохранено" });
    },
    onError: (e: Error) => toast({ title: "Ошибка", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("specialists").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-specialists"] });
      queryClient.invalidateQueries({ queryKey: ["specialists"] });
      toast({ title: "Удалено" });
    },
  });

  const openEdit = (s: Specialist) => {
    setEditing(s);
    setForm({ name: s.name, role: s.role, description: s.description || "", photo_url: s.photo_url || "", sort_order: s.sort_order, is_active: s.is_active });
    setOpen(true);
  };

  const openNew = () => { setEditing(null); setForm(emptySpec); setOpen(true); };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading font-bold text-lg">Специалисты ({specialists.length})</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={openNew}><Plus className="w-4 h-4 mr-1" />Добавить</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Редактировать специалиста" : "Новый специалист"}</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveMutation.mutate(editing ? { ...form, id: editing.id } : form);
              }}
              className="flex flex-col gap-3"
            >
              <div><Label>ФИО</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div><Label>Должность / Направление</Label><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></div>
              <div><Label>Описание</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div>
                <Label>Фото</Label>
                {form.photo_url && <img src={form.photo_url} alt="Preview" className="w-20 h-20 object-cover rounded mb-2" />}
                <div className="flex items-center gap-2">
                  <Input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={uploading} />
                  {uploading && <span className="text-sm text-muted-foreground">Загрузка...</span>}
                </div>
              </div>
              <div><Label>Порядок сортировки</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} /></div>
              <Button type="submit" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Сохранение..." : "Сохранить"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Загрузка...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Фото</TableHead>
              <TableHead>ФИО</TableHead>
              <TableHead>Направление</TableHead>
              <TableHead className="w-24">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {specialists.map((s) => (
              <TableRow key={s.id}>
                <TableCell>
                  {s.photo_url ? <img src={s.photo_url} alt={s.name} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-muted" />}
                </TableCell>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.role}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(s.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminSpecialists;
