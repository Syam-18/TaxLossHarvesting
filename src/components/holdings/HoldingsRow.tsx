import type { Holding } from '../../types';
import { formatUSD } from '../../lib/formatters';

interface HoldingsRowProps {
  holding: Holding;
  isSelected: boolean;
  onToggle: (coin: string) => void;
}

export const HoldingsRow = ({ holding, isSelected, onToggle }: HoldingsRowProps) => {
  const totalValue = holding.totalHolding * holding.currentPrice;
  // If gain exactly equals 0, we can treat it as positive to avoid rendering "- $0" 
  const isStcgPositive = holding.stcg.gain >= 0;
  const isLtcgPositive = holding.ltcg.gain >= 0;

  const formatQuantity = (val: number, isBalance: boolean = false) => {
    // some mocked decimals are incredibly small like e-17, using simple format fixes visual bugs
    if (val < 0.0001 && val > 0) return '< 0.0001';
    return val.toLocaleString('en-US', { maximumFractionDigits: 5 });
  };

  return (
    <tr className={`border-b border-white/5 transition-colors ${isSelected ? 'bg-[#1e293b]/70' : 'hover:bg-white/[0.02]'}`}>
      <td className="p-4 pl-6 align-middle">
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={() => onToggle(holding.coin)}
            className="w-4 h-4 rounded border-gray-600 bg-transparent text-blue-500 focus:ring-blue-500 focus:ring-offset-[#11131A] cursor-pointer" 
          />
        </label>
      </td>
      <td className="p-4 align-middle">
        <div className="flex items-center gap-3">
          <img src={holding.logo} alt={holding.coinName} className="w-8 h-8 rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="font-medium text-white/95 text-[14px]">{holding.coinName}</span>
            <span className="text-[12px] text-gray-400">{holding.coin}</span>
          </div>
        </div>
      </td>
      <td className="p-4 text-center align-middle">
        <div className="flex flex-col">
          <span className="font-semibold text-white/95 text-[14px]">
            {formatQuantity(holding.totalHolding)} {holding.coin}
          </span>
          <span className="text-[12px] text-gray-400 mt-0.5">
            {formatUSD(holding.currentPrice)}/{holding.coin}
          </span>
        </div>
      </td>
      <td className="p-4 text-center align-middle">
        <span className="font-bold text-white/95 text-[14.5px]">{formatUSD(totalValue)}</span>
      </td>
      <td className="p-4 text-center align-middle">
        <div className="flex flex-col">
          <span className={`font-semibold text-[14px] ${isStcgPositive ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
            {isStcgPositive ? '+' : '-'} {formatUSD(Math.abs(holding.stcg.gain))}
          </span>
          <span className="text-[12px] text-gray-400 mt-0.5">
            {formatQuantity(holding.stcg.balance)} {holding.coin}
          </span>
        </div>
      </td>
      <td className="p-4 text-center align-middle">
        <div className="flex flex-col">
          <span className={`font-semibold text-[14px] ${isLtcgPositive ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>
            {isLtcgPositive ? '+' : '-'} {formatUSD(Math.abs(holding.ltcg.gain))}
          </span>
          <span className="text-[12px] text-gray-400 mt-0.5">
            {formatQuantity(holding.ltcg.balance)} {holding.coin}
          </span>
        </div>
      </td>
      <td className="p-4 pr-6 text-right align-middle">
        {isSelected ? (
          <span className="font-semibold text-white/90 text-[14px]">
            {formatQuantity(holding.totalHolding)} {holding.coin}
          </span>
        ) : (
          <span className="text-gray-500">-</span>
        )}
      </td>
    </tr>
  );
};
