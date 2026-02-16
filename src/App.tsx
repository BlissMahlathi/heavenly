import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [stage, setStage] = useState<"welcome" | "good" | "done">("welcome");
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setAnimateOut(true), 1600);
    const goodTimer = window.setTimeout(() => {
      setStage("good");
      setAnimateOut(false);
    }, 2200);
    const doneTimer = window.setTimeout(() => setStage("done"), 3600);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(goodTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {stage !== "done" && (
          <div className="splash-screen" role="status" aria-live="polite">
            <div className="splash-card">
              <img
                src="/logonewpic.png"
                alt="Heavenly Pies logo"
                className="splash-logo"
              />
              {stage === "welcome" ? (
                <p
                  className={`splash-message ${
                    animateOut ? "splash-message-exit" : "splash-message-enter"
                  }`}
                >
                  Welcome to Heavenly Pies bringing you a little taste of
                  heaven.
                </p>
              ) : (
                <p className="splash-message splash-message-enter">
                  Good shopping!
                </p>
              )}
            </div>
          </div>
        )}
        <BrowserRouter>
          <div className={stage !== "done" ? "splash-underlay" : undefined}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
