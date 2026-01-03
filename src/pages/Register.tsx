import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, User, Phone, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import BubblesBackground from "@/components/BubblesBackground";
import AnimatedInput from "@/components/AnimatedInput";
import { useConfetti } from "@/hooks/useConfetti";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { triggerConfetti } = useConfetti();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    triggerConfetti();
    
    toast({ title: "Compte cree avec succes", description: "Bienvenue sur VitaDrinks" });
    setIsLoading(false);
    navigate("/login");
  };

  const regions = ["Adamaoua", "Centre", "Est", "Extreme-Nord", "Littoral", "Nord", "Nord-Ouest", "Ouest", "Sud", "Sud-Ouest"];

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
          <div className="text-center mb-8">
            <Link to="/"><img src={logo} alt="VitaDrinks" className="h-20 mx-auto mb-4" /></Link>
            <h1 className="font-display text-3xl font-bold text-foreground">Creer un compte</h1>
            <p className="text-muted-foreground mt-2">Rejoignez la communaute VitaDrinks</p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg" : "bg-muted text-muted-foreground"
                }`}>
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                <span className={`text-sm ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                  {s === 1 ? "Informations" : "Securite"}
                </span>
                {s < 2 && <div className={`w-8 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          <div className="bg-card/90 backdrop-blur-xl rounded-3xl shadow-elevated p-8 border border-border/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <AnimatedInput label="Prenom" icon={<User className="w-5 h-5" />} value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                    <AnimatedInput label="Nom" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                  </div>
                  <AnimatedInput label="Email" icon={<Mail className="w-5 h-5" />} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  <AnimatedInput label="Telephone" icon={<Phone className="w-5 h-5" />} type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Region</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
                      <select value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-input bg-card/80 backdrop-blur-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20" required>
                        <option value="">Selectionnez votre region</option>
                        {regions.map((region) => (<option key={region} value={region}>{region}</option>))}
                      </select>
                    </div>
                  </div>
                  <Button type="button" size="lg" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" onClick={() => setStep(2)} disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.location}>Continuer</Button>
                </>
              )}

              {step === 2 && (
                <>
                  <AnimatedInput label="Mot de passe" icon={<Lock className="w-5 h-5" />} type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                  <AnimatedInput label="Confirmer le mot de passe" icon={<Lock className="w-5 h-5" />} type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required />
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="terms" checked={formData.acceptTerms} onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })} className="w-5 h-5 mt-0.5 rounded border-input accent-primary" required />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      J'accepte les <Link to="/terms" className="text-primary hover:underline">conditions d'utilisation</Link> et la <Link to="/privacy" className="text-primary hover:underline">politique de confidentialite</Link>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" size="lg" variant="outline" className="flex-1" onClick={() => setStep(1)}>Retour</Button>
                    <Button type="submit" size="lg" className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90" disabled={isLoading || !formData.acceptTerms}>
                      {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin mr-2" />Creation...</>) : "Creer mon compte"}
                    </Button>
                  </div>
                </>
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
