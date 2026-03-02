import { useState } from "react";
import Icon from "@/components/ui/icon";
import SectionReveal from "@/components/SectionReveal";

interface HomePageProps {
  onOpenModal: () => void;
}

const services = [
  { icon: "Home", title: "Пристройки", desc: "Расширяем жилую площадь: веранды, террасы, пристройки к дому любой сложности", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { icon: "Triangle", title: "Кровля", desc: "Монтаж, ремонт и замена кровли. Работаем с металлочерепицей, профнастилом, мягкой кровлей", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" },
  { icon: "RotateCcw", title: "Реконструкция домов", desc: "Полная реконструкция и капитальный ремонт домов. Возвращаем зданиям новую жизнь", img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80" },
  { icon: "Layers", title: "Фундамент", desc: "Ленточный, свайный, плитный фундамент. Усиление существующих фундаментов", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80" },
  { icon: "Wind", title: "Утепление", desc: "Утепление стен, кровли, пола. Современные материалы — снижение теплопотерь до 40%", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80" },
  { icon: "PaintBucket", title: "Отделка", desc: "Внутренняя и внешняя отделка. Штукатурка, шпаклёвка, покраска, укладка плитки", img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80" },
  { icon: "Building2", title: "Фасады", desc: "Монтаж навесных фасадов, сайдинга, штукатурных систем. Преображаем облик здания", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80" },
];

const advantages = [
  { icon: "Users", title: "Работаем без посредников", desc: "Собственная бригада мастеров. Никаких субподрядчиков — только профессиональная команда" },
  { icon: "FileText", title: "Фиксированная смета", desc: "Стоимость не меняется в процессе работы. Всё прописываем в договоре до начала" },
  { icon: "Shield", title: "Гарантия качества", desc: "Даём гарантию на все виды работ от 1 до 5 лет. Устраняем недостатки бесплатно" },
  { icon: "Award", title: "Опытные мастера", desc: "Более 10 лет на рынке. Команда сертифицированных специалистов с портфолио реальных объектов" },
];

const reviews = [
  {
    name: "Андрей Колесников",
    text: "Заказывали пристройку к частному дому. Ребята сделали всё чисто и в срок. Смета не изменилась ни на копейку. Рекомендую!",
    rating: 5,
    work: "Пристройка",
  },
  {
    name: "Марина Светлова",
    text: "Меняли кровлю на даче. Приятно удивила скорость работы и чистота на объекте. Через неделю всё было готово.",
    rating: 5,
    work: "Кровля",
  },
  {
    name: "Виктор Захаров",
    text: "Делали фундамент под гараж. Качество отличное, всё по технологии. Дали гарантию на 3 года. Буду обращаться ещё.",
    rating: 5,
    work: "Фундамент",
  },
  {
    name: "Ольга Панова",
    text: "Утепляли дом снаружи. Мастера вежливые, аккуратные. Результат превзошёл ожидания — в доме стало намного теплее.",
    rating: 5,
    work: "Утепление",
  },
];

const galleryItems = [
  { img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80", title: "Пристройка веранды" },
  { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", title: "Монтаж кровли" },
  { img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80", title: "Внутренняя отделка" },
  { img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80", title: "Реконструкция дома" },
  { img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", title: "Фасад здания" },
  { img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80", title: "Устройство фундамента" },
];

const workTypes = ["Пристройка", "Кровля", "Реконструкция", "Фундамент", "Утепление", "Отделка", "Фасад"];
const materials = ["Кирпич", "Газобетон", "Дерево", "Металл", "Пенобетон"];
const deadlines = ["До 1 месяца", "1–2 месяца", "2–3 месяца", "Более 3 месяцев"];

export default function HomePage({ onOpenModal }: HomePageProps) {
  const [heroName, setHeroName] = useState("");
  const [heroPhone, setHeroPhone] = useState("");
  const [heroSent, setHeroSent] = useState(false);

  const [reviewIdx, setReviewIdx] = useState(0);
  const [lightbox, setLightbox] = useState<null | { img: string; title: string }>(null);

  const [calcStep, setCalcStep] = useState(1);
  const [calcData, setCalcData] = useState({ type: "", material: "", size: "", deadline: "" });
  const [calcName, setCalcName] = useState("");
  const [calcPhone, setCalcPhone] = useState("");
  const [calcSent, setCalcSent] = useState(false);

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactSent, setContactSent] = useState(false);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHeroSent(true);
  };

  const handleCalcSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCalcSent(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  const visibleReviews = window.innerWidth < 768 ? [reviews[reviewIdx]] : reviews.slice(reviewIdx, reviewIdx + 2);

  return (
    <>
      {/* HERO */}
      <section className="hero-bg pt-28 pb-16 md:pt-36 md:pb-24 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-600 text-green-200 mb-6">
                <Icon name="Star" size={14} className="text-yellow-400" />
                Более 500 объектов сдано
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Строительство и ремонт
                <span className="block text-green-300">под ключ</span>
              </h1>
              <p className="text-green-100 text-lg md:text-xl mb-4 leading-relaxed">
                Пристройки, кровля, фундамент, реконструкция домов — выполняем работу любой сложности в Самаре и области
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {["Без посредников", "Фиксированная цена", "Гарантия 3 года"].map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-2 text-sm font-600 text-white">
                    <Icon name="Check" size={14} className="text-green-300" />
                    {tag}
                  </span>
                ))}
              </div>

              {!heroSent ? (
                <form onSubmit={handleHeroSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold text-lg mb-4">Узнайте стоимость бесплатно</h3>
                  <div className="space-y-3">
                    <input
                      className="form-input bg-white/90"
                      type="text"
                      placeholder="Ваше имя"
                      value={heroName}
                      onChange={(e) => setHeroName(e.target.value)}
                      required
                    />
                    <input
                      className="form-input bg-white/90"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={heroPhone}
                      onChange={(e) => setHeroPhone(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn-green w-full justify-center text-base py-4">
                      <Icon name="Calculator" size={18} />
                      Узнать стоимость
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                  <Icon name="CheckCircle" size={48} className="text-green-300 mx-auto mb-3" />
                  <p className="text-white font-bold text-lg">Заявка принята!</p>
                  <p className="text-green-200 text-sm mt-1">Перезвоним в течение 15 минут</p>
                </div>
              )}
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-52 bg-green-700/40">
                  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" alt="Строительство" className="w-full h-full object-cover mix-blend-overlay opacity-90" />
                </div>
                <div className="bg-white/10 rounded-2xl p-5 border border-white/15">
                  <div className="text-3xl font-black text-white">500+</div>
                  <div className="text-green-200 text-sm font-500">объектов сдано</div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 rounded-2xl p-5 border border-white/15">
                  <div className="text-3xl font-black text-white">10+</div>
                  <div className="text-green-200 text-sm font-500">лет на рынке</div>
                </div>
                <div className="rounded-2xl overflow-hidden h-52 bg-green-700/40">
                  <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" alt="Кровля" className="w-full h-full object-cover mix-blend-overlay opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-12 bg-gray-50/60 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <p className="text-xs font-600 uppercase tracking-[0.18em] text-gray-400 text-center mb-8" style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.2em" }}>
              почему выбирают нас
            </p>
          </SectionReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
            {advantages.map((adv, i) => (
              <SectionReveal key={i} delay={i * 80}>
                <div className="px-6 py-2 flex flex-col items-center text-center group">
                  <Icon name={adv.icon} size={20} className="text-gray-300 mb-3 group-hover:text-green-400 transition-colors duration-300" />
                  <h3 className="text-gray-500 text-sm font-500 mb-1 group-hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: "'Georgia', serif" }}>
                    {adv.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed hidden lg:block">{adv.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 md:py-24 bg-gray-50" id="services">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Наши услуги</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Выполняем все виды строительных и ремонтных работ</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <SectionReveal key={i} delay={i * 80}>
                <div className="card-service group" onClick={onOpenModal}>
                  <div className="relative h-44 overflow-hidden">
                    <img src={svc.img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="service-overlay absolute inset-0 flex flex-col justify-end p-4">
                      <span className="text-white font-black text-lg">{svc.title}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{svc.desc}</p>
                    <div className="mt-3 flex items-center gap-1 text-green-600 font-700 text-sm">
                      Подробнее <Icon name="ArrowRight" size={14} />
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Рассчитайте стоимость</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Заполните форму и получите предварительный расчёт за 15 минут</p>
            </div>
          </SectionReveal>

          <div className="max-w-2xl mx-auto">
            {/* Steps indicator */}
            <div className="flex items-center justify-center gap-0 mb-10">
              {[1, 2, 3, 4, 5].map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className={`step-indicator ${calcStep === step ? "active" : calcStep > step ? "done" : "inactive"}`}>
                    {calcStep > step ? <Icon name="Check" size={16} /> : step}
                  </div>
                  {i < 4 && (
                    <div className={`h-0.5 w-10 md:w-16 transition-colors duration-300 ${calcStep > step ? "bg-green-500" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-green-100">
              {calcStep === 1 && (
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Шаг 1: Тип работ</h3>
                  <p className="text-gray-500 text-sm mb-5">Выберите нужную категорию</p>
                  <div className="grid grid-cols-2 gap-3">
                    {workTypes.map((type) => (
                      <button
                        key={type}
                        className={`calc-option ${calcData.type === type ? "selected" : ""}`}
                        onClick={() => { setCalcData({ ...calcData, type }); setCalcStep(2); }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {calcStep === 2 && (
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Шаг 2: Материал</h3>
                  <p className="text-gray-500 text-sm mb-5">Из чего будем строить?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {materials.map((mat) => (
                      <button
                        key={mat}
                        className={`calc-option ${calcData.material === mat ? "selected" : ""}`}
                        onClick={() => { setCalcData({ ...calcData, material: mat }); setCalcStep(3); }}
                      >
                        {mat}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setCalcStep(1)} className="mt-4 text-gray-500 text-sm hover:text-gray-700 flex items-center gap-1">
                    <Icon name="ChevronLeft" size={14} /> Назад
                  </button>
                </div>
              )}

              {calcStep === 3 && (
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Шаг 3: Размеры</h3>
                  <p className="text-gray-500 text-sm mb-5">Укажите примерную площадь объекта</p>
                  <div className="grid grid-cols-2 gap-3">
                    {["До 30 м²", "30–60 м²", "60–100 м²", "Более 100 м²"].map((size) => (
                      <button
                        key={size}
                        className={`calc-option ${calcData.size === size ? "selected" : ""}`}
                        onClick={() => { setCalcData({ ...calcData, size }); setCalcStep(4); }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setCalcStep(2)} className="mt-4 text-gray-500 text-sm hover:text-gray-700 flex items-center gap-1">
                    <Icon name="ChevronLeft" size={14} /> Назад
                  </button>
                </div>
              )}

              {calcStep === 4 && (
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Шаг 4: Сроки</h3>
                  <p className="text-gray-500 text-sm mb-5">Когда нужно выполнить?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {deadlines.map((dl) => (
                      <button
                        key={dl}
                        className={`calc-option ${calcData.deadline === dl ? "selected" : ""}`}
                        onClick={() => { setCalcData({ ...calcData, deadline: dl }); setCalcStep(5); }}
                      >
                        {dl}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setCalcStep(3)} className="mt-4 text-gray-500 text-sm hover:text-gray-700 flex items-center gap-1">
                    <Icon name="ChevronLeft" size={14} /> Назад
                  </button>
                </div>
              )}

              {calcStep === 5 && !calcSent && (
                <div>
                  <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-200">
                    <p className="text-sm text-green-800 font-600">
                      ✓ {calcData.type} · {calcData.material} · {calcData.size} · {calcData.deadline}
                    </p>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Получить расчёт</h3>
                  <p className="text-gray-500 text-sm mb-5">Оставьте контакт — пришлём расчёт в течение 15 минут</p>
                  <form onSubmit={handleCalcSubmit} className="space-y-3">
                    <input className="form-input" type="text" placeholder="Ваше имя" value={calcName} onChange={(e) => setCalcName(e.target.value)} required />
                    <input className="form-input" type="tel" placeholder="+7 (___) ___-__-__" value={calcPhone} onChange={(e) => setCalcPhone(e.target.value)} required />
                    <button type="submit" className="btn-green w-full justify-center py-4">
                      <Icon name="Send" size={18} />
                      Получить расчёт
                    </button>
                  </form>
                  <button onClick={() => setCalcStep(4)} className="mt-4 text-gray-500 text-sm hover:text-gray-700 flex items-center gap-1">
                    <Icon name="ChevronLeft" size={14} /> Назад
                  </button>
                </div>
              )}

              {calcStep === 5 && calcSent && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={36} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Расчёт отправлен!</h3>
                  <p className="text-gray-500 text-sm">Свяжемся с вами в течение 15 минут</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Наши работы</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Реальные проекты, сданные в срок и с гарантией</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.map((item, i) => (
              <SectionReveal key={i} delay={i * 80}>
                <div
                  className="gallery-item"
                  style={{ height: i % 3 === 0 ? "260px" : "200px" }}
                  onClick={() => setLightbox(item)}
                >
                  <img src={item.img} alt={item.title} />
                  <div className="gallery-overlay">
                    <div className="text-center text-white">
                      <Icon name="ZoomIn" size={32} className="mx-auto mb-2" />
                      <p className="font-bold text-sm">{item.title}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Отзывы клиентов</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Более 500 довольных заказчиков за 10 лет работы</p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {reviews.slice(reviewIdx, reviewIdx + 2).map((rev, i) => (
              <SectionReveal key={i} delay={i * 100}>
                <div className="review-card">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1">
                      {[...Array(rev.rating)].map((_, j) => (
                        <Icon key={j} name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-green-600 font-700 bg-green-50 px-3 py-1 rounded-full">{rev.work}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">"{rev.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-black">
                      {rev.name[0]}
                    </div>
                    <span className="font-bold text-gray-800 text-sm">{rev.name}</span>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setReviewIdx(Math.max(0, reviewIdx - 2))}
              disabled={reviewIdx === 0}
              className="w-11 h-11 rounded-full border-2 border-green-200 flex items-center justify-center text-green-600 hover:bg-green-50 disabled:opacity-30 transition-all"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={() => setReviewIdx(Math.min(reviews.length - 2, reviewIdx + 2))}
              disabled={reviewIdx >= reviews.length - 2}
              className="w-11 h-11 rounded-full border-2 border-green-200 flex items-center justify-center text-green-600 hover:bg-green-50 disabled:opacity-30 transition-all"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section className="py-16 md:py-24 green-gradient-bg" id="contacts">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Свяжитесь с нами</h2>
              <p className="text-green-200 max-w-xl mx-auto">Ответим на все вопросы и рассчитаем стоимость бесплатно</p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <SectionReveal delay={100}>
              <div className="text-white">
                <div className="space-y-6 mb-8">
                  <a href="tel:+79092111130" className="flex items-center gap-4 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Icon name="Phone" size={24} />
                    </div>
                    <div>
                      <p className="text-green-200 text-sm">Позвонить</p>
                      <p className="text-white font-black text-xl">+7 909 211 1130</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                      <Icon name="Clock" size={24} />
                    </div>
                    <div>
                      <p className="text-green-200 text-sm">Режим работы</p>
                      <p className="text-white font-bold">Пн–Вс: 8:00 – 20:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                      <Icon name="MapPin" size={24} />
                    </div>
                    <div>
                      <p className="text-green-200 text-sm">Регион работы</p>
                      <p className="text-white font-bold">Самара и Самарская область</p>
                    </div>
                  </div>
                </div>
                <a href="tel:+79092111130" className="btn-outline-green border-white text-white hover:bg-white hover:text-green-700 inline-flex">
                  <Icon name="PhoneCall" size={18} />
                  Позвонить сейчас
                </a>
              </div>
            </SectionReveal>

            <SectionReveal delay={200}>
              {!contactSent ? (
                <form onSubmit={handleContactSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
                  <h3 className="text-xl font-black text-gray-900 mb-5">Оставить заявку</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-600 text-gray-700 mb-1">Ваше имя</label>
                      <input className="form-input" type="text" placeholder="Иван Иванов" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
                    </div>
                    <div>
                      <label className="block text-sm font-600 text-gray-700 mb-1">Телефон</label>
                      <input className="form-input" type="tel" placeholder="+7 (___) ___-__-__" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} required />
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
                  <h3 className="text-xl font-black text-gray-900 mb-2">Заявка принята!</h3>
                  <p className="text-gray-500">Перезвоним вам в течение 15 минут</p>
                </div>
              )}
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="modal-overlay" onClick={() => setLightbox(null)}>
          <div className="max-w-3xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-white hover:text-green-300 transition-colors"
            >
              <Icon name="X" size={28} />
            </button>
            <img src={lightbox.img} alt={lightbox.title} className="w-full rounded-2xl shadow-2xl" />
            <p className="text-white text-center mt-4 font-bold">{lightbox.title}</p>
          </div>
        </div>
      )}
    </>
  );
}