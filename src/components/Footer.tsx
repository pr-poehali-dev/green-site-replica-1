import Icon from "@/components/ui/icon";
import { PHONE, PHONE_DISPLAY, WA_LINK, TG_LINK, MAX_LINK } from "@/pages/HomePage";

interface FooterProps {
  navigate: (page: string) => void;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-2xl font-black mb-3">
              <span className="text-green-300">Строй-</span>Ремонт 🔨
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Строительство и ремонт под ключ. Работаем без посредников, даём фиксированную смету и гарантию качества.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-green-300">Навигация</h4>
            <ul className="space-y-2">
              {[
                { key: "home", label: "Главная" },
                { key: "services", label: "Услуги" },
                { key: "works", label: "Наши работы" },
                { key: "about", label: "О нас" },
                { key: "contacts", label: "Контакты" },
              ].map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => navigate(item.key)}
                    className="text-green-200 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-green-300">Контакты</h4>
            <div className="space-y-3">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-2 text-green-200 hover:text-white transition-colors"
              >
                <Icon name="Phone" size={16} />
                <span className="font-bold">{PHONE_DISPLAY}</span>
              </a>
              <div className="flex flex-wrap gap-2">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] text-white text-xs font-bold hover:opacity-90 transition-opacity">
                  <Icon name="MessageCircle" size={13} /> WhatsApp
                </a>
                <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2AABEE] text-white text-xs font-bold hover:opacity-90 transition-opacity">
                  <Icon name="Send" size={13} /> Telegram
                </a>
                <a href={MAX_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0077FF] text-white text-xs font-bold hover:opacity-90 transition-opacity">
                  <img src="https://max.ru/favicon.ico" alt="Max" className="w-3.5 h-3.5 object-contain" /> Max
                </a>
              </div>
              <div className="flex items-center gap-2 text-green-200">
                <Icon name="Clock" size={16} />
                <span className="text-sm">Круглосуточно</span>
              </div>
              <div className="flex items-center gap-2 text-green-200">
                <Icon name="MapPin" size={16} />
                <span className="text-sm">Москва и область</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-green-400 text-sm">
            © {new Date().getFullYear()} Строй-Ремонт. Все права защищены.
          </p>
          <button className="text-green-400 text-sm hover:text-white transition-colors">
            Политика конфиденциальности
          </button>
        </div>
      </div>
    </footer>
  );
}