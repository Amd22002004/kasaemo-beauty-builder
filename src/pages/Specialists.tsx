import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { specialists, YCLIENTS_URL } from "@/data/services";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const Specialists = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h1 className="section-heading text-center mb-4">Наши специалисты</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Профессиональная команда сертифицированных мастеров с многолетним опытом
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialists.map((spec, i) => (
            <motion.div
              key={spec.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={fadeUp}
              custom={i}
            >
              <Card className="h-full hover:shadow-lg transition-shadow group overflow-hidden">
                {/* Photo placeholder */}
                <div className="aspect-square bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                  <User className="w-20 h-20 text-primary/30" />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                    {spec.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-2">{spec.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{spec.description}</p>
                  <Button size="sm" className="w-full" asChild>
                    <a href={YCLIENTS_URL} target="_blank" rel="noopener noreferrer">
                      Записаться к специалисту
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialists;
