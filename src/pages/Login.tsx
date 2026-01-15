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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <BubblesBackground />

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Glassmorphism Card */}
        <div 
          className="relative rounded-[50px] p-10 backdrop-blur-xl"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-800">Login</h1>
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
                className="w-full px-4 py-4 bg-white/90 border-0 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
                required
                className="w-full px-4 py-4 bg-white/90 border-0 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-amber-700 hover:text-amber-800 hover:underline">
                Forget Password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-white/90 hover:bg-white text-amber-800 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200/50"
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin mr-2" />Connexion...</>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <p className="text-center mt-8 text-amber-900/70">
            Pas encore de compte?{' '}
            <Link to="/register" className="text-amber-800 font-semibold hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-amber-900/70">
            Vous êtes un vendeur?{' '}
            <Link to="/seller/register" className="text-amber-800 font-semibold hover:underline">
              Espace vendeur
            </Link>
          </p>
          <p className="text-amber-900/70">
            Administrateur?{' '}
            <Link to="/admin/dashboard" className="text-amber-800 font-semibold hover:underline">
              Espace admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
