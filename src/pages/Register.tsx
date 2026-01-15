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
    await new Promise((resolve) => setTimeout(resolve, 800));
    setOtpSent(true);
    setIsLoading(false);
    toast({
      title: "Code OTP",
      description: "Mode test: utilisez 123456 (aucun SMS n'est envoyé pour l'instant).",
    });
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast({ title: "Erreur", description: "Le code OTP doit contenir 6 chiffres", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (otp === "123456") {
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-10">
      <BubblesBackground />

      <div className="relative z-10 w-full max-w-lg mx-auto px-4">
        {/* Progress Steps */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${
                  step >= s ? "bg-primary text-primary-foreground shadow-lg" : "bg-card/50 text-foreground"
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              <span className={`text-sm font-medium ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                {s === 1 ? "Infos" : "Sécurité"}
              </span>
              {s < 2 && (
                <div className={`w-8 h-1 rounded-full transition-all duration-500 ${step > s ? "bg-primary" : "bg-card/40"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Glassmorphism Card */}
        <div className="relative rounded-3xl sm:rounded-[40px] p-6 sm:p-8 backdrop-blur-xl bg-card/20 border border-border/30 shadow-elevated">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Créer un compte</h1>
            <p className="text-muted-foreground mt-1">Rejoignez VitaDrinks</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Prénom"
                    required
                    className="w-full px-4 py-3 bg-card/90 border border-border/60 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Nom"
                    required
                    className="w-full px-4 py-3 bg-card/90 border border-border/60 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                </div>

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 bg-white/90 border-0 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                />

                {/* Phone with OTP */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/\D/g, '').slice(0, 9);
                        setFormData({ ...formData, phone: cleaned });
                        setOtpVerified(false);
                        setOtpSent(false);
                      }}
                      placeholder="Téléphone (6XXXXXXXX)"
                      required
                      disabled={otpVerified}
                      className="flex-1 px-4 py-3 bg-white/90 border-0 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 disabled:opacity-60"
                    />
                    {!otpVerified && (
                      <Button 
                        type="button" 
                        onClick={sendOtp}
                        disabled={isLoading || !validatePhone(formData.phone)}
                        className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-4"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : otpSent ? "Renvoyer" : "OTP"}
                      </Button>
                    )}
                    {otpVerified && (
                      <div className="flex items-center gap-2 text-green-600 px-3">
                        <Shield className="w-5 h-5" />
                        <span className="text-sm font-medium">OK</span>
                      </div>
                    )}
                  </div>

                  {otpSent && !otpVerified && (
                    <div className="p-4 rounded-xl bg-white/30 border border-white/40 space-y-3 animate-fade-in">
                      <div className="flex items-center gap-2 text-sm font-medium text-amber-800">
                        <Smartphone className="w-4 h-4" />
                        Entrez le code OTP
                      </div>
                      <div className="flex justify-center">
                        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                          <InputOTPGroup>
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                              <InputOTPSlot key={i} index={i} className="w-10 h-12 text-lg border-2 bg-white/80" />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <Button 
                        type="button" 
                        onClick={verifyOtp}
                        disabled={isLoading || otp.length !== 6}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Vérifier
                      </Button>
                      <p className="text-xs text-center text-amber-800/60">Test: 123456</p>
                    </div>
                  )}
                </div>

                <Button 
                  type="button" 
                  className="w-full py-4 bg-white/90 hover:bg-white text-amber-800 font-semibold rounded-full shadow-lg border border-amber-200/50" 
                  onClick={() => setStep(2)} 
                  disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !otpVerified}
                >
                  Continuer
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Mot de passe"
                  required
                  className="w-full px-4 py-3 bg-white/90 border-0 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                />
                
                <div className="text-xs text-amber-800/70 space-y-1 px-1">
                  <p className={formData.password.length >= 8 ? "text-green-600" : ""}>
                    {formData.password.length >= 8 ? "✓" : "○"} Au moins 8 caractères
                  </p>
                  <p className={/[A-Z]/.test(formData.password) ? "text-green-600" : ""}>
                    {/[A-Z]/.test(formData.password) ? "✓" : "○"} Une majuscule
                  </p>
                  <p className={/[0-9]/.test(formData.password) ? "text-green-600" : ""}>
                    {/[0-9]/.test(formData.password) ? "✓" : "○"} Un chiffre
                  </p>
                </div>

                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirmer le mot de passe"
                  required
                  className="w-full px-4 py-3 bg-white/90 border-0 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                />

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/30">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    checked={formData.acceptTerms} 
                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })} 
                    className="w-5 h-5 mt-0.5 rounded accent-amber-600" 
                    required 
                  />
                  <label htmlFor="terms" className="text-sm text-amber-800/80">
                    J'accepte les <Link to="/terms" className="text-amber-700 hover:underline font-medium">conditions</Link> et la <Link to="/privacy" className="text-amber-700 hover:underline font-medium">confidentialité</Link>
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1 bg-white/50 border-white/40 text-amber-800 hover:bg-white/70 rounded-full" 
                    onClick={() => setStep(1)}
                  >
                    Retour
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-white/90 hover:bg-white text-amber-800 font-semibold rounded-full shadow-lg border border-amber-200/50" 
                    disabled={isLoading || !formData.acceptTerms}
                  >
                    {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin mr-2" />Création...</>) : "Créer"}
                  </Button>
                </div>
              </div>
            )}
          </form>

          <p className="text-center mt-6 text-amber-900/70">
            Déjà un compte?{' '}
            <Link to="/login" className="text-amber-800 font-semibold hover:underline">Se connecter</Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-amber-900/70">
            Vous êtes un producteur?{' '}
            <Link to="/seller/register" className="text-amber-800 font-semibold hover:underline">
              Inscrivez-vous comme vendeur
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
