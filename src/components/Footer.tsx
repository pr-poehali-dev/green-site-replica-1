import Icon from "@/components/ui/icon";

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
              <span className="text-green-300">Строй</span>Двор
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
                href="tel:+79092111130"
                className="flex items-center gap-2 text-green-200 hover:text-white transition-colors"
              >
                <Icon name="Phone" size={16} />
                <span className="font-bold">+7 909 211 1130</span>
              </a>
              <div className="flex items-center gap-2 text-green-200">
                <Icon name="Clock" size={16} />
                <span className="text-sm">Пн–Вс: 8:00 – 20:00</span>
              </div>
              <div className="flex items-center gap-2 text-green-200">
                <Icon name="MapPin" size={16} />
                <span className="text-sm">Самара и область</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-green-400 text-sm">
            © {new Date().getFullYear()} СтройДвор. Все права защищены.
          </p>
          <button className="text-green-400 text-sm hover:text-white transition-colors">
            Политика конфиденциальности
          </button>
        </div>
      </div>
    </footer>
  );
}
