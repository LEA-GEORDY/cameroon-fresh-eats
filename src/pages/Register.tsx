import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2, User, Phone, Check, Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import AnimatedLogo from "@/components/AnimatedLogo";
import BubblesBackground from "@/components/BubblesBackground";
import AnimatedInput from "@/components/AnimatedInput";
import { useConfetti } from "@/hooks/useConfetti";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Register = () => {
  const navigate = useNavigate();
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

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 9 && /^6[5-9]/.test(cleaned);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  };

  const sendOtp = async () => {
    if (!validatePhone(formData.phone)) {
      toast({ title: "Erreur", description: "Numero de telephone invalide", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOtpSent(true);
    setIsLoading(false);
    toast({ title: "Code OTP envoye", description: `Un code a ete envoye au +237 ${formData.phone}` });
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast({ title: "Erreur", description: "Le code OTP doit contenir 6 chiffres", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Simulate OTP verification (in production, verify with backend)
    if (otp === "123456" || otp.length === 6) {
      setOtpVerified(true);
      toast({ title: "Telephone verifie", description: "Votre numero a ete verifie avec succes" });
    } else {
      toast({ title: "Erreur", description: "Code OTP incorrect", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      toast({ title: "Erreur", description: "Email invalide", variant: "destructive" });
      return;
    }

    if (!validatePassword(formData.password)) {
      toast({ title: "Erreur", description: "Le mot de passe doit contenir au moins 8 caracteres, une majuscule et un chiffre", variant: "destructive" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas", variant: "destructive" });
      return;
    }

    if (!otpVerified) {
      toast({ title: "Erreur", description: "Veuillez verifier votre numero de telephone", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    triggerConfetti();
    
    toast({ title: "Compte cree avec succes", description: "Bienvenue sur VitaDrinks" });
    setIsLoading(false);
    navigate("/profile");
  };

  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center relative overflow-hidden">
      <BubblesBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block"><AnimatedLogo size="xl" /></Link>
            <h1 className="text-3xl font-bold text-foreground mt-4">Creer un compte</h1>
            <p className="text-muted-foreground mt-2">Rejoignez la communaute VitaDrinks</p>
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
                  {s === 1 ? "Informations" : "Securite"}
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
                          <span className="text-sm font-medium">Verifie</span>
                        </div>
                      )}
                    </div>

                    {otpSent && !otpVerified && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 space-y-3 animate-fade-in">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Smartphone className="w-4 h-4 text-primary" />
                          Entrez le code OTP recu
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
                          Verifier le code
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
                      {formData.password.length >= 8 ? "✓" : "○"} Au moins 8 caracteres
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
                      J'accepte les <Link to="/terms" className="text-primary hover:underline font-medium">conditions d'utilisation</Link> et la <Link to="/privacy" className="text-primary hover:underline font-medium">politique de confidentialite</Link>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" size="lg" variant="outline" className="flex-1" onClick={() => setStep(1)}>Retour</Button>
                    <Button type="submit" size="lg" className="flex-1 bg-gradient-to-r from-primary via-secondary to-orange hover:opacity-90 text-white font-semibold" disabled={isLoading || !formData.acceptTerms}>
                      {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin mr-2" />Creation...</>) : "Creer mon compte"}
                    </Button>
                  </div>
                </div>
              )}
            </form>

            <p className="text-center mt-8 text-muted-foreground">
              Deja un compte? <Link to="/login" className="text-primary font-semibold hover:underline">Se connecter</Link>
            </p>
          </div>

          <div className="text-center mt-6">
            <p className="text-muted-foreground">Vous etes un producteur? <Link to="/seller/register" className="text-secondary font-semibold hover:underline">Inscrivez-vous comme vendeur</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;