import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

/**
 * Professional branded loading spinner with Alhamd Academy gold accent.
 * Uses semantic design tokens — adapts to light/dark mode.
 */
const LoadingSpinner = ({ size = "md", className, label }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer track */}
        <div className="absolute inset-0 rounded-full border-2 border-accent/20" />
        {/* Spinning arc */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-r-accent/50 animate-spin" />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-accent/60 animate-pulse" />
        </div>
      </div>
      {label && (
        <span className="text-xs font-medium text-muted-foreground animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;
