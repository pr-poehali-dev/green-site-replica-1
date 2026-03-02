import { useState } from "react";
import Icon from "@/components/ui/icon";
import SectionReveal from "@/components/SectionReveal";

interface WorksPageProps {
  onOpenModal: () => void;
}

const works = [
  { img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", title: "Пристройка-веранда", desc: "Пристройка 30 м² из газобетона с остеклением", category: "Пристройки", year: "2024" },
  { img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", title: "Монтаж кровли", desc: "Металлочерепица 180 м², замена стропильной системы", category: "Кровля", year: "2024" },
  { img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", title: "Отделка квартиры", desc: "Капитальный ремонт 85 м² под ключ", category: "Отделка", year: "2023" },
  { img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80", title: "Реконструкция дома", desc: "Перепланировка и утепление дома 120 м²", category: "Реконструкция", year: "2024" },
  { img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80", title: "Фасад здания", desc: "Вентилируемый фасад из фиброцементных панелей", category: "Фасады", year: "2023" },
  { img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80", title: "Ленточный фундамент", desc: "Фундамент 450 м.п. под коттедж", category: "Фундамент", year: "2024" },
  { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", title: "Пристройка гаража", desc: "Гараж 36 м² из кирпича с воротами", category: "Пристройки", year: "2023" },
  { img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80", title: "Утепление дома", desc: "Минвата 200 м², штукатурная система", category: "Утепление", year: "2024" },
  { img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80", title: "Новый дом", desc: "Дом из газобетона 160 м² под ключ", category: "Реконструкция", year: "2024" },
];

const categories = ["Все", "Пристройки", "Кровля", "Реконструкция", "Фундамент", "Утепление", "Отделка", "Фасады"];

export default function WorksPage({ onOpenModal }: WorksPageProps) {
  const [filter, setFilter] = useState("Все");
  const [lightbox, setLightbox] = useState<null | typeof works[0]>(null);

  const filtered = filter === "Все" ? works : works.filter((w) => w.category === filter);

  return (
    <div className="pt-24">
      <div className="green-gradient-bg py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Наши работы</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Реальные проекты — от небольших ремонтов до строительства домов под ключ
          </p>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full font-600 text-sm transition-all duration-200 ${
                  filter === cat
                    ? "bg-green-600 text-white shadow-lg shadow-green-200"
                    : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((work, i) => (
              <SectionReveal key={i} delay={i * 60}>
                <div
                  className="gallery-item cursor-pointer"
                  style={{ height: "260px" }}
                  onClick={() => setLightbox(work)}
                >
                  <img src={work.img} alt={work.title} className="w-full h-full object-cover" />
                  <div className="gallery-overlay">
                    <div className="text-center text-white px-4">
                      <Icon name="ZoomIn" size={28} className="mx-auto mb-2" />
                      <p className="font-black text-base">{work.title}</p>
                      <p className="text-green-200 text-sm mt-1">{work.desc}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-green-600 text-white text-xs font-700 px-3 py-1 rounded-full">
                    {work.category}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 mb-5">Хотите такой же результат?</p>
            <button onClick={onOpenModal} className="btn-green text-base">
              <Icon name="PhoneCall" size={18} />
              Обсудить проект
            </button>
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="modal-overlay" onClick={() => setLightbox(null)}>
          <div className="max-w-3xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute -top-12 right-0 text-white hover:text-green-300 transition-colors">
              <Icon name="X" size={28} />
            </button>
            <img src={lightbox.img} alt={lightbox.title} className="w-full rounded-2xl shadow-2xl" />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-white font-black text-lg">{lightbox.title}</p>
                <p className="text-green-300 text-sm">{lightbox.desc}</p>
              </div>
              <span className="bg-green-600 text-white text-sm font-700 px-4 py-2 rounded-full">{lightbox.year}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
