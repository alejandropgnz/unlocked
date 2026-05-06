import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  showCounter?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, showCounter, value, maxLength, ...props }, ref) => {
    const length = typeof value === "string" ? value.length : 0;
    return (
      <div>
        <textarea
          ref={ref}
          value={value}
          maxLength={maxLength}
          className={cn(
            "w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-indigo focus:outline-none resize-none disabled:opacity-50",
            error && "border-red focus:border-red",
            className,
          )}
          {...props}
        />
        <div className="flex justify-between items-center mt-1">
          {error && <p className="text-red text-xs">{error}</p>}
          {showCounter && maxLength && (
            <p className="text-xs text-muted font-mono ml-auto">
              {length}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
