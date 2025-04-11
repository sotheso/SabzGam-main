import { cn } from "@/lib/utils";

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

  return (
    <div className={cn("flex items-center", className)}>
      <div 
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 shadow-md mr-2",
          animate && "animate-coin-bounce",
          size === "lg" && "w-12 h-12",
          size === "sm" && "w-6 h-6"
        )}
      >
        <span className="text-yellow-800 font-bold">ریال</span>
      </div>
      <span className={cn("font-bold gradient-text", sizeClasses[size])}>
        {amount.toLocaleString()}
      </span>
    </div>
  );
}
