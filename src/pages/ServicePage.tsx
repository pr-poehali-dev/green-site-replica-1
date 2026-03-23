import { useState } from "react";
import Icon from "@/components/ui/icon";
import SectionReveal from "@/components/SectionReveal";
import { SERVICES, PHONE, PHONE_DISPLAY, WA_LINK, TG_LINK, MAX_LINK } from "./HomePage";

interface ServicePageProps {
  serviceId: string;
  onOpenModal: () => void;
  onBack: () => void;
}

const galleryPool = [
  "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/c6d7c275-6bb8-478f-ad73-8ba176385e3b.jpg",
  "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/92b5028f-eab2-4b00-b88e-d9be310c2f07.jpg",
  "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/95e71204-ef4a-4e28-bf9a-30fe92bcdb9e.jpg",
  "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/81bb592e-3c75-488b-a72f-f01611c9caec.jpg",
  "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/fc2ae133-ad51-4fb8-9f75-e4fa309bc271.jpg",
  "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/b55a0e4c-bcf9-482c-a2aa-f563b9fe363d.jpg",
  "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/4b43290a-6195-420c-8cb8-cd7e333f0521.jpg",
  "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/85f9c102-d23d-484d-9e1e-523a2277947f.jpg",
  "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/7d5aa339-c70d-4c2b-9b8b-01ac08b07e78.jpg",
  "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/176d61cf-f6ac-4f14-8c78-bca61aa4a17f.jpg",
  "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/58972d80-7b3d-42eb-a699-b6024809a1f1.jpg",
  "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/96415a9f-8a5b-4264-a502-b53e02a55252.jpg",
];

export default function ServicePage({ serviceId, onOpenModal, onBack }: ServicePageProps) {
  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const idx = SERVICES.indexOf(service);
  const photos = [service.img, ...galleryPool.filter((p) => p !== service.img).slice(0, 5)];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { sendTelegram } = await import("@/lib/sendTelegram");
    await sendTelegram(name, phone, `Услуга: ${service.title}`);
    setSent(true);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backgroundImage: `url(${service.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors"
          >
            <Icon name="ChevronLeft" size={16} /> Назад к услугам
          </button>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            {service.title}
          </h1>
          <p className="text-white/85 text-lg max-w-2xl mb-8 leading-relaxed">{service.desc}</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={onOpenModal} className="btn-green px-8 py-3 text-base">
              <Icon name="Send" size={18} /> Оставить заявку
            </button>
            <a href={`tel:${PHONE}`} className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-green-700 transition-all">
              <Icon name="Phone" size={18} /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* PHOTOS */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">Фотографии выполненных работ</h2>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <SectionReveal key={i} delay={i * 80}>
                <div
                  className="group relative overflow-hidden rounded-xl cursor-pointer aspect-video"
                  onClick={() => setLightbox(photo)}
                >
                  <img src={photo} alt={`${service.title} — фото ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <Icon name="ZoomIn" size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + CONTACTS */}
      <section className="py-16 green-gradient-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <SectionReveal>
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl font-black mb-6">Свяжитесь с нами</h2>
                <div className="space-y-5 mb-8">
                  <a href={`tel:${PHONE}`} className="flex items-center gap-4 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Icon name="Phone" size={24} />
                    </div>
                    <div>
                      <p className="text-green-200 text-sm">Позвонить</p>
                      <p className="text-white font-black text-xl">{PHONE_DISPLAY}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="MessageCircle" size={24} />
                    </div>
                    <div>
                      <p className="text-green-200 text-sm mb-2">Мессенджеры</p>
                      <div className="flex flex-wrap gap-2">
                        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-bold hover:opacity-90 transition-opacity">
                          <Icon name="MessageCircle" size={16} /> WhatsApp
                        </a>
                        <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2AABEE] text-white text-sm font-bold hover:opacity-90 transition-opacity">
                          <Icon name="Send" size={16} /> Telegram
                        </a>
                        <a href={MAX_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077FF] text-white text-sm font-bold hover:opacity-90 transition-opacity">
                          <img src="https://max.ru/favicon.ico" alt="Max" className="w-4 h-4 object-contain" /> Max
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                      <Icon name="Clock" size={24} />
                    </div>
                    <div>
                      <p className="text-green-200 text-sm">Режим работы</p>
                      <p className="text-white font-bold">Круглосуточно</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={150}>
              {!sent ? (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
                  <h3 className="text-xl font-black text-gray-900 mb-2">Оставить заявку</h3>
                  <p className="text-gray-500 text-sm mb-5">Услуга: <span className="font-bold text-gray-700">{service.title}</span></p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-600 text-gray-700 mb-1">Ваше имя</label>
                      <input className="form-input" type="text" placeholder="Иван Иванов" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                      <label className="block text-sm font-600 text-gray-700 mb-1">Телефон</label>
                      <input className="form-input" type="tel" placeholder="+7 (___) ___-__-__" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-green w-full justify-center py-4 text-base">
                      <Icon name="Send" size={18} />
                      Отправить заявку
                    </button>
                    <p className="text-xs text-gray-400 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                  </div>
                </form>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
                  <Icon name="CheckCircle" size={52} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-gray-900 mb-2">Спасибо!</h3>
                  <p className="text-gray-500">Заявка принята. Мы свяжемся с вами в ближайшее время</p>
                </div>
              )}
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <h2 className="text-2xl font-black text-gray-900 mb-8">Другие услуги</h2>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES.filter((s) => s.id !== serviceId).slice(0, 4).map((svc, i) => (
              <SectionReveal key={i} delay={i * 60}>
                <div
                  className="card-service group cursor-pointer"
                  onClick={onBack}
                >
                  <div className="relative h-36 overflow-hidden">
                    <img src={svc.img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="service-overlay absolute inset-0 flex flex-col justify-end p-3">
                      <span className="text-white font-black text-sm">{svc.title}</span>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="modal-overlay" onClick={() => setLightbox(null)}>
          <div className="max-w-3xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute -top-12 right-0 text-white hover:text-green-300 transition-colors">
              <Icon name="X" size={28} />
            </button>
            <img src={lightbox} alt={service.title} className="w-full rounded-2xl shadow-2xl" />
          </div>
        </div>
      )}
    </>
  );
}