import { useState } from 'react';
import type { Holding } from '../../types';
import { HoldingsRow } from './HoldingsRow';
import { Checkbox } from "@/components/ui/checkbox";

interface HoldingsTableProps {
  holdings: Holding[];
  selectedCoins: string[];
  onToggleSelection: (coin: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export const HoldingsTable = ({
  holdings,
  selectedCoins,
  onToggleSelection,
  onSelectAll,
  onDeselectAll
}: HoldingsTableProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const allSelected = holdings.length > 0 && selectedCoins.length === holdings.length;
  
  const handleSelectAllMerge = () => {
    if (allSelected) onDeselectAll();
    else onSelectAll();
  };

  return (
    <div className="bg-[#11131A] rounded-[16px] xl:rounded-[24px] overflow-hidden shadow-xl border border-white/5 font-sans">
      <div className="p-6 md:p-8 pb-5">
        <h2 className="text-[22px] font-bold text-white tracking-tight">Holdings</h2>
      </div>
      
      <div className="w-full overflow-x-auto">
        <div className={`w-full overflow-y-auto custom-scrollbar transition-all duration-300 ${isExpanded ? 'max-h-[800px]' : 'max-h-[360px]'}`}>
          <table className="w-full min-w-[950px] text-left border-collapse">
            <thead className="bg-[#1a1c23] sticky top-0 z-10">
              <tr>
                <th className="p-4 pl-6 w-12 border-b border-white/10">
                  <div className="flex items-center">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={handleSelectAllMerge}
                      className="border-gray-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" 
                    />
                  </div>
                </th>
                <th className="p-4 border-b border-white/10 text-white/90 font-semibold text-[14px]">Asset</th>
                <th className="p-4 border-b border-white/10 text-center text-white/90 font-semibold text-[14px]">
                  <div className="flex flex-col">
                    <span>Holdings</span>
                    <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider mt-0.5">Current Market Rate</span>
                  </div>
                </th>
                <th className="p-4 border-b border-white/10 text-center text-white/90 font-semibold text-[14px]">Total Current Value</th>
                <th className="p-4 border-b border-white/10 text-center text-white/90 font-semibold text-[14px]">Short-term</th>
                <th className="p-4 border-b border-white/10 text-center text-white/90 font-semibold text-[14px]">Long-Term</th>
                <th className="p-4 pr-6 border-b border-white/10 text-right text-white/90 font-semibold text-[14px]">Amount to Sell</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => (
                <HoldingsRow
                  key={holding.coin}
                  holding={holding}
                  isSelected={selectedCoins.includes(holding.coin)}
                  onToggle={onToggleSelection}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="p-6 md:px-8 border-t border-white/5 bg-[#11131A] relative z-20">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-400 font-semibold text-[15px] transition-colors hover:underline"
        >
          {isExpanded ? 'Collapse table' : 'View all'}
        </button>
      </div>
    </div>
  );
};
