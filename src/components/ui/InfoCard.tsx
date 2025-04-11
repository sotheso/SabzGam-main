import { cn } from "@/lib/utils";

interface InfoCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export function InfoCard({ title, value, icon, className }: InfoCardProps) {
  return (
    <div 
      className={cn(
        "bg-white rounded-xl p-4 shadow-sm border border-gray-100 card-hover",
        className
      )}
    >
      <div className="flex items-center">
        {icon && <div className="mr-2 text-sabzgaam-dark-green">{icon}</div>}
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-gray-500">{value}</p>
        </div>
      </div>
    </div>
  );
}
