import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { services, YCLIENTS_URL } from "@/data/services";

const courses = services.filter((s) => s.category === "courses");

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Courses = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h1 className="section-heading text-center mb-4">Курсы и семинары</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Обучение массажу от практикующих специалистов. Получите новую профессию или повысьте квалификацию.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={fadeUp}
              custom={i}
            >
              <Card className="h-full hover:shadow-lg transition-shadow group">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-primary text-xl">{course.price}</span>
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

        <div className="text-center mt-12 p-8 bg-secondary/50 rounded-2xl max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-4">
            По вопросам обучения звоните или пишите — мы подберём подходящий курс для вашего уровня.
          </p>
          <a
            href="tel:+79136395271"
            className="text-lg font-heading font-bold text-primary hover:underline"
          >
            +7 913 639-52-71
          </a>
        </div>
      </div>
    </section>
  );
};

export default Courses;
