import type { CalculatedGains } from '../../lib/calculations';
import { FormattedNumber } from '../ui/FormattedNumber';

interface PreHarvestingCardProps {
  gains: CalculatedGains | null;
}

export const PreHarvestingCard = ({ gains }: PreHarvestingCardProps) => {
  if (!gains) return null;

  return (
    <div className="bg-[hsl(228,21%,11%)] text-white p-3 font-medium md:md:p-4 rounded-md shadow-xl w-full h-full flex flex-col font-sans">
      <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3 tracking-tight text-white/95">
        Pre Harvesting
      </h2>

      <div>
        {/* Header Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-2 md:mb-3">
          <div></div>
          <div className="text-right text-white/80 text-sm font-medium tracking-wide">
            Short-term
          </div>
          <div className="text-right text-white/80 text-sm font-medium tracking-wide">
            Long-term
          </div>
        </div>

        {/* Profits Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-2 md:mb-3">
          <div className="text-white/90 font-medium md:font-semibold">
            Profits
          </div>
          <div className="text-right text-white/90 text-xs md:text-lg tracking-wide">
            <FormattedNumber value={gains.stcg.profits} />
          </div>
          <div className="text-right text-white/90 text-xs md:text-lg tracking-wide">
            <FormattedNumber value={gains.ltcg.profits} />
          </div>
        </div>

        {/* Losses Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-3 md:mb-4">
          <div className="text-white/90 font-medium md:font-semibold">
            Losses
          </div>
          <div className="text-right text-white/90 text-xs md:text-lg tracking-wide">
            <FormattedNumber value={Math.abs(gains.stcg.losses)} prefix="- " />
          </div>
          <div className="text-right text-white/90 text-xs md:text-lg tracking-wide">
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
          <div className="text-right text-white font-bold tracking-wide">
            <FormattedNumber value={gains.ltcg.net} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-baseline gap-4 md:gap-8 mt-2 mb-4 pt-2">
        <span className="font-bold text-[14px] md:text-[18px] tracking-tight">
          Realised Capital Gains:
        </span>
        <span className="text-[20px] md:text-[24px] font-bold tracking-tight">
          <FormattedNumber value={gains.realised} />
        </span>
      </div>
    </div>
  );
};
