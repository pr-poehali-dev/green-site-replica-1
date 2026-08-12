import { useState } from "react";
import Icon from "@/components/ui/icon";
import SectionReveal from "@/components/SectionReveal";

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

export default function ContactsPage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    const { sendTelegram } = await import("@/lib/sendTelegram");
    await sendTelegram(
      name,
      phone,
      location,
      message ? `Сообщение: ${message}` : "Форма: контакты"
    );
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
                      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Позвонить</p>
                      <p className="text-gray-900 font-black text-xl">+7 980 480 0123</p>
                    </div>
                    <Icon name="ArrowRight" size={18} className="ml-auto text-green-500" />
                  </a>

                  <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-green-100">
                    <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                      <Icon name="Clock" size={26} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Режим работы</p>
                      <p className="text-gray-900 font-bold text-base">Круглосуточно, 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-green-100">
                    <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                      <Icon name="MapPin" size={26} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Регион работы</p>
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
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Ваше имя *</label>
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
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Где находится объект?</label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Например: Истра, КП Лесной или Москва"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Телефон *</label>
                      <input
                        className="form-input"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Сообщение</label>
                      <textarea
                        className="form-input resize-none"
                        rows={4}
                        placeholder="Опишите ваш проект или задачу..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="contacts-privacy"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-gray-300 accent-green-600 focus:ring-green-500 cursor-pointer"
                        required
                      />
                      <label htmlFor="contacts-privacy" className="text-xs text-gray-500 leading-snug cursor-pointer select-none">
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
                      disabled={!agreed}
                      className="btn-green w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Icon name="Send" size={18} />
                      Отправить заявку
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-50 flex flex-col items-center justify-center text-center min-h-96">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <Icon name="CheckCircle" size={44} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Спасибо!</h3>
                  <p className="text-gray-500 mb-6">Заявка принята. Мы свяжемся с вами в ближайшее время</p>
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