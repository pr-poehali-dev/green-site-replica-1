import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";
import SectionReveal from "@/components/SectionReveal";

interface HomePageProps {
  onOpenModal: () => void;
  onNavigateService?: (serviceId: string) => void;
}

export const SERVICES = [
  {
    id: "roofing",
    icon: "Triangle",
    title: "Кровля",
    desc: "Монтаж, ремонт и замена кровли. Работаем с металлочерепицей, профнастилом, мягкой кровлей",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/c6d7c275-6bb8-478f-ad73-8ba176385e3b.jpg",
  },
  {
    id: "otmostka",
    icon: "Layers",
    title: "Отмостка",
    desc: "Устройство отмостки вокруг дома. Защита фундамента от влаги и разрушения",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/81bb592e-3c75-488b-a72f-f01611c9caec.jpg",
  },
  {
    id: "foundation",
    icon: "Building2",
    title: "Фундамент",
    desc: "Ленточный, свайный, плитный фундамент. Усиление существующих фундаментов",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/fc2ae133-ad51-4fb8-9f75-e4fa309bc271.jpg",
  },
  {
    id: "extension",
    icon: "Home",
    title: "Пристройка к дому",
    desc: "Расширяем жилую площадь: веранды, террасы, пристройки к дому любой сложности",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/92b5028f-eab2-4b00-b88e-d9be310c2f07.jpg",
  },
  {
    id: "canopy",
    icon: "Umbrella",
    title: "Навес",
    desc: "Навесы для автомобилей, террас, входных групп. Металл, поликарбонат, дерево",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/4f34ca5b-eeeb-4174-b48c-7df3d34c476e.jpg",
  },
  {
    id: "paving",
    icon: "LayoutGrid",
    title: "Брусчатка / тротуарная плитка",
    desc: "Укладка тротуарной плитки, брусчатки, бордюров. Дорожки, площадки, парковки",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/d65eb0fe-ff5e-463d-a6a4-4d457fca3113.jpg",
  },
  {
    id: "newhouse",
    icon: "HardHat",
    title: "Строительство дома с нуля",
    desc: "Строительство домов из газобетона, кирпича, дерева. Под ключ с нуля",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/85f9c102-d23d-484d-9e1e-523a2277947f.jpg",
  },
  {
    id: "fence",
    icon: "Shield",
    title: "Забор / ворота / калитка",
    desc: "Кирпичные, металлические, комбинированные заборы. Установка ворот и калиток под ключ",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/b55a0e4c-bcf9-482c-a2aa-f563b9fe363d.jpg",
  },
  {
    id: "siding",
    icon: "PanelRight",
    title: "Сайдинг",
    desc: "Монтаж виниловго, металлического и деревянного сайдинга. Преображаем фасад",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/95e71204-ef4a-4e28-bf9a-30fe92bcdb9e.jpg",
  },
  {
    id: "facade",
    icon: "Wind",
    title: "Фасад / утепление",
    desc: "Утепление и отделка фасадов. Современные материалы — снижение теплопотерь до 40%",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/ac3b3adb-1d0d-48c9-a317-e982b83d839b.jpg",
  },
  {
    id: "log-replace",
    icon: "RotateCcw",
    title: "Замена венцов",
    desc: "Замена нижних и верхних венцов деревянных домов. Опыт работ с брусом и бревном",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/e66d0632-6eb0-4d57-91c8-d12e14c62ee0.jpg",
  },
  {
    id: "floor",
    icon: "Rows3",
    title: "Ремонт полов / лаги",
    desc: "Замена лаг, настил досок, выравнивание пола. Скрипящий пол — устраним",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/f6d208d2-7ce8-4096-be5a-7825278d0be3.jpg",
  },
  {
    id: "roof-repair",
    icon: "Wrench",
    title: "Ремонт крыш",
    desc: "Устранение протечек, ремонт кровельного покрытия, замена отдельных элементов",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/96415a9f-8a5b-4264-a502-b53e02a55252.jpg",
  },
  {
    id: "chimney",
    icon: "Flame",
    title: "Дымоход",
    desc: "Строительство, ремонт и чистка дымоходов. Кирпич, сэндвич-трубы, вкладыши",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/c6ae5f63-ffbc-4a97-a434-fb11d422f5a8.jpg",
  },
  {
    id: "other",
    icon: "MoreHorizontal",
    title: "Другое",
    desc: "Прочие строительные и ремонтные работы. Свяжитесь с нами — поможем с любой задачей",
    img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/0a1ce039-eeaa-4681-893b-0255092dccbc.jpg",
  },
];

const advantages = [
  { icon: "Users", title: "Работаем без посредников", desc: "Собственная бригада мастеров. Никаких субподрядчиков — только профессиональная команда" },
  { icon: "FileText", title: "Фиксированная смета", desc: "Стоимость не меняется в процессе работы. Всё прописываем в договоре до начала" },
  { icon: "Shield", title: "Гарантия качества", desc: "Даём гарантию на все виды работ от 1 до 5 лет. Устраняем недостатки бесплатно" },
  { icon: "Award", title: "Опытные мастера", desc: "Более 10 лет на рынке. Команда сертифицированных специалистов с портфолио реальных объектов" },
];

const reviews = [
  { name: "Андрей Колесников", city: "Москва", text: "Заказывали пристройку к частному дому. Ребята сделали всё чисто и в срок. Смета не изменилась ни на копейку. Рекомендую!", rating: 5, work: "Пристройка" },
  { name: "Марина Светлова", city: "Подольск", text: "Меняли кровлю на даче. Приятно удивила скорость работы и чистота на объекте. Через неделю всё было готово.", rating: 5, work: "Кровля" },
  { name: "Виктор Захаров", city: "Домодедово", text: "Делали фундамент под гараж. Качество отличное, всё по технологии. Дали гарантию на 3 года. Буду обращаться ещё.", rating: 5, work: "Фундамент" },
  { name: "Ольга Панова", city: "Химки", text: "Утепляли дом снаружи. Мастера вежливые, аккуратные. Результат превзошёл ожидания — в доме стало намного теплее.", rating: 5, work: "Утепление" },
  { name: "Сергей Громов", city: "Балашиха", text: "Построили забор и установили ворота. Работали быстро, материалы качественные. Соседи уже спрашивают контакты!", rating: 5, work: "Забор" },
  { name: "Татьяна Мещерякова", city: "Красногорск", text: "Заказывала отмостку вокруг дома. Сделали за 2 дня, очень аккуратно. Никакого мусора после работы — всё убрали.", rating: 5, work: "Отмостка" },
  { name: "Дмитрий Нефёдов", city: "Люберцы", text: "Делали реконструкцию старой дачи. Результат отличный — дом как новый. Цена осталась как в смете, без скрытых доплат.", rating: 5, work: "Реконструкция" },
  { name: "Екатерина Власова", city: "Одинцово", text: "Устанавливали сайдинг на фасад. Всё чётко по плану, мастера вежливые и профессиональные. Очень довольна результатом!", rating: 5, work: "Фасад" },
  { name: "Алексей Борисов", city: "Щёлково", text: "Клали брусчатку во дворе. Работа выполнена идеально — ровно, красиво. Теперь двор просто загляденье!", rating: 5, work: "Благоустройство" },
];

const galleryItems = [
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/c6d7c275-6bb8-478f-ad73-8ba176385e3b.jpg", title: "Монтаж металлочерепицы" },
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/92b5028f-eab2-4b00-b88e-d9be310c2f07.jpg", title: "Каркасная пристройка" },
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/95e71204-ef4a-4e28-bf9a-30fe92bcdb9e.jpg", title: "Монтаж сайдинга" },
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/81bb592e-3c75-488b-a72f-f01611c9caec.jpg", title: "Устройство отмостки" },
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/fc2ae133-ad51-4fb8-9f75-e4fa309bc271.jpg", title: "Армирование фундамента" },
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/b55a0e4c-bcf9-482c-a2aa-f563b9fe363d.jpg", title: "Забор с воротами" },
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/4b43290a-6195-420c-8cb8-cd7e333f0521.jpg", title: "Брусчатка" },
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/85f9c102-d23d-484d-9e1e-523a2277947f.jpg", title: "Строительство дома" },
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/176d61cf-f6ac-4f14-8c78-bca61aa4a17f.jpg", title: "Металлокаркас" },
  { img: "https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/7d5aa339-c70d-4c2b-9b8b-01ac08b07e78.jpg", title: "Ворота" },
];

const workTypes = SERVICES.map((s) => s.title);
const deadlines = ["Прямо сейчас", "Завтра", "На этой неделе", "Позже"];

export const PHONE = "+79804800123";
export const PHONE_DISPLAY = "+7 980 480 0123";
export const WA_LINK = `https://wa.me/79804800123`;
export const TG_LINK = `https://t.me/+79804800123`;
export const MAX_LINK = `https://max.ru/+79804800123`;

const formatPhoneNumber = (value: string) => {
  const inputDigits = value.replace(/\D/g, "");
  if (!inputDigits) return "";

  let digits = inputDigits;

  if (digits.startsWith("7") || digits.startsWith("8")) {
    digits = digits.substring(1);
  }

  digits = digits.substring(0, 10);

  let result = "+7";

  if (digits.length > 0) {
    result += ` (${digits.substring(0, 3)}`;
  }
  if (digits.length >= 4) {
    result += `) ${digits.substring(3, 6)}`;
  }
  if (digits.length >= 7) {
    result += `-${digits.substring(6, 8)}`;
  }
  if (digits.length >= 9) {
    result += `-${digits.substring(8, 10)}`;
  }

  return result;
};

function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const visibleCount = 3;
  const total = reviews.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 6000);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };
  const handleDot = (i: number) => { setCurrent(i); resetTimer(); };

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) { handleNext(); } else { handlePrev(); }
    }
  };

  const getSlides = () => {
    const slides = [];
    for (let i = 0; i < visibleCount; i++) {
      slides.push(reviews[(current + i) % total]);
    }
    return slides;
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50" id="reviews">
      <div className="container mx-auto px-4">
        <SectionReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-green-600 font-bold text-sm uppercase tracking-widest mb-3 bg-green-100 px-4 py-1 rounded-full">Отзывы</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Отзывы наших клиентов</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Более 500 довольных заказчиков за 10 лет работы</p>
          </div>
        </SectionReveal>

        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-green-600 hover:bg-green-50 transition-all hidden md:flex"
            aria-label="Назад"
          >
            <Icon name="ChevronLeft" size={22} />
          </button>

          <div
            ref={trackRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {getSlides().map((rev, i) => (
              <div
                key={`${current}-${i}`}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col transition-all duration-300"
                style={{ animation: "fadeInUp 0.4s ease both", animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(rev.rating)].map((_, j) => (
                      <span key={j} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <span className="text-xs text-green-700 font-bold bg-green-100 px-3 py-1 rounded-full">{rev.work}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5 italic">«{rev.text}»</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                    {rev.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm leading-tight">{rev.name}</p>
                    <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                      <Icon name="MapPin" size={11} />
                      {rev.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-green-600 hover:bg-green-50 transition-all hidden md:flex"
            aria-label="Вперёд"
          >
            <Icon name="ChevronRight" size={22} />
          </button>
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button onClick={handlePrev} className="md:hidden w-10 h-10 rounded-full bg-white shadow border border-gray-100 flex items-center justify-center text-green-600">
            <Icon name="ChevronLeft" size={18} />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? "w-7 h-3 bg-green-500" : "w-3 h-3 bg-gray-200 hover:bg-green-300"}`}
              />
            ))}
          </div>
          <button onClick={handleNext} className="md:hidden w-10 h-10 rounded-full bg-white shadow border border-gray-100 flex items-center justify-center text-green-600">
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default function HomePage({ onOpenModal, onNavigateService }: HomePageProps) {
  const [heroPhone, setHeroPhone] = useState("");
  const [heroLocation, setHeroLocation] = useState("");
  const [heroAgreed, setHeroAgreed] = useState(false);
  const [heroSent, setHeroSent] = useState(false);

  const [lightbox, setLightbox] = useState<null | { img: string; title: string }>(null);
  
  const [calcStep, setCalcStep] = useState(1);
  const [calcData, setCalcData] = useState({ type: "", deadline: "" });
  const [calcName, setCalcName] = useState("");
  const [calcLocation, setCalcLocation] = useState("");
  const [calcPhone, setCalcPhone] = useState("");
  const [calcAgreed, setCalcAgreed] = useState(false);
  const [calcSent, setCalcSent] = useState(false);

  const [contactName, setContactName] = useState("");
  const [contactLocation, setContactLocation] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactAgreed, setContactAgreed] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroAgreed) return;
    const { sendTelegram } = await import("@/lib/sendTelegram");
    await sendTelegram("Не указано", heroPhone, heroLocation, "Форма: герой (узнать стоимость)");
    setHeroSent(true);
  };

  const handleCalcSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcAgreed) return;
    const { sendTelegram } = await import("@/lib/sendTelegram");
    await sendTelegram(calcName, calcPhone, calcLocation, `Форма: калькулятор\nВид работ: ${calcData.type}\nСрок: ${calcData.deadline}`);
    setCalcSent(true);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactAgreed) return;
    const { sendTelegram } = await import("@/lib/sendTelegram");
    await sendTelegram(contactName, contactPhone, contactLocation, "Форма: контактная секция");
    setContactSent(true);
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/c06aca1c-4097-48a0-b820-bb2ca662b220/bucket/dbae6f02-94f8-4cae-9666-90a81810f733.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.52)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.45) 100%)" }} />

        <div className="relative z-10 flex flex-col items-center text-center px-4 pb-24">
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold mb-8"
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(8px)" }}
          >
            <Icon name="Star" size={15} className="text-yellow-400" />
            Более 500 объектов сдано
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-5"
            style={{ color: "#ffffff", textShadow: "0 2px 20px rgba(0,0,0,0.5)", letterSpacing: "-0.02em" }}
          >
            Строительство и ремонт<br />
            <span style={{ color: "#6ee87a" }}>под ключ</span>
          </h1>

          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-3 mb-8 px-8 py-4 rounded-2xl font-black text-3xl md:text-4xl tracking-wide transition-transform hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #6ee87a 0%, #22c55e 100%)",
              color: "#14532d",
              boxShadow: "0 0 40px rgba(110,232,122,0.55), 0 4px 24px rgba(0,0,0,0.25)",
              textShadow: "none",
            }}
          >
            <Icon name="Phone" size={32} />
            {PHONE_DISPLAY}
          </a>

          <p
            className="text-lg md:text-xl max-w-xl mb-8 leading-relaxed font-medium"
            style={{ color: "rgba(255,255,255,0.88)", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
          >
            Пристройки, кровля, фундамент, реконструкция домов —<br className="hidden md:block" />
            в Москве и Московской области. Фиксированная цена, гарантия 3 года.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Без посредников", "Фиксированная цена", "Работа по договору", "Гарантия 3 года"].map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(6px)" }}
              >
                <Icon name="Check" size={14} className="text-green-400" />
                {tag}
              </span>
            ))}
          </div>

          {!heroSent ? (
            <form onSubmit={handleHeroSubmit} className="flex flex-col gap-3 w-full max-w-xl">
              <input
                className="form-input text-center sm:text-left text-base w-full"
                style={{ background: "rgba(255,255,255,0.92)", borderRadius: "12px" }}
                type="text"
                placeholder="Где находится объект? (Истра, КП Лесной или Москва)"
                value={heroLocation}
                onChange={(e) => setHeroLocation(e.target.value)}
              />
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  className="form-input flex-1 text-center sm:text-left text-base"
                  style={{ background: "rgba(255,255,255,0.92)", borderRadius: "12px", minWidth: 0 }}
                  type="tel"
                  placeholder="+7 (___) ___-__-__ *"
                  value={heroPhone}
                  onChange={(e) => setHeroPhone(formatPhoneNumber(e.target.value))}
                  required
                />
                <button
                  type="submit"
                  disabled={!heroAgreed}
                  className="btn-green whitespace-nowrap px-6 py-3.5 text-base font-bold shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  style={{ borderRadius: "12px" }}
                >
                  <Icon name="Calculator" size={18} />
                  Узнайте стоимость бесплатно
                </button>
              </div>

              <div className="flex items-start gap-2.5 pt-1 text-left">
                <input
                  type="checkbox"
                  id="hero-privacy"
                  checked={heroAgreed}
                  onChange={(e) => setHeroAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 accent-green-600 focus:ring-green-500 cursor-pointer"
                  required
                />
                <label htmlFor="hero-privacy" className="text-xs text-white/90 leading-snug cursor-pointer select-none">
                  Я даю согласие на обработку персональных данных и соглашаюсь с{" "}
                  <a
                    href="#privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-300 underline hover:text-green-200"
                  >
                    политикой конфиденциальности
                  </a>
                </label>
              </div>
            </form>
          ) : (
            <div className="flex items-center gap-3 px-8 py-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.9)", color: "#2d7a3a" }}>
              <Icon name="CheckCircle" size={28} className="text-green-500" />
              <div className="text-left">
                <div className="font-bold">Спасибо! Заявка принята.</div>
                <div className="text-sm text-gray-500">Мы свяжемся с вами в ближайшее время</div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-gray-50/60 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 text-center mb-8" style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.2em" }}>
              почему выбирают нас
            </p>
          </SectionReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
            {advantages.map((adv, i) => (
              <SectionReveal key={i} delay={i * 80}>
                <div className="px-6 py-2 flex flex-col items-center text-center group">
                  <Icon name={adv.icon} size={20} className="text-gray-300 mb-3 group-hover:text-green-400 transition-colors duration-300" />
                  <h3 className="text-gray-500 text-sm font-medium mb-1 group-hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: "'Georgia', serif" }}>
                    {adv.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed hidden lg:block">{adv.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50" id="services">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Наши услуги</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Выполняем все виды строительных и ремонтных работ</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {SERVICES.map((svc, i) => (
              <SectionReveal key={i} delay={i * 60} className="h-full">
                <div
                  className="card-service group cursor-pointer h-full flex flex-col justify-between"
                  onClick={() => onNavigateService ? onNavigateService(svc.id) : onOpenModal()}
                >
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img src={svc.img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="service-overlay absolute inset-0 flex flex-col justify-end p-4">
                        <span className="text-white font-black text-lg">{svc.title}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm leading-relaxed">{svc.desc}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                      Подробнее <Icon name="ArrowRight" size={14} />
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Рассчитайте стоимость</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Заполните форму и получите предварительный расчёт за 15 минут</p>
            </div>
          </SectionReveal>

          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-0 mb-10">
              {[1, 2, 3].map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className={`step-indicator ${calcStep === step ? "active" : calcStep > step ? "done" : "inactive"}`}>
                    {calcStep > step ? <Icon name="Check" size={16} /> : step}
                  </div>
                  {i < 2 && (
                    <div className={`h-0.5 w-16 md:w-24 transition-colors duration-300 ${calcStep > step ? "bg-green-500" : "bg-gray-200"}`} />
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
                  <h3 className="text-xl font-black text-gray-900 mb-2">Шаг 2: Сроки</h3>
                  <p className="text-gray-500 text-sm mb-5">Когда планируете начать?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {deadlines.map((d) => (
                      <button
                        key={d}
                        className={`calc-option ${calcData.deadline === d ? "selected" : ""}`}
                        onClick={() => { setCalcData({ ...calcData, deadline: d }); setCalcStep(3); }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setCalcStep(1)} className="mt-4 text-gray-500 text-sm hover:text-gray-700 flex items-center gap-1">
                    <Icon name="ChevronLeft" size={14} /> Назад
                  </button>
                </div>
              )}

              {calcStep === 3 && !calcSent && (
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Шаг 3: Ваши контакты</h3>
                  <p className="text-gray-500 text-sm mb-5">Пришлём расчёт и перезвоним</p>
                  <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-100">
                    <div className="text-sm text-gray-600">
                      <span className="font-bold text-gray-800">Услуга:</span> {calcData.type}<br />
                      <span className="font-bold text-gray-800">Срок:</span> {calcData.deadline}
                    </div>
                  </div>
                  <form onSubmit={handleCalcSubmit} className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Ваше имя *</label>
                      <input className="form-input" type="text" placeholder="Иван Иванов" value={calcName} onChange={(e) => setCalcName(e.target.value)} required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Где находится объект?</label>
                      <input className="form-input" type="text" placeholder="Например: Истра, КП Лесной или Москва" value={calcLocation} onChange={(e) => setCalcLocation(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Телефон *</label>
                      <input className="form-input" type="tel" placeholder="+7 (___) ___-__-__" value={calcPhone} onChange={(e) => setCalcPhone(formatPhoneNumber(e.target.value))} required />
                    </div>

                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="calc-privacy"
                        checked={calcAgreed}
                        onChange={(e) => setCalcAgreed(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-gray-300 accent-green-600 focus:ring-green-500 cursor-pointer"
                        required
                      />
                      <label htmlFor="calc-privacy" className="text-xs text-gray-500 leading-snug cursor-pointer select-none">
                        Я даю согласие на обработку персональных данных и соглашаюсь с{" "}
                        <a
                          href="#privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 underline hover:text-green-700"
                        >
                          политикой конфиденциальности
                        </a>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!calcAgreed}
                      className="btn-green w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Icon name="Send" size={18} />
                      Получить расчёт
                    </button>
                  </form>
                  <button onClick={() => setCalcStep(2)} className="mt-4 text-gray-500 text-sm hover:text-gray-700 flex items-center gap-1">
                    <Icon name="ChevronLeft" size={14} /> Назад
                  </button>
                </div>
              )}

              {calcSent && (
                <div className="text-center py-8">
                  <Icon name="CheckCircle" size={52} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-gray-900 mb-2">Спасибо!</h3>
                  <p className="text-gray-500">Заявка принята. Мы свяжемся с вами в ближайшее время</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Наши работы</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Фотографии реальных объектов, сданных под ключ</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {galleryItems.map((item, i) => (
              <SectionReveal key={i} delay={i * 60}>
                <div
                  className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square"
                  onClick={() => setLightbox(item)}
                >
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3">
                    <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.title}</span>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <ReviewsCarousel />

      <section className="py-16 md:py-24 bg-white" id="discounts">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Icon name="Tag" size={16} /> Скидки и социальная поддержка
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Помогаем тем, кто нуждается в поддержке</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Мы ценим каждого клиента и предоставляем специальные условия для льготных категорий граждан</p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12 items-stretch">
            {[
              { icon: "UserCheck", title: "Пенсионеры", desc: "Скидка для граждан пенсионного возраста" },
              { icon: "Heart", title: "Инвалиды и ветераны", desc: "Скидка для инвалидов и ветеранов всех категорий" },
              { icon: "Shield", title: "Семьи участников СВО", desc: "Особые условия для семей участников специальной военной операции" },
              { icon: "Users", title: "Многодетные семьи", desc: "Скидка для семей с тремя и более детьми" },
            ].map((item, i) => (
              <SectionReveal key={i} delay={i * 100} className="h-full">
                <div className="h-full flex flex-col items-center text-center p-6 rounded-2xl border-2 border-green-100 hover:border-green-400 transition-colors group">
                  <div className="w-16 h-16 rounded-2xl bg-green-100 group-hover:bg-green-500 flex items-center justify-center mb-4 transition-colors shrink-0">
                    <Icon name={item.icon} size={28} className="text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-500 text-sm">Уточните размер скидки по телефону — рассмотрим каждый случай индивидуально</p>
              <a
                href={`tel:${PHONE}`}
                className="btn-green inline-flex"
              >
                <Icon name="Phone" size={18} />
                Позвонить и уточнить скидку
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

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
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                      <Icon name="MapPin" size={24} />
                    </div>
                    <div>
                      <p className="text-green-200 text-sm">Регион работы</p>
                      <p className="text-white font-bold">Москва и Московская область</p>
                    </div>
                  </div>
                </div>

                <a href={`tel:${PHONE}`} className="btn-white">
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
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Ваше имя *</label>
                      <input className="form-input" type="text" placeholder="Иван Иванов" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Где находится объект?</label>
                      <input className="form-input" type="text" placeholder="Например: Истра, КП Лесной или Москва" value={contactLocation} onChange={(e) => setContactLocation(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Телефон *</label>
                      <input className="form-input" type="tel" placeholder="+7 (___) ___-__-__" value={contactPhone} onChange={(e) => setContactPhone(formatPhoneNumber(e.target.value))} required />
                    </div>

                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="contact-privacy"
                        checked={contactAgreed}
                        onChange={(e) => setContactAgreed(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-gray-300 accent-green-600 focus:ring-green-500 cursor-pointer"
                        required
                      />
                      <label htmlFor="contact-privacy" className="text-xs text-gray-500 leading-snug cursor-pointer select-none">
                        Я даю согласие на обработку персональных данных и соглашаюсь с{" "}
                        <a
                          href="#privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 underline hover:text-green-700"
                        >
                          политикой конфиденциальности
                        </a>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!contactAgreed}
                      className="btn-green w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Icon name="Send" size={18} />
                      Отправить заявку
                    </button>
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

      {lightbox && (
        <div className="modal-overlay" onClick={() => setLightbox(null)}>
          <div className="max-w-3xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute -top-12 right-0 text-white hover:text-green-300 transition-colors">
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