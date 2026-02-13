import { Link } from "react-router-dom";
import { Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-heading font-black text-2xl mb-4">KASAEMO</h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Студия-школа массажа лица, тела и остеопластики. Комплексный подход к красоте и здоровью.
            </p>
            <a
              href="https://vk.com/kasaemo_massage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
            >
              Мы ВКонтакте →
            </a>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">Навигация</h4>
            <nav className="flex flex-col gap-2">
              {[
                { to: "/uslugi", label: "Услуги и цены" },
                { to: "/specialisty", label: "Специалисты" },
                { to: "/kursy", label: "Курсы и семинары" },
                { to: "/sertifikaty", label: "Сертификаты" },
                { to: "/kontakty", label: "Контакты" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-sm text-background/70 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">Контакты</h4>
            <div className="flex flex-col gap-3 text-sm text-background/70">
              <a href="tel:+79136395271" className="flex items-start gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                +7 913 639-52-71
              </a>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                Ежедневно 09:00–22:00
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p>ул. Мельникайте, 125Б</p>
                  <p>ул. Советская, 95</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-background/50">
          <p>© {new Date().getFullYear()} KASAEMO. Все права защищены.</p>
          <p>Имеются противопоказания, необходима консультация специалиста.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
