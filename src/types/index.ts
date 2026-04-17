export interface TaxInfo {
  balance: number;
  gain: number;
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: TaxInfo;
  ltcg: TaxInfo;
}

export interface GainsBreakdown {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  capitalGains: {
    stcg: GainsBreakdown;
    ltcg: GainsBreakdown;
  };
}