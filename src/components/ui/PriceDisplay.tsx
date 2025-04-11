
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  amount: number;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

export function PriceDisplay({ 
  amount, 
  size = "md", 
  animate = false,
  className
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  // فرمت‌بندی مبلغ به صورت ریال ایران
  const formattedAmount = new Intl.NumberFormat('fa-IR').format(amount);

  return (
    <div className={cn("flex items-center", className)}>
      <div 
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-400 shadow-md ml-2",
          animate && "animate-coin-bounce",
          size === "lg" && "w-12 h-12",
          size === "sm" && "w-6 h-6"
        )}
      >
        <span className="text-white font-bold">﷼</span>
      </div>
      <span className={cn("font-bold gradient-text", sizeClasses[size])}>
        {formattedAmount}
      </span>
    </div>
  );
}
