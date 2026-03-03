import { useState } from "react";
import Icon from "@/components/ui/icon";
import SectionReveal from "@/components/SectionReveal";

export default function ContactsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-24">
      <div className="green-gradient-bg py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Контакты</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <SectionReveal>
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-8">Как с нами связаться</h2>
                <div className="space-y-5">
                  <a
                    href="tel:+79804800123"
                    className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-green-100 hover-lift group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                      <Icon name="Phone" size={26} className="text-green-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-600 uppercase tracking-wide mb-1">Позвонить</p>
                      <p className="text-gray-900 font-black text-xl">+7 980 480 0123</p>
                    </div>
                    <Icon name="ArrowRight" size={18} className="ml-auto text-green-500" />
                  </a>

                  <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-green-100">
                    <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                      <Icon name="Clock" size={26} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-600 uppercase tracking-wide mb-1">Режим работы</p>
                      <p className="text-gray-900 font-bold text-base">Ежедневно: 8:00 – 20:00</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-green-100">
                    <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                      <Icon name="MapPin" size={26} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-600 uppercase tracking-wide mb-1">Регион работы</p>
                      <p className="text-gray-900 font-bold text-base">Москва и Московская область</p>
                    </div>
                  </div>
                </div>

                <a
                  href="tel:+79804800123"
                  className="btn-green mt-8 inline-flex text-base py-4 px-8"
                >
                  <Icon name="PhoneCall" size={20} />
                  Позвонить сейчас
                </a>

                <div className="mt-8 p-5 bg-green-50 rounded-2xl border border-green-200">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-green-800 text-sm mb-1">Бесплатный выезд специалиста</p>
                      <p className="text-green-700 text-sm">Замер и консультация на вашем объекте — бесплатно. Позвоните или оставьте заявку.</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={150}>
              {!sent ? (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-50">
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Оставить заявку</h2>
                  <p className="text-gray-500 text-sm mb-6">Ответим в течение 15 минут</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-600 text-gray-700 mb-1">Ваше имя *</label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Иван Иванов"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-600 text-gray-700 mb-1">Телефон *</label>
                      <input
                        className="form-input"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-600 text-gray-700 mb-1">Сообщение</label>
                      <textarea
                        className="form-input resize-none"
                        rows={4}
                        placeholder="Опишите ваш проект или задачу..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn-green w-full justify-center py-4 text-base">
                      <Icon name="Send" size={18} />
                      Отправить заявку
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-50 flex flex-col items-center justify-center text-center min-h-96">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <Icon name="CheckCircle" size={44} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Заявка принята!</h3>
                  <p className="text-gray-500 mb-6">Мы свяжемся с вами в течение 15 минут</p>
                  <a href="tel:+79804800123" className="btn-green">
                    <Icon name="Phone" size={18} />
                    +7 980 480 0123
                  </a>
                </div>
              )}
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}