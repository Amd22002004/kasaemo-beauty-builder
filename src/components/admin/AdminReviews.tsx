import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Review = Tables<"reviews">;

const emptyReview = { author_name: "", content: "", rating: 5, is_published: false };

const AdminReviews = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Review | null>(null);
  const [form, setForm] = useState(emptyReview);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Review[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof form & { id?: string }) => {
      if (data.id) {
        const { error } = await supabase.from("reviews").update(data).eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("reviews").insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setOpen(false);
      setEditing(null);
      setForm(emptyReview);
      toast({ title: "Сохранено" });
    },
    onError: (e: Error) => toast({ title: "Ошибка", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast({ title: "Удалено" });
    },
  });

  const openEdit = (r: Review) => {
    setEditing(r);
    setForm({ author_name: r.author_name, content: r.content, rating: r.rating, is_published: r.is_published });
    setOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading font-bold text-lg">Отзывы ({reviews.length})</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => { setEditing(null); setForm(emptyReview); setOpen(true); }}><Plus className="w-4 h-4 mr-1" />Добавить</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Редактировать отзыв" : "Новый отзыв"}</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveMutation.mutate(editing ? { ...form, id: editing.id } : form);
              }}
              className="flex flex-col gap-3"
            >
              <div><Label>Автор</Label><Input value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} required /></div>
              <div><Label>Текст отзыва</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={4} /></div>
              <div><Label>Оценка (1-5)</Label><Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })} /></div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} />
                <Label>Опубликован</Label>
              </div>
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
              <TableHead>Автор</TableHead>
              <TableHead>Оценка</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="w-24">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.author_name}</TableCell>
                <TableCell>{"⭐".repeat(r.rating)}</TableCell>
                <TableCell>{r.is_published ? <span className="text-green-600">Опубликован</span> : <span className="text-muted-foreground">Скрыт</span>}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(r)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
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

export default AdminReviews;
