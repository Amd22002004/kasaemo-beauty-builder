import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { YCLIENTS_URL } from "@/data/services";

const Certificates = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6">
            <Gift className="w-10 h-10 text-primary" />
          </div>
          <h1 className="section-heading mb-4">Подарочные сертификаты</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Подарите близким заботу о красоте и здоровье! Сертификаты KASAEMO — идеальный подарок на любой праздник.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-primary/5 via-accent/50 to-secondary rounded-2xl p-8 md:p-12 mb-8"
        >
          <p className="text-4xl md:text-5xl font-heading font-black text-primary mb-2">
            1 000 – 10 000 ₽
          </p>
          <p className="text-muted-foreground mb-6">
            Выберите номинал или укажите сумму на любую услугу студии
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="text-base px-8">
              <a href={YCLIENTS_URL} target="_blank" rel="noopener noreferrer">
                Приобрести сертификат
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base">
              <a href="tel:+79136395271">Узнать подробности</a>
            </Button>
          </div>
        </motion.div>

        <p className="text-sm text-muted-foreground">
          Для приобретения сертификата свяжитесь с нами по телефону или оставьте заявку онлайн.
          Сертификат можно получить в бумажном или электронном виде.
        </p>
      </div>
    </section>
  );
};

export default Certificates;
