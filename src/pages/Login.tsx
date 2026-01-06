import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import AnimatedLogo from "@/components/AnimatedLogo";
import BubblesBackground from "@/components/BubblesBackground";
import AnimatedInput from "@/components/AnimatedInput";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

const Login = () => {
  const navigate = useNavigate();
  const { signIn, user, isLoading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      toast({ 
        title: "Erreur", 
        description: validation.error.errors[0].message, 
        variant: "destructive" 
      });
      return;
    }

    setIsLoading(true);
    
    const { error } = await signIn(formData.email, formData.password);
    
    if (error) {
      let errorMessage = "Une erreur est survenue";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email ou mot de passe incorrect";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Veuillez confirmer votre email";
      } else if (error.message.includes("Too many requests")) {
        errorMessage = "Trop de tentatives, réessayez plus tard";
      }
      
      toast({ 
        title: "Erreur de connexion", 
        description: errorMessage, 
        variant: "destructive" 
      });
      setIsLoading(false);
      return;
    }
    
    toast({ 
      title: "Connexion réussie", 
      description: "Bienvenue sur VitaDrinks" 
    });
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
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block"><AnimatedLogo size="xl" /></Link>
            <h1 className="text-3xl font-bold text-foreground mt-4">Connexion</h1>
            <p className="text-muted-foreground mt-2">Heureux de vous revoir</p>
          </div>

          <div className="bg-card/60 backdrop-blur-2xl rounded-3xl shadow-elevated p-8 border border-white/20" style={{ backdropFilter: 'blur(20px)' }}>
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
                  Mot de passe oublié?
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

            <p className="text-center mt-8 text-muted-foreground">
              Pas encore de compte? <Link to="/register" className="text-primary font-semibold hover:underline">Créer un compte</Link>
            </p>
          </div>

          <div className="text-center mt-6 space-y-2">
            <p className="text-muted-foreground">
              Vous êtes un vendeur? <Link to="/seller/register" className="text-secondary font-semibold hover:underline">Espace vendeur</Link>
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
