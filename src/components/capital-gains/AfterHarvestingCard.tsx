import type { CalculatedGains } from '../../lib/calculations';
import { formatUSD } from '../../lib/formatters';
import { SavingsBadge } from './SavingsBadge';

interface AfterHarvestingCardProps {
  gains: CalculatedGains | null;
  savedAmount: number;
}

export const AfterHarvestingCard = ({ gains, savedAmount }: AfterHarvestingCardProps) => {
  if (!gains) return null;

  return (
    <div className="bg-[#1e3a8a] text-white p-6 sm:p-8 rounded-[16px] xl:rounded-[24px] shadow-xl w-full h-full flex flex-col font-sans border border-blue-400/20">
      <h2 className="text-[22px] font-bold mb-8 tracking-tight text-white/95">After Harvesting</h2>
      
      <div className="flex-1">
        {/* Header Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-4">
          <div></div>
          <div className="text-right text-blue-200 font-medium tracking-wide">Short-term</div>
          <div className="text-right text-blue-200 font-medium tracking-wide">Long-term</div>
        </div>

        {/* Profits Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-4">
          <div className="text-blue-100">Profits</div>
          <div className="text-right text-white tracking-wide">{formatUSD(gains.stcg.profits)}</div>
          <div className="text-right text-white tracking-wide">{formatUSD(gains.ltcg.profits)}</div>
        </div>

        {/* Losses Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-5">
          <div className="text-blue-100">Losses</div>
          <div className="text-right text-white tracking-wide">- {formatUSD(Math.abs(gains.stcg.losses))}</div>
          <div className="text-right text-white tracking-wide">- {formatUSD(Math.abs(gains.ltcg.losses))}</div>
        </div>

        {/* Net Capital Gains Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-8 pt-1">
          <div className="text-white font-bold">Net Capital Gains</div>
          <div className="text-right text-white font-bold tracking-wide">{formatUSD(gains.stcg.net)}</div>
          <div className="text-right text-white font-bold tracking-wide">{formatUSD(gains.ltcg.net)}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mt-8 pt-2">
        <div className="flex flex-col sm:flex-row items-baseline gap-4">
          <span className="font-bold text-[20px] tracking-tight text-blue-100">Realised Capital Gains:</span>
          <span className="text-[32px] sm:text-[40px] font-bold tracking-tight">
            {formatUSD(gains.realised)}
          </span>
        </div>
      </div>

      <SavingsBadge savedAmount={savedAmount} />
    </div>
  );
};
