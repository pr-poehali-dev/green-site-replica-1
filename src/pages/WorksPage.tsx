import { useState } from "react";
import Icon from "@/components/ui/icon";
import SectionReveal from "@/components/SectionReveal";

interface WorksPageProps {
  onOpenModal: () => void;
}

const works = [
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/8de3ef90-12f7-49ef-9d04-00a6939e3a52.jpg", title: "Дом из бруса", desc: "Двухэтажный дом из бруса 90 м² под ключ", category: "Строительство", year: "2024" },
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/96415a9f-8a5b-4264-a502-b53e02a55252.jpg", title: "Деревянный дом с террасой", desc: "Дом из бруса с открытой террасой и гаражом", category: "Строительство", year: "2024" },
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/85f9c102-d23d-484d-9e1e-523a2277947f.jpg", title: "Коттедж из газобетона", desc: "Строительство коттеджа 160 м² из газобетона", category: "Строительство", year: "2025" },
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/58972d80-7b3d-42eb-a699-b6024809a1f1.jpg", title: "Двухэтажный коттедж", desc: "Двухэтажный коттедж из газобетона 200 м²", category: "Строительство", year: "2025" },
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/b55a0e4c-bcf9-482c-a2aa-f563b9fe363d.jpg", title: "Забор с воротами", desc: "Металлический забор с кирпичными столбами и воротами", category: "Заборы", year: "2024" },
];

const categories = ["Все", "Строительство", "Заборы"];

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