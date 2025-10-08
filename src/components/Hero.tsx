import { Button } from "@/components/ui/button";
import { ChefHat, Clock, MapPin } from "lucide-react";

export const Hero = () => {
  const scrollToOrder = () => {
    document
      .getElementById("order-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center hero-bg"
        style={{ backgroundImage: `url(/piephone1.jpeg)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 animate-fade-in">
            <ChefHat className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            <span className="text-xs sm:text-sm font-semibold text-primary">
              Freshly Baked Daily
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 text-white leading-tight animate-slide-up">
            Delicious Chicken <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              n Pepper Pies
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-4 sm:mb-6 font-medium animate-slide-up-delay">
            Fresh, handmade pies crafted with love and delivered hot to your
            door
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8 animate-fade-in-delay">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 sm:px-4 sm:py-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              <span className="text-white font-medium text-sm sm:text-base">
                Quick Delivery
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 sm:px-4 sm:py-2">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              <span className="text-white font-medium text-sm sm:text-base">
                Local Service
              </span>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 animate-slide-up-delay-2">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl px-6 py-3 sm:px-8 sm:py-4 shadow-2xl text-center sm:text-left">
              <p className="text-xs sm:text-sm text-primary-foreground/90 font-medium">
                Starting at
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-primary-foreground">
                R30
              </p>
              <p className="text-xs sm:text-sm text-primary-foreground/90">
                per pie
              </p>
            </div>

            <Button
              onClick={scrollToOrder}
              size="lg"
              className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 font-bold text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 rounded-xl"
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
