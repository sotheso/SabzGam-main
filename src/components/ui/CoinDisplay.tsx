import { cn } from "@/lib/utils";
import { CircleDollarSign } from "lucide-react";

interface CoinDisplayProps {
  amount: number;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

export function CoinDisplay({ 
  amount, 
  size = "md", 
  animate = false,
  className
}: CoinDisplayProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div 
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 shadow-lg mr-2 border border-amber-200",
          animate && "animate-coin-bounce",
          size === "lg" && "w-12 h-12",
          size === "sm" && "w-6 h-6"
        )}
      >
        <CircleDollarSign className="text-amber-100 drop-shadow" size={iconSizes[size]} />
      </div>
      <span className={cn("font-bold text-amber-600", sizeClasses[size])}>
        {amount.toLocaleString()}
      </span>
    </div>
  );
}
