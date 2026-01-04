import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CreditCard, 
  Smartphone, 
  CheckCircle, 
  AlertTriangle, 
  Loader2,
  ArrowLeft,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useConfetti } from "@/hooks/useConfetti";
import { toast } from "@/hooks/use-toast";
import AOS from "aos";
import "aos/dist/aos.css";

type PaymentStep = "phone" | "confirm" | "processing" | "success" | "error";
type Operator = "orange" | "mtn" | null;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { triggerConfetti } = useConfetti();
  const [step, setStep] = useState<PaymentStep>("phone");
  const [phone, setPhone] = useState("");
  const [operator, setOperator] = useState<Operator>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const deliveryFee = items.length > 0 ? 500 : 0;
  const grandTotal = total + deliveryFee;

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  useEffect(() => {
    if (items.length === 0 && step === "phone") {
      navigate("/cart");
    }
  }, [items, step, navigate]);

  const detectOperator = (phoneNumber: string): Operator => {
    const cleaned = phoneNumber.replace(/\D/g, "");
    if (cleaned.length < 2) return null;
    
    const prefix = cleaned.substring(0, 3);
    const orangePrefixes = ["655", "656", "657", "658", "659", "690", "691", "692", "693", "694", "695", "696", "697", "698", "699", "700", "701", "702", "703", "704", "705", "706", "707", "708", "709"];
    const mtnPrefixes = ["650", "651", "652", "653", "654", "670", "671", "672", "673", "674", "675", "676", "677", "678", "679", "680", "681", "682", "683", "684", "685", "686", "687", "688", "689"];
    
    if (orangePrefixes.some(p => prefix.startsWith(p))) return "orange";
    if (mtnPrefixes.some(p => prefix.startsWith(p))) return "mtn";
    return null;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 9);
    setPhone(value);
    setOperator(detectOperator(value));
    setPhoneError(false);
  };

  const formatPhone = (p: string) => {
    if (p.length <= 3) return p;
    if (p.length <= 5) return `${p.slice(0, 3)} ${p.slice(3)}`;
    if (p.length <= 7) return `${p.slice(0, 3)} ${p.slice(3, 5)} ${p.slice(5)}`;
    return `${p.slice(0, 3)} ${p.slice(3, 5)} ${p.slice(5, 7)} ${p.slice(7)}`;
  };

  const validatePhone = () => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 9 || !operator) {
      setPhoneError(true);
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (step === "phone") {
      if (validatePhone()) {
        setStep("confirm");
      }
    } else if (step === "confirm") {
      processPayment();
    }
  };

  const processPayment = async () => {
    setStep("processing");
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() > 0.1;
    
    if (success) {
      setStep("success");
      triggerConfetti();
      setTimeout(() => triggerConfetti(), 1500);
      clearCart();
      toast({ title: "Paiement reussi", description: "Votre commande a ete confirmee" });
    } else {
      setStep("error");
      toast({ title: "Echec du paiement", description: "Veuillez reessayer", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const getStepIndex = () => {
    if (step === "phone") return 1;
    if (step === "confirm") return 2;
    return 3;
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto" data-aos="fade-up">
          {/* Header */}
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-elevated border border-border/50 overflow-hidden">
            <div className="p-6 text-center border-b border-border">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground">Paiement Mobile Money</h1>
              <p className="text-muted-foreground mt-1">Commande VitaDrinks</p>
              <div className="mt-4 p-4 bg-muted/50 rounded-xl">
                <p className="text-3xl font-bold text-foreground">{grandTotal.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Francs CFA</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="px-6 py-4 bg-muted/30 border-b border-border">
              <div className="flex items-center justify-center gap-2">
                {[
                  { num: 1, icon: Smartphone, label: "Telephone" },
                  { num: 2, icon: CheckCircle, label: "Confirmer" },
                  { num: 3, icon: CreditCard, label: "Paiement" },
                ].map((s, idx) => (
                  <div key={s.num} className="flex items-center">
                    <div className={`flex items-center ${idx > 0 ? 'ml-2' : ''}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2 ${
                        getStepIndex() > s.num 
                          ? 'bg-primary text-primary-foreground border-primary shadow-lg' 
                          : getStepIndex() === s.num 
                            ? 'bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-lg scale-110' 
                            : 'bg-muted text-muted-foreground border-border'
                      }`}>
                        <s.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-sm font-medium ml-2 hidden sm:inline ${getStepIndex() >= s.num ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {s.label}
                      </span>
                    </div>
                    {idx < 2 && (
                      <div className={`w-8 h-1 rounded-full mx-2 transition-all duration-500 ${
                        getStepIndex() > s.num ? 'bg-primary' : 'bg-border'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Step 1: Phone Input */}
              {step === "phone" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Numero de telephone Mobile Money
                    </label>
                    <p className="text-xs text-muted-foreground">Saisissez votre numero Orange Money ou MTN Mobile Money</p>
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm">
                      <span className="text-lg">🇨🇲</span>
                      <span className="font-semibold">+237</span>
                      <div className="w-px h-6 bg-border" />
                    </div>
                    <input
                      type="tel"
                      value={formatPhone(phone)}
                      onChange={handlePhoneChange}
                      placeholder="6XX XX XX XX"
                      className={`w-full h-14 pl-28 pr-16 rounded-xl border-2 bg-muted/30 font-mono text-lg transition-all duration-300 focus:ring-2 focus:ring-primary/30 ${
                        operator === 'orange' 
                          ? 'border-orange ring-2 ring-orange/20 bg-gradient-to-r from-orange-50/50 to-transparent' 
                          : operator === 'mtn' 
                            ? 'border-yellow-400 ring-2 ring-yellow-200 bg-gradient-to-r from-yellow-50/50 to-transparent' 
                            : phoneError 
                              ? 'border-destructive' 
                              : 'border-input'
                      }`}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {operator && (
                        <img 
                          src={operator === 'orange' 
                            ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png'
                            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New-mtn-logo.jpg/1200px-New-mtn-logo.jpg'
                          }
                          alt={operator === 'orange' ? 'Orange Money' : 'MTN MoMo'}
                          className="h-8 w-8 object-contain"
                        />
                      )}
                    </div>
                  </div>

                  {phoneError && (
                    <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 flex items-start gap-2 text-destructive text-sm">
                      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Numero invalide</p>
                        <p className="text-xs mt-1">Orange: 655-659, 690-699, 700-709 | MTN: 650-654, 670-689</p>
                      </div>
                    </div>
                  )}

                  {/* Operator Info */}
                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">Paiement securise</span>
                      </div>
                      <div className="flex gap-2">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png"
                          alt="Orange"
                          className="h-6 w-6 object-contain opacity-50"
                        />
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New-mtn-logo.jpg/1200px-New-mtn-logo.jpg"
                          alt="MTN"
                          className="h-6 w-6 object-contain opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleContinue}
                    disabled={phone.length < 9}
                    className="w-full h-12 bg-gradient-to-r from-primary via-secondary to-orange hover:opacity-90 text-white font-semibold text-base"
                  >
                    Continuer
                  </Button>
                </div>
              )}

              {/* Step 2: Confirm */}
              {step === "confirm" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="p-4 rounded-xl bg-muted/50 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Numero</span>
                      <span className="font-mono font-medium">+237 {formatPhone(phone)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Operateur</span>
                      <div className="flex items-center gap-2">
                        <img 
                          src={operator === 'orange' 
                            ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png'
                            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New-mtn-logo.jpg/1200px-New-mtn-logo.jpg'
                          }
                          alt={operator === 'orange' ? 'Orange Money' : 'MTN MoMo'}
                          className="h-5 w-5 object-contain"
                        />
                        <span className="font-medium">{operator === 'orange' ? 'Orange Money' : 'MTN Mobile Money'}</span>
                      </div>
                    </div>
                    <hr className="border-border" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{total.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Livraison</span>
                      <span>{deliveryFee.toLocaleString()} FCFA</span>
                    </div>
                    <hr className="border-border" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{grandTotal.toLocaleString()} FCFA</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                    <p className="text-sm text-center">
                      Un message de confirmation sera envoye a votre telephone. 
                      Entrez votre code PIN pour valider le paiement.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setStep("phone")}
                      variant="outline"
                      className="flex-1 h-12"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Retour
                    </Button>
                    <Button 
                      onClick={handleContinue}
                      className="flex-1 h-12 bg-gradient-to-r from-primary via-secondary to-orange hover:opacity-90 text-white font-semibold"
                    >
                      Confirmer le paiement
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Processing */}
              {step === "processing" && (
                <div className="py-12 text-center space-y-6 animate-fade-in">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Traitement en cours...</h2>
                    <p className="text-muted-foreground mt-2">Veuillez valider sur votre telephone</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    En attente de confirmation
                  </div>
                </div>
              )}

              {/* Success */}
              {step === "success" && (
                <div className="py-12 text-center space-y-6 animate-fade-in">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-primary">Paiement reussi</h2>
                    <p className="text-muted-foreground mt-2">Merci pour votre commande</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 text-sm">
                    <p>Un email de confirmation vous sera envoye.</p>
                    <p className="mt-1">Votre commande sera livree sous 24-48h.</p>
                  </div>
                  <Button 
                    onClick={() => navigate("/")}
                    className="w-full h-12 bg-gradient-to-r from-primary via-secondary to-orange hover:opacity-90 text-white font-semibold"
                  >
                    Retour a l'accueil
                  </Button>
                </div>
              )}

              {/* Error */}
              {step === "error" && (
                <div className="py-12 text-center space-y-6 animate-fade-in">
                  <div className="w-20 h-20 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
                    <AlertTriangle className="w-12 h-12 text-destructive" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-destructive">Echec du paiement</h2>
                    <p className="text-muted-foreground mt-2">Le paiement n'a pas pu etre effectue</p>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setStep("phone")}
                      variant="outline"
                      className="flex-1 h-12"
                    >
                      Reessayer
                    </Button>
                    <Button 
                      onClick={() => navigate("/cart")}
                      className="flex-1 h-12"
                    >
                      Retour au panier
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
