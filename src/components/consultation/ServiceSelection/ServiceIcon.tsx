
import { cn } from "@/lib/utils";
import { ComponentType } from "react";

interface ServiceIconProps {
  Icon: ComponentType<{ className?: string }>;
  title: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function ServiceIcon({ Icon, title, isSelected, onSelect }: ServiceIconProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex flex-col items-center p-3 rounded-lg border transition-all duration-200",
        "active:scale-[0.98] touch-manipulation hover:border-white/20",
        isSelected 
          ? "border-citrus-orange bg-citrus-orange/5" 
          : "border-white/10 bg-white/5"
      )}
    >
      <div className="w-10 h-10 mb-2">
        <Icon 
          className={cn(
            "w-full h-full transition-colors duration-300",
            isSelected ? "text-citrus-orange" : "text-[#999B98]"
          )} 
        />
      </div>
      <h3 className="text-sm font-medium text-white">
        {title}
      </h3>
    </button>
  );
}
