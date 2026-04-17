import { FormattedNumber } from '../ui/FormattedNumber';

interface GainsRowProps {
  label: string;
  profits: number;
  losses: number;
  net: number;
  isBlueTheme?: boolean;
}

export const GainsRow = ({ label, profits, losses, net, isBlueTheme }: GainsRowProps) => {
  const bgClass = isBlueTheme ? 'bg-white/10' : 'bg-white/5';
  const borderClass = isBlueTheme ? 'border-indigo-300/20' : 'border-white/10';
  const textMutedClass = isBlueTheme ? 'text-indigo-100' : 'text-white/60';

  return (
    <div className={`flex flex-col mb-4 ${bgClass} rounded-xl p-4`}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-[15px] font-semibold tracking-wide flex-1">{label}</span>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span className={textMutedClass}>Profits</span>
        <span className="text-emerald-400 font-medium">
          <FormattedNumber value={profits} prefix="+" />
        </span>
      </div>
      <div className={`flex justify-between text-sm mb-3 pb-3 border-b ${borderClass}`}>
        <span className={textMutedClass}>Losses</span>
        <span className="text-red-400 font-medium">
          <FormattedNumber value={losses} prefix="-" />
        </span>
      </div>
      <div className="flex justify-between font-bold pt-1">
        <span>Net Total</span>
        <span className={net >= 0 ? 'text-emerald-400' : 'text-red-400'}>
          <FormattedNumber value={net} prefix={net >= 0 ? '+' : ''} />
        </span>
      </div>
    </div>
  );
};
