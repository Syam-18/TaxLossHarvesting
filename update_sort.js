const fs = require('fs');
const filePath = 'src/components/holdings/HoldingsTable.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /const sortedHoldings = useMemo\(\(\) => \{[\s\S]*?\}, \[holdings, sortKey, sortOrder\]\);/;

const replacement = `const sortedHoldings = useMemo(() => {
    if (!sortKey) return holdings;
    
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

      // To guarantee perfect numeric alignments and fix the bug with USDC alignment at the top
      return sortOrder === 'asc' ? result : -result;
    });
  }, [holdings, sortKey, sortOrder]);`;

const newContent = content.replace(regex, replacement);
fs.writeFileSync(filePath, newContent);
console.log('Done!');
