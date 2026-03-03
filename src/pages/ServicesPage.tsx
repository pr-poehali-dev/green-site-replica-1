import Icon from "@/components/ui/icon";
import SectionReveal from "@/components/SectionReveal";

interface ServicesPageProps {
  onOpenModal: () => void;
}

const services = [
  {
    icon: "Home",
    title: "Пристройки",
    desc: "Строим пристройки любой сложности: веранды, террасы, дополнительные комнаты. Увеличиваем жилую площадь без сноса существующих конструкций.",
    features: ["Проектирование и согласование", "Любой материал", "Гарантия 3 года"],
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/30e12811-5bb7-4427-8ddf-a9769a35537f.jpg",
  },
  {
    icon: "Triangle",
    title: "Кровля",
    desc: "Монтаж, ремонт и замена кровли всех видов. Работаем с металлочерепицей, профнастилом, мягкой кровлей, ондулином.",
    features: ["Быстрые сроки", "Материал в стоимости", "Гарантия на стыки"],
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/97350343-eb70-4cec-9657-3435d5e5ab6e.jpg",
  },
  {
    icon: "RotateCcw",
    title: "Реконструкция домов",
    desc: "Полная реконструкция и капитальный ремонт частных домов. Усиление несущих конструкций, перепланировка, замена коммуникаций.",
    features: ["Технический надзор", "Поэтапная оплата", "Фиксированная смета"],
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/e695140e-e500-4a6f-8d72-b7f138c67732.jpg",
  },
  {
    icon: "Layers",
    title: "Фундамент",
    desc: "Устройство ленточного, свайного, плитного фундамента. Усиление и гидроизоляция существующих оснований.",
    features: ["Геологическое исследование", "Армирование по нормам", "Гарантия 5 лет"],
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/1165095b-2076-4c30-b666-a6c1ef9fad18.jpg",
  },
  {
    icon: "Wind",
    title: "Утепление",
    desc: "Утепление стен, кровли, пола, фундамента современными материалами. Снижение теплопотерь до 40%.",
    features: ["Минвата, пенопласт, ППУ", "Влажность исключена", "Экономия на отоплении"],
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/ac3b3adb-1d0d-48c9-a317-e982b83d839b.jpg",
  },
  {
    icon: "PaintBucket",
    title: "Отделка",
    desc: "Внутренняя и внешняя отделка: штукатурка, шпаклёвка, покраска, укладка плитки, устройство полов.",
    features: ["Чистовая отделка", "Черновая отделка", "Под ключ"],
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
  },
  {
    icon: "Building2",
    title: "Фасады",
    desc: "Монтаж навесных вентилируемых фасадов, сайдинга, штукатурных систем. Преображаем внешний вид здания.",
    features: ["Металлосайдинг", "Фиброцементные панели", "Штукатурные системы"],
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
];

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
            {services.map((svc, i) => (
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
                        {svc.features.map((f) => (
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}