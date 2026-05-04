import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <div>
      <input
        ref={ref}
        className={cn(
          "w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none disabled:opacity-50",
          error && "border-red focus:border-red",
          className,
        )}
        {...props}
      />
      {error && <p className="text-red text-xs mt-1">{error}</p>}
    </div>
  ),
);
Input.displayName = "Input";
