import type { Holding, CapitalGains, GainsBreakdown } from '../types';

export interface CalculatedGains {
  stcg: GainsBreakdown & { net: number };
  ltcg: GainsBreakdown & { net: number };
  realised: number;
}

export const calculateBaseGains = (capitalGains: CapitalGains): CalculatedGains => {
  const stcg = capitalGains.capitalGains.stcg;
  const ltcg = capitalGains.capitalGains.ltcg;

  const netStcg = stcg.profits - stcg.losses;
  const netLtcg = ltcg.profits - ltcg.losses;

  return {
    stcg: { ...stcg, net: netStcg },
    ltcg: { ...ltcg, net: netLtcg },
    realised: netStcg + netLtcg,
  };
};

export const calculateAfterHarvesting = (
  baseGains: CapitalGains,
  selectedHoldings: Holding[]
): CalculatedGains => {
  let stcgProfits = baseGains.capitalGains.stcg.profits;
  let stcgLosses = baseGains.capitalGains.stcg.losses;
  let ltcgProfits = baseGains.capitalGains.ltcg.profits;
  let ltcgLosses = baseGains.capitalGains.ltcg.losses;

  selectedHoldings.forEach(holding => {
    // STCG
    if (holding.stcg.gain > 0) {
      stcgProfits += holding.stcg.gain;
    } else {
      stcgLosses += Math.abs(holding.stcg.gain);
    }

    // LTCG
    if (holding.ltcg.gain > 0) {
      ltcgProfits += holding.ltcg.gain;
    } else {
      ltcgLosses += Math.abs(holding.ltcg.gain);
    }
  });

  const netStcg = stcgProfits - stcgLosses;
  const netLtcg = ltcgProfits - ltcgLosses;

  return {
    stcg: { profits: stcgProfits, losses: stcgLosses, net: netStcg },
    ltcg: { profits: ltcgProfits, losses: ltcgLosses, net: netLtcg },
    realised: netStcg + netLtcg,
  };
};
