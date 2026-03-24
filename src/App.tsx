import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";
import ServicesPage from "./pages/ServicesPage";
import WorksPage from "./pages/WorksPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import CallbackModal from "./components/CallbackModal";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentServiceId, setCurrentServiceId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") || "home";
    setCurrentPage(hash);
  }, []);

  const navigate = (page: string) => {
    if (page === "reviews") {
      setCurrentPage("home");
      setCurrentServiceId(null);
      window.location.hash = "home";
      setTimeout(() => {
        const el = document.getElementById("reviews");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return;
    }
    setCurrentPage(page);
    setCurrentServiceId(null);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateService = (serviceId: string) => {
    setCurrentServiceId(serviceId);
    setCurrentPage("service");
    window.location.hash = `service-${serviceId}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    if (currentPage === "service" && currentServiceId) {
      return (
        <ServicePage
          serviceId={currentServiceId}
          onOpenModal={() => setIsModalOpen(true)}
          onBack={() => navigate("home")}
        />
      );
    }
    switch (currentPage) {
      case "services": return <ServicesPage onOpenModal={() => setIsModalOpen(true)} />;
      case "works": return <WorksPage onOpenModal={() => setIsModalOpen(true)} />;
      case "about": return <AboutPage onOpenModal={() => setIsModalOpen(true)} />;
      case "contacts": return <ContactsPage />;
      default: return (
        <HomePage
          onOpenModal={() => setIsModalOpen(true)}
          onNavigateService={navigateService}
        />
      );
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