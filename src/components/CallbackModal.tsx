import { useState } from "react";
import Icon from "@/components/ui/icon";

interface CallbackModalProps {
  onClose: () => void;
}

export default function CallbackModal({ onClose }: CallbackModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                <label className="block text-sm font-600 text-gray-700 mb-1">Ваше имя</label>
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
                <label className="block text-sm font-600 text-gray-700 mb-1">Телефон</label>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-green w-full justify-center text-base py-4">
                <Icon name="PhoneCall" size={18} />
                Перезвоните мне
              </button>
              <p className="text-xs text-gray-400 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <Icon name="CheckCircle" size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Заявка принята!</h2>
            <p className="text-gray-500 mb-6">
              Мы перезвоним вам в течение 15 минут
            </p>
            <a href="tel:+79092111130" className="btn-green justify-center inline-flex">
              <Icon name="Phone" size={18} />
              +7 909 211 1130
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
