import type { CalculatedGains } from '../../lib/calculations';
import { formatUSD } from '../../lib/formatters';

interface PreHarvestingCardProps {
  gains: CalculatedGains | null;
}

export const PreHarvestingCard = ({ gains }: PreHarvestingCardProps) => {
  if (!gains) return null;

  return (
    <div className="bg-[hsl(228,21%,11%)] text-white p-4 rounded-md shadow-xl w-full h-full flex flex-col font-sans">
      <h2 className="text-xl font-bold mb-4 tracking-tight text-white/95">
        Pre Harvesting
      </h2>

      <div>
        {/* Header Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-4">
          <div></div>
          <div className="text-right text-white/80 font-medium tracking-wide">
            Short-term
          </div>
          <div className="text-right text-white/80 font-medium tracking-wide">
            Long-term
          </div>
        </div>

        {/* Profits Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-4">
          <div className="text-white/90 font-semibold">Profits</div>
          <div className="text-right text-white/90 tracking-wide">
            {formatUSD(gains.stcg.profits)}
          </div>
          <div className="text-right text-white/90 tracking-wide">
            {formatUSD(gains.ltcg.profits)}
          </div>
        </div>

        {/* Losses Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-5">
          <div className="text-white/90 font-semibold">Losses</div>
          <div className="text-right text-white/90 tracking-wide">
            - {formatUSD(Math.abs(gains.stcg.losses))}
          </div>
          <div className="text-right text-white/90 tracking-wide">
            - {formatUSD(Math.abs(gains.ltcg.losses))}
          </div>
        </div>

        {/* Net Capital Gains Row */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 mb-2 pt-1">
          <div className="text-white font-bold">Net Capital Gains</div>
          <div className="text-right text-white font-bold tracking-wide">
            {formatUSD(gains.stcg.net)}
          </div>
          <div className="text-right text-white font-bold tracking-wide">
            {formatUSD(gains.ltcg.net)}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-baseline gap-4 mt-2 mb-4 pt-2">
        <span className="font-bold text-[20px] tracking-tight">
          Realised Capital Gains:
        </span>
        <span className="text-[28px] font-bold tracking-tight">
          {formatUSD(gains.realised)}
        </span>
      </div>
    </div>
  );
};
