import type { CalculatedGains } from '../../lib/calculations';
import { PreHarvestingCard } from './PreHarvestingCard';
import { AfterHarvestingCard } from './AfterHarvestingCard';

interface CapitalGainsSectionProps {
  preHarvestingGains: CalculatedGains | null;
  afterHarvestingGains: CalculatedGains | null;
  savedAmount: number;
}

export const CapitalGainsSection = ({
  preHarvestingGains,
  afterHarvestingGains,
  savedAmount,
}: CapitalGainsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4">
      <PreHarvestingCard gains={preHarvestingGains} />
      <AfterHarvestingCard gains={afterHarvestingGains} savedAmount={savedAmount} />
    </div>
  );
};
