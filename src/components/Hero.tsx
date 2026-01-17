import { Button } from "@/components/ui/button";
import { Clock, MapPin, ShieldCheck, Star } from "lucide-react";

export const Hero = () => {
  const scrollToOrder = () => {
    document
      .getElementById("order-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary">
                Trusted Local Bakery
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Shop Freshly Baked
              <span className="text-primary"> Chicken & Beef Pies</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground">
              Order in minutes. Hot, flaky pies delivered fast or ready for
              pickup.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-primary" />
                Same-day delivery
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-primary" />
                Local area service
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium">
                <Star className="h-4 w-4 text-amber-500" />
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
                  loading="eager"
                />
              </div>
              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold">
                    Chicken & Beef Pie
                  </h2>
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    In stock
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Flaky crust, rich filling, baked fresh daily.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-primary">
                      R30
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      per pie
                    </span>
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
