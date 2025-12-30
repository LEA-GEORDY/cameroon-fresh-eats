import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  // Group items by seller
  const itemsBySeller = items.reduce((acc, item) => {
    if (!acc[item.sellerId]) {
      acc[item.sellerId] = {
        sellerName: item.sellerName,
        items: [],
        subtotal: 0,
      };
    }
    acc[item.sellerId].items.push(item);
    acc[item.sellerId].subtotal += item.price * item.quantity;
    return acc;
  }, {} as Record<string, { sellerName: string; items: typeof items; subtotal: number }>);

  const deliveryFee = items.length > 0 ? 1500 : 0;
  const platformFee = Math.round(total * 0.05);
  const grandTotal = total + deliveryFee + platformFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Votre panier est vide
            </h1>
            <p className="text-muted-foreground mb-8">
              Découvrez nos délicieux jus naturels et smoothies bio
            </p>
            <Link to="/products">
              <Button size="lg" variant="hero" className="gap-2">
                <ArrowLeft className="w-5 h-5" />
                Continuer les achats
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Mon Panier
            </h1>
            <p className="text-muted-foreground">
              {items.length} article{items.length > 1 ? "s" : ""} • {Object.keys(itemsBySeller).length} vendeur{Object.keys(itemsBySeller).length > 1 ? "s" : ""}
            </p>
          </div>
          <Button variant="ghost" onClick={clearCart} className="text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash2 className="w-4 h-4 mr-2" />
            Vider le panier
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(itemsBySeller).map(([sellerId, { sellerName, items: sellerItems, subtotal }]) => (
              <div key={sellerId} className="bg-card rounded-2xl shadow-card overflow-hidden">
                {/* Seller Header */}
                <div className="p-4 bg-muted border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold">
                          {sellerName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{sellerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {sellerItems.length} article{sellerItems.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-foreground">
                      {subtotal.toLocaleString()} FCFA
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-border">
                  {sellerItems.map((item) => (
                    <div key={item.id} className="p-4 flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {item.name}
                        </h3>
                        <p className="text-primary font-bold mt-1">
                          {item.price.toLocaleString()} FCFA
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-card p-6 sticky top-24">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Résumé de la commande
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Sous-total</span>
                  <span>{total.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Livraison</span>
                  <span>{deliveryFee.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Frais de plateforme (5%)</span>
                  <span>{platformFee.toLocaleString()} FCFA</span>
                </div>
                
                <hr className="border-border" />
                
                <div className="flex justify-between text-xl font-bold text-foreground">
                  <span>Total</span>
                  <span>{grandTotal.toLocaleString()} FCFA</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link to="/checkout" className="block">
                  <Button size="lg" variant="hero" className="w-full gap-2">
                    <CreditCard className="w-5 h-5" />
                    Procéder au paiement
                  </Button>
                </Link>
                
                <Link to="/products" className="block">
                  <Button size="lg" variant="outline" className="w-full gap-2">
                    <ArrowLeft className="w-5 h-5" />
                    Continuer les achats
                  </Button>
                </Link>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">
                  Méthodes de paiement acceptées
                </p>
                <div className="flex gap-2">
                  <div className="px-3 py-2 bg-muted rounded-lg text-sm font-medium text-foreground">
                    MTN MoMo
                  </div>
                  <div className="px-3 py-2 bg-muted rounded-lg text-sm font-medium text-foreground">
                    Orange Money
                  </div>
                  <div className="px-3 py-2 bg-muted rounded-lg text-sm font-medium text-foreground">
                    Carte
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
