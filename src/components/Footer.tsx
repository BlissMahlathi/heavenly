import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
  Heart,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-card to-muted/30 border-t-2 border-primary/20 mt-10 sm:mt-16 lg:mt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(/piephone1.jpeg)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Contact Us
              </h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <a
                href="tel:+27663621868"
                className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-primary transition-all duration-300 group"
              >
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <span className="font-semibold text-sm sm:text-base">
                  066 362 1868
                </span>
              </a>
              <a
                href="mailto:renoldamaenetja7@gmail.com"
                className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-primary transition-all duration-300 group"
              >
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <span className="font-semibold text-xs sm:text-sm break-all">
                  renoldamaenetja7@gmail.com
                </span>
              </a>
              <div className="flex items-start gap-2 sm:gap-3 text-muted-foreground">
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <span className="font-semibold text-sm sm:text-base">
                  Serving the Greater Area
                </span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-4 sm:mb-6">
              Business Hours
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg bg-muted/50">
                <span className="font-semibold text-foreground text-sm sm:text-base">
                  Monday - Friday
                </span>
                <span className="text-primary font-bold text-xs sm:text-sm">
                  9:00 AM - 11:00 PM
                </span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg bg-muted/50">
                <span className="font-semibold text-foreground text-sm sm:text-base">
                  Saturday
                </span>
                <span className="text-muted-foreground font-bold text-xs sm:text-sm">
                  Closed
                </span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg bg-muted/50">
                <span className="font-semibold text-foreground text-sm sm:text-base">
                  Sunday
                </span>
                <span className="text-muted-foreground font-bold text-xs sm:text-sm">
                  Closed
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-4 sm:mb-6">
              Follow Us
            </h3>
            <p className="text-muted-foreground font-medium mb-3 sm:mb-4 text-sm sm:text-base">
              Stay updated with our latest offers and news
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                title="Facebook"
                href="https://facebook.com/heavenlypies"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 hover:from-primary hover:to-secondary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
              >
                <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a
                title="Instagram"
                href="https://instagram.com/heavenlypies"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 hover:from-primary hover:to-secondary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
              >
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a
                title="WhatsApp"
                href="https://wa.me/27663621868"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 hover:from-primary hover:to-secondary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-border text-center space-y-1 sm:space-y-2">
          <p className="text-xs sm:text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Heavenly Pies. All rights
            reserved.
          </p>
          <p className="text-sm sm:text-base font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Baked with Love, Tastes Like Heaven
          </p>
        </div>
      </div>
    </footer>
  );
};
