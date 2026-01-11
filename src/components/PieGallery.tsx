import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
  // Date-based logic for NEW badges
  const launchDate = new Date("2026-01-11"); // January 11, 2026
  const twoMonthsLater = new Date(launchDate);
  twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2); // March 11, 2026
  const currentDate = new Date();
  const showNewBadges = currentDate < twoMonthsLater;

  const pieFlavors = [
    {
      name: "Chicken Mild",
      price: 29.99,
      description: "Tender chicken with mild spices",
      icon: Drumstick,
      color: "from-orange-400 to-red-500",
      image: "/piephone1.jpeg",
      alt: "Chicken Mild Pie - Tender and flavorful",
    },
    {
      name: "Chicken Hot",
      price: 29.99,
      description: "Spicy chicken with bold flavors",
      icon: Flame,
      color: "from-red-500 to-pink-600",
      image: "/piephone1view2.jpeg",
      alt: "Chicken Hot Pie - Spicy and delicious",
    },
    {
      name: "Beef Mild",
      price: 39.99,
      description: "Premium beef with mild seasoning",
      icon: Beef,
      color: "from-amber-600 to-orange-700",
      image: "/piephoto1view3.jpeg",
      alt: "Beef Mild Pie - Rich and savory",
    },
    {
      name: "Beef Hot",
      price: 39.99,
      description: "Spicy beef with intense flavor",
      icon: Flame,
      color: "from-red-600 to-red-800",
      image: "/piephone1.jpeg",
      alt: "Beef Hot Pie - Bold and spicy",
    },
    {
      name: "Chicken and Mushroom",
      price: 34.99,
      description: "Creamy chicken with fresh mushrooms",
      icon: Drumstick,
      color: "from-yellow-400 to-orange-500",
      image: "/piephone1.jpeg",
      alt: "Chicken and Mushroom Pie - Fresh and savory",
    },
    {
      name: "Cheesy Chicken Pie",
      price: 34.99,
      description: "Golden cheese melted with tender chicken",
      icon: Drumstick,
      color: "from-yellow-500 to-amber-600",
      image: "/piephone1view2.jpeg",
      alt: "Cheesy Chicken Pie - Rich and creamy",
    },
    {
      name: "Chip Rolls",
      price: 24.99,
      description: "Crispy rolls filled with hot chips",
      icon: Star,
      color: "from-amber-400 to-orange-600",
      image: "/chipsRolls.jpeg",
      alt: "Chip Rolls - Crispy and crunchy",
    },
    {
      name: "Russian Roll",
      price: 19.99,
      description: "Classic Russian style roll",
      icon: Star,
      color: "from-orange-500 to-red-600",
      image: "/russianrolls.jpeg",
      alt: "Russian Roll - Traditional favorite",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(/piephoto1view3.jpeg)` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-semibold shadow-lg">
            Our Pie Collection
          </Badge>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
            Choose Your Flavor
          </h2>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
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
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-white/20 hover:border-primary/50 bg-white/10 backdrop-blur-sm"
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
                    <Card className="border-2 border-white/20 bg-white/10 backdrop-blur-sm">
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
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="overflow-hidden border-2 border-white/30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Chicken Pies: R29.99 | Beef Pies: R39.99
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Mix and match any combination in your cart!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {/* Original Items */}
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-orange-50 dark:bg-orange-950/30">
                  <Drumstick className="h-6 w-6 text-orange-600" />
                  <span className="font-semibold text-orange-700 dark:text-orange-300">
                    Chicken Mild
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    R29.99
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-red-50 dark:bg-red-950/30">
                  <Flame className="h-6 w-6 text-red-600" />
                  <span className="font-semibold text-red-700 dark:text-red-300">
                    Chicken Hot
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    R29.99
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30">
                  <Beef className="h-6 w-6 text-amber-600" />
                  <span className="font-semibold text-amber-700 dark:text-amber-300">
                    Beef Mild
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    R39.99
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-red-50 dark:bg-red-950/30">
                  <Flame className="h-6 w-6 text-red-600" />
                  <span className="font-semibold text-red-700 dark:text-red-300">
                    Beef Hot
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    R39.99
                  </span>
                </div>

                {/* New Items with "NEW" Badge */}
                <div className="relative flex flex-col items-center gap-2 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border-2 border-yellow-400 dark:border-yellow-600">
                  {showNewBadges && (
                    <div
                      className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                      style={{
                        transform: "rotate(45deg)",
                        transformOrigin: "center",
                      }}
                    >
                      NEW
                    </div>
                  )}
                  <Drumstick className="h-6 w-6 text-yellow-600" />
                  <span className="font-semibold text-yellow-700 dark:text-yellow-300">
                    Chicken & Mushroom
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    R34.99
                  </span>
                </div>
                <div className="relative flex flex-col items-center gap-2 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border-2 border-yellow-400 dark:border-yellow-600">
                  {showNewBadges && (
                    <div
                      className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                      style={{
                        transform: "rotate(45deg)",
                        transformOrigin: "center",
                      }}
                    >
                      NEW
                    </div>
                  )}
                  <Drumstick className="h-6 w-6 text-yellow-600" />
                  <span className="font-semibold text-yellow-700 dark:text-yellow-300">
                    Cheesy Chicken
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    R34.99
                  </span>
                </div>
                <div className="relative flex flex-col items-center gap-2 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border-2 border-yellow-400 dark:border-yellow-600">
                  {showNewBadges && (
                    <div
                      className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                      style={{
                        transform: "rotate(45deg)",
                        transformOrigin: "center",
                      }}
                    >
                      NEW
                    </div>
                  )}
                  <Star className="h-6 w-6 text-yellow-600" />
                  <span className="font-semibold text-yellow-700 dark:text-yellow-300">
                    Chip Rolls
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    R24.99
                  </span>
                </div>
                <div className="relative flex flex-col items-center gap-2 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border-2 border-yellow-400 dark:border-yellow-600">
                  {showNewBadges && (
                    <div
                      className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                      style={{
                        transform: "rotate(45deg)",
                        transformOrigin: "center",
                      }}
                    >
                      NEW
                    </div>
                  )}
                  <Star className="h-6 w-6 text-yellow-600" />
                  <span className="font-semibold text-yellow-700 dark:text-yellow-300">
                    Russian Roll
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    R19.99
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Friday Special Deals */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-2 border-yellow-400 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-white py-6 sm:py-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Star className="h-8 w-8 fill-white" />
                <CardTitle className="text-3xl md:text-4xl font-extrabold">
                  🎉 FRIDAY SPECIAL DEALS 🎉
                </CardTitle>
                <Star className="h-8 w-8 fill-white" />
              </div>
              <CardDescription className="text-white text-center text-lg font-semibold mt-2">
                Available Every Friday - Limited Time Offers!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6">
                {/* Deal 1 */}
                <div className="bg-white dark:bg-gray-900/50 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🥧</div>
                    <div className="flex-1">
                      <h4 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                        Buy 3 Pies - Get FREE Drink! 🥤
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Order any 3 pies of your choice and receive a
                        complimentary drink on us!
                      </p>
                      <div className="mt-3 inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                        Save with every 3 pies!
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deal 2 */}
                <div className="bg-white dark:bg-gray-900/50 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🍗</div>
                    <div className="flex-1">
                      <h4 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                        2 Chicken + 1 Beef Pie = FREE Drink! 🥤
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Get 2 Chicken Pies and 1 Beef Pie in one order and enjoy
                        a free drink!
                      </p>
                      <div className="mt-3 inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                        Perfect combo deal!
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deal 3 */}
                <div className="bg-white dark:bg-gray-900/50 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🥩</div>
                    <div className="flex-1">
                      <h4 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                        2 Beef + 1 Chicken Pie = FREE Drink! 🥤
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Get 2 Beef Pies and 1 Chicken Pie in one order and enjoy
                        a free drink!
                      </p>
                      <div className="mt-3 inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-3 py-1 rounded-full text-sm font-semibold">
                        Beef lovers special!
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded text-sm text-gray-700 dark:text-gray-200 italic">
                  <p>
                    💡 <strong>Tip:</strong> Mix and match any Chicken and Beef
                    varieties to qualify for these amazing Friday deals! Order
                    now and save!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
