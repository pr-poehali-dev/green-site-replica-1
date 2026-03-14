import Icon from "@/components/ui/icon";
import SectionReveal from "@/components/SectionReveal";
import { SERVICES } from "./HomePage";

interface ServicesPageProps {
  onOpenModal: () => void;
}

const serviceDetails: Record<string, { features: string[] }> = {
  roofing: { features: ["Металлочерепица, профнастил, мягкая кровля", "Быстрые сроки", "Гарантия на стыки"] },
  otmostka: { features: ["Бетонная, плиточная, мягкая", "Гидроизоляция", "Дренаж"] },
  foundation: { features: ["Ленточный, свайный, плитный", "Армирование по нормам", "Гарантия 5 лет"] },
  extension: { features: ["Проектирование и согласование", "Любой материал", "Гарантия 3 года"] },
  canopy: { features: ["Металл, поликарбонат, дерево", "Любая форма", "Быстрый монтаж"] },
  paving: { features: ["Тротуарная плитка, брусчатка", "Бордюры, водоотвод", "Долговечное покрытие"] },
  newhouse: { features: ["Газобетон, кирпич, дерево", "Проект включён", "Под ключ"] },
  fence: { features: ["Кирпич, металл, профнастил", "Ворота и калитки", "Гарантия 3 года"] },
  siding: { features: ["Виниловый, металлический, деревянный", "Утепление под сайдинг", "Быстрый монтаж"] },
  facade: { features: ["Минвата, пенопласт, ППУ", "Экономия на отоплении до 40%", "Штукатурные системы"] },
  "log-replace": { features: ["Брус, бревно", "Подъём дома домкратами", "Гарантия 5 лет"] },
  floor: { features: ["Замена лаг", "Настил досок", "Устранение скрипа"] },
  "roof-repair": { features: ["Устранение протечек", "Замена элементов", "Быстрый выезд"] },
  chimney: { features: ["Кирпич, сэндвич-трубы", "Ремонт и чистка", "Пожарная безопасность"] },
  other: { features: ["Любые строительные работы", "Бесплатная консультация", "Выезд на объект"] },
};

export default function ServicesPage({ onOpenModal }: ServicesPageProps) {
  return (
    <div className="pt-24">
      <div className="green-gradient-bg py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Наши услуги</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Полный цикл строительных работ — от фундамента до финишной отделки
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {SERVICES.map((svc, i) => {
              const details = serviceDetails[svc.id] || { features: [] };
              return (
                <SectionReveal key={i} delay={i * 60}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-green-50 hover-lift">
                    <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <div className="md:w-2/5 h-60 md:h-auto overflow-hidden">
                        <img src={svc.img} alt={svc.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="md:w-3/5 p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <Icon name={svc.icon} size={24} className="text-green-600" />
                          </div>
                          <h2 className="text-2xl font-black text-gray-900">{svc.title}</h2>
                        </div>
                        <p className="text-gray-600 mb-5 leading-relaxed">{svc.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {details.features.map((f) => (
                            <span key={f} className="flex items-center gap-1 text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full font-600">
                              <Icon name="Check" size={12} /> {f}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-end">
                          <button onClick={onOpenModal} className="btn-green">
                            Заказать <Icon name="ArrowRight" size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
