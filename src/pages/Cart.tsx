import { Link } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowLeft, FiCreditCard } from "react-icons/fi";
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

  const deliveryFee = items.length > 0 ? 500 : 0;
  const grandTotal = total + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <FiShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Votre panier est vide
            </h1>
            <p className="text-muted-foreground mb-8">
              Decouvrez nos delicieux jus naturels et smoothies bio
            </p>
            <Link to="/">
              <Button size="lg" variant="hero" className="gap-2">
                <FiArrowLeft className="w-5 h-5" />
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
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Mon Panier
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {items.length} article{items.length > 1 ? "s" : ""} - {Object.keys(itemsBySeller).length} vendeur{Object.keys(itemsBySeller).length > 1 ? "s" : ""}
            </p>
          </div>
          <Button variant="ghost" onClick={clearCart} className="text-destructive hover:text-destructive hover:bg-destructive/10">
            <FiTrash2 className="w-4 h-4 mr-2" />
            Vider le panier
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {Object.entries(itemsBySeller).map(([sellerId, { sellerName, items: sellerItems, subtotal }]) => (
              <div key={sellerId} className="bg-card rounded-2xl shadow-card overflow-hidden">
                {/* Seller Header */}
                <div className="p-3 sm:p-4 bg-muted border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm sm:text-base">
                          {sellerName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm sm:text-base">{sellerName}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {sellerItems.length} article{sellerItems.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">
                      {subtotal.toLocaleString()} FCFA
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-border">
                  {sellerItems.map((item) => (
                    <div key={item.id} className="p-3 sm:p-4 flex gap-3 sm:gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">
                          {item.name}
                        </h3>
                        <p className="text-primary font-bold mt-1 text-sm sm:text-base">
                          {item.price.toLocaleString()} FCFA
                        </p>
                        
                        <div className="flex items-center justify-between mt-2 sm:mt-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <FiMinus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <FiTrash2 className="w-4 h-4" />
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
            <div className="bg-card rounded-2xl shadow-card p-4 sm:p-6 sticky top-24">
              <h2 className="font-display text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">
                Resume de la commande
              </h2>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-muted-foreground text-sm sm:text-base">
                  <span>Sous-total</span>
                  <span>{total.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-sm sm:text-base">
                  <span>Livraison</span>
                  <span>{deliveryFee.toLocaleString()} FCFA</span>
                </div>
                
                <hr className="border-border" />
                
                <div className="flex justify-between text-lg sm:text-xl font-bold text-foreground">
                  <span>Total</span>
                  <span>{grandTotal.toLocaleString()} FCFA</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 space-y-3">
                <Link to="/checkout" className="block">
                  <Button size="lg" variant="hero" className="w-full gap-2">
                    <FiCreditCard className="w-5 h-5" />
                    Proceder au paiement
                  </Button>
                </Link>
                
                <Link to="/" className="block">
                  <Button size="lg" variant="outline" className="w-full gap-2">
                    <FiArrowLeft className="w-5 h-5" />
                    Continuer les achats
                  </Button>
                </Link>
              </div>

              {/* Payment Methods */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                  Methodes de paiement acceptees
                </p>
                <div className="flex gap-2 flex-wrap">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png"
                    alt="Orange Money"
                    className="h-8 w-8 object-contain bg-white rounded-lg p-1 shadow-sm"
                  />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New-mtn-logo.jpg/1200px-New-mtn-logo.jpg"
                    alt="MTN MoMo"
                    className="h-8 w-8 object-contain bg-white rounded-lg p-1 shadow-sm"
                  />
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
