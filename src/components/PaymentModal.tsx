import { useState } from 'react';
import { X, Smartphone, CheckCircle2, Lock, ArrowRight, ArrowLeft, AlertTriangle, Phone, Banknote, Package, ShieldCheck, Hash, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConfetti } from '@/hooks/useConfetti';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  productName: string;
  onSuccess: () => void;
}

type Step = 'phone' | 'confirmation' | 'processing' | 'success' | 'error';
type Operator = 'orange' | 'mtn' | null;

const PaymentModal = ({ isOpen, onClose, amount, productName, onSuccess }: PaymentModalProps) => {
  const [step, setStep] = useState<Step>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [operator, setOperator] = useState<Operator>(null);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [reference, setReference] = useState('');
  const { triggerConfetti } = useConfetti();

  const detectOperator = (number: string): Operator => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.length >= 2) {
      const prefix = cleanNumber.substring(0, 3);
      // Orange: 655-659, 690-699, 700-709
      if (/^(65[5-9]|69[0-9]|70[0-9])/.test(prefix)) return 'orange';
      // MTN: 650-654, 670-679, 680-689
      if (/^(65[0-4]|67[0-9]|68[0-9])/.test(prefix)) return 'mtn';
    }
    return null;
  };

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 9);
    const formatted = cleaned.replace(/(\d{3})(\d{2})?(\d{2})?(\d{2})?/, (_, p1, p2, p3, p4) => 
      [p1, p2, p3, p4].filter(Boolean).join(' ')
    );
    setPhoneNumber(formatted);
    setOperator(detectOperator(cleaned));
    setError('');
  };

  const validatePhone = (): boolean => {
    const cleaned = phoneNumber.replace(/\s/g, '');
    if (cleaned.length !== 9) {
      setError('Le numero doit contenir 9 chiffres');
      return false;
    }
    if (!operator) {
      setError('Numero non reconnu. Orange: 655-659, 690-699, 700-709 | MTN: 650-654, 670-679, 680-689');
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (validatePhone()) {
      setStep('confirmation');
    }
  };

  const handlePayment = async () => {
    setStep('processing');
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setReference(`VD${Date.now().toString().slice(-8)}`);
      setStep('success');
      triggerConfetti();
    }, 4000);
  };

  const handleSuccessClose = () => {
    onSuccess();
    resetModal();
    onClose();
  };

  const resetModal = () => {
    setStep('phone');
    setPhoneNumber('');
    setOperator(null);
    setError('');
    setProgress(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-card rounded-3xl shadow-elevated overflow-hidden animate-scale-in border border-border/50">
        {/* Close Button */}
        <button
          onClick={() => { resetModal(); onClose(); }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 text-center border-b border-border bg-gradient-to-r from-primary/10 via-secondary/10 to-orange/10">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary via-secondary to-orange flex items-center justify-center mb-4 shadow-lg animate-pulse-soft">
            <CreditCard className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Paiement Mobile Money</h2>
          <p className="text-muted-foreground mt-1 truncate max-w-[80%] mx-auto">{productName}</p>
          <div className="mt-4 p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl border border-border/50">
            <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{amount.toLocaleString()}</span>
            <span className="text-muted-foreground ml-2 text-lg">FCFA</span>
          </div>
        </div>

        {/* Enhanced Progress Steps */}
        <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-muted/30 to-muted/10">
          <div className="flex items-center justify-center gap-2">
            {[
              { key: 'phone', icon: Phone, label: 'Telephone' },
              { key: 'confirmation', icon: CheckCircle2, label: 'Confirmer' },
              { key: 'processing', icon: CreditCard, label: 'Paiement' },
            ].map((s, i) => {
              const stepOrder = ['phone', 'confirmation', 'processing', 'success'];
              const currentIndex = stepOrder.indexOf(step);
              const stepIndex = stepOrder.indexOf(s.key);
              const isCompleted = currentIndex > stepIndex || step === 'success';
              const isActive = step === s.key;

              return (
                <div key={s.key} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                      isCompleted
                        ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30'
                        : isActive
                        ? 'bg-gradient-to-br from-primary to-secondary text-white border-transparent shadow-lg scale-110'
                        : 'bg-muted text-muted-foreground border-border'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs mt-1 font-medium hidden sm:block ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className={`w-12 h-1.5 mx-2 rounded-full transition-all duration-500 ${
                      isCompleted ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Phone Input */}
          {step === 'phone' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  Numero Mobile Money
                </label>
                <p className="text-xs text-muted-foreground">
                  Orange Money ou MTN Mobile Money
                </p>
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm z-10">
                  <span className="text-xl">+237</span>
                  <div className="w-px h-6 bg-border" />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="6XX XX XX XX"
                  className={`w-full h-16 pl-24 pr-14 rounded-2xl border-2 font-mono text-xl transition-all duration-300 bg-muted/30 focus:bg-card ${
                    operator === 'orange'
                      ? 'border-orange bg-orange/5 ring-2 ring-orange/30 shadow-lg shadow-orange/20'
                      : operator === 'mtn'
                      ? 'border-yellow-400 bg-yellow-400/5 ring-2 ring-yellow-400/30 shadow-lg shadow-yellow-400/20'
                      : 'border-input focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }`}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {operator && (
                    <img 
                      src={operator === 'orange' 
                        ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png'
                        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New-mtn-logo.jpg/1200px-New-mtn-logo.jpg'
                      }
                      alt={operator}
                      className="h-8 w-8 object-contain rounded-full"
                    />
                  )}
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    operator === 'orange' 
                      ? 'bg-orange shadow-lg shadow-orange/50 animate-pulse' 
                      : operator === 'mtn'
                      ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50 animate-pulse'
                      : 'bg-muted'
                  }`} />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive animate-shake">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="p-4 rounded-xl border bg-gradient-to-r from-muted/30 to-muted/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Operateurs supportes</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 transition-all duration-300 ${operator === 'orange' ? 'opacity-100 scale-110' : 'opacity-50'}`}>
                      <div className="w-4 h-4 rounded-full bg-orange shadow-sm" />
                      <span className="text-xs font-medium">Orange</span>
                    </div>
                    <div className={`flex items-center gap-2 transition-all duration-300 ${operator === 'mtn' ? 'opacity-100 scale-110' : 'opacity-50'}`}>
                      <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-sm" />
                      <span className="text-xs font-medium">MTN</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleContinue}
                disabled={!phoneNumber || phoneNumber.replace(/\s/g, '').length < 9}
                className="w-full h-14 text-lg bg-gradient-to-r from-primary via-secondary to-orange hover:opacity-90 text-white font-semibold rounded-2xl shadow-lg"
              >
                Continuer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {step === 'confirmation' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-3">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display">Confirmation</h3>
                  <p className="text-sm text-muted-foreground">Verifiez les informations</p>
                </div>
              </div>

              <div className="rounded-2xl border overflow-hidden bg-gradient-to-b from-muted/20 to-transparent">
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <span className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4" />
                    Article
                  </span>
                  <span className="font-medium text-right max-w-[60%] truncate">{productName}</span>
                </div>
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <span className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    Telephone
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">+237 {phoneNumber}</span>
                    <div className={`w-3 h-3 rounded-full ${operator === 'orange' ? 'bg-orange' : 'bg-yellow-400'}`} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10">
                  <span className="font-bold flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-primary" />
                    Total
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{amount.toLocaleString()} FCFA</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-700">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span className="text-xs">Transaction securisee SSL. Vos donnees sont chiffrees et protegees.</span>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handlePayment}
                  className="w-full h-14 text-lg bg-gradient-to-r from-primary via-secondary to-orange hover:opacity-90 text-white font-semibold rounded-2xl shadow-lg"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Confirmer et payer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setStep('phone')}
                  className="w-full h-12 rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Modifier le numero
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Processing */}
          {step === 'processing' && (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="space-y-4">
                <div className="relative mx-auto h-24 w-24">
                  <div className="absolute inset-0 rounded-full border-4 border-muted" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-secondary border-b-orange border-l-transparent animate-spin" />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                    <Smartphone className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display">Traitement en cours</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {progress < 30 ? 'Initialisation...' : progress < 60 ? 'Envoi de la demande...' : 'Attente de confirmation...'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden border">
                  <div 
                    className="h-full bg-gradient-to-r from-primary via-secondary to-orange rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{Math.round(Math.min(progress, 100))}% complete</p>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
                <Smartphone className="w-5 h-5 shrink-0" />
                <div className="text-left">
                  <p className="font-medium text-sm">Verifiez votre telephone</p>
                  <p className="text-xs mt-1">Acceptez la notification ou composez le code USSD pour finaliser.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="space-y-4">
                <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-4 border-primary/30 flex items-center justify-center">
                  <CheckCircle2 className="w-14 h-14 text-primary animate-scale-in" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Paiement reussi</h3>
                  <p className="text-sm text-muted-foreground mt-1">Votre transaction a ete traitee avec succes</p>
                </div>
              </div>

              <div className="rounded-2xl border bg-gradient-to-b from-primary/10 to-transparent p-4 space-y-3 text-left">
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Banknote className="w-4 h-4" />
                    Montant paye
                  </span>
                  <span className="font-bold text-lg">{amount.toLocaleString()} FCFA</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Hash className="w-4 h-4" />
                    Reference
                  </span>
                  <span className="font-mono text-sm bg-card px-3 py-1.5 rounded-lg border">{reference}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="text-xs text-left">Paiement confirme. Vous recevrez un SMS de confirmation.</span>
              </div>

              <Button
                onClick={handleSuccessClose}
                className="w-full h-14 text-lg bg-gradient-to-r from-primary via-secondary to-orange hover:opacity-90 text-white font-semibold rounded-2xl shadow-lg"
              >
                Continuer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;