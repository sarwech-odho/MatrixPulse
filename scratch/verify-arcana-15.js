import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'arcana-definitions.json');
const arcanaData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const data = arcanaData.arcana[15];
const zoneKey = 'material';
const zoneName = 'Material & Career';
const zoneData = data.zones[zoneKey];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': zoneData.faq.map((item) => ({
    '@type': 'Question',
    'name': item.q,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': item.a
    }
  }))
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': `How to Align Arcana 15 (${data.name}) in your ${zoneName}`,
  'description': `Actionable guide to shift Arcana 15 from its shadow state to its fully aligned light frequency inside your ${zoneName}.`,
  'step': zoneData.howToSteps.map((step, idx) => ({
    '@type': 'HowToStep',
    'position': idx + 1,
    'name': step.name,
    'text': step.text
  }))
};

console.log('=== SCHEMA_OUTPUT_START ===');
console.log(JSON.stringify({ faqSchema, howToSchema }, null, 2));
console.log('=== SCHEMA_OUTPUT_END ===');
