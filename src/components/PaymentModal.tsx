import { useState } from 'react';
import { X, Smartphone, CheckCircle2, Lock, ArrowRight, ArrowLeft, AlertTriangle, Phone, Banknote, Package, ShieldCheck, Hash } from 'lucide-react';
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
      const prefix = cleanNumber.substring(0, 2);
      const orangePrefixes = ['65', '66', '69', '70'];
      const mtnPrefixes = ['67', '68', '50', '51', '52', '53', '54'];
      
      if (orangePrefixes.some(p => prefix.startsWith(p.charAt(0)) && cleanNumber.charAt(1) === p.charAt(1))) {
        return 'orange';
      }
      if (mtnPrefixes.some(p => prefix.startsWith(p.charAt(0)) && cleanNumber.charAt(1) === p.charAt(1))) {
        return 'mtn';
      }
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
      setError('Le numéro doit contenir 9 chiffres');
      return false;
    }
    if (!operator) {
      setError('Numéro non reconnu. Utilisez Orange Money ou MTN MoMo');
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

    // Simulate payment processing
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    // Simulate API call
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-elevated overflow-hidden animate-scale-in">
        {/* Close Button */}
        <button
          onClick={() => { resetModal(); onClose(); }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 text-center border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Mobile Money</h2>
          <p className="text-muted-foreground mt-1">{productName}</p>
          <div className="mt-4 p-3 bg-muted/50 rounded-xl">
            <span className="text-3xl font-bold text-foreground">{amount.toLocaleString()}</span>
            <span className="text-muted-foreground ml-2">FCFA</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center justify-center gap-2">
            {[
              { key: 'phone', icon: Phone, label: 'Numero' },
              { key: 'confirmation', icon: CheckCircle2, label: 'Confirmer' },
              { key: 'processing', icon: Lock, label: 'Paiement' },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step === s.key || ['confirmation', 'processing', 'success'].indexOf(step) >= i
                    ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                    : step === 'success' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <s.icon className="w-5 h-5" />
                </div>
                {i < 2 && (
                  <div className={`w-8 h-1 mx-1 rounded-full transition-all duration-500 ${
                    ['confirmation', 'processing', 'success'].indexOf(step) > i
                      ? 'bg-primary'
                      : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Phone Input */}
          {step === 'phone' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Numero Mobile Money
                </label>
                <p className="text-xs text-muted-foreground">
                  Orange Money ou MTN Mobile Money
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm">
                  <span className="text-lg">🇨🇲</span>
                  <span className="font-semibold">+237</span>
                  <div className="w-px h-6 bg-border" />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="6XX XX XX XX"
                  className={`w-full h-14 pl-28 pr-12 rounded-xl border-2 font-mono text-lg transition-all duration-300 ${
                    operator === 'orange'
                      ? 'border-orange bg-orange/5 ring-2 ring-orange/20'
                      : operator === 'mtn'
                      ? 'border-yellow-400 bg-yellow-400/5 ring-2 ring-yellow-400/20'
                      : 'border-input bg-card focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }`}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    operator === 'orange' 
                      ? 'bg-orange shadow-lg shadow-orange/40 animate-pulse' 
                      : operator === 'mtn'
                      ? 'bg-yellow-400 shadow-lg shadow-yellow-400/40 animate-pulse'
                      : 'bg-muted'
                  }`} />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Operateurs supportes</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 transition-all ${operator === 'orange' ? 'opacity-100' : 'opacity-40'}`}>
                      <div className="w-3 h-3 rounded-full bg-orange" />
                      <span className="text-xs font-medium">Orange</span>
                    </div>
                    <div className={`flex items-center gap-2 transition-all ${operator === 'mtn' ? 'opacity-100' : 'opacity-40'}`}>
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <span className="text-xs font-medium">MTN</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleContinue}
                disabled={!phoneNumber || phoneNumber.replace(/\s/g, '').length < 9}
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold"
              >
                Continuer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {step === 'confirmation' && (
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Confirmation</h3>
                  <p className="text-sm text-muted-foreground">Verifiez les informations</p>
                </div>
              </div>

              <div className="rounded-lg border divide-y">
                <div className="flex items-center justify-between p-4">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Article
                  </span>
                  <span className="font-medium text-right max-w-[60%] truncate">{productName}</span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Telephone
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">+237 {phoneNumber}</span>
                    <div className={`w-3 h-3 rounded-full ${operator === 'orange' ? 'bg-orange' : 'bg-yellow-400'}`} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30">
                  <span className="font-semibold flex items-center gap-2">
                    <Banknote className="w-4 h-4" />
                    Total
                  </span>
                  <span className="text-xl font-bold">{amount.toLocaleString()} FCFA</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span className="text-xs">Transaction securisee SSL. Vos donnees sont chiffrees et protegees.</span>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handlePayment}
                  className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Confirmer et payer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setStep('phone')}
                  className="w-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Modifier le numero
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Processing */}
          {step === 'processing' && (
            <div className="space-y-6 text-center">
              <div className="space-y-4">
                <div className="relative mx-auto h-20 w-20">
                  <div className="absolute inset-0 rounded-full border-4 border-muted" />
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <div className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Traitement en cours</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {progress < 30 ? 'Initialisation...' : progress < 60 ? 'Envoi de la demande...' : 'Attente de confirmation...'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-700">
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
            <div className="space-y-6 text-center">
              <div className="space-y-4">
                <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 border-4 border-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-primary animate-scale-in" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-primary">Paiement reussi</h3>
                  <p className="text-sm text-muted-foreground mt-1">Votre transaction a ete traitee avec succes</p>
                </div>
              </div>

              <div className="rounded-lg border bg-primary/5 p-4 space-y-3 text-left">
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Banknote className="w-4 h-4" />
                    Montant paye
                  </span>
                  <span className="font-semibold">{amount.toLocaleString()} FCFA</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Reference
                  </span>
                  <span className="font-mono text-xs bg-card px-3 py-1 rounded border">{reference}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="text-xs">Paiement confirme. Vous recevrez un SMS de confirmation.</span>
              </div>

              <Button
                onClick={handleSuccessClose}
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold"
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
