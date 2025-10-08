import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LogOut, LogIn } from "lucide-react";
import AdminDashboard from "@/components/AdminDashboard";
import AdminAnalytics from "@/components/AdminAnalytics";
import { AdminNotifications } from "@/components/AdminNotifications";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (!roles) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // Show Sign In page if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-3 sm:p-4">
        <Card className="w-full max-w-[95vw] sm:max-w-md shadow-2xl">
          <CardHeader className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6">
            <div className="mx-auto mb-2 sm:mb-4 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <LogIn className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Admin Panel
            </CardTitle>
            <CardDescription className="text-sm sm:text-base mt-2">
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-bold text-base sm:text-lg h-12 sm:h-14 shadow-lg"
            >
              <LogIn className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              size="lg"
              className="w-full h-11 sm:h-12"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show access denied if authenticated but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-3 sm:p-4">
        <Card className="w-full max-w-[95vw] sm:max-w-md shadow-2xl">
          <CardHeader className="text-center space-y-2 sm:space-y-3 p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-destructive">
              Access Denied
            </CardTitle>
            <CardDescription className="text-sm sm:text-base mt-2">
              You don't have admin privileges to access this page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              size="lg"
              className="w-full h-11 sm:h-12"
            >
              Back to Home
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="lg"
              className="w-full h-11 sm:h-12"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <AdminNotifications />
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="text-sm">Logout</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 h-10 sm:h-11">
            <TabsTrigger value="orders" className="text-sm sm:text-base">
              Orders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm sm:text-base">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="analytics">
            <AdminAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
