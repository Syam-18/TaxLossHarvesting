import { useState, useEffect, useMemo } from 'react';
import type { Holding, CapitalGains } from '../types';
import { getHoldings, getCapitalGains } from '../lib/mock-api';
import { calculateBaseGains, calculateAfterHarvesting, type CalculatedGains } from '../lib/calculations';

interface UseHarvestingResult {
  holdings: Holding[];
  capitalGains: CapitalGains | null;
  loading: boolean;
  error: string | null;
  selectedCoins: string[];
  toggleSelection: (coin: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  preHarvestingGains: CalculatedGains | null;
  afterHarvestingGains: CalculatedGains | null;
  savedAmount: number;
}

export const useHarvesting = (): UseHarvestingResult => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [holdingsData, gainsData] = await Promise.all([
          getHoldings(),
          getCapitalGains(),
        ]);
        setHoldings(holdingsData);
        setCapitalGains(gainsData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSelection = (coin: string) => {
    setSelectedCoins((prev) =>
      prev.includes(coin) ? prev.filter((c) => c !== coin) : [...prev, coin]
    );
  };

  const selectAll = () => {
    setSelectedCoins(holdings.map((h) => h.coin));
  };

  const deselectAll = () => {
    setSelectedCoins([]);
  };

  const preHarvestingGains = useMemo(() => {
    if (!capitalGains) return null;
    return calculateBaseGains(capitalGains);
  }, [capitalGains]);

  const afterHarvestingGains = useMemo(() => {
    if (!capitalGains || !holdings.length) return null;
    const selected = holdings.filter((h) => selectedCoins.includes(h.coin));
    return calculateAfterHarvesting(capitalGains, selected);
  }, [capitalGains, holdings, selectedCoins]);

  const savedAmount = useMemo(() => {
    if (!preHarvestingGains || !afterHarvestingGains) return 0;
    const savings = preHarvestingGains.realised - afterHarvestingGains.realised;
    return savings > 0 ? savings : 0;
  }, [preHarvestingGains, afterHarvestingGains]);

  return {
    holdings,
    capitalGains,
    loading,
    error,
    selectedCoins,
    toggleSelection,
    selectAll,
    deselectAll,
    preHarvestingGains,
    afterHarvestingGains,
    savedAmount,
  };
};
