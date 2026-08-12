import Icon from "@/components/ui/icon";
import SectionReveal from "@/components/SectionReveal";
import { PHONE } from "@/pages/HomePage";

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
    <div className="pt-24">
      <div className="green-gradient-bg py-16 md:py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <SectionReveal>
            <span className="inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
              О компании
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Строим честно.<br />
              <span className="text-green-300">Работаем на результат.</span>
            </h1>
          </SectionReveal>

          <SectionReveal delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12 pt-10 border-t border-white/20">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-5xl font-black text-white mb-1">{s.value}</div>
                  <div className="text-sm text-green-100 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <SectionReveal>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-100 px-3 py-1 rounded-full mb-4 inline-block">
                  Наша история
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Надёжный подрядчик с 10-летним опытом</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-base">
                  <p>
                    <strong>Строй-Ремонт</strong> — компания с 10-летним опытом в строительстве и ремонте. Мы работаем без посредников: собственная бригада, собственная техника, собственная ответственность.
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
                  className="btn-green mt-8 inline-flex text-base py-4 px-8"
                >
                  <Icon name="PhoneCall" size={18} />
                  Заказать консультацию
                </button>
              </div>
            </SectionReveal>

            <SectionReveal delay={150}>
              <div className="space-y-4">
                <div className="p-8 rounded-2xl bg-white shadow-sm border border-green-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">
                    Наш принцип
                  </p>
                  <p className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
                    «Цена, согласованная до начала работ, — это цена, которую вы заплатите. Не больше.»
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-green-50 border border-green-200">
                  <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">
                    Регион работы
                  </p>
                  <p className="text-xl font-black text-green-900">
                    Москва и Московская область
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-100 px-3 py-1 rounded-full mb-3 inline-block">
                Преимущества
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Почему нам доверяют</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Стандарты качества, за которые мы отвечаем репутацией</p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {perks.map((item, i) => (
              <SectionReveal key={i} delay={i * 60}>
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-green-300 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 text-green-600 shrink-0">
                    <Icon name={item.icon} size={22} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Icon name="Tag" size={16} /> Социальная поддержка
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Скидки для льготных категорий</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Мы ценим каждого клиента и предоставляем специальные условия для тех, кто нуждается в поддержке.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10 items-stretch">
            {[
              { icon: "UserCheck", title: "Пенсионеры", desc: "Скидка для граждан пенсионного возраста" },
              { icon: "Heart", title: "Инвалиды и ветераны", desc: "Скидка для инвалидов и ветеранов всех категорий" },
              { icon: "Shield", title: "Семьи участников СВО", desc: "Особые условия для семей участников СВО" },
              { icon: "Users", title: "Многодетные семьи", desc: "Скидка для семей с тремя и более детьми" },
            ].map((item, i) => (
              <SectionReveal key={i} delay={i * 80} className="h-full">
                <div className="h-full flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-green-100 shadow-sm hover:border-green-400 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-4 shrink-0">
                    <Icon name={item.icon} size={26} className="text-green-600" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="text-center">
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

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-100 px-3 py-1 rounded-full mb-3 inline-block">
                Команда
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Люди, которым доверяют объекты</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Опытные специалисты с профильным образованием</p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <SectionReveal key={i} delay={i * 80}>
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-black text-2xl mb-4 shadow-sm">
                    {member.name[0]}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">{member.name}</h3>
                  <p className="text-xs text-green-600 font-bold mb-1">{member.role}</p>
                  <p className="text-xs text-gray-400">опыт {member.exp}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}