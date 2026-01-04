import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2, Eye, EyeOff, Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import AnimatedLogo from "@/components/AnimatedLogo";
import BubblesBackground from "@/components/BubblesBackground";
import AnimatedInput from "@/components/AnimatedInput";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({ title: "Erreur", description: "Veuillez remplir tous les champs", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    // Show 2FA step
    setShow2FA(true);
    toast({ title: "Code de verification envoye", description: "Consultez votre telephone" });
  };

  const verify2FA = async () => {
    if (otp.length !== 6) {
      toast({ title: "Erreur", description: "Le code doit contenir 6 chiffres", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({ title: "Connexion reussie", description: "Bienvenue sur VitaDrinks" });
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center relative overflow-hidden">
      <BubblesBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block"><AnimatedLogo size="xl" /></Link>
            <h1 className="font-display text-3xl font-bold text-foreground mt-4">Connexion</h1>
            <p className="text-muted-foreground mt-2">Heureux de vous revoir</p>
          </div>

          <div className="bg-card/80 backdrop-blur-2xl rounded-3xl shadow-elevated p-8 border border-border/30">
            {!show2FA ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatedInput 
                  label="Email" 
                  icon={<Mail className="w-5 h-5" />} 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  required 
                />

                <div className="relative">
                  <AnimatedInput 
                    label="Mot de passe" 
                    icon={<Lock className="w-5 h-5" />} 
                    type={showPassword ? "text" : "password"} 
                    value={formData.password} 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-10 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                      className="w-4 h-4 rounded border-input accent-primary"
                    />
                    <span className="text-sm text-muted-foreground">Se souvenir de moi</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                    Mot de passe oublie?
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary via-secondary to-orange hover:opacity-90 text-white font-semibold"
                >
                  {isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin mr-2" />Connexion...</>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                    <Shield className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-bold">Verification a deux facteurs</h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    Entrez le code envoye sur votre telephone
                  </p>
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
                  onClick={verify2FA}
                  size="lg"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full bg-gradient-to-r from-primary via-secondary to-orange hover:opacity-90 text-white font-semibold"
                >
                  {isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin mr-2" />Verification...</>
                  ) : (
                    "Verifier"
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => { setShow2FA(false); setOtp(""); }}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Retour a la connexion
                </button>

                <p className="text-xs text-center text-muted-foreground">Pour le test, utilisez: 123456</p>
              </div>
            )}

            <p className="text-center mt-8 text-muted-foreground">
              Pas encore de compte? <Link to="/register" className="text-primary font-semibold hover:underline">Creer un compte</Link>
            </p>
          </div>

          <div className="text-center mt-6 space-y-2">
            <p className="text-muted-foreground">
              Vous etes un vendeur? <Link to="/seller/register" className="text-secondary font-semibold hover:underline">Espace vendeur</Link>
            </p>
            <p className="text-muted-foreground">
              Administrateur? <Link to="/admin/dashboard" className="text-orange font-semibold hover:underline">Espace admin</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;