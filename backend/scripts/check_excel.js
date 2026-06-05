const path = require('path');
const xlsx = require('xlsx');

const excelPath = path.resolve(__dirname, '..', '..', 'visible_wbs-listed-631-water-bodies.xlsx');
const workbook = xlsx.readFile(excelPath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const raw = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null });

const sampleHeadCandidates = raw.slice(0, Math.min(8, raw.length));
let headerIdx = -1;
for (let i = 0; i < sampleHeadCandidates.length; i++) {
  const row = sampleHeadCandidates[i].map(c => (c == null ? '' : String(c).toLowerCase()));
  if (row.some(cell => cell.includes('wetland') || cell.includes('wetland name') || cell.includes('geographical') || cell.includes('coordinates') || cell.includes('village') || cell.includes('district'))) {
    headerIdx = i;
    break;
  }
}
if (headerIdx === -1) headerIdx = 0;
const headers = raw[headerIdx].map(h => (h == null ? null : String(h).trim()));

const condIdx = headers.findIndex(h => h && h.toLowerCase().includes('condition'));
console.log('Detected header row index:', headerIdx);
console.log('Condition header:', headers[condIdx]);

const distinctConditions = new Set();
for (let i = headerIdx + 1; i < raw.length; i++) {
  const val = raw[i][condIdx];
  if (val != null) {
    distinctConditions.add(String(val).trim());
  }
}

console.log('Distinct present conditions (first 30):');
console.log(Array.from(distinctConditions).slice(0, 30));
