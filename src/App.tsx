import { useHarvesting } from './hooks/useHarvesting';
import { CapitalGainsSection } from './components/capital-gains/CapitalGainsSection';
import { HoldingsSection } from './components/holdings/HoldingsSection';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { ErrorState } from './components/ui/ErrorState';

function App() {
  const {
    holdings,
    loading,
    error,
    selectedCoins,
    toggleSelection,
    selectAll,
    deselectAll,
    preHarvestingGains,
    afterHarvestingGains,
    savedAmount
  } = useHarvesting();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0D14] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0D14] flex items-center justify-center">
        <ErrorState message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white p-6 sm:p-10 font-sans">
      <div className="max-w-[1280px] mx-auto pt-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight text-white focus:outline-none">Tax Loss Harvesting</h1>
        
        <CapitalGainsSection 
          preHarvestingGains={preHarvestingGains}
          afterHarvestingGains={afterHarvestingGains}
          savedAmount={savedAmount}
        />

        <HoldingsSection 
          holdings={holdings}
          selectedCoins={selectedCoins}
          onToggleSelection={toggleSelection}
          onSelectAll={selectAll}
          onDeselectAll={deselectAll}
        />
      </div>
    </div>
  );
}

export default App;
