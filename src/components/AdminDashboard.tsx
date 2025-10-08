import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  MessageCircle,
  Coins,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  quantity: number;
  total_price: number;
  delivery_address: string;
  payment_method: string;
  change_needed: boolean;
  customer_amount: number | null;
  calculated_change: number | null;
  special_notes: string | null;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<
    "all" | "pending" | "accepted" | "cancelled"
  >("all");

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel("orders-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    status: "accepted" | "cancelled"
  ) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);

      if (error) throw error;

      toast.success(`Order ${status} successfully`);
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };

  const getWhatsAppLink = (order: Order) => {
    let message = `Hi ${order.customer_name}! Your order of ${order.quantity} pie(s) for R${order.total_price} has been received and is being prepared. `;

    if (
      order.payment_method === "cash" &&
      order.change_needed &&
      order.calculated_change
    ) {
      message += `You're paying with R${order.customer_amount} and your change will be R${order.calculated_change}. `;
    }

    message += `We'll deliver it to ${order.delivery_address} soon. Thank you!`;

    return `https://wa.me/${order.customer_phone.replace(
      /\s/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/90 text-warning-foreground";
      case "accepted":
        return "bg-success/90 text-success-foreground";
      case "cancelled":
        return "bg-destructive/90 text-destructive-foreground";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card className="shadow-xl border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle className="text-2xl">Orders Management</CardTitle>
        <CardDescription>View and manage customer orders</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs
          defaultValue="all"
          onValueChange={(value) =>
            setFilter(value as "all" | "pending" | "accepted" | "cancelled")
          }
        >
          <TabsList className="grid w-full grid-cols-4 mb-6 h-12">
            <TabsTrigger value="all" className="text-base">
              All ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-base">
              Pending ({orders.filter((o) => o.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="accepted" className="text-base">
              Accepted ({orders.filter((o) => o.status === "accepted").length})
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="text-base">
              Cancelled ({orders.filter((o) => o.status === "cancelled").length}
              )
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg font-medium">No orders found</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className="border-l-4 border-l-primary shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            #{order.id.slice(0, 8).toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold">
                          {order.customer_name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4" />
                          {new Date(order.created_at).toLocaleString()}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {order.customer_phone}
                          </span>
                        </div>
                        {order.customer_email && (
                          <div className="text-sm text-muted-foreground">
                            Email: {order.customer_email}
                          </div>
                        )}
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span>{order.delivery_address}</span>
                        </div>
                      </div>

                      <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
                        <div className="text-sm flex justify-between">
                          <span className="text-muted-foreground">
                            Quantity:
                          </span>
                          <span className="font-semibold">
                            {order.quantity} pie(s)
                          </span>
                        </div>
                        <div className="text-sm flex justify-between">
                          <span className="text-muted-foreground">Total:</span>
                          <span className="font-bold text-lg text-primary">
                            R{order.total_price}
                          </span>
                        </div>
                        <div className="text-sm flex justify-between">
                          <span className="text-muted-foreground">
                            Payment:
                          </span>
                          <span className="font-semibold">
                            {order.payment_method.toUpperCase()}
                          </span>
                        </div>
                        {order.payment_method === "cash" &&
                          order.change_needed &&
                          order.calculated_change !== null && (
                            <div className="bg-accent/20 p-2 rounded border border-accent/40 mt-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Coins className="h-4 w-4 text-accent-foreground" />
                                <span className="text-muted-foreground">
                                  Customer pays:
                                </span>
                                <span className="font-semibold">
                                  R{order.customer_amount}
                                </span>
                              </div>
                              <div className="text-sm font-bold text-accent-foreground mt-1">
                                Change: R{order.calculated_change.toFixed(2)}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>

                    {order.special_notes && (
                      <div className="bg-accent/10 p-3 rounded-lg border border-accent/30">
                        <div className="text-sm font-semibold mb-1">
                          Special Instructions:
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.special_notes}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      {order.status === "pending" && (
                        <>
                          <Button
                            onClick={() =>
                              updateOrderStatus(order.id, "accepted")
                            }
                            className="bg-success hover:bg-success/90 text-success-foreground flex-1"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Order Received
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              updateOrderStatus(order.id, "cancelled")
                            }
                            className="flex-1"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Mark Cancelled
                          </Button>
                        </>
                      )}
                      {order.status === "accepted" && (
                        <Button variant="outline" asChild className="w-full">
                          <a
                            href={getWhatsAppLink(order)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Send Follow-up on WhatsApp
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
