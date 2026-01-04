import { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2, User, Phone, MapPin, Store, Upload, Camera, FileText, Check, ArrowLeft, ArrowRight, Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import AnimatedLogo from "@/components/AnimatedLogo";
import BubblesBackground from "@/components/BubblesBackground";
import AnimatedInput from "@/components/AnimatedInput";
import { useConfetti } from "@/hooks/useConfetti";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const SellerRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { triggerConfetti } = useConfetti();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
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
    idFront: null as File | null,
    idBack: null as File | null,
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
    { title: "Bienvenue", description: "Devenir vendeur", icon: Store },
    { title: "Identite", description: "Verification", icon: Shield },
    { title: "Boutique", description: "Configuration", icon: Store },
    { title: "Compte", description: "Finalisation", icon: User },
  ];

  const categories = ["Jus de fruits", "Smoothies", "Boissons detox", "Boissons energetiques", "Autres"];
  const idTypes = [
    { value: "cni", label: "Carte nationale d'identite", format: "recto-verso" },
    { value: "passport", label: "Passeport", format: "page-info" },
    { value: "permis", label: "Permis de conduire", format: "recto-verso" },
  ];

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
      toast({ title: "Erreur", description: "Format invalide. Utilisez JPEG ou PNG", variant: "destructive" });
      return false;
    }
    if (file.size > maxSize) {
      toast({ title: "Erreur", description: "Fichier trop volumineux. Max 5MB", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleFileChange = (field: keyof typeof formData, file: File | null) => {
    if (file && validateFile(file)) {
      setFormData({ ...formData, [field]: file });
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      toast({ title: "Erreur camera", description: "Impossible d'acceder a la camera", variant: "destructive" });
    }
  };

  const capturePhoto = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
            setFormData({ ...formData, selfie: file });
            setSelfiePreview(canvas.toDataURL('image/jpeg'));
            // Stop camera
            const stream = videoRef.current?.srcObject as MediaStream;
            stream?.getTracks().forEach(track => track.stop());
            setCameraActive(false);
          }
        }, 'image/jpeg', 0.9);
      }
    }
  }, [formData]);

  const sendOtp = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOtpSent(true);
    setIsLoading(false);
    toast({ title: "Code OTP envoye", description: `Un code a ete envoye au +237 ${formData.phone}` });
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setOtpVerified(true);
    setIsLoading(false);
    toast({ title: "Telephone verifie", description: "Votre numero a ete verifie" });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    triggerConfetti();
    
    toast({
      title: "Inscription reussie",
      description: "Votre boutique a ete creee. Bienvenue!",
    });

    setIsLoading(false);
    navigate("/seller/dashboard");
  };

  const canProceed = () => {
    switch (step) {
      case 0: return true;
      case 1: return formData.idType && formData.idFront && (formData.idType === "passport" || formData.idBack) && formData.selfie;
      case 2: return formData.shopName && formData.shopCategory && formData.shopDescription && formData.businessAddress;
      case 3: return formData.firstName && formData.lastName && formData.email && formData.phone && formData.password && formData.acceptTerms && otpVerified;
      default: return false;
    }
  };

  const getIdDocumentLabel = () => {
    const selected = idTypes.find(t => t.value === formData.idType);
    if (!selected) return { front: "Recto", back: "Verso" };
    if (selected.format === "recto-verso") return { front: "Recto", back: "Verso" };
    return { front: "Page d'information", back: null };
  };

  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center relative overflow-hidden">
      <BubblesBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link to="/" className="inline-block"><AnimatedLogo size="lg" /></Link>
          </div>

          {/* Progress Steps */}
          {step > 0 && (
            <div className="flex items-center justify-center gap-2 mb-6">
              {steps.slice(1).map((s, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-500 border-2 ${
                    step > i ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-lg" 
                    : step === i + 1 ? "bg-gradient-to-r from-secondary to-orange text-white border-transparent ring-4 ring-secondary/30 scale-110" 
                    : "bg-card text-muted-foreground border-border"
                  }`}>
                    {step > i + 1 ? <Check className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  {i < 2 && (
                    <div className={`w-16 h-1.5 mx-2 rounded-full transition-all duration-500 ${step > i + 1 ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Step Content */}
          <div className="bg-card/80 backdrop-blur-2xl rounded-3xl shadow-elevated p-8 border border-border/30">
            {/* Step 0: Welcome - Circular Design */}
            {step === 0 && (
              <div className="text-center space-y-8 animate-fade-in">
                <div className="relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/30 via-orange/20 to-primary/30 animate-pulse" />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-secondary/20 to-orange/20 flex items-center justify-center">
                    <Store className="w-20 h-20 text-secondary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-lime flex items-center justify-center text-white">
                    <Check className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-secondary via-orange to-primary bg-clip-text text-transparent">
                    Devenez Vendeur
                  </h1>
                  <p className="text-muted-foreground mt-3 text-lg">
                    Creez votre boutique et vendez vos jus naturels a des milliers de clients.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { icon: Shield, label: "Securise", color: "text-primary" },
                    { icon: Store, label: "Simple", color: "text-secondary" },
                    { icon: Check, label: "Rapide", color: "text-orange" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-muted/50">
                      <item.icon className={`w-8 h-8 mx-auto ${item.color}`} />
                      <p className="text-sm font-medium mt-2">{item.label}</p>
                    </div>
                  ))}
                </div>
                <Button
                  size="lg"
                  onClick={() => setStep(1)}
                  className="w-full bg-gradient-to-r from-secondary via-orange to-primary hover:opacity-90 text-white font-semibold text-lg h-14 rounded-2xl shadow-lg"
                >
                  Commencer l'inscription
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {/* Step 1: ID Verification */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <h2 className="font-display text-2xl font-bold">Verification d'identite</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Pour votre securite, nous devons verifier votre identite
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-r from-secondary/10 to-orange/10 border border-secondary/20 text-center text-sm">
                  <Shield className="w-5 h-5 inline mr-2 text-secondary" />
                  Etape 1/3 : Verification d'identite
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type de piece d'identite</label>
                    <select
                      value={formData.idType}
                      onChange={(e) => setFormData({ ...formData, idType: e.target.value, idFront: null, idBack: null })}
                      className="w-full h-14 px-4 rounded-xl border-2 border-input bg-card focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Selectionnez le type</option>
                      {idTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  {formData.idType && (
                    <div className="grid grid-cols-2 gap-4 animate-fade-in">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">{getIdDocumentLabel().front}</label>
                        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all bg-muted/30">
                          {formData.idFront ? (
                            <div className="text-center">
                              <Check className="w-8 h-8 text-primary mx-auto" />
                              <span className="text-xs text-primary font-medium">{formData.idFront.name}</span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-primary mb-2" />
                              <span className="text-xs text-muted-foreground">Cliquez pour telecharger</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/jpeg,image/png"
                            className="hidden"
                            onChange={(e) => handleFileChange('idFront', e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>

                      {getIdDocumentLabel().back && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{getIdDocumentLabel().back}</label>
                          <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-secondary/30 rounded-xl cursor-pointer hover:border-secondary hover:bg-secondary/5 transition-all bg-muted/30">
                            {formData.idBack ? (
                              <div className="text-center">
                                <Check className="w-8 h-8 text-secondary mx-auto" />
                                <span className="text-xs text-secondary font-medium">{formData.idBack.name}</span>
                              </div>
                            ) : (
                              <>
                                <Upload className="w-8 h-8 text-secondary mb-2" />
                                <span className="text-xs text-muted-foreground">Cliquez pour telecharger</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/jpeg,image/png"
                              className="hidden"
                              onChange={(e) => handleFileChange('idBack', e.target.files?.[0] || null)}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Selfie Verification */}
                  <div className="space-y-2 pt-4">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Camera className="w-4 h-4 text-orange" />
                      Selfie de verification
                    </label>
                    
                    {!selfiePreview && !cameraActive && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={startCamera}
                        className="w-full h-32 border-2 border-dashed border-orange/30 hover:border-orange hover:bg-orange/5 rounded-xl"
                      >
                        <div className="text-center">
                          <Camera className="w-10 h-10 text-orange mx-auto mb-2" />
                          <span className="text-sm">Ouvrir la camera</span>
                          <p className="text-xs text-muted-foreground mt-1">Pour verifier votre identite</p>
                        </div>
                      </Button>
                    )}

                    {cameraActive && (
                      <div className="relative rounded-xl overflow-hidden animate-fade-in">
                        <video ref={videoRef} className="w-full rounded-xl" autoPlay playsInline muted />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-48 h-64 border-4 border-white/50 rounded-3xl" />
                        </div>
                        <Button
                          type="button"
                          onClick={capturePhoto}
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-foreground hover:bg-white/90 rounded-full w-16 h-16 p-0"
                        >
                          <Camera className="w-8 h-8" />
                        </Button>
                      </div>
                    )}

                    {selfiePreview && (
                      <div className="relative animate-fade-in">
                        <img src={selfiePreview} alt="Selfie" className="w-full rounded-xl" />
                        <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                          <Check className="w-4 h-4" /> Capture reussie
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => { setSelfiePreview(null); setFormData({ ...formData, selfie: null }); }}
                          className="w-full mt-2"
                        >
                          Reprendre la photo
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Business Registration (Optional) */}
                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      Registre de commerce (Optionnel)
                    </label>
                    <label className="flex items-center justify-center w-full h-12 border border-input rounded-xl cursor-pointer hover:border-primary transition-colors bg-muted/30">
                      <span className="text-sm text-muted-foreground">
                        {formData.businessRegistration ? formData.businessRegistration.name : "Telecharger le document"}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange('businessRegistration', e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep(0)} className="flex-1 h-12 rounded-xl">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!canProceed()}
                    className="flex-1 h-12 bg-gradient-to-r from-secondary to-orange hover:opacity-90 text-white rounded-xl"
                  >
                    Continuer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Shop Setup */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <h2 className="font-display text-2xl font-bold">Votre boutique</h2>
                  <p className="text-muted-foreground text-sm mt-1">Configurez votre espace vendeur</p>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-center text-sm">
                  <Store className="w-5 h-5 inline mr-2 text-primary" />
                  Etape 2/3 : Configuration de la boutique
                </div>

                <div className="space-y-4">
                  <AnimatedInput
                    label="Nom de la boutique"
                    icon={<Store className="w-5 h-5" />}
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Logo</label>
                      <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:border-primary transition-all bg-muted/30">
                        {formData.shopLogo ? (
                          <Check className="w-8 h-8 text-primary" />
                        ) : (
                          <Upload className="w-8 h-8 text-primary" />
                        )}
                        <span className="text-xs text-muted-foreground mt-2">Logo de la boutique</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange('shopLogo', e.target.files?.[0] || null)}
                        />
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Banniere</label>
                      <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-secondary/30 rounded-xl cursor-pointer hover:border-secondary transition-all bg-muted/30">
                        {formData.shopBanner ? (
                          <Check className="w-8 h-8 text-secondary" />
                        ) : (
                          <Upload className="w-8 h-8 text-secondary" />
                        )}
                        <span className="text-xs text-muted-foreground mt-2">Banniere de la boutique</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange('shopBanner', e.target.files?.[0] || null)}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Categorie</label>
                    <select
                      value={formData.shopCategory}
                      onChange={(e) => setFormData({ ...formData, shopCategory: e.target.value })}
                      className="w-full h-14 px-4 rounded-xl border-2 border-input bg-card focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Selectionnez une categorie</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      value={formData.shopDescription}
                      onChange={(e) => setFormData({ ...formData, shopDescription: e.target.value })}
                      placeholder="Decrivez votre boutique et vos produits..."
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
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 rounded-xl">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!canProceed()}
                    className="flex-1 h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl"
                  >
                    Continuer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Account & Payment */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <h2 className="font-display text-2xl font-bold">Finalisation</h2>
                  <p className="text-muted-foreground text-sm mt-1">Derniere etape!</p>
                </div>

                {/* Commission Notice */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-orange/10 to-secondary/10 border border-orange/30">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-orange shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Commission plateforme</p>
                      <p className="text-sm text-muted-foreground">
                        1% du prix de chaque bouteille sera deduit de chaque vente.
                      </p>
                    </div>
                  </div>
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

                  {/* Phone with OTP */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <AnimatedInput
                          label="Telephone"
                          icon={<Phone className="w-5 h-5" />}
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 9) });
                            setOtpVerified(false);
                            setOtpSent(false);
                          }}
                          required
                          disabled={otpVerified}
                        />
                      </div>
                      {!otpVerified && (
                        <Button
                          type="button"
                          onClick={sendOtp}
                          disabled={isLoading || formData.phone.length !== 9}
                          className="mt-6 bg-gradient-to-r from-secondary to-orange text-white"
                        >
                          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : otpSent ? "Renvoyer" : "OTP"}
                        </Button>
                      )}
                      {otpVerified && (
                        <div className="mt-6 flex items-center gap-2 text-primary">
                          <Shield className="w-5 h-5" />
                          <span className="text-sm font-medium">OK</span>
                        </div>
                      )}
                    </div>

                    {otpSent && !otpVerified && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 space-y-3 animate-fade-in">
                        <div className="flex justify-center">
                          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                            <InputOTPGroup>
                              {[0, 1, 2, 3, 4, 5].map((i) => (
                                <InputOTPSlot key={i} index={i} className="w-10 h-12 text-lg border-2" />
                              ))}
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                        <Button
                          type="button"
                          onClick={verifyOtp}
                          disabled={isLoading || otp.length !== 6}
                          className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                        >
                          Verifier
                        </Button>
                      </div>
                    )}
                  </div>

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

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="w-5 h-5 mt-0.5 rounded border-input accent-secondary"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      J'accepte les <Link to="/terms" className="text-secondary hover:underline font-medium">conditions</Link> et la <Link to="/privacy" className="text-secondary hover:underline font-medium">politique de confidentialite</Link>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-12 rounded-xl">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed() || isLoading}
                    className="flex-1 h-12 bg-gradient-to-r from-secondary via-orange to-primary hover:opacity-90 text-white font-semibold rounded-xl"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-5 h-5 animate-spin mr-2" />Inscription...</>
                    ) : (
                      "Creer ma boutique"
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Login Link */}
            <p className="text-center mt-6 text-muted-foreground">
              Deja un compte vendeur? <Link to="/login" className="text-secondary font-semibold hover:underline">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;