import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Star, Heart, Beef, Drumstick } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const PieGallery = () => {
  const pieFlavors = [
    {
      name: "Chicken Mild",
      price: 30,
      description: "Tender chicken with mild spices",
      icon: Drumstick,
      color: "from-orange-400 to-red-500",
      image: "/piephone1.jpeg",
      alt: "Chicken Mild Pie - Tender and flavorful",
    },
    {
      name: "Chicken Hot",
      price: 30,
      description: "Spicy chicken with bold flavors",
      icon: Flame,
      color: "from-red-500 to-pink-600",
      image: "/piephone1view2.jpeg",
      alt: "Chicken Hot Pie - Spicy and delicious",
    },
    {
      name: "Beef Mild",
      price: 40,
      description: "Premium beef with mild seasoning",
      icon: Beef,
      color: "from-amber-600 to-orange-700",
      image: "/piephoto1view3.jpeg",
      alt: "Beef Mild Pie - Rich and savory",
    },
    {
      name: "Beef Hot",
      price: 40,
      description: "Spicy beef with intense flavor",
      icon: Flame,
      color: "from-red-600 to-red-800",
      image: "/piephone1.jpeg",
      alt: "Beef Hot Pie - Bold and spicy",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-semibold">
            Our Pie Collection
          </Badge>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Choose Your Flavor
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From tender chicken to premium beef, each pie is handmade with fresh
            ingredients, wrapped in our signature golden crust. Mix and match
            flavors in your cart!
          </p>
        </div>

        {/* Flavor Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {pieFlavors.map((flavor, index) => {
            const Icon = flavor.icon;
            return (
              <Card
                key={flavor.name}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-primary/10 hover:border-primary/30 bg-gradient-to-b from-card to-card/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={flavor.image}
                      alt={flavor.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`p-2 rounded-full bg-gradient-to-r ${flavor.color} backdrop-blur-sm`}
                          >
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="text-white text-xl font-bold">
                            {flavor.name}
                          </h3>
                        </div>
                        <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                          {flavor.description}
                        </p>
                      </div>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent/90 text-accent-foreground backdrop-blur-sm font-bold shadow-lg text-lg px-3 py-1">
                        R{flavor.price}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Carousel - Mobile */}
        <div className="md:hidden max-w-7xl mx-auto mb-16 px-4">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {pieFlavors.map((flavor, index) => {
                const Icon = flavor.icon;
                return (
                  <CarouselItem key={flavor.name}>
                    <Card className="border-2 border-primary/10 bg-gradient-to-b from-card to-card/50">
                      <CardContent className="p-0">
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={flavor.image}
                            alt={flavor.alt}
                            className="w-full h-full object-cover"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60" />

                          {/* Content Overlay */}
                          <div className="absolute inset-0 flex flex-col justify-end p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className={`p-2 rounded-full bg-gradient-to-r ${flavor.color} backdrop-blur-sm`}
                              >
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                              <h3 className="text-white text-xl font-bold">
                                {flavor.name}
                              </h3>
                            </div>
                            <p className="text-gray-200 text-sm">
                              {flavor.description}
                            </p>
                          </div>

                          {/* Price Badge */}
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-accent/90 text-accent-foreground backdrop-blur-sm font-bold shadow-lg text-lg px-3 py-1">
                              R{flavor.price}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Call to Action Box */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Chicken Pies: R30 | Beef Pies: R40
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Mix and match any combination in your cart!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-orange-50 dark:bg-orange-950/30">
                  <Drumstick className="h-6 w-6 text-orange-600" />
                  <span className="font-semibold text-orange-700 dark:text-orange-300">
                    Chicken Mild
                  </span>
                  <span className="text-muted-foreground">R30</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-red-50 dark:bg-red-950/30">
                  <Flame className="h-6 w-6 text-red-600" />
                  <span className="font-semibold text-red-700 dark:text-red-300">
                    Chicken Hot
                  </span>
                  <span className="text-muted-foreground">R30</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30">
                  <Beef className="h-6 w-6 text-amber-600" />
                  <span className="font-semibold text-amber-700 dark:text-amber-300">
                    Beef Mild
                  </span>
                  <span className="text-muted-foreground">R40</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-red-50 dark:bg-red-950/30">
                  <Flame className="h-6 w-6 text-red-600" />
                  <span className="font-semibold text-red-700 dark:text-red-300">
                    Beef Hot
                  </span>
                  <span className="text-muted-foreground">R40</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
