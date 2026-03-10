import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Check, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Feedback = Tables<"feedback">;

const AdminFeedback = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: feedback = [], isLoading } = useQuery({
    queryKey: ["admin-feedback"],
    queryFn: async () => {
      const { data, error } = await supabase.from("feedback").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Feedback[];
    },
  });

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("feedback").update({ is_read: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-feedback"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("feedback").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-feedback"] });
      toast({ title: "Удалено" });
    },
  });

  return (
    <div>
      <h2 className="font-heading font-bold text-lg mb-4">
        Обращения ({feedback.length})
        {feedback.filter(f => !f.is_read).length > 0 && (
          <Badge variant="destructive" className="ml-2">{feedback.filter(f => !f.is_read).length} новых</Badge>
        )}
      </h2>

      {isLoading ? (
        <p className="text-muted-foreground">Загрузка...</p>
      ) : feedback.length === 0 ? (
        <p className="text-muted-foreground">Обращений пока нет</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Имя</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Сообщение</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead className="w-24">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedback.map((f) => (
              <TableRow key={f.id} className={!f.is_read ? "bg-primary/5" : ""}>
                <TableCell className="font-medium">{f.name}</TableCell>
                <TableCell><a href={`tel:${f.phone}`} className="text-primary hover:underline">{f.phone}</a></TableCell>
                <TableCell className="max-w-xs truncate">{f.message || "—"}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{new Date(f.created_at).toLocaleString("ru")}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {!f.is_read && (
                      <Button variant="ghost" size="icon" onClick={() => markReadMutation.mutate(f.id)} title="Отметить прочитанным">
                        <Check className="w-4 h-4 text-green-600" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(f.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
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

export default AdminFeedback;
