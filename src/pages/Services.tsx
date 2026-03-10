import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { services as fallbackServices, categoryLabels, YCLIENTS_URL, type ServiceCategory } from "@/data/services";

const categories: (ServiceCategory | "all")[] = ["all", "face", "body", "courses", "certificates"];
const allLabel = "Все";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

const Services = () => {
  const [filter, setFilter] = useState<ServiceCategory | "all">("all");

  const { data: dbServices } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const services = dbServices && dbServices.length > 0
    ? dbServices.map(s => ({ id: s.id, name: s.name, price: s.price, category: s.category as ServiceCategory, description: s.description || "" }))
    : fallbackServices;

  const filtered = filter === "all" ? services : services.filter((s) => s.category === filter);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h1 className="section-heading text-center mb-4">Услуги и цены</h1>
        <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
          Полный список услуг студии KASAEMO. Выберите категорию для фильтрации.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(cat)}
            >
              {cat === "all" ? allLabel : categoryLabels[cat]}
            </Button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((service, i) => (
            <motion.div
              key={service.id}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={i}
            >
              <Card className="h-full hover:shadow-lg transition-shadow group">
                <CardContent className="p-6 flex flex-col h-full">
                  <span className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
                    {categoryLabels[service.category]}
                  </span>
                  <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-primary text-lg">{service.price}</span>
                    <Button size="sm" asChild>
                      <a href={YCLIENTS_URL} target="_blank" rel="noopener noreferrer">
                        Записаться
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
