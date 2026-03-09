import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mapTransaction, mapDispute, mapRefund, mapPayout } from './mappers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const samplesDir = path.join(__dirname, 'sample data');
const sampleFiles = fs.readdirSync(samplesDir).filter(f => f.endsWith('.json'));

const result = { transactions: [], disputes: [], refunds: [], payouts: [] };

for (const file of sampleFiles) {
  const item = JSON.parse(fs.readFileSync(path.join(samplesDir, file), 'utf8'));

  switch (item.object) {
    case 'charge':  result.transactions.push(mapTransaction(item)); break;
    case 'dispute': result.disputes.push(mapDispute(item));         break;
    case 'refund':  result.refunds.push(mapRefund(item));           break;
    case 'payout':  result.payouts.push(mapPayout(item));           break;
    default: console.warn(`[WARN] Unknown object type: ${item.object} in ${file}`);
  }
}

fs.writeFileSync(path.join(__dirname, 'output.json'), JSON.stringify(result, null, 2));
console.log('output.json written successfully.');
