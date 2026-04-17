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
    <div className="bg-[hsl(228,21%,11%)] rounded-md overflow-hidden shadow-xl font-sans p-4">
      <div className="py-2">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Holdings
        </h2>
      </div>

      <div className="w-full overflow-x-auto p-1">
        <div
          className={`w-full overflow-y-auto custom-scrollbar transition-all duration-300 ${isExpanded ? "max-h-[800px]" : "max-h-[360px]"}`}
        >
          <table className="w-full min-w-237 text-left border-collapse">
            <thead className="bg-[hsl(240,21%,5%)] sticky top-0 z-10 rounded-xl">
              <tr className='rounded-xl'>
                <th className="p-2 pl-6 w-12">
                  <div className="flex items-end">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={handleSelectAllMerge}
                      className="border-gray-500 cursor-pointer data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                  </div>
                </th>
                <th className="p-2 text-white/90 font-semibold text-[14px]">
                  Asset
                </th>
                <th className="p-2 text-end text-white/90 font-semibold text-[14px]">
                  <div className="flex flex-col">
                    <span>Holdings</span>
                    <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider mt-0.5">
                      Current Market Rate
                    </span>
                  </div>
                </th>
                <th className="p-2 text-end text-white/90 font-semibold text-[14px]">
                  Total Current Value
                </th>
                <th className="p-2 text-end text-white/90 font-semibold text-[14px]">
                  Short-term
                </th>
                <th className="p-2 text-end text-white/90 font-semibold text-[14px]">
                  Long-Term
                </th>
                <th className="p-2 pr-6 text-right text-white/90 font-semibold text-[14px]">
                  Amount to Sell
                </th>
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

      <div className="p-2 border-t border-white/5 relative z-20">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-400 font-semibold text-[15px] transition-colors  cursor-pointer underline"
        >
          {isExpanded ? "Collapse table" : "View all"}
        </button>
      </div>
    </div>
  );
};
