import { useState } from "react";
import {
  BadgePercent,
  Beef,
  Drumstick,
  Flame,
  Info,
  Minus,
  Plus,
  ShoppingCart,
  Sparkles,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type FlavorName =
  | "Chicken Mild"
  | "Chicken Hot"
  | "Beef Mild"
  | "Beef Hot"
  | "Chicken and Mushroom"
  | "Cheesy Chicken Pie"
  | "Chips Rolls"
  | "Russian Roll"
  | "Wors Rolls"
  | "Small Chips";

type MenuItem = {
  name: FlavorName;
  displayName: string;
  categoryLabel: "Pie" | "Rolls";
  description: string;
  price: number;
  image: string;
  alt: string;
  icon: LucideIcon;
  tag: string;
  isNew?: boolean;
  spicy?: boolean;
  available?: boolean;
};

type SpecialDeal = {
  id: string;
  title: string;
  description: string;
  items: { flavor: FlavorName; quantity: number }[];
  badge: string;
  priceLabel?: string;
};

const menuItems: MenuItem[] = [
  {
    name: "Chicken Mild",
    displayName: "Chicken Mild Pie",
    categoryLabel: "Pie",
    description: "Golden crust, tender chicken, mild spices, and creamy gravy.",
    price: 29.99,
    image: "/piephone1.jpeg",
    alt: "Chicken mild pie",
    icon: Drumstick,
    tag: "Chicken",
  },
  {
    name: "Chicken Hot",
    displayName: "Chicken Hot Pie",
    categoryLabel: "Pie",
    description: "Bold heat with juicy chicken and a fiery finish.",
    price: 29.99,
    image: "/piephone1view2.jpeg",
    alt: "Chicken hot pie",
    icon: Flame,
    tag: "Chicken",
    spicy: true,
  },
  {
    name: "Beef Mild",
    displayName: "Beef Mild Pie",
    categoryLabel: "Pie",
    description: "Rich beef filling, savory gravy, and a flaky crust.",
    price: 39.99,
    image: "/piephoto1view3.jpeg",
    alt: "Beef mild pie",
    icon: Beef,
    tag: "Beef",
  },
  {
    name: "Beef Hot",
    displayName: "Beef Hot Pie",
    categoryLabel: "Pie",
    description: "Smoky beef with a spicy kick and extra flavor.",
    price: 39.99,
    image: "/piephoto1view3.jpeg",
    alt: "Beef hot pie",
    icon: Flame,
    tag: "Beef",
    spicy: true,
  },
  {
    name: "Chicken and Mushroom",
    displayName: "Chicken & Mushroom Pie",
    categoryLabel: "Pie",
    description: "Creamy chicken and mushroom blend with a smooth finish.",
    price: 34.99,
    image: "/piephone1.jpeg",
    alt: "Chicken and mushroom pie",
    icon: Drumstick,
    tag: "Chicken",
    isNew: true,
    available: false,
  },
  {
    name: "Cheesy Chicken Pie",
    displayName: "Cheesy Chicken Pie",
    categoryLabel: "Pie",
    description: "Chicken and melted cheese in a buttery crust.",
    price: 34.99,
    image: "/piephone1view2.jpeg",
    alt: "Cheesy chicken pie",
    icon: Drumstick,
    tag: "Chicken",
    isNew: true,
  },
  {
    name: "Chips Rolls",
    displayName: "Chips Rolls",
    categoryLabel: "Rolls",
    description: "Crispy chips roll with signature seasoning.",
    price: 24.99,
    image: "/chipsRolls.jpeg",
    alt: "Chips rolls",
    icon: Star,
    tag: "Sides",
    isNew: true,
    available: false,
  },
  {
    name: "Russian Roll",
    displayName: "Russian Roll",
    categoryLabel: "Rolls",
    description: "Hearty roll with classic, bold flavor.",
    price: 19.99,
    image: "/russianrolls.jpeg",
    alt: "Russian roll",
    icon: Star,
    tag: "Sides",
    isNew: true,
    available: false,
  },
  {
    name: "Wors Rolls",
    displayName: "Wors Rolls",
    categoryLabel: "Rolls",
    description: "Grilled wors roll filled with chips and smoky flavor.",
    price: 29.0,
    image: "/worsrolls.jpeg",
    alt: "Wors rolls",
    icon: Star,
    tag: "Sides",
    isNew: true,
    available: false,
  },
];

const valueCombos: SpecialDeal[] = [
  {
    id: "value-combo-1",
    title:
      "Daily Premium Special: 3 Chicken pies + side chips + drink + Russian",
    description: "All-day daily premium special.",
    items: [
      { flavor: "Chicken Mild", quantity: 3 },
      { flavor: "Small Chips", quantity: 1 },
      { flavor: "Russian Roll", quantity: 1 },
    ],
    badge: "Daily premium special (all day)",
    priceLabel: "R119.99",
  },
  {
    id: "value-combo-2",
    title:
      "Daily Premium Special: 2 Chicken + 1 Beef + side chips + drink + Russian",
    description: "All-day daily premium special.",
    items: [
      { flavor: "Chicken Mild", quantity: 2 },
      { flavor: "Beef Mild", quantity: 1 },
      { flavor: "Small Chips", quantity: 1 },
      { flavor: "Russian Roll", quantity: 1 },
    ],
    badge: "Daily premium special (all day)",
    priceLabel: "R124.99",
  },
  {
    id: "value-combo-3",
    title:
      "Daily Premium Special: 2 Beef + 1 Chicken + side chips + drink + Russian",
    description: "All-day daily premium special.",
    items: [
      { flavor: "Beef Mild", quantity: 2 },
      { flavor: "Chicken Mild", quantity: 1 },
      { flavor: "Small Chips", quantity: 1 },
      { flavor: "Russian Roll", quantity: 1 },
    ],
    badge: "Daily premium special (all day)",
    priceLabel: "R129.99",
  },
];

const lunchBoxSpecials: SpecialDeal[] = [
  {
    id: "lunch-box-chicken",
    title: "Lunch Box: 1 Chicken pie + drink + side chips",
    description: "Everyday special from 8:00 AM to 1:30 PM.",
    items: [
      { flavor: "Chicken Mild", quantity: 1 },
      { flavor: "Small Chips", quantity: 1 },
    ],
    badge: "Lunch box (8:00 AM - 1:30 PM)",
    priceLabel: "R49.99",
  },
  {
    id: "lunch-box-beef",
    title: "Lunch Box: 1 Beef pie + drink + small chips",
    description: "Everyday special from 8:00 AM to 1:30 PM.",
    items: [
      { flavor: "Beef Mild", quantity: 1 },
      { flavor: "Small Chips", quantity: 1 },
    ],
    badge: "Lunch box (8:00 AM - 1:30 PM)",
    priceLabel: "R59.99",
  },
];

const fridaySpecial: SpecialDeal = {
  id: "friday-special-2beef-1chicken",
  title: "Heavenly Friday Special: 2 Beef + 1 Chicken",
  description: "Free drink and side chips included.",
  items: [
    { flavor: "Beef Mild", quantity: 2 },
    { flavor: "Chicken Mild", quantity: 1 },
    { flavor: "Small Chips", quantity: 1 },
  ],
  badge: "Friday only",
  priceLabel: "R89.00",
};

const dispatchAddToCart = (flavor: FlavorName, quantity = 1) => {
  window.dispatchEvent(
    new CustomEvent("pie:add-to-cart", { detail: { flavor, quantity } }),
  );
};

export const PieGallery = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [specialsOpen, setSpecialsOpen] = useState(false);

  const handleAddDeal = (deal: SpecialDeal) => {
    deal.items.forEach((item) => dispatchAddToCart(item.flavor, item.quantity));
    setSpecialsOpen(false);
  };

  return (
    <section id="menu" className="relative py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(/piephoto1view3.jpeg)" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <Badge className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-semibold shadow-lg">
            Our Pie Collection
          </Badge>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
            Pick Your Menu
          </h2>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Freshly baked pies and rolls with bold flavor. Tap any item to view
            details and add it to your cart.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <button
            type="button"
            onClick={() => setSpecialsOpen(true)}
            className="w-full"
          >
            <Card className="border-2 border-white/20 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-2xl overflow-hidden">
              <CardHeader className="flex flex-col gap-3">
                <div className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-extrabold">
                  <Sparkles className="h-7 w-7" />
                  Value Combos, Lunch Box & Friday Specials
                  <Sparkles className="h-7 w-7" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Badge className="bg-white text-red-700 font-bold tracking-wide px-4 py-1 text-xs uppercase shadow-lg">
                    Tap to view deals
                  </Badge>
                  <CardDescription className="text-white/90 text-base md:text-lg">
                    Value combos all day, lunch box specials 8:00 AM - 1:30 PM,
                    plus a Friday-only deal. Add a special to your cart and
                    customize in the order form.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  if (item.available === false) return;
                  setSelectedItem(item);
                  setSelectedQuantity(1);
                }}
                className="text-left"
              >
                <Card
                  className={`group overflow-hidden border-2 border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 ${
                    item.available === false
                      ? "opacity-70"
                      : "hover:border-white/40 hover:-translate-y-1"
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-2 text-white">
                          <span className="p-2 rounded-full bg-white/15 backdrop-blur-sm">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-xs uppercase tracking-wide text-white/80">
                              {item.tag}
                            </p>
                            <h3 className="text-lg font-bold">
                              {item.displayName}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-3 left-3 flex flex-col gap-2 items-start">
                        <Badge className="bg-white/90 text-foreground font-semibold text-sm px-3 py-1">
                          R{item.price.toFixed(2)}
                        </Badge>
                        {item.spicy && (
                          <Badge className="bg-red-600/90 text-white text-xs">
                            Hot
                          </Badge>
                        )}
                        {item.isNew && (
                          <Badge className="bg-yellow-400 text-black text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-0 right-0 translate-x-[28%] -translate-y-[28%] rotate-[135deg] origin-top-right">
                        <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white text-[10px] font-extrabold px-4 py-1 uppercase tracking-[0.2em] shadow-[0_8px_20px_rgba(220,38,38,0.35)] border border-white/30 rounded-sm">
                          {item.categoryLabel}
                        </span>
                      </div>
                      {item.available === false && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-red-600 text-white text-xs font-extrabold px-3 py-1 uppercase rounded shadow">
                            Out of stock
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-200 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-white/80 text-sm">
                        <span className="flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          {item.available === false
                            ? "Unavailable"
                            : "Tap for details"}
                        </span>
                        <span className="font-semibold text-white">
                          R{item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog
        open={Boolean(selectedItem)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedItem(null);
            setSelectedQuantity(1);
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="space-y-4">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    {selectedItem.displayName}
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground">
                    {selectedItem.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-muted text-foreground">
                    {selectedItem.tag}
                  </Badge>
                  {selectedItem.spicy && (
                    <Badge className="bg-red-600 text-white">Hot</Badge>
                  )}
                  {selectedItem.isNew && (
                    <Badge className="bg-yellow-400 text-black">New</Badge>
                  )}
                </div>
                <div className="text-3xl font-extrabold text-foreground">
                  R{selectedItem.price.toFixed(2)}
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Quantity
                  </span>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setSelectedQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-bold">
                      {selectedQuantity}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedQuantity((prev) => prev + 1)}
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    dispatchAddToCart(selectedItem.name, selectedQuantity);
                    setSelectedItem(null);
                    setSelectedQuantity(1);
                  }}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to cart
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={specialsOpen} onOpenChange={setSpecialsOpen}>
        <DialogContent className="max-w-3xl w-[95vw] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold flex items-center gap-2">
              <BadgePercent className="h-6 w-6 text-primary" />
              Value Combos, Lunch Box & Friday Specials
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              Value combos are available all day. Lunch box specials run every
              day from 8:00 AM to 1:30 PM. The Friday special runs every Friday.
              Add a deal to your cart and customize in the order form.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Value Combos (All Day)
              </h3>
              {valueCombos.map((deal) => (
                <Card key={deal.id} className="border border-border">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-foreground">
                          {deal.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {deal.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <Info className="h-4 w-4" />
                          <span>{deal.badge}</span>
                          {deal.priceLabel && (
                            <Badge className="bg-primary/10 text-primary border border-primary/20">
                              {deal.priceLabel}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleAddDeal(deal)}
                        className="shrink-0"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add deal to cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Lunch Box Everyday Special (8:00 AM - 1:30 PM)
              </h3>
              {lunchBoxSpecials.map((deal) => (
                <Card key={deal.id} className="border border-border">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-foreground">
                          {deal.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {deal.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <Info className="h-4 w-4" />
                          <span>{deal.badge}</span>
                          {deal.priceLabel && (
                            <Badge className="bg-primary/10 text-primary border border-primary/20">
                              {deal.priceLabel}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleAddDeal(deal)}
                        className="shrink-0"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add deal to cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Heavenly Friday Special
              </h3>
              <Card className="border border-border">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-foreground">
                        {fridaySpecial.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {fridaySpecial.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Info className="h-4 w-4" />
                        <span>{fridaySpecial.badge}</span>
                        {fridaySpecial.priceLabel && (
                          <Badge className="bg-primary/10 text-primary border border-primary/20">
                            {fridaySpecial.priceLabel}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAddDeal(fridaySpecial)}
                      className="shrink-0"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add deal to cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
