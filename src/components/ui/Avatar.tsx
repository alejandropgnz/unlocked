import { cn } from "@/lib/cn";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-[88px] h-[88px] sm:w-[112px] sm:h-[112px]",
};

export function Avatar({ src, alt = "", size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full overflow-hidden bg-surface flex-shrink-0",
        SIZES[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : null}
    </div>
  );
}
