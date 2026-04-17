import { formatUSD } from '../../lib/formatters';

interface SavingsBadgeProps {
  savedAmount: number;
}

export const SavingsBadge = ({ savedAmount }: SavingsBadgeProps) => {
  if (savedAmount <= 0) return null;

  return (
    <div className="mt-6 flex justify-center">
      <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-5 py-2.5 rounded-full font-medium shadow-sm border border-green-500/30">
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <span className="text-sm">You're going to save {formatUSD(savedAmount)}</span>
      </div>
    </div>
  );
};
