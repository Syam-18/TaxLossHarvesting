import { HoldingsTable } from './HoldingsTable';
import type { Holding } from '../../types';

interface HoldingsSectionProps {
  holdings: Holding[];
  selectedCoins: string[];
  onToggleSelection: (coin: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export const HoldingsSection = (props: HoldingsSectionProps) => {
  return (
    <section className="mb-12 w-full">
      <HoldingsTable {...props} />
    </section>
  );
};
