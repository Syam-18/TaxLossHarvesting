import { useHarvesting } from './hooks/useHarvesting';
import { CapitalGainsSection } from './components/capital-gains/CapitalGainsSection';
import { HoldingsSection } from './components/holdings/HoldingsSection';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { ErrorState } from './components/ui/ErrorState';
import { Header } from './components/layout/Header';
import { TitleSection } from './components/layout/TitleSection';

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
    <div className="min-h-screen bg-[hsl(240,21%,5%)] text-white font-sans flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-345 mx-auto md:p-6 p-4 md:pt-6">
        <TitleSection />

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
      </main>
    </div>
  );
}

export default App;
