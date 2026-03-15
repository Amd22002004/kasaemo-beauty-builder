import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { YCLIENTS_URL } from "@/data/services";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Главная" },
  { to: "/uslugi", label: "Услуги" },
  { to: "/specialisty", label: "Специалисты" },
  { to: "/kursy", label: "Курсы" },
  { to: "/sertifikaty", label: "Сертификаты" },
  { to: "/kontakty", label: "Контакты" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="KASAEMO" className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                location.pathname === link.to ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+79136395271" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            +7 913 639-52-71
          </a>
          <Button asChild>
            <a href={YCLIENTS_URL} target="_blank" rel="noopener noreferrer">
              Записаться
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-card pb-4">
          <nav className="container flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.to ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-2 px-3">
              <a href="tel:+79136395271" className="flex items-center gap-1.5 text-sm font-medium text-primary">
                <Phone className="w-4 h-4" />
                +7 913 639-52-71
              </a>
              <Button asChild className="w-full">
                <a href={YCLIENTS_URL} target="_blank" rel="noopener noreferrer">
                  Записаться
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
