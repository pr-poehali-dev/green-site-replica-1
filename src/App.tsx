import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import WorksPage from "./pages/WorksPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import CallbackModal from "./components/CallbackModal";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") || "home";
    setCurrentPage(hash);
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "services": return <ServicesPage onOpenModal={() => setIsModalOpen(true)} />;
      case "works": return <WorksPage onOpenModal={() => setIsModalOpen(true)} />;
      case "about": return <AboutPage onOpenModal={() => setIsModalOpen(true)} />;
      case "contacts": return <ContactsPage />;
      default: return <HomePage onOpenModal={() => setIsModalOpen(true)} />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="font-manrope min-h-screen flex flex-col">
        <Header currentPage={currentPage} navigate={navigate} onOpenModal={() => setIsModalOpen(true)} />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer navigate={navigate} />
        {isModalOpen && <CallbackModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </TooltipProvider>
  );
}
