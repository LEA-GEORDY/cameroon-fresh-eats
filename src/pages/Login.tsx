import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import BubblesBackground from "@/components/BubblesBackground";
import AnimatedInput from "@/components/AnimatedInput";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Connexion reussie",
      description: "Bienvenue sur VitaDrinks",
    });

    setIsLoading(false);
    navigate("/");
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
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link to="/">
              <img src={logo} alt="VitaDrinks" className="h-20 mx-auto mb-4" />
            </Link>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Connexion
            </h1>
            <p className="text-muted-foreground mt-2">
              Bienvenue! Connectez-vous a votre compte
            </p>
          </div>

          <div className="bg-card/90 backdrop-blur-xl rounded-3xl shadow-elevated p-8 border border-border/50">
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Mot de passe oublie?
                </Link>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Connexion en cours...
                  </>
                ) : (
                  "Se Connecter"
                )}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground">ou</span>
              </div>
            </div>

            <Button variant="outline" size="lg" className="w-full gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuer avec Google
            </Button>

            <p className="text-center mt-8 text-muted-foreground">
              Pas encore de compte?{" "}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Creer un compte
              </Link>
            </p>
          </div>

          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Vous etes un producteur?{" "}
              <Link to="/seller/register" className="text-secondary font-semibold hover:underline">
                Inscrivez-vous comme vendeur
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
