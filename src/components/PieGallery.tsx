import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Star, Heart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const PieGallery = () => {
  const pieImages = [
    {
      src: "/piephone1.jpeg",
      alt: "Delicious Chicken & Pepper Pie - View 1",
      title: "Freshly Baked",
      icon: Flame,
      description: "Hot out of the oven",
    },
    {
      src: "/piephone1view2.jpeg",
      alt: "Delicious Chicken & Pepper Pie - View 2",
      title: "Golden & Crispy",
      icon: Star,
      description: "Perfect golden crust",
    },
    {
      src: "/piephoto1view3.jpeg",
      alt: "Delicious Chicken & Pepper Pie - View 3",
      title: "Made with Love",
      icon: Heart,
      description: "Crafted with care",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-semibold">
            Our Signature Pies
          </Badge>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Our Delicious Pies
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Handmade with love, filled with tender chicken and flavorful
            peppers, wrapped in our signature golden crust
          </p>
        </div>

        {/* Gallery Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {pieImages.map((image, index) => {
            const Icon = image.icon;
            return (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-primary/10 hover:border-primary/30 bg-gradient-to-b from-card to-card/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-2 rounded-full bg-primary/20 backdrop-blur-sm">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="text-white text-2xl font-bold">
                            {image.title}
                          </h3>
                        </div>
                        <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                          {image.description}
                        </p>
                      </div>
                    </div>

                    {/* Corner Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent/90 text-accent-foreground backdrop-blur-sm font-bold shadow-lg">
                        R30
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
                delay: 3000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {pieImages.map((image, index) => {
                const Icon = image.icon;
                return (
                  <CarouselItem key={index}>
                    <Card className="border-2 border-primary/10 bg-gradient-to-b from-card to-card/50">
                      <CardContent className="p-0">
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60" />

                          {/* Content Overlay */}
                          <div className="absolute inset-0 flex flex-col justify-end p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-2 rounded-full bg-primary/20 backdrop-blur-sm">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <h3 className="text-white text-2xl font-bold">
                                {image.title}
                              </h3>
                            </div>
                            <p className="text-gray-200 text-sm">
                              {image.description}
                            </p>
                          </div>

                          {/* Corner Badge */}
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-accent/90 text-accent-foreground backdrop-blur-sm font-bold shadow-lg">
                              R30
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
                Only R30 per pie
              </h3>
              <div className="flex flex-wrap justify-center gap-4 text-muted-foreground font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Fresh ingredients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span>Made daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-secondary" />
                  <span>Delivered hot</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
