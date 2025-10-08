import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PieGallery } from "@/components/PieGallery";
import { OrderForm } from "@/components/OrderForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PieGallery />
        <OrderForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
