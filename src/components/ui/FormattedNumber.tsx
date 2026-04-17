import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatUSD, compactFormatUSD } from "@/lib/formatters";

interface FormattedNumberProps {
  value: number;
  isCurrency?: boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
  compactOverride?: (value: number) => string;
  exactOverride?: (value: number) => string;
}

export const FormattedNumber = ({ 
  value, 
  isCurrency = true, 
  prefix = "",
  suffix = "",
  className = "",
  compactOverride,
  exactOverride
}: FormattedNumberProps) => {
  const compactStr = compactOverride 
    ? compactOverride(value) 
    : isCurrency 
      ? compactFormatUSD(value) 
      : value.toString();

  const exactStr = exactOverride 
    ? exactOverride(value) 
    : isCurrency 
      ? formatUSD(value) 
      : value.toString();

  // If the exact formatted string is equal to the compact string, just render the text. No tooltip needed.
  if (compactStr === exactStr) {
    return <span className={className}>{prefix}{compactStr}{suffix}</span>;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span 
            className={`cursor-pointer hover:opacity-80 transition-opacity ${className}`}
            onClick={(e) => e.preventDefault()}
            onTouchStart={() => {}}
          >
            {prefix}{compactStr}{suffix}
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          sideOffset={6}
          className="bg-[#1c2237] text-gray-100 border border-blue-500/20 px-3 py-1.5 shadow-lg rounded-xl font-medium text-sm z-50 pointer-events-none"
        >
          {prefix}{exactStr}{suffix}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
