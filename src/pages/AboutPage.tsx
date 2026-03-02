import Icon from "@/components/ui/icon";
import SectionReveal from "@/components/SectionReveal";

interface AboutPageProps {
  onOpenModal: () => void;
}

const team = [
  { name: "Александр Громов", role: "Руководитель проектов", exp: "15 лет опыта" },
  { name: "Дмитрий Павлов", role: "Главный прораб", exp: "12 лет опыта" },
  { name: "Николай Федоров", role: "Инженер-конструктор", exp: "10 лет опыта" },
  { name: "Сергей Кузнецов", role: "Мастер кровли", exp: "8 лет опыта" },
];

const stats = [
  { value: "500+", label: "Сданных объектов" },
  { value: "10+", label: "Лет на рынке" },
  { value: "3 года", label: "Гарантия" },
  { value: "48ч", label: "Выезд специалиста" },
];

export default function AboutPage({ onOpenModal }: AboutPageProps) {
  return (
    <div className="pt-24">
      <div className="green-gradient-bg py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-4">О компании</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Более 10 лет строим и ремонтируем дома в Москве и области
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-6">
                  Строим честно, работаем на результат
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-900">СтройДвор</strong> — компания с 10-летним опытом в строительстве и ремонте. Мы работаем без посредников: собственная бригада, собственная техника, собственная ответственность.
                  </p>
                  <p>
                    За годы работы мы сдали более 500 объектов — от небольших пристроек до капитальной реконструкции домов. Каждый проект сопровождается договором с фиксированной сметой.
                  </p>
                  <p>
                    Мы даём гарантию на все виды выполненных работ и устраняем недостатки бесплатно в гарантийный период.
                  </p>
                </div>
                <button onClick={onOpenModal} className="btn-green mt-8">
                  <Icon name="Phone" size={18} />
                  Позвоните нам
                </button>
              </div>
            </SectionReveal>
            <SectionReveal delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="bg-green-50 rounded-2xl p-6 text-center border border-green-100">
                    <div className="text-3xl font-black text-green-600 mb-1">{s.value}</div>
                    <div className="text-gray-600 text-sm font-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <h2 className="text-3xl font-black text-gray-900 text-center mb-12">Наши преимущества</h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "Users", title: "Собственная бригада", desc: "Работаем только своими силами — никаких субподрядчиков. Полный контроль качества на каждом этапе." },
              { icon: "FileText", title: "Договор и смета", desc: "Фиксируем стоимость в договоре до начала работ. Цена не меняется без вашего согласия." },
              { icon: "Shield", title: "Гарантия на работы", desc: "От 1 до 5 лет в зависимости от вида работ. Устраняем все дефекты бесплатно." },
              { icon: "Clock", title: "Соблюдение сроков", desc: "Сдаём объекты точно в срок. За просрочку предусмотрена неустойка — прописываем в договоре." },
              { icon: "Camera", title: "Фотоотчёт", desc: "Ежедневно присылаем фото с объекта в мессенджер. Вы видите ход работ в режиме реального времени." },
              { icon: "Truck", title: "Своя техника", desc: "Собственный парк строительной техники — без лишних затрат на аренду и ожидание." },
            ].map((item, i) => (
              <SectionReveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-green-50 hover-lift flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} size={22} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <h2 className="text-3xl font-black text-gray-900 text-center mb-12">Наша команда</h2>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <SectionReveal key={i} delay={i * 80}>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4 text-3xl font-black text-green-600">
                    {member.name[0]}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{member.name}</h3>
                  <p className="text-green-600 text-xs font-600 mb-1">{member.role}</p>
                  <p className="text-gray-400 text-xs">{member.exp}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}