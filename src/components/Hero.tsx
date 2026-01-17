import { Button } from "@/components/ui/button";
import { Clock, MapPin, Star } from "lucide-react";

export const Hero = () => {
  const scrollToOrder = () => {
    document
      .getElementById("order-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/piephone1.jpeg)` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background/80" />
      </div>
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Shop Freshly Baked Pies
            </h1>

            <p className="text-base sm:text-lg text-gray-200">
              Baked with love, tastes like heaven.
            </p>

            <p className="text-base sm:text-lg text-gray-200">
              Order in minutes. Hot, flaky pies delivered fast or ready for
              pickup.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white">
                <Clock className="h-4 w-4 text-amber-300" />
                Same-day delivery
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white">
                <MapPin className="h-4 w-4 text-amber-300" />
                Local area service
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white">
                <Star className="h-4 w-4 text-amber-300" />
                4.8 rating
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={scrollToOrder}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Order
              </Button>
              <Button
                onClick={scrollToOrder}
                size="lg"
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/10"
              >
                View Menu
              </Button>
            </div>
          </div>

          {/* Right: Product Card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
            <div className="relative bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-muted">
                <img
                  src="/piephone1.jpeg"
                  alt="Freshly baked pies"
                  className="h-full w-full object-cover"
                  decoding="async"
                  fetchPriority="high"
                  loading="eager"
                />
              </div>
              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold">
                    Signature Pies
                  </h2>
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    In stock
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Flaky crust, rich fillings, baked fresh daily.
                </p>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-primary">
                        Chicken: R30
                      </span>
                      <span className="text-xs text-muted-foreground">
                        per pie
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-primary">
                        Beef: R40
                      </span>
                      <span className="text-xs text-muted-foreground">
                        per pie
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={scrollToOrder} size="lg" className="flex-1">
                    Add to Cart
                  </Button>
                  <Button
                    onClick={scrollToOrder}
                    size="lg"
                    variant="outline"
                    className="flex-1"
                  >
                    Customize
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
