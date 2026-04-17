interface TaxInfo {
  balance: number;
  gain: number;
}

export interface CoinHolding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: TaxInfo;
  ltcg: TaxInfo;
}