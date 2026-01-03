import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, User, Phone, MapPin, Store, Upload, Camera, FileText, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import BubblesBackground from "@/components/BubblesBackground";
import AnimatedInput from "@/components/AnimatedInput";
import { useConfetti } from "@/hooks/useConfetti";

const SellerRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { triggerConfetti } = useConfetti();
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // ID Verification
    idType: "",
    idDocument: null as File | null,
    selfie: null as File | null,
    businessRegistration: null as File | null,
    // Shop Setup
    shopName: "",
    shopLogo: null as File | null,
    shopBanner: null as File | null,
    shopCategory: "",
    shopDescription: "",
    businessAddress: "",
    contactPhone: "",
    // Payment
    momoNumber: "",
    momoOperator: "",
    acceptTerms: false,
  });

  const steps = [
    { title: "Bienvenue", description: "Devenir vendeur" },
    { title: "Identite", description: "Verification" },
    { title: "Boutique", description: "Configuration" },
    { title: "Paiement", description: "Coordonnees bancaires" },
  ];

  const categories = [
    "Jus de fruits",
    "Smoothies",
    "Boissons detox",
    "Boissons energetiques",
    "Autres",
  ];

  const idTypes = [
    "Carte nationale d'identite",
    "Passeport",
    "Permis de conduire",
  ];

  const handleFileChange = (field: keyof typeof formData, file: File | null) => {
    setFormData({ ...formData, [field]: file });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    triggerConfetti();
    
    toast({
      title: "Inscription reussie",
      description: "Votre demande sera examinee sous 24-48h. Vous recevrez un email de confirmation.",
    });

    setIsLoading(false);
    navigate("/login");
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return true;
      case 1:
        return formData.idType && formData.idDocument;
      case 2:
        return formData.shopName && formData.shopCategory && formData.shopDescription && formData.businessAddress;
      case 3:
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.password && formData.acceptTerms;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center relative overflow-hidden">
      <BubblesBackground />
      
      <style>{`
        @keyframes bubbleRise {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          10% { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(-100vh) scale(1); }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link to="/">
              <img src={logo} alt="VitaDrinks" className="h-16 mx-auto mb-4" />
            </Link>
          </div>

          {/* Progress Steps */}
          {step > 0 && (
            <div className="flex items-center justify-center gap-2 mb-6">
              {steps.slice(1).map((s, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step > i ? "bg-primary text-primary-foreground" : step === i + 1 ? "bg-secondary text-secondary-foreground ring-2 ring-secondary" : "bg-muted text-muted-foreground"
                  }`}>
                    {step > i + 1 ? <Check className="w-5 h-5" /> : i + 1}
                  </div>
                  {i < 2 && (
                    <div className={`w-12 h-1 mx-1 rounded-full ${step > i + 1 ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Step Content */}
          <div className="bg-card/90 backdrop-blur-xl rounded-3xl shadow-elevated p-8 border border-border/50">
            {/* Step 0: Welcome */}
            {step === 0 && (
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                  <Store className="w-16 h-16 text-secondary" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold text-foreground">
                    Devenez Vendeur
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Creez votre boutique et vendez a des millions d'utilisateurs.
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() => setStep(1)}
                  className="w-full bg-gradient-to-r from-secondary to-orange hover:opacity-90 text-secondary-foreground font-semibold"
                >
                  Commencer
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {/* Step 1: ID Verification */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="font-display text-2xl font-bold">Verifier votre identite</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Pour des raisons de securite, nous devons confirmer votre identite avant de vendre.
                  </p>
                </div>

                <div className="text-sm text-secondary-foreground bg-secondary/10 p-3 rounded-lg border border-secondary/30 text-center">
                  Etape {step} sur 4 : Verification d'identite
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type de piece d'identite</label>
                    <select
                      value={formData.idType}
                      onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border-2 border-input bg-card focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Selectionnez le type</option>
                      {idTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Telecharger la piece d'identite</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-input rounded-xl cursor-pointer hover:border-secondary transition-colors bg-muted/30">
                      <Upload className="w-8 h-8 text-secondary mb-2" />
                      <span className="text-sm text-muted-foreground">Cliquez pour telecharger</span>
                      <span className="text-xs text-muted-foreground">PNG, JPG, JPEG jusqu'a 7MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange('idDocument', e.target.files?.[0] || null)}
                      />
                    </label>
                    {formData.idDocument && (
                      <p className="text-sm text-primary flex items-center gap-2">
                        <Check className="w-4 h-4" /> {formData.idDocument.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Selfie de verification</label>
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-input rounded-xl cursor-pointer hover:border-secondary transition-colors bg-muted/30">
                      <Camera className="w-6 h-6 text-secondary mb-1" />
                      <span className="text-xs text-muted-foreground">Prenez un selfie avec votre piece</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="user"
                        className="hidden"
                        onChange={(e) => handleFileChange('selfie', e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Enregistrement commercial (Optionnel)
                    </label>
                    <label className="flex items-center justify-center w-full h-12 border border-input rounded-xl cursor-pointer hover:border-secondary transition-colors bg-muted/30">
                      <span className="text-sm text-muted-foreground">Telecharger le document</span>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange('businessRegistration', e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(0)} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!canProceed()}
                    className="flex-1 bg-gradient-to-r from-secondary to-orange hover:opacity-90"
                  >
                    Continuer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Shop Setup */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="font-display text-2xl font-bold">Configuration de la boutique</h2>
                  <p className="text-muted-foreground text-sm mt-1">Creons votre profil de boutique</p>
                </div>

                <div className="text-sm text-secondary-foreground bg-secondary/10 p-3 rounded-lg border border-secondary/30 text-center">
                  Etape 1 sur 4 : Configuration de la boutique
                </div>

                <div className="space-y-4">
                  <AnimatedInput
                    label="Nom de la boutique"
                    icon={<Store className="w-5 h-5" />}
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    required
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Logo / Banniere de la boutique</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-input rounded-xl cursor-pointer hover:border-secondary transition-colors bg-muted/30">
                      <Upload className="w-8 h-8 text-secondary mb-2" />
                      <span className="text-sm text-muted-foreground">Cliquez pour telecharger</span>
                      <span className="text-xs text-muted-foreground">PNG, JPG, JPEG jusqu'a 7MB chaque</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange('shopLogo', e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Categorie de la boutique</label>
                    <select
                      value={formData.shopCategory}
                      onChange={(e) => setFormData({ ...formData, shopCategory: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border-2 border-input bg-card focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Selectionnez une categorie</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description de la boutique</label>
                    <textarea
                      value={formData.shopDescription}
                      onChange={(e) => setFormData({ ...formData, shopDescription: e.target.value })}
                      placeholder="Parlez de votre boutique aux clients..."
                      className="w-full h-24 px-4 py-3 rounded-xl border-2 border-input bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                      required
                    />
                  </div>

                  <AnimatedInput
                    label="Adresse commerciale"
                    icon={<MapPin className="w-5 h-5" />}
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                    required
                  />

                  <AnimatedInput
                    label="Telephone de contact"
                    icon={<Phone className="w-5 h-5" />}
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!canProceed()}
                    className="flex-1 bg-gradient-to-r from-secondary to-orange hover:opacity-90"
                  >
                    Continuer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Account & Payment */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="font-display text-2xl font-bold">Informations du compte</h2>
                  <p className="text-muted-foreground text-sm mt-1">Derniere etape avant de commencer</p>
                </div>

                {/* Commission Notice */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-secondary/10 to-orange/10 border border-secondary/30">
                  <p className="text-sm text-foreground font-medium text-center">
                    Commission : 1% du prix de chaque bouteille sera deduit de chaque bouteille vendue.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <AnimatedInput
                      label="Prenom"
                      icon={<User className="w-5 h-5" />}
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                    <AnimatedInput
                      label="Nom"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>

                  <AnimatedInput
                    label="Email"
                    icon={<Mail className="w-5 h-5" />}
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />

                  <AnimatedInput
                    label="Telephone"
                    icon={<Phone className="w-5 h-5" />}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />

                  <AnimatedInput
                    label="Mot de passe"
                    icon={<Lock className="w-5 h-5" />}
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />

                  <AnimatedInput
                    label="Confirmer le mot de passe"
                    icon={<Lock className="w-5 h-5" />}
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="w-5 h-5 mt-0.5 rounded border-input accent-secondary"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      J'accepte les{" "}
                      <Link to="/terms" className="text-secondary hover:underline">
                        conditions d'utilisation
                      </Link>{" "}
                      et la{" "}
                      <Link to="/privacy" className="text-secondary hover:underline">
                        politique de confidentialite
                      </Link>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed() || isLoading}
                    className="flex-1 bg-gradient-to-r from-secondary to-orange hover:opacity-90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Inscription...
                      </>
                    ) : (
                      "Finaliser l'inscription"
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Login Link */}
            <p className="text-center mt-6 text-muted-foreground">
              Deja un compte vendeur?{" "}
              <Link to="/login" className="text-secondary font-semibold hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;
