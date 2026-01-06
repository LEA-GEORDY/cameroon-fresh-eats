import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2, User, Phone, Check, Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import AnimatedLogo from "@/components/AnimatedLogo";
import BubblesBackground from "@/components/BubblesBackground";
import AnimatedInput from "@/components/AnimatedInput";
import { useConfetti } from "@/hooks/useConfetti";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().min(2, "Prénom trop court").max(50, "Prénom trop long"),
  lastName: z.string().min(2, "Nom trop court").max(50, "Nom trop long"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(/^6[5-9]\d{7}$/, "Numéro de téléphone invalide"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir un chiffre"),
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, { errorMap: () => ({ message: "Vous devez accepter les conditions" }) }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const { signUp, user, isLoading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const { triggerConfetti } = useConfetti();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 9 && /^6[5-9]/.test(cleaned);
  };

  const sendOtp = async () => {
    if (!validatePhone(formData.phone)) {
      toast({ title: "Erreur", description: "Numéro de téléphone invalide", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOtpSent(true);
    setIsLoading(false);
    toast({ title: "Code OTP envoyé", description: `Un code a été envoyé au +237 ${formData.phone}` });
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast({ title: "Erreur", description: "Le code OTP doit contenir 6 chiffres", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // For demo purposes, accept any 6-digit code or 123456
    if (otp === "123456" || otp.length === 6) {
      setOtpVerified(true);
      toast({ title: "Téléphone vérifié", description: "Votre numéro a été vérifié avec succès" });
    } else {
      toast({ title: "Erreur", description: "Code OTP incorrect", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      toast({ 
        title: "Erreur", 
        description: validation.error.errors[0].message, 
        variant: "destructive" 
      });
      return;
    }

    if (!otpVerified) {
      toast({ title: "Erreur", description: "Veuillez vérifier votre numéro de téléphone", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    
    const { error } = await signUp(formData.email, formData.password, {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
    });

    if (error) {
      let errorMessage = "Une erreur est survenue";
      
      if (error.message.includes("User already registered")) {
        errorMessage = "Un compte avec cet email existe déjà";
      } else if (error.message.includes("Password")) {
        errorMessage = "Le mot de passe ne respecte pas les critères de sécurité";
      } else if (error.message.includes("Email")) {
        errorMessage = "Format d'email invalide";
      }
      
      toast({ 
        title: "Erreur d'inscription", 
        description: errorMessage, 
        variant: "destructive" 
      });
      setIsLoading(false);
      return;
    }

    triggerConfetti();
    
    toast({ title: "Compte créé avec succès", description: "Bienvenue sur VitaDrinks" });
    setIsLoading(false);
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center relative overflow-hidden">
      <BubblesBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block"><AnimatedLogo size="xl" /></Link>
            <h1 className="text-3xl font-bold text-foreground mt-4">Créer un compte</h1>
            <p className="text-muted-foreground mt-2">Rejoignez la communauté VitaDrinks</p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-500 border-2 ${
                  step >= s 
                    ? "bg-gradient-to-r from-primary via-secondary to-orange text-white border-transparent shadow-lg" 
                    : "bg-card text-muted-foreground border-border"
                }`}>
                  {step > s ? <Check className="w-6 h-6" /> : s}
                </div>
                <span className={`text-sm font-medium ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                  {s === 1 ? "Informations" : "Sécurité"}
                </span>
                {s < 2 && <div className={`w-10 h-1 rounded-full transition-all duration-500 ${step > s ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          <div className="bg-card/60 backdrop-blur-2xl rounded-3xl shadow-elevated p-8 border border-white/20" style={{ backdropFilter: 'blur(20px)' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <AnimatedInput 
                      label="Prénom" 
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
                          label="Téléphone" 
                          icon={<Phone className="w-5 h-5" />} 
                          type="tel" 
                          value={formData.phone} 
                          onChange={(e) => {
                            const cleaned = e.target.value.replace(/\D/g, '').slice(0, 9);
                            setFormData({ ...formData, phone: cleaned });
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
                          disabled={isLoading || !validatePhone(formData.phone)}
                          className="mt-6 bg-gradient-to-r from-secondary to-orange text-white"
                        >
                          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : otpSent ? "Renvoyer" : "Envoyer OTP"}
                        </Button>
                      )}
                      {otpVerified && (
                        <div className="mt-6 flex items-center gap-2 text-primary">
                          <Shield className="w-5 h-5" />
                          <span className="text-sm font-medium">Vérifié</span>
                        </div>
                      )}
                    </div>

                    {otpSent && !otpVerified && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 space-y-3 animate-fade-in">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Smartphone className="w-4 h-4 text-primary" />
                          Entrez le code OTP reçu
                        </div>
                        <div className="flex justify-center">
                          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                            <InputOTPGroup>
                              {[0, 1, 2, 3, 4, 5].map((i) => (
                                <InputOTPSlot key={i} index={i} className="w-12 h-14 text-xl border-2" />
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
                          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                          Vérifier le code
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">Pour le test, utilisez: 123456</p>
                      </div>
                    )}
                  </div>

                  <Button 
                    type="button" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary via-secondary to-orange hover:opacity-90 text-white font-semibold" 
                    onClick={() => setStep(2)} 
                    disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !otpVerified}
                  >
                    Continuer
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <AnimatedInput 
                    label="Mot de passe" 
                    icon={<Lock className="w-5 h-5" />} 
                    type="password" 
                    value={formData.password} 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                    required 
                  />
                  <div className="text-xs text-muted-foreground space-y-1 px-1">
                    <p className={formData.password.length >= 8 ? "text-primary" : ""}>
                      {formData.password.length >= 8 ? "✓" : "○"} Au moins 8 caractères
                    </p>
                    <p className={/[A-Z]/.test(formData.password) ? "text-primary" : ""}>
                      {/[A-Z]/.test(formData.password) ? "✓" : "○"} Une majuscule
                    </p>
                    <p className={/[0-9]/.test(formData.password) ? "text-primary" : ""}>
                      {/[0-9]/.test(formData.password) ? "✓" : "○"} Un chiffre
                    </p>
                  </div>
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
                      className="w-5 h-5 mt-0.5 rounded border-input accent-primary" 
                      required 
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      J'accepte les <Link to="/terms" className="text-primary hover:underline font-medium">conditions d'utilisation</Link> et la <Link to="/privacy" className="text-primary hover:underline font-medium">politique de confidentialité</Link>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" size="lg" variant="outline" className="flex-1" onClick={() => setStep(1)}>Retour</Button>
                    <Button type="submit" size="lg" className="flex-1 bg-gradient-to-r from-primary via-secondary to-orange hover:opacity-90 text-white font-semibold" disabled={isLoading || !formData.acceptTerms}>
                      {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin mr-2" />Création...</>) : "Créer mon compte"}
                    </Button>
                  </div>
                </div>
              )}
            </form>

            <p className="text-center mt-8 text-muted-foreground">
              Déjà un compte? <Link to="/login" className="text-primary font-semibold hover:underline">Se connecter</Link>
            </p>
          </div>

          <div className="text-center mt-6">
            <p className="text-muted-foreground">Vous êtes un producteur? <Link to="/seller/register" className="text-secondary font-semibold hover:underline">Inscrivez-vous comme vendeur</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
