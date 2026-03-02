import Icon from "@/components/ui/icon";
import SectionReveal from "@/components/SectionReveal";

interface AboutPageProps {
  onOpenModal: () => void;
}

const team = [
  { name: "Александр Громов", role: "Руководитель проектов", exp: "15 лет" },
  { name: "Дмитрий Павлов", role: "Главный прораб", exp: "12 лет" },
  { name: "Николай Федоров", role: "Инженер-конструктор", exp: "10 лет" },
  { name: "Сергей Кузнецов", role: "Мастер кровли", exp: "8 лет" },
];

const stats = [
  { value: "500+", label: "объектов сдано" },
  { value: "10+", label: "лет на рынке" },
  { value: "3 года", label: "гарантия" },
  { value: "48ч", label: "выезд мастера" },
];

const perks = [
  { icon: "Users", title: "Собственная бригада", desc: "Только свои мастера — никаких субподрядчиков. Полный контроль качества на каждом этапе." },
  { icon: "FileText", title: "Договор и смета", desc: "Фиксируем стоимость до начала работ. Цена не меняется без вашего согласия." },
  { icon: "Shield", title: "Гарантия на работы", desc: "От 1 до 5 лет в зависимости от вида работ. Дефекты устраняем бесплатно." },
  { icon: "Clock", title: "Соблюдение сроков", desc: "Сдаём объекты точно в срок. Неустойка за просрочку прописана в договоре." },
  { icon: "Camera", title: "Фотоотчёт", desc: "Ежедневно присылаем фото с объекта в мессенджер. Вы в курсе каждого шага." },
  { icon: "Truck", title: "Своя техника", desc: "Собственный парк строительной техники — без лишних затрат и ожидания." },
];

export default function AboutPage({ onOpenModal }: AboutPageProps) {
  return (
    <div className="pt-24" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* HERO — тёмная тема */}
      <section style={{ background: "#1a1a1a" }} className="py-20">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.25em] mb-5" style={{ color: "#a8c5a0" }}>
              о компании
            </p>
            <h1
              className="text-5xl md:text-7xl font-bold leading-tight mb-8"
              style={{ color: "#f5f0e8", fontFamily: "'Georgia', serif" }}
            >
              Строим честно.<br />
              <span style={{ color: "#6db87a" }}>Работаем на результат.</span>
            </h1>
          </SectionReveal>
          <SectionReveal delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-14" style={{ borderTop: "1px solid #333" }}>
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-4xl md:text-5xl font-bold mb-1" style={{ color: "#6db87a" }}>{s.value}</div>
                  <div className="text-sm" style={{ color: "#888", fontFamily: "'Manrope', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* STORY — кремовый фон */}
      <section style={{ background: "#f5f0e8" }} className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: "#8a7a5a", fontFamily: "'Manrope', sans-serif" }}>
                  наша история
                </p>
                <div className="space-y-5 text-lg leading-relaxed" style={{ color: "#3d3428" }}>
                  <p>
                    <strong>СтройДвор</strong> — компания с 10-летним опытом в строительстве и ремонте. Мы работаем без посредников: собственная бригада, собственная техника, собственная ответственность.
                  </p>
                  <p>
                    За годы работы сдано более 500 объектов — от небольших пристроек до капитальной реконструкции домов. Каждый проект сопровождается договором с фиксированной сметой.
                  </p>
                  <p>
                    Мы даём гарантию на все виды выполненных работ и устраняем недостатки бесплатно в гарантийный период.
                  </p>
                </div>
                <button
                  onClick={onOpenModal}
                  className="mt-10 inline-flex items-center gap-3 px-8 py-4 font-bold text-sm tracking-wide transition-all duration-300 hover:gap-5"
                  style={{
                    background: "#1a1a1a",
                    color: "#f5f0e8",
                    borderRadius: "4px",
                    fontFamily: "'Manrope', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  Позвонить нам
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </SectionReveal>

            <SectionReveal delay={150}>
              <div className="space-y-4">
                <div
                  className="p-8 rounded-sm"
                  style={{ background: "#1a1a1a", color: "#f5f0e8" }}
                >
                  <p className="text-sm mb-3" style={{ color: "#6db87a", fontFamily: "'Manrope', sans-serif", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                    Наш принцип
                  </p>
                  <p className="text-xl leading-relaxed" style={{ fontFamily: "'Georgia', serif" }}>
                    «Цена, согласованная до начала работ, — это цена, которую вы заплатите. Не больше.»
                  </p>
                </div>
                <div
                  className="p-8 rounded-sm"
                  style={{ background: "#e8e0d0", color: "#3d3428" }}
                >
                  <p className="text-sm mb-3" style={{ color: "#8a7a5a", fontFamily: "'Manrope', sans-serif", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                    Регион работы
                  </p>
                  <p className="text-xl font-bold" style={{ fontFamily: "'Georgia', serif" }}>
                    Москва и Московская область
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* PERKS — тёмная тема */}
      <section style={{ background: "#111" }} className="py-20">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#6db87a", fontFamily: "'Manrope', sans-serif" }}>
              преимущества
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-14" style={{ color: "#f5f0e8" }}>
              Почему нам доверяют
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "#2a2a2a" }}>
            {perks.map((item, i) => (
              <SectionReveal key={i} delay={i * 60}>
                <div
                  className="p-8 group transition-colors duration-300"
                  style={{ background: "#111" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1a2a1a")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
                >
                  <Icon name={item.icon} size={22} className="mb-5" style={{ color: "#6db87a" }} />
                  <h3 className="font-bold text-base mb-3" style={{ color: "#f5f0e8", fontFamily: "'Manrope', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666", fontFamily: "'Manrope', sans-serif" }}>
                    {item.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM — кремовый */}
      <section style={{ background: "#f5f0e8" }} className="py-20">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#8a7a5a", fontFamily: "'Manrope', sans-serif" }}>
              команда
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-14" style={{ color: "#1a1a1a" }}>
              Люди, которым доверяют объекты
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <SectionReveal key={i} delay={i * 80}>
                <div>
                  <div
                    className="w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4"
                    style={{
                      background: "#1a1a1a",
                      color: "#6db87a",
                      fontFamily: "'Georgia', serif",
                    }}
                  >
                    {member.name[0]}
                  </div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: "#1a1a1a", fontFamily: "'Manrope', sans-serif" }}>
                    {member.name}
                  </h3>
                  <p className="text-xs mb-1" style={{ color: "#6db87a", fontFamily: "'Manrope', sans-serif" }}>
                    {member.role}
                  </p>
                  <p className="text-xs" style={{ color: "#aaa", fontFamily: "'Manrope', sans-serif" }}>
                    опыт {member.exp}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
