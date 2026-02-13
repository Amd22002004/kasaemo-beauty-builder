import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Clock, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { services, YCLIENTS_URL } from "@/data/services";
import teamPhoto from "@/assets/team-photo.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const popularServices = services.filter((s) => ["1", "3", "9", "13", "8"].includes(s.id));

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent to-secondary py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(334_100%_58%/0.15),transparent_70%)]" />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-black leading-tight mb-6"
          >
            Студия-школа массажа лица, тела и остеопластики{" "}
            <span className="text-primary">KASAEMO</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Мы искренне любим ваше лицо и тело — комплексный подход к красоте и здоровью
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button size="lg" asChild className="text-base px-8">
              <a href={YCLIENTS_URL} target="_blank" rel="noopener noreferrer">
                Записаться
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base">
              <Link to="/uslugi">Прайс</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild className="text-base">
              <Link to="/specialisty">Наши специалисты</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="section-heading mb-6">О нас</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                KASAEMO — это место, где забота о вашей красоте и здоровье становится искусством. Мы объединяем
                профессиональный массаж лица и тела, остеопластику и авторские методики в единый комплексный подход.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Наша команда — сертифицированные специалисты, которые постоянно совершенствуют свои навыки. Мы также
                проводим обучающие курсы и семинары для тех, кто хочет освоить профессию массажиста.
              </p>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  Ежедневно с 09:00 до 22:00
                </div>
                <a href="tel:+79136395271" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                  +7 913 639-52-71
                </a>
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  Тюмень: Мельникайте 125Б / Советская 95
                </div>
                <a
                  href="https://vk.com/kasaemo_massage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ChevronRight className="w-4 h-4" />
                  Мы ВКонтакте
                </a>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={1}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={teamPhoto}
                alt="Команда студии KASAEMO — специалисты по массажу"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <h2 className="section-heading text-center mb-12">Популярные услуги</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                custom={i}
              >
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <CardContent className="p-6 flex flex-col h-full">
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
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/uslugi">Все услуги и цены →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="section-heading text-center mb-12">Часто задаваемые вопросы</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="1">
              <AccordionTrigger>Нужна ли предварительная запись?</AccordionTrigger>
              <AccordionContent>
                Да, мы рекомендуем записываться заранее через наш сайт или по телефону, чтобы выбрать удобное время и специалиста.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2">
              <AccordionTrigger>Есть ли противопоказания?</AccordionTrigger>
              <AccordionContent>
                Да, имеются противопоказания. Перед процедурой необходима консультация специалиста. К основным противопоказаниям относятся: острые воспалительные процессы, кожные заболевания в зоне массажа, онкология, беременность (для некоторых видов массажа).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="3">
              <AccordionTrigger>Как долго длится процедура?</AccordionTrigger>
              <AccordionContent>
                Время процедуры зависит от типа массажа: массаж лица — 40–60 минут, массаж тела — 60–90 минут, комплексные программы — до 2 часов.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="4">
              <AccordionTrigger>Можно ли купить подарочный сертификат?</AccordionTrigger>
              <AccordionContent>
                Да! Мы предлагаем подарочные сертификаты номиналом от 1 000 до 10 000 ₽. Подробности на странице{" "}
                <Link to="/sertifikaty" className="text-primary hover:underline">Сертификаты</Link>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="5">
              <AccordionTrigger>Проводите ли вы обучение?</AccordionTrigger>
              <AccordionContent>
                Да, мы проводим курсы и семинары для специалистов. Узнайте подробности на странице{" "}
                <Link to="/kursy" className="text-primary hover:underline">Курсы и семинары</Link>.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default Index;
