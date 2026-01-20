import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { FiMapPin, FiStar, FiMessageCircle, FiPhone, FiMail, FiShare2, FiHeart, FiChevronLeft, FiPackage, FiClock, FiShield, FiSend, FiX, FiUser } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { sellers, products } from "@/data/products";
import { toast } from "sonner";
import AOS from "aos";
import "aos/dist/aos.css";

const SellerStore = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("products");
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Bonjour! 👋 Je suis ravi de vous accueillir dans notre boutique. Comment puis-je vous aider aujourd\'hui? N\'hésitez pas à me poser des questions sur nos produits, les prix ou la livraison!' }
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: "ease-out-cubic" });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const seller = sellers.find((s) => s.id === id);
  const sellerProducts = products.filter((p) => p.sellerId === id);

  if (!seller) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <FiPackage className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground">Vendeur introuvable</h2>
          <Link to="/" className="text-primary hover:underline mt-4 block">
            Retour a l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const reviews = [
    { id: 1, author: "Marie K.", rating: 5, date: "Il y a 2 jours", text: "Excellents produits, tres frais! Je recommande vivement." },
    { id: 2, author: "Jean P.", rating: 4, date: "Il y a 1 semaine", text: "Bonne qualite et livraison rapide. Juste un peu cher." },
    { id: 3, author: "Aminata D.", rating: 5, date: "Il y a 2 semaines", text: "Les meilleurs jus naturels que j'ai goutes!" },
    { id: 4, author: "Paul E.", rating: 5, date: "Il y a 3 semaines", text: "Service impeccable et produits de qualite superieure." },
  ];

  const handleSendMessage = async () => {
    if (!userMessage.trim() || isTyping) return;
    
    const newUserMessage = userMessage.trim();
    const updatedMessages = [...chatMessages, { role: 'user' as const, content: newUserMessage }];
    setChatMessages(updatedMessages);
    setUserMessage("");
    setIsTyping(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/seller-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: updatedMessages,
          sellerName: seller.name,
          sellerDescription: seller.description,
          sellerLocation: seller.location,
          products: sellerProducts.map(p => ({
            name: p.name,
            price: p.price,
            description: p.description
          }))
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Trop de requêtes, veuillez réessayer dans un moment.");
          setIsTyping(false);
          return;
        }
        if (response.status === 402) {
          toast.error("Service temporairement indisponible.");
          setIsTyping(false);
          return;
        }
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";
      let textBuffer = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          textBuffer += decoder.decode(value, { stream: true });
          
          let newlineIndex: number;
          while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content as string | undefined;
              if (content) {
                assistantMessage += content;
                setChatMessages(prev => {
                  const last = prev[prev.length - 1];
                  if (last?.role === 'assistant' && prev.length > 1) {
                    return prev.map((m, i) => 
                      i === prev.length - 1 ? { ...m, content: assistantMessage } : m
                    );
                  }
                  return [...prev, { role: 'assistant', content: assistantMessage }];
                });
              }
            } catch {
              textBuffer = line + "\n" + textBuffer;
              break;
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Merci pour votre message! Je suis ${seller.name}. Malheureusement, je suis momentanément indisponible, mais n'hésitez pas à explorer nos produits ou à nous contacter par téléphone. Nous livrons dans toute la ville de ${seller.location}!` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Google Maps embed URL
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(seller.location + ', Cameroon')}&zoom=14`;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-background">
      {/* Banner with actual image */}
      <div className="relative h-48 md:h-64 overflow-hidden" data-aos="fade-down">
        <img 
          src={seller.banner || `https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=1200&h=400&fit=crop`}
          alt={`${seller.name} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        <Link 
          to="/" 
          className="absolute top-4 left-4 p-2 rounded-full bg-card/80 backdrop-blur-sm text-foreground hover:bg-card transition-colors"
        >
          <FiChevronLeft className="w-6 h-6" />
        </Link>

        <button className="absolute top-4 right-4 p-2 rounded-full bg-card/80 backdrop-blur-sm text-foreground hover:bg-card transition-colors">
          <FiShare2 className="w-6 h-6" />
        </button>
      </div>

      <div className="container mx-auto px-4">
        {/* Profile Section with Logo */}
        <div className="relative -mt-16 mb-8" data-aos="fade-up">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Logo */}
            <div className="w-32 h-32 rounded-2xl bg-card shadow-elevated flex items-center justify-center border-4 border-card overflow-hidden">
              <img 
                src={seller.logo}
                alt={seller.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 pt-4">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">
                  {seller.name}
                </h1>
                {seller.verified && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full flex items-center gap-1">
                    <FiShield className="w-3 h-3" /> Vérifié
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <FiMapPin className="w-4 h-4" />
                  {seller.location}
                </span>
                <span className="flex items-center gap-1">
                  <FiStar className="w-4 h-4 text-accent fill-current" />
                  {seller.rating} (156 avis)
                </span>
                <span className="flex items-center gap-1">
                  <FiPackage className="w-4 h-4" />
                  {seller.productCount} produits
                </span>
                <span className="flex items-center gap-1">
                  <FiClock className="w-4 h-4" />
                  Membre depuis 2022
                </span>
              </div>

              <p className="text-muted-foreground max-w-2xl">
                {seller.description}
              </p>
            </div>

            {/* Actions - No favorites button */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={() => setShowChatbot(true)}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <FiMessageCircle className="w-5 h-5 mr-2" />
                Contacter
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8" data-aos="fade-up" data-aos-delay="100">
          <div className="flex gap-4 sm:gap-8 overflow-x-auto">
            {[
              { id: "products", label: "Boissons", icon: FiPackage },
              { id: "location", label: "Localisation", icon: FiMapPin },
              { id: "reviews", label: "Avis", icon: FiStar },
              { id: "contact", label: "Message", icon: FiMessageCircle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => tab.id === "contact" ? setShowChatbot(true) : setActiveTab(tab.id)}
                className={`py-4 px-2 font-medium transition-colors relative flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "products" && (
          <div data-aos="fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sellerProducts.map((product, index) => (
                <div
                  key={product.id}
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-delay={index * 50}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
            {sellerProducts.length === 0 && (
              <div className="text-center py-12">
                <FiPackage className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucun produit disponible pour le moment</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "location" && (
          <div data-aos="zoom-in" className="space-y-6">
            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
            <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-6 shadow-card border border-border/50">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FiMapPin className="w-5 h-5 text-primary" />
                Adresse
              </h3>
              <p className="text-muted-foreground">{seller.location}, Cameroun</p>
              <p className="text-sm text-muted-foreground mt-2">
                Ouvert du Lundi au Samedi, 8h - 18h
              </p>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-2xl space-y-6" data-aos="fade-up">
            <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-6 shadow-card border border-border/50 mb-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">{seller.rating}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar key={i} className={`w-4 h-4 ${i < Math.floor(seller.rating) ? 'text-accent fill-current' : 'text-muted'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">156 avis</p>
                </div>
              </div>
            </div>

            {reviews.map((review, index) => (
              <div 
                key={review.id} 
                className="bg-card rounded-2xl p-6 shadow-card"
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={index * 100}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <span className="font-semibold text-white">{review.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 text-accent fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Chatbot Modal - Now with real AI */}
      {showChatbot && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowChatbot(false)}>
          <div 
            className="bg-card w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-elevated overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-secondary to-orange p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                  <img src={seller.logo} alt={seller.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{seller.name}</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    En ligne
                  </p>
                </div>
              </div>
              <button onClick={() => setShowChatbot(false)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <FiX className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                      <img src={seller.logo} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-tr-sm' 
                      : 'bg-card shadow-sm border border-border text-foreground rounded-tl-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                    <img src={seller.logo} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-card shadow-sm border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ecrivez votre message..."
                  className="flex-1 px-4 py-3 rounded-full border border-input bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!userMessage.trim() || isTyping}
                  className="rounded-full w-12 h-12 p-0 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  <FiSend className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Assistant IA propulsé par VitaDrinks
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      {!showChatbot && (
        <button
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-40"
        >
          <FiMessageCircle className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
};

export default SellerStore;
