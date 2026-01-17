import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import BubblesBackground from "@/components/BubblesBackground";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";

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

  // Load saved credentials on mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem("vitadrinks_remember");
    if (savedCredentials) {
      try {
        const parsed = JSON.parse(savedCredentials);
        setFormData({
          email: parsed.email || "",
          password: parsed.password || "",
          rememberMe: true,
        });
      } catch (e) {
        localStorage.removeItem("vitadrinks_remember");
      }
    }
  }, []);

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

    // Save or remove credentials based on remember me
    if (formData.rememberMe) {
      localStorage.setItem("vitadrinks_remember", JSON.stringify({
        email: formData.email,
        password: formData.password,
      }));
    } else {
      localStorage.removeItem("vitadrinks_remember");
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <BubblesBackground intensity="high" />

        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          {/* Glassmorphism Card */}
          <div className="relative rounded-3xl sm:rounded-[50px] p-6 sm:p-10 backdrop-blur-xl bg-card/20 border border-border/30 shadow-elevated">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Connexion</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-4 bg-card/90 border border-border/60 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Mot de passe"
                  required
                  className="w-full px-4 py-4 bg-card/90 border border-border/60 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="rememberMe" 
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    className="border-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label 
                    htmlFor="rememberMe" 
                    className="text-sm text-foreground cursor-pointer select-none"
                  >
                    Se souvenir de moi
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-foreground font-medium hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Connexion...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>

            <p className="text-center mt-8 text-foreground">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-foreground font-bold hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
    </div>
  );
};

export default Login;
