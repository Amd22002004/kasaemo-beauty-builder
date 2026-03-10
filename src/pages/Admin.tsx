import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AdminServices from "@/components/admin/AdminServices";
import AdminSpecialists from "@/components/admin/AdminSpecialists";
import AdminReviews from "@/components/admin/AdminReviews";
import AdminFeedback from "@/components/admin/AdminFeedback";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading font-bold text-2xl">Панель управления</h1>
          <Button variant="outline" size="sm" onClick={() => { signOut(); navigate("/"); }}>
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="services">
          <TabsList className="mb-6">
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="specialists">Специалисты</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            <TabsTrigger value="feedback">Обращения</TabsTrigger>
          </TabsList>

          <TabsContent value="services"><AdminServices /></TabsContent>
          <TabsContent value="specialists"><AdminSpecialists /></TabsContent>
          <TabsContent value="reviews"><AdminReviews /></TabsContent>
          <TabsContent value="feedback"><AdminFeedback /></TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Admin;
