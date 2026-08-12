import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl z-50 bg-white/95 backdrop-blur-md rounded-2xl p-4 md:px-6 shadow-2xl border border-green-100 transition-all duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 flex-1 text-center md:text-left">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0 text-green-600 hidden sm:flex">
            <Icon name="Cookie" size={20} />
          </div>
          <p className="text-xs md:text-sm text-gray-600 leading-snug">
            <span className="font-bold text-gray-900 mr-1">Мы используем cookie.</span>
            Сайт использует файлы cookie для корректной работы. Продолжая просмотр, вы соглашаетесь с{" "}
            <a
              href="#privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline hover:text-green-700 font-medium whitespace-nowrap"
            >
              политикой конфиденциальности
            </a>.
          </p>
        </div>

        <button
          onClick={handleAccept}
          className="btn-green w-full md:w-auto whitespace-nowrap px-6 py-2.5 text-xs font-bold shrink-0"
        >
          Принять и продолжить
        </button>
      </div>
    </div>
  );
}