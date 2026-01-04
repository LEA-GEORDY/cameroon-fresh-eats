import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronLeft, ChevronRight, Clock, CheckCircle, Truck } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Orders = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  // Mock orders data
  const orders = [
    {
      id: "CMD-2024-001",
      date: "15 Janvier 2024",
      total: 8500,
      status: "delivered",
      items: [
        { name: "Orange Mangue Passion", quantity: 2, price: 800 },
        { name: "Detox Vert Energie", quantity: 1, price: 950 },
      ],
      seller: "Fruits du Soleil"
    },
    {
      id: "CMD-2024-002",
      date: "18 Janvier 2024",
      total: 5200,
      status: "shipping",
      items: [
        { name: "Tropical Paradise", quantity: 3, price: 750 },
      ],
      seller: "Bio Nature Plus"
    },
    {
      id: "CMD-2024-003",
      date: "20 Janvier 2024",
      total: 3800,
      status: "processing",
      items: [
        { name: "Berry Explosion", quantity: 2, price: 900 },
      ],
      seller: "Saveurs d'Afrique"
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "delivered":
        return { label: "Livree", icon: CheckCircle, color: "text-primary bg-primary/10" };
      case "shipping":
        return { label: "En livraison", icon: Truck, color: "text-secondary bg-secondary/10" };
      case "processing":
        return { label: "En preparation", icon: Clock, color: "text-orange bg-orange/10" };
      default:
        return { label: "En attente", icon: Clock, color: "text-muted-foreground bg-muted" };
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8" data-aos="fade-up">
            <div className="flex items-center gap-4">
              <Link 
                to="/profile" 
                className="p-2 rounded-full bg-card hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Mes Commandes
                </h1>
                <p className="text-muted-foreground">{orders.length} commandes</p>
              </div>
            </div>
            <Package className="w-10 h-10 text-primary" />
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((order, index) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <div 
                  key={order.id}
                  className="bg-card rounded-2xl shadow-card overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusInfo.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{statusInfo.label}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{item.name} x{item.quantity}</span>
                        <span className="text-muted-foreground">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Vendeur: {order.seller}</span>
                      <span className="font-bold text-foreground">{order.total.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/order/${order.id}`}
                    className="flex items-center justify-center gap-2 p-3 bg-muted/50 text-primary hover:bg-muted transition-colors"
                  >
                    <span className="text-sm font-medium">Voir les details</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>

          {orders.length === 0 && (
            <div className="text-center py-16" data-aos="fade-up">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Aucune commande
              </h2>
              <p className="text-muted-foreground mb-6">
                Vous n'avez pas encore passe de commande
              </p>
              <Link 
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
              >
                Decouvrir nos produits
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
