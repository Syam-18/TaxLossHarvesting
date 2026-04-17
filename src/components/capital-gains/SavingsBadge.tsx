import { FormattedNumber } from '../ui/FormattedNumber';

interface SavingsBadgeProps {
  savedAmount: number;
}

export const SavingsBadge = ({ savedAmount }: SavingsBadgeProps) => {
  if (savedAmount <= 0) return null;

  return (
    <div className="flex items-center justify-start gap-1 pb-1">
      <span className="text-[13px] md:text-[15px] font-medium text-white/90">
        🎉 Your taxable capital gains are reduced by:
      </span>
      <span className="text-[13px] md:text-[15px] font-medium text-white ml-1">
        <FormattedNumber value={savedAmount} />
      </span>
    </div>
  );
};
