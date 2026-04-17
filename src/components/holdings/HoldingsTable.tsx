import { useState, useMemo } from 'react';
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

type SortKey = 'asset' | 'holdings' | 'value' | 'stcg' | 'ltcg';
type SortOrder = 'asc' | 'desc';

export const HoldingsTable = ({
  holdings,
  selectedCoins,
  onToggleSelection,
  onSelectAll,
  onDeselectAll
}: HoldingsTableProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  const allSelected = holdings.length > 0 && selectedCoins.length === holdings.length;
  
  const handleSelectAllMerge = () => {
    if (allSelected) onDeselectAll();
    else onSelectAll();
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedHoldings = useMemo(() => {
    
    return [...holdings].sort((a, b) => {
      let result = 0;

      if (sortKey === 'asset') {
        result = a.coinName.localeCompare(b.coinName);
      } else if (sortKey === 'holdings') {
        result = Number(a.totalHolding || 0) - Number(b.totalHolding || 0);
      } else if (sortKey === 'value') {
        result = (Number(a.totalHolding || 0) * Number(a.currentPrice || 0)) - (Number(b.totalHolding || 0) * Number(b.currentPrice || 0));
      } else if (sortKey === 'stcg') {
        result = Number(a.stcg?.gain || 0) - Number(b.stcg?.gain || 0);
      } else if (sortKey === 'ltcg') {
        result = Number(a.ltcg?.gain || 0) - Number(b.ltcg?.gain || 0);
      }

      return sortOrder === 'asc' ? result : -result;
    });
  }, [holdings, sortKey, sortOrder]);

  const renderSortIndicator = (key: SortKey) => {
    if (sortKey !== key) return null;
    return (
      <span className="text-[#9ca3af] text-[12px] leading-none inline-block mb-[1px]">
        {sortOrder === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  return (
    <div className="bg-[hsl(228,21%,11%)] rounded-md overflow-hidden shadow-xl font-sans p-1 md:p-4">
      <div className="py-2 px-1">
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
                <th className="p-1 md:p-2 pl-4 md:pl-6 w-1">
                  <div className="flex items-end">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={handleSelectAllMerge}
                      className="border-gray-500 cursor-pointer data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                  </div>
                </th>
                <th className="p-1 md:p-2 text-[14px] select-none cursor-pointer" onClick={() => handleSort('asset')}>
                  <div 
                    className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                  >
                    {renderSortIndicator('asset')}
                    <span className="text-white/90 font-semibold">Asset</span>
                  </div>
                </th>
                <th className="p-1 md:p-2 text-end text-[14px] select-none cursor-pointer" onClick={() => handleSort('holdings')}>
                  <div 
                    className="flex flex-col items-end hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center gap-1.5">
                      {renderSortIndicator('holdings')}
                      <span className="text-white/90 font-semibold">Holdings</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider mt-0.5">
                      Current Market Rate
                    </span>
                  </div>
                </th>
                <th className="p-1 md:p-2 text-end text-[14px] select-none cursor-pointer" onClick={() => handleSort('value')}>
                  <div 
                    className="flex items-center justify-end gap-1.5 hover:opacity-80 transition-opacity"
                  >
                    {renderSortIndicator('value')}
                    <span className="text-white/90 font-semibold">Total Current Value</span>
                  </div>
                </th>
                <th className="p-1 md:p-2 text-end text-[14px] select-none cursor-pointer" onClick={() => handleSort('stcg')}>
                  <div 
                    className="flex items-center justify-end gap-1.5 hover:opacity-80 transition-opacity"
                  >
                    {renderSortIndicator('stcg')}
                    <span className="text-white/90 font-semibold">Short-term</span>
                  </div>
                </th>
                <th className="p-1 md:p-2 text-end text-[14px] select-none cursor-pointer" onClick={() => handleSort('ltcg')}>
                  <div 
                    className="flex items-center justify-end gap-1.5 hover:opacity-80 transition-opacity"
                  >
                    {renderSortIndicator('ltcg')}
                    <span className="text-white/90 font-semibold">Long-Term</span>
                  </div>
                </th>
                <th className="p-1 md:p-2 pr-6 text-right text-white/90 font-semibold text-[14px]">
                  Amount to Sell
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedHoldings.map((holding) => (
                <HoldingsRow
                  key={`${holding.coin}-${holding.coinName}`}
                  holding={holding}
                  isSelected={selectedCoins.includes(holding.coin)}
                  onToggle={onToggleSelection}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-1 md:p-2 border-t border-white/5 relative z-20">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-400 font-semibold text-[15px] transition-colors cursor-pointer underline"
        >
          {isExpanded ? "Collapse table" : "View all"}
        </button>
      </div>
    </div>
  );
};
