import { useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, icon, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10 transition-colors duration-300"
               style={{ color: isFocused ? 'hsl(var(--primary))' : undefined }}>
            {icon}
          </div>
        )}
        <input
          ref={ref}
          {...props}
          onChange={handleChange}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={cn(
            "w-full h-14 px-4 pt-5 pb-2 rounded-xl border-2 bg-card/80 backdrop-blur-sm text-foreground",
            "outline-none transition-all duration-300",
            "border-input focus:border-primary focus:ring-2 focus:ring-primary/20",
            "hover:border-primary/50",
            icon && "pl-12",
            className
          )}
          placeholder=" "
        />
        <label
          className={cn(
            "absolute left-4 transition-all duration-300 pointer-events-none font-medium",
            icon && "left-12",
            isFocused || hasValue
              ? "top-2 text-xs text-primary"
              : "top-1/2 -translate-y-1/2 text-muted-foreground"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

AnimatedInput.displayName = 'AnimatedInput';

export default AnimatedInput;
