import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PHONE, PHONE_DISPLAY } from "@/pages/HomePage";

interface CallbackModalProps {
  onClose: () => void;
}

export default function CallbackModal({ onClose }: CallbackModalProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    const { sendTelegram } = await import("@/lib/sendTelegram");
    await sendTelegram(name, phone, location, "Заказ звонка (модалка)");
    setSent(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
        >
          <Icon name="X" size={20} />
        </button>

        {!sent ? (
          <>
            <div className="mb-6">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
                <Icon name="Phone" size={28} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Заказать звонок</h2>
              <p className="text-gray-500 text-sm">
                Перезвоним в течение 15 минут и ответим на все вопросы
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ваше имя *</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Как вас зовут?"
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
                  onChange={handlePhoneChange}
                  required
                />
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="modal-privacy"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 accent-green-600 focus:ring-green-500 cursor-pointer"
                  required
                />
                <label htmlFor="modal-privacy" className="text-xs text-gray-500 leading-snug cursor-pointer select-none">
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
                className="btn-green w-full justify-center text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600 transition-all"
              >
                <Icon name="PhoneCall" size={18} />
                Перезвоните мне
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <Icon name="CheckCircle" size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Спасибо!</h2>
            <p className="text-gray-500 mb-6">
              Заявка принята. Мы свяжемся с вами в ближайшее время
            </p>
            <a href={`tel:${PHONE}`} className="btn-green justify-center inline-flex">
              <Icon name="Phone" size={18} />
              {PHONE_DISPLAY}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}