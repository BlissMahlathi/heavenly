import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

const PIE_PRICE = 30;
const TRANSFER_FEE = 2;

// Define cart item type
type CartItem = {
  id: string;
  flavor: Flavor;
  quantity: number;
  price: number;
  total: number;
};

// Define available flavors and their prices
const FLAVORS = {
  "Chicken Mild": 30,
  "Chicken Hot": 30,
  "Beef Mild": 40,
  "Beef Hot": 40,
} as const;

type Flavor = keyof typeof FLAVORS;

type OrderResponse = {
  id: string;
  order_number?: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  cart_items?: CartItem[] | Json;
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
};

// Function to send WhatsApp message to admin
const sendWhatsAppNotification = (order: {
  id: string;
  order_number?: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  cart_items?: CartItem[] | Json; // Can be CartItem[] or Json from database
  quantity: number;
  total_price: number;
  delivery_address: string;
  payment_method: string;
  change_needed: boolean;
  customer_amount: number | null;
  calculated_change: number | null;
  special_notes: string | null;
}) => {
  // Your admin WhatsApp number (replace with actual number, e.g., '27663621868' for +27 66 362 1868)
  const adminWhatsAppNumber = "27663621868"; // Change this to your actual number

  const changeInfo = order.change_needed
    ? `Customer paying with: R${order.customer_amount} | Change needed: R${order.calculated_change}`
    : "No change needed";

  // Build order items list - handle both CartItem[] and Json types
  let orderItems = "";
  if (order.cart_items && Array.isArray(order.cart_items)) {
    orderItems = (order.cart_items as CartItem[])
      .map(
        (item) =>
          `• ${item.flavor}: ${item.quantity} pie(s) x R${item.price} = R${item.total}`
      )
      .join("\n");
  } else {
    orderItems = `• Mixed pies: ${order.quantity} pie(s)`;
  }

  const message = `🔔 NEW PIE ORDER!

📋 ORDER #${order.order_number || order.id.slice(0, 8).toUpperCase()}

👤 Customer: ${order.customer_name}
📞 Phone: ${order.customer_phone}
${order.customer_email ? `📧 Email: ${order.customer_email}` : ""}

🥧 Order Items:
${orderItems}

💵 Total: R${order.total_price} (${order.quantity} pie(s) total)

📍 Delivery Address:
${order.delivery_address}

💳 Payment: ${
    order.payment_method === "cash" ? "Cash on Delivery" : "EFT/PayShap"
  }
${changeInfo}

${order.special_notes ? `📝 Notes: ${order.special_notes}` : ""}`;

  // Open WhatsApp with pre-filled message
  const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");
};

// Function to send notification to admin
const sendAdminNotification = async (order: {
  id: string;
  order_number?: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  cart_items?: CartItem[] | Json;
  quantity: number;
  total_price: number;
  delivery_address: string;
  payment_method: string;
  change_needed: boolean;
  customer_amount: number | null;
  calculated_change: number | null;
  special_notes: string | null;
}) => {
  try {
    // Create a detailed notification message
    const changeInfo = order.change_needed
      ? `\n💵 Customer paying with: R${order.customer_amount}\n💰 Change needed: R${order.calculated_change}`
      : "\n✅ No change needed";

    // Build order items list
    const orderItems =
      order.cart_items && Array.isArray(order.cart_items)
        ? (order.cart_items as CartItem[])
            .map(
              (item) =>
                `• ${item.flavor}: ${item.quantity} pie(s) x R${item.price} = R${item.total}`
            )
            .join("\n")
        : `• Chicken Mild: ${order.quantity} pie(s)`;

    const notificationMessage = `
🔔 NEW PIE ORDER RECEIVED!

� ORDER #${order.order_number || order.id.slice(0, 8).toUpperCase()}

�👤 Customer: ${order.customer_name}
📞 Phone: ${order.customer_phone}
${order.customer_email ? `📧 Email: ${order.customer_email}` : ""}

🥧 Order Items:
${orderItems}

💵 Total: R${order.total_price} (${order.quantity} pie(s) total)

📍 Delivery Address:
${order.delivery_address}

💳 Payment Method: ${
      order.payment_method === "cash" ? "Cash on Delivery" : "EFT/PayShap"
    }${changeInfo}

${order.special_notes ? `📝 Special Instructions:\n${order.special_notes}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Order Number: ${order.order_number || order.id.slice(0, 8).toUpperCase()}
Full Order ID: ${order.id}
`;

    // Store notification in database for admin to see
    await supabase.from("admin_notifications").insert({
      order_id: order.id,
      message: notificationMessage,
      is_read: false,
    });

    // You can also integrate with email service here
    // For example, using Supabase Edge Functions or third-party email service

    console.log("Admin notification sent:", notificationMessage);
  } catch (error) {
    console.error("Error sending admin notification:", error);
    // Don't throw error - notification failure shouldn't stop order placement
  }
};

export const OrderForm = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [changeNeeded, setChangeNeeded] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingOrderData, setPendingOrderData] = useState<{
    customer_name: string;
    customer_phone: string;
    customer_email: string | null;
    cart_items: CartItem[];
    total_quantity: number;
    total_price: number;
    delivery_address: string;
    payment_method: string;
    change_needed: boolean;
    customer_amount: number | null;
    calculated_change: number | null;
    special_notes: string | null;
    status: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    paymentMethod: "cash",
    customerAmount: "",
    notes: "",
  });

  // Current item being added to cart
  const [currentItem, setCurrentItem] = useState({
    flavor: "Chicken Mild" as Flavor,
    quantity: 1,
  });

  // Calculate cart totals
  const cartTotal = cart.reduce((sum, item) => sum + item.total, 0);
  const transferFee = formData.paymentMethod === "eft" ? TRANSFER_FEE : 0;
  const finalTotal = cartTotal + transferFee;
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const calculatedChange =
    changeNeeded && formData.customerAmount
      ? Number(formData.customerAmount) - finalTotal
      : 0;

  // Add item to cart
  const addToCart = () => {
    if (currentItem.quantity <= 0) return;

    const newItem: CartItem = {
      id: `${currentItem.flavor}-${Date.now()}`,
      flavor: currentItem.flavor,
      quantity: currentItem.quantity,
      price: FLAVORS[currentItem.flavor],
      total: currentItem.quantity * FLAVORS[currentItem.flavor],
    };

    setCart([...cart, newItem]);
    setCurrentItem({ flavor: "Chicken Mild", quantity: 1 });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  // Update item quantity in cart
  const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
          : item
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (cart.length === 0) {
      toast.error("Please add at least one item to your cart");
      return;
    }

    if (
      formData.paymentMethod === "cash" &&
      changeNeeded &&
      !formData.customerAmount
    ) {
      toast.error("Please specify the amount you're paying with");
      return;
    }

    if (changeNeeded && calculatedChange < 0) {
      toast.error("The amount you're paying is less than the total");
      return;
    }

    // Prepare order data for confirmation
    const orderData = {
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_email: formData.email || null,
      cart_items: cart,
      total_quantity: totalQuantity,
      total_price: finalTotal,
      delivery_address: formData.address,
      payment_method: formData.paymentMethod,
      change_needed: changeNeeded,
      customer_amount: changeNeeded ? Number(formData.customerAmount) : null,
      calculated_change: changeNeeded ? calculatedChange : null,
      special_notes: formData.notes || null,
      status: "pending",
    };

    // Show confirmation dialog instead of submitting immediately
    setPendingOrderData(orderData);
    setShowConfirmDialog(true);
  };

  const confirmAndSubmitOrder = async () => {
    if (!pendingOrderData) return;

    try {
      const { data: newOrder, error } = await supabase
        .from("orders")
        .insert({
          customer_name: pendingOrderData.customer_name,
          customer_phone: pendingOrderData.customer_phone,
          customer_email: pendingOrderData.customer_email,
          quantity: pendingOrderData.total_quantity,
          total_price: pendingOrderData.total_price,
          delivery_address: pendingOrderData.delivery_address,
          payment_method: pendingOrderData.payment_method,
          change_needed: pendingOrderData.change_needed,
          customer_amount: pendingOrderData.customer_amount,
          calculated_change: pendingOrderData.calculated_change,
          special_notes: pendingOrderData.special_notes,
          cart_items: pendingOrderData.cart_items,
          status: pendingOrderData.status,
        })
        .select()
        .single();

      if (error) throw error;

      // Send notification to admin database
      if (newOrder) {
        await sendAdminNotification(newOrder);

        // Send WhatsApp notification
        sendWhatsAppNotification(newOrder);
      }

      // Show order number to customer
      const orderNumber =
        (newOrder as OrderResponse)?.order_number ||
        newOrder?.id.slice(0, 8).toUpperCase() ||
        "";

      toast.success("Order placed successfully!", {
        description: `Order #${orderNumber} - ${pendingOrderData.total_quantity} pie(s) for R${pendingOrderData.total_price}. Check WhatsApp for confirmation!`,
        duration: 6000,
      });

      // Reset form and close dialog
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        paymentMethod: "cash",
        customerAmount: "",
        notes: "",
      });
      setCart([]);
      setCurrentItem({ flavor: "Chicken Mild", quantity: 1 });
      setChangeNeeded(false);
      setShowConfirmDialog(false);
      setPendingOrderData(null);
    } catch (error) {
      toast.error("Failed to place order", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
      setShowConfirmDialog(false);
    }
  };

  return (
    <section
      id="order-section"
      className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-background via-muted/10 to-background"
    >
      <div className="container mx-auto px-3 sm:px-4">
        <Card className="max-w-3xl mx-auto shadow-2xl border-2 border-primary/20 animate-fade-in overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border-b border-primary/10 py-4 sm:py-6 lg:py-8 px-4 sm:px-6">
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Place Your Order
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground font-medium mt-1 sm:mt-2">
              Fill in the details below to order your delicious pies
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-6 lg:pb-8 px-4 sm:px-6 md:px-8 lg:px-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6 lg:space-y-8"
            >
              {/* Add to Cart Section */}
              <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 border-primary/20 shadow-inner">
                <Label className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6 block text-foreground">
                  Add Pies to Your Cart
                </Label>

                <div className="space-y-4">
                  {/* Flavor Selection for Cart */}
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">
                      Select Flavor
                    </Label>
                    <RadioGroup
                      value={currentItem.flavor}
                      onValueChange={(value: Flavor) =>
                        setCurrentItem({ ...currentItem, flavor: value })
                      }
                      className="grid grid-cols-2 gap-2"
                    >
                      {Object.entries(FLAVORS).map(([flavor, price]) => (
                        <div
                          key={flavor}
                          className={`relative p-2 rounded-lg border-2 transition-all cursor-pointer text-xs ${
                            currentItem.flavor === flavor
                              ? "border-primary bg-primary/10"
                              : "border-orange-200 dark:border-orange-800 hover:border-orange-400"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value={flavor}
                              id={`cart-${flavor}`}
                              className="h-3 w-3"
                            />
                            <Label
                              htmlFor={`cart-${flavor}`}
                              className="cursor-pointer flex-1 font-medium"
                            >
                              {flavor}
                            </Label>
                            <span className="text-primary font-bold">
                              R{price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Quantity Selector for Cart */}
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">
                      Quantity
                    </Label>
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setCurrentItem({
                            ...currentItem,
                            quantity: Math.max(1, currentItem.quantity - 1),
                          })
                        }
                        className="h-10 w-10 hover:scale-110 transition-transform border-2 border-primary/30 hover:border-primary"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-2xl font-extrabold w-12 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {currentItem.quantity}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setCurrentItem({
                            ...currentItem,
                            quantity: currentItem.quantity + 1,
                          })
                        }
                        className="h-10 w-10 hover:scale-110 transition-transform border-2 border-primary/30 hover:border-primary"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        Subtotal:{" "}
                      </span>
                      <span className="font-bold text-primary">
                        R{currentItem.quantity * FLAVORS[currentItem.flavor]}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    type="button"
                    onClick={addToCart}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Cart Items Display */}
              {cart.length > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 border-blue-300 dark:border-blue-700 shadow-inner">
                  <Label className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6 block text-foreground">
                    Your Cart ({totalQuantity} pie
                    {totalQuantity !== 1 ? "s" : ""})
                  </Label>

                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-900/40 rounded-lg border border-blue-200 dark:border-blue-800"
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-sm sm:text-base">
                            {item.flavor}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.quantity} x R{item.price} = R{item.total}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateCartItemQuantity(item.id, item.quantity - 1)
                            }
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-bold w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateCartItemQuantity(item.id, item.quantity + 1)
                            }
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-3 mt-4">
                      <div className="flex justify-between items-center text-sm sm:text-base">
                        <span className="font-semibold">Cart Total:</span>
                        <span className="font-bold text-primary">
                          R{cartTotal}
                        </span>
                      </div>
                      {formData.paymentMethod === "eft" && (
                        <div className="flex justify-between items-center text-xs sm:text-sm text-muted-foreground mt-1">
                          <span>+ Transfer fee:</span>
                          <span>R{TRANSFER_FEE}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-base sm:text-lg font-bold mt-2 pt-2 border-t">
                        <span>Final Total:</span>
                        <span className="text-primary">R{finalTotal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3 lg:mb-4">
                  Contact Information
                </h3>
                <div>
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-foreground mb-1.5 sm:mb-2 block"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Dree pies"
                    required
                    className="h-11 sm:h-12 lg:h-13 border-2 border-primary/20 focus:border-primary transition-colors text-base"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-semibold text-foreground mb-1.5 sm:mb-2 block"
                  >
                    WhatsApp Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="066 362 1868"
                    required
                    className="h-11 sm:h-12 lg:h-13 border-2 border-primary/20 focus:border-primary transition-colors text-base"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-foreground mb-1.5 sm:mb-2 block"
                  >
                    Email (Optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="pies@example.com"
                    className="h-13 border-2 border-primary/20 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <Label
                  htmlFor="address"
                  className="text-sm font-semibold text-foreground mb-2 block"
                >
                  Delivery Address *
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="RES"
                  required
                  rows={3}
                  className="resize-none border-2 border-primary/20 focus:border-primary transition-colors"
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <Label className="text-lg font-bold text-foreground block">
                  Payment Method *
                </Label>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paymentMethod: value })
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-muted/80 to-muted/50 p-4 rounded-xl border-2 border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                    <RadioGroupItem
                      value="cash"
                      id="cash"
                      className="h-5 w-5"
                    />
                    <Label
                      htmlFor="cash"
                      className="cursor-pointer font-semibold flex-1"
                    >
                      Cash on Delivery
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-muted/80 to-muted/50 p-4 rounded-xl border-2 border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                    <RadioGroupItem value="eft" id="eft" className="h-5 w-5" />
                    <Label
                      htmlFor="eft"
                      className="cursor-pointer font-semibold flex-1"
                    >
                      EFT/PayShap (+ R2 fee)
                    </Label>
                  </div>
                </RadioGroup>

                {formData.paymentMethod === "eft" && (
                  <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-2xl border-2 border-blue-300 dark:border-blue-700 animate-fade-in shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">💳</span>
                      </div>
                      <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100">
                        Banking Details
                      </h4>
                    </div>

                    {/* Capitec Users - Quick Pay */}
                    <div className="space-y-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-lg border-2 border-green-300 dark:border-green-700">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">✨</span>
                        <p className="text-sm font-bold text-green-900 dark:text-green-100">
                          Capitec Users - Instant Payment
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                          Pay to Number:
                        </p>
                        <p className="text-base font-mono font-bold text-green-900 dark:text-green-100 select-all">
                          0663621868
                        </p>

                        <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                          Reference:
                        </p>
                        <p className="text-sm font-bold text-green-900 dark:text-green-100">
                          Pies
                        </p>
                      </div>
                    </div>

                    {/* Other Banks */}
                    <div className="space-y-3 bg-white/60 dark:bg-gray-900/40 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
                        Other Banks - Use Account Details:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                          Bank:
                        </p>
                        <p className="text-sm font-bold text-blue-900 dark:text-blue-100">
                          Capitec
                        </p>

                        <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                          Account Number:
                        </p>
                        <p className="text-base font-mono font-bold text-blue-900 dark:text-blue-100 select-all">
                          2104929241
                        </p>

                        <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                          Account Holder:
                        </p>
                        <p className="text-sm font-bold text-blue-900 dark:text-blue-100">
                          0663621868
                        </p>

                        <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                          Reference:
                        </p>
                        <p className="text-sm font-bold text-blue-900 dark:text-blue-100">
                          Pies
                        </p>
                      </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700 p-4 rounded-xl">
                      <div className="flex items-start gap-2">
                        <span className="text-xl">⚠️</span>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-amber-900 dark:text-amber-100 mb-2">
                            Important Payment Instructions:
                          </p>
                          <ul className="text-xs space-y-1 text-amber-800 dark:text-amber-200">
                            <li>
                              • Transfer{" "}
                              <span className="font-bold">R{finalTotal}</span>{" "}
                              (includes R2 transfer fee)
                            </li>
                            <li>
                              • <strong>Capitec users:</strong> Pay to
                              0663621868 with reference "Pies"
                            </li>
                            <li>
                              • <strong>Other banks:</strong> Use account number
                              2104929241
                            </li>
                            <li>• Send proof of payment via WhatsApp</li>
                            <li>
                              • Order will be confirmed after payment
                              verification
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "cash" && (
                  <div className="space-y-4 p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border-2 border-accent/30 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="changeNeeded"
                        className="text-base font-bold"
                      >
                        Do you need change?
                      </Label>
                      <Switch
                        id="changeNeeded"
                        checked={changeNeeded}
                        onCheckedChange={setChangeNeeded}
                      />
                    </div>

                    {changeNeeded && (
                      <div className="space-y-3 animate-fade-in">
                        <Label
                          htmlFor="customerAmount"
                          className="text-sm font-semibold"
                        >
                          Amount you're paying with (R)
                        </Label>
                        <Input
                          id="customerAmount"
                          type="number"
                          placeholder="e.g., 50"
                          value={formData.customerAmount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              customerAmount: e.target.value,
                            })
                          }
                          min={finalTotal}
                          className="h-12 border-2 border-accent/30 focus:border-accent"
                        />
                        {formData.customerAmount && calculatedChange >= 0 && (
                          <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 p-4 rounded-xl animate-fade-in">
                            <p className="text-sm font-bold text-green-800 dark:text-green-200">
                              Your change:{" "}
                              <span className="text-2xl">
                                R{calculatedChange.toFixed(2)}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Special Notes */}
              <div>
                <Label
                  htmlFor="notes"
                  className="text-sm font-semibold text-foreground mb-2 block"
                >
                  Special Instructions (Optional)
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Any special delivery instructions or requests..."
                  rows={3}
                  className="resize-none border-2 border-primary/20 focus:border-primary transition-colors"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={cart.length === 0}
                className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-primary-foreground font-extrabold text-base sm:text-lg lg:text-xl h-14 sm:h-15 lg:h-16 shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.02] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                {cart.length === 0
                  ? "Add Items to Cart"
                  : `Place Order - R${finalTotal} (${totalQuantity} pie${
                      totalQuantity !== 1 ? "s" : ""
                    })`}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <AlertDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
        >
          <AlertDialogContent className="max-w-[95vw] sm:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl sm:text-2xl font-bold">
                Confirm Your Order
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm sm:text-base">
                Please review your order details before confirming
              </AlertDialogDescription>
            </AlertDialogHeader>

            {pendingOrderData && (
              <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 sm:p-6 rounded-lg space-y-2 sm:space-y-3">
                  <h3 className="font-bold text-base sm:text-lg border-b pb-2">
                    Order Summary
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Name
                      </p>
                      <p className="font-semibold text-sm sm:text-base break-words">
                        {pendingOrderData.customer_name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Phone
                      </p>
                      <p className="font-semibold text-sm sm:text-base">
                        {pendingOrderData.customer_phone}
                      </p>
                    </div>

                    {pendingOrderData.customer_email && (
                      <div className="col-span-1 sm:col-span-2">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Email
                        </p>
                        <p className="font-semibold text-sm sm:text-base break-all">
                          {pendingOrderData.customer_email}
                        </p>
                      </div>
                    )}

                    <div className="col-span-1 sm:col-span-2">
                      <p className="text-sm text-muted-foreground mb-2">
                        Order Items
                      </p>
                      <div className="space-y-1">
                        {pendingOrderData.cart_items.map((item, index) => (
                          <div
                            key={index}
                            className="text-sm bg-orange-50 dark:bg-orange-950/30 p-2 rounded"
                          >
                            <span className="font-semibold text-orange-700 dark:text-orange-300">
                              {item.flavor}:
                            </span>{" "}
                            {item.quantity} pie(s) x R{item.price} = R
                            {item.total}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm font-bold mt-2 pt-2 border-t">
                        Total: {pendingOrderData.total_quantity} pie(s) for R
                        {pendingOrderData.total_price}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Price
                      </p>
                      <p className="font-semibold text-xl text-primary">
                        R{pendingOrderData.total_price}
                      </p>
                      {pendingOrderData.payment_method === "eft" && (
                        <p className="text-xs text-muted-foreground mt-1">
                          (Includes R{TRANSFER_FEE} transfer fee)
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <p className="text-sm text-muted-foreground">
                      Delivery Address
                    </p>
                    <p className="font-semibold">
                      {pendingOrderData.delivery_address}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Payment Method
                    </p>
                    <p className="font-semibold">
                      {pendingOrderData.payment_method === "cash"
                        ? "Cash on Delivery"
                        : "EFT/PayShap"}
                    </p>
                  </div>

                  {pendingOrderData.change_needed && (
                    <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded">
                      <p className="text-sm text-muted-foreground">
                        Change Details
                      </p>
                      <p className="font-semibold">
                        Paying with: R{pendingOrderData.customer_amount} |
                        Change: R{pendingOrderData.calculated_change}
                      </p>
                    </div>
                  )}

                  {pendingOrderData.special_notes && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Special Instructions
                      </p>
                      <p className="font-semibold italic">
                        {pendingOrderData.special_notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                    📱 A WhatsApp message will be sent to notify our team about
                    your order!
                  </p>
                </div>
              </div>
            )}

            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowConfirmDialog(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmAndSubmitOrder}
                className="bg-gradient-to-r from-primary to-accent"
              >
                Confirm & Place Order
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};
