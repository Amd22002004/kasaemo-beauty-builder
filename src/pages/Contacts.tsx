import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Clock, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Contacts = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    // Placeholder — будет подключено к Supabase позже
    setTimeout(() => {
      setSending(false);
      toast({ title: "Сообщение отправлено", description: "Мы свяжемся с вами в ближайшее время!" });
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h1 className="section-heading text-center mb-12">Контакты</h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading font-bold text-xl mb-6">Свяжитесь с нами</h2>
            <div className="flex flex-col gap-4 mb-8">
              <a href="tel:+79136395271" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">+7 913 639-52-71</p>
                  <p className="text-sm text-muted-foreground">Звоните в любое время</p>
                </div>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Ежедневно 09:00–22:00</p>
                  <p className="text-sm text-muted-foreground">Без выходных</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Наши адреса</p>
                  <p className="text-sm text-muted-foreground">ул. Мельникайте, 125Б</p>
                  <p className="text-sm text-muted-foreground">ул. Советская, 95</p>
                </div>
              </div>
            </div>

            <a
              href="https://vk.com/kasaemo_massage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              Мы ВКонтакте →
            </a>

            {/* Map placeholder */}
            <div className="mt-8 rounded-xl overflow-hidden border h-64 bg-muted flex items-center justify-center">
              <iframe
                title="Карта KASAEMO"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=68.47%2C57.14%2C68.55%2C57.17&layer=mapnik&marker=57.153%2C68.505"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-heading font-bold text-xl mb-6">Обратная связь</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input id="name" name="name" required placeholder="Ваше имя" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" name="phone" type="tel" required placeholder="+7 (___) ___-__-__" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="message">Сообщение</Label>
                <Textarea id="message" name="message" placeholder="Ваш вопрос или пожелание" rows={4} className="mt-1" />
              </div>
              <Button type="submit" size="lg" disabled={sending} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                {sending ? "Отправка..." : "Отправить"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
