import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { PHONE, PHONE_DISPLAY, WA_LINK, TG_LINK, MAX_LINK } from "@/pages/HomePage";

interface HeaderProps {
  currentPage: string;
  navigate: (page: string) => void;
  onOpenModal: () => void;
}

const navItems = [
  { key: "services", label: "Услуги" },
  { key: "works", label: "Наши работы" },
  { key: "about", label: "О нас" },
  { key: "contacts", label: "Контакты" },
];

export default function Header({ currentPage, navigate, onOpenModal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-sm py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <button
          onClick={() => navigate("home")}
          className="text-xl font-black text-green-700 tracking-tight hover:text-green-600 transition-colors"
        >
          <span className="text-green-500">Строй-</span>Ремонт 🔨
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              className={`px-4 py-2 rounded-full text-sm font-600 transition-all duration-200 ${
                currentPage === item.key
                  ? "bg-green-100 text-green-700 font-bold"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center hover:opacity-90 transition-opacity">
            <Icon name="MessageCircle" size={18} className="text-white" />
          </a>
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer" title="Telegram" className="w-9 h-9 rounded-full bg-[#2AABEE] flex items-center justify-center hover:opacity-90 transition-opacity">
            <Icon name="Send" size={16} className="text-white" />
          </a>
          <a href={MAX_LINK} target="_blank" rel="noopener noreferrer" title="Max" className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center hover:opacity-90 transition-opacity bg-[#0077FF]">
            <img src="https://max.ru/favicon.ico" alt="Max" className="w-5 h-5 object-contain" onError={(e) => { const t = e.target as HTMLImageElement; t.style.display='none'; const s = document.createElement('span'); s.style.cssText='color:white;font-weight:900;font-size:15px;font-family:sans-serif'; s.textContent='M'; t.parentElement?.appendChild(s); }} />
          </a>
          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-2 text-gray-800 font-bold text-base hover:text-green-600 transition-colors ml-1"
          >
            <Icon name="Phone" size={18} className="text-green-500" />
            {PHONE_DISPLAY}
          </a>
          <button onClick={onOpenModal} className="btn-green text-sm px-5 py-3">
            Заказать звонок
          </button>
        </div>

        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={26} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-green-100 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => { navigate(item.key); setMenuOpen(false); }}
                className={`text-left px-4 py-3 rounded-xl font-600 transition-colors ${
                  currentPage === item.key
                    ? "bg-green-100 text-green-700 font-bold"
                    : "text-gray-700 hover:bg-green-50"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
              <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-gray-800 font-bold">
                <Icon name="Phone" size={18} className="text-green-500" />
                {PHONE_DISPLAY}
              </a>
            </div>
            <div className="flex gap-2 pt-1">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-bold">
                <Icon name="MessageCircle" size={16} /> WhatsApp
              </a>
              <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2AABEE] text-white text-sm font-bold">
                <Icon name="Send" size={16} /> Telegram
              </a>
              <a href={MAX_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077FF] text-white text-sm font-bold">
                <img src="https://max.ru/favicon.ico" alt="Max" className="w-4 h-4 object-contain" /> Max
              </a>
            </div>
            <button onClick={() => { onOpenModal(); setMenuOpen(false); }} className="btn-green mt-2 justify-center">
              Заказать звонок
            </button>
          </div>
        </div>
      )}
    </header>
  );
}