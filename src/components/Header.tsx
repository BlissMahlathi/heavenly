import { Phone, Mail, Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg sm:rounded-xl opacity-20 blur-sm" />
              <img
                src="/logo.png"
                alt="Heavenly Pies Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 relative z-10 rounded-lg sm:rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Heavenly Pies
              </h1>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium hidden xs:block">
                🥧 Beaked with Love, Taste Like Heaven 🥧
              </p>
            </div>
          </div>

          {/* Desktop Contact Info */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+27663621868"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-all duration-300 group"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-semibold">066 362 1868</span>
            </a>
            <a
              href="mailto:renoldamaenetja7@gmail.com"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-all duration-300 group"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-semibold">
                renoldamaenetja7@gmail.com
              </span>
            </a>
            <Button
              onClick={() => navigate("/auth")}
              variant="default"
              size="sm"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Admin Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9 sm:h-10 sm:w-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 sm:mt-4 pb-3 sm:pb-4 space-y-2 sm:space-y-3 animate-fade-in">
            <a
              href="tel:+27663621868"
              className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base">
                066 362 1868
              </span>
            </a>
            <a
              href="mailto:renoldamaenetja7@gmail.com"
              className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base break-all">
                renoldamaenetja7@gmail.com
              </span>
            </a>
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/auth");
              }}
              variant="default"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <LogIn className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Admin Login
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
