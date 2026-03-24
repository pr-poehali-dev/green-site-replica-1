import { useState } from "react";
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
  { name: "Андрей Колесников", text: "Заказывали пристройку к частному дому. Ребята сделали всё чисто и в срок. Смета не изменилась ни на копейку. Рекомендую!", rating: 5, work: "Пристройка" },
  { name: "Марина Светлова", text: "Меняли кровлю на даче. Приятно удивила скорость работы и чистота на объекте. Через неделю всё было готово.", rating: 5, work: "Кровля" },
  { name: "Виктор Захаров", text: "Делали фундамент под гараж. Качество отличное, всё по технологии. Дали гарантию на 3 года. Буду обращаться ещё.", rating: 5, work: "Фундамент" },
  { name: "Ольга Панова", text: "Утепляли дом снаружи. Мастера вежливые, аккуратные. Результат превзошёл ожидания — в доме стало намного теплее.", rating: 5, work: "Утепление" },
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

export default function HomePage({ onOpenModal, onNavigateService }: HomePageProps) {
  const [heroPhone, setHeroPhone] = useState("");
  const [heroSent, setHeroSent] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [lightbox, setLightbox] = useState<null | { img: string; title: string }>(null);
  const [calcStep, setCalcStep] = useState(1);
  const [calcData, setCalcData] = useState({ type: "", deadline: "" });
  const [calcName, setCalcName] = useState("");
  const [calcPhone, setCalcPhone] = useState("");
  const [calcSent, setCalcSent] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactSent, setContactSent] = useState(false);

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { sendTelegram } = await import("@/lib/sendTelegram");
    await sendTelegram("Не указано", heroPhone, "Форма: герой (узнать стоимость)");
    setHeroSent(true);
  };
  const handleCalcSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { sendTelegram } = await import("@/lib/sendTelegram");
    await sendTelegram(calcName, calcPhone, `Форма: калькулятор\nВид работ: ${calcData.type}\nСрок: ${calcData.deadline}`);
    setCalcSent(true);
  };
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { sendTelegram } = await import("@/lib/sendTelegram");
    await sendTelegram(contactName, contactPhone, "Форма: контактная секция");
    setContactSent(true);
  };

  return (
    <>
      {/* HERO */}
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
            <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input
                className="form-input flex-1 text-center sm:text-left"
                style={{ background: "rgba(255,255,255,0.92)", borderRadius: "12px", minWidth: 0 }}
                type="tel"
                placeholder="Ваш телефон"
                value={heroPhone}
                onChange={(e) => setHeroPhone(e.target.value)}
                required
              />
              <button type="submit" className="btn-green whitespace-nowrap px-6 py-3 text-base font-bold" style={{ borderRadius: "12px" }}>
                <Icon name="Calculator" size={18} />
                Узнайте стоимость бесплатно
              </button>
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
            {SERVICES.map((svc, i) => (
              <SectionReveal key={i} delay={i * 60}>
                <div
                  className="card-service group cursor-pointer"
                  onClick={() => onNavigateService ? onNavigateService(svc.id) : onOpenModal()}
                >
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

      {/* CALCULATOR / QUIZ */}
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
                    <input className="form-input" type="text" placeholder="Ваше имя" value={calcName} onChange={(e) => setCalcName(e.target.value)} required />
                    <input className="form-input" type="tel" placeholder="+7 (___) ___-__-__" value={calcPhone} onChange={(e) => setCalcPhone(e.target.value)} required />
                    <button type="submit" className="btn-green w-full justify-center py-4 text-base">
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

      {/* GALLERY */}
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
                <a href={`tel:${PHONE}`} className="btn-outline-green border-white text-white hover:bg-white hover:text-green-700 inline-flex">
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
                  <h3 className="text-xl font-black text-gray-900 mb-2">Спасибо!</h3>
                  <p className="text-gray-500">Заявка принята. Мы свяжемся с вами в ближайшее время</p>
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