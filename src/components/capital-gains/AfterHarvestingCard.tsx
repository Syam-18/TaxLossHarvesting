import type { CalculatedGains } from '../../lib/calculations';
import { FormattedNumber } from '../ui/FormattedNumber';
import { SavingsBadge } from './SavingsBadge';

interface AfterHarvestingCardProps {
  gains: CalculatedGains | null;
  savedAmount: number;
}

export const AfterHarvestingCard = ({ gains, savedAmount }: AfterHarvestingCardProps) => {
  if (!gains) return null;

  return (
    <div className="bg-linear-to-r from-[hsl(212,64%,60%)] to-[hsl(215,86%,51%)] text-white p-3 md:p-4 rounded-md shadow-xl w-full h-full flex flex-col font-sans border border-blue-400/20">
      <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3 tracking-tight text-white/95">
        After Harvesting
      </h2>

      <div>
        {/* Header Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-2 md:mb-3">
          <div></div>
          <div className="text-right text-blue-200 text-sm font-medium tracking-wide">
            Short-term
          </div>
          <div className="text-right text-blue-200 text-sm font-medium tracking-wide">
            Long-term
          </div>
        </div>

        {/* Profits Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-2 md:mb-4">
          <div className="text-blue-100 font-medium md:font-semibold">
            Profits
          </div>
          <div className="text-right text-white text-xs md:text-lg tracking-wide">
            <FormattedNumber value={gains.stcg.profits} />
          </div>
          <div className="text-right text-white text-xs md:text-lg tracking-wide">
            <FormattedNumber value={gains.ltcg.profits} />
          </div>
        </div>

        {/* Losses Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-3 md:mb-3">
          <div className="text-blue-100 font-medium md:font-semibold">
            Losses
          </div>
          <div className="text-right text-white text-xs md:text-lg tracking-wide">
            <FormattedNumber value={Math.abs(gains.stcg.losses)} prefix="- " />
          </div>
          <div className="text-right text-white text-xs md:text-lg tracking-wide">
            <FormattedNumber value={Math.abs(gains.ltcg.losses)} prefix="- " />
          </div>
        </div>

        {/* Net Capital Gains Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-2 pt-1">
          <div className="text-white font-semibold md:font-bold">
            Net Capital Gains
          </div>
          <div className="text-right text-white font-semibold md:font-bold tracking-wide">
            <FormattedNumber value={gains.stcg.net} />
          </div>
          <div className="text-right text-white font-semibold md:font-bold tracking-wide">
            <FormattedNumber value={gains.ltcg.net} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 mt-4 md:mt-6 mb-3">
        <span className="font-bold text-[18px] md:text-[20px] text-white/95">
          Effective Capital Gains:
        </span>
        <FormattedNumber 
          value={gains.realised} 
          className="text-[20px] md:text-[22px] font-bold text-white tracking-tight"
        />
      </div>

      <SavingsBadge savedAmount={savedAmount} />
    </div>
  );
};
