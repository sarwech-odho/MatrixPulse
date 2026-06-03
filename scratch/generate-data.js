import fs from 'fs';
import path from 'path';

const arcanaNames = {
  1: 'The Magician',
  2: 'The High Priestess',
  3: 'The Empress',
  4: 'The Emperor',
  5: 'The Hierophant',
  6: 'The Lovers',
  7: 'The Chariot',
  8: 'Justice',
  9: 'The Hermit',
  10: 'Wheel of Fortune',
  11: 'Strength',
  12: 'The Hanged Man',
  13: 'Death',
  14: 'Temperance',
  15: 'The Devil',
  16: 'The Tower',
  17: 'The Star',
  18: 'The Moon',
  19: 'The Sun',
  20: 'Judgement',
  21: 'The World',
  22: 'The Fool'
};

const zones = {
  soul: {
    name: 'Soul & Personality',
    desc: 'Your internal self, personal style, and the primary way you express yourself to the world.'
  },
  spiritual: {
    name: 'Spiritual Connection',
    desc: 'Your connection to the divine, spiritual inspiration, and your intuitive guidance system.'
  },
  material: {
    name: 'Material & Career',
    desc: 'Your financial blocks, professional expansion, and materialization of goals.'
  },
  karma: {
    name: 'Karmic Lessons',
    desc: 'The ancestral burdens, past-life lessons, and main challenges you must resolve.'
  },
  comfort: {
    name: 'Comfort Zone & Core',
    desc: 'Your emotional sanctuary, core character energy, and internal state of balance.'
  }
};

const keywords = {
  1: 'Creation, Willpower, Action',
  2: 'Intuition, Secrets, Subconscious',
  3: 'Abundance, Growth, Creation',
  4: 'Structure, Control, Authority',
  5: 'Knowledge, Tradition, Teaching',
  6: 'Choice, Relationships, Harmony',
  7: 'Movement, Victory, Focus',
  8: 'Balance, Karma, Responsibility',
  9: 'Wisdom, Solitude, Self-Knowledge',
  10: 'Cycles, Luck, Destiny',
  11: 'Potential, Passion, Endurance',
  12: 'Perspective, Release, Transition',
  13: 'Transformation, Release, New Beginnings',
  14: 'Harmony, Moderation, Patience',
  15: 'Temptation, Shadow, Attachment',
  16: 'Disruption, Release, Awakening',
  17: 'Hope, Inspiration, Vision',
  18: 'Illusion, Dreams, Intuition',
  19: 'Joy, Success, Vitality',
  20: 'Calling, Renewal, Rebirth',
  21: 'Completion, Wholeness, Freedom',
  22: 'Freedom, Trust, Spontaneity'
};

const data = {
  arcana: {}
};

// Generate definitions
for (let num = 1; num <= 22; num++) {
  const name = arcanaNames[num];
  const kw = keywords[num];
  
  data.arcana[num] = {
    number: num,
    name: name,
    keywords: kw,
    shortDesc: `Arcana ${num} representing ${name} (${kw}).`,
    zones: {}
  };
  
  for (const [zoneKey, zoneInfo] of Object.entries(zones)) {
    // Generate zone-specific details programmatically to keep it robust and deep
    const coreMeaning = `In the ${zoneInfo.name} zone, ${name} (Arcana ${num}) governs how you express ${kw.toLowerCase()}. When active in this area, your life is shaped by themes of cyclic growth, structured decisions, or major transitions relating to this archetype.`;
    
    const shadowState = `The shadow state of ${name} in your ${zoneInfo.name} manifests as a lack of alignment with ${kw.split(',')[0].toLowerCase()}. You may experience internal blockages, resistance to change, or falling into patterns of obsession and fear.`;
    
    const lightState = `To transition to the light state, you must embrace the positive qualities of ${name}. This involves active cultivation of alignment, trusting your inner wisdom, and expressing your natural talents.`;
    
    const transitionStep = `Align your actions with the higher octave of Arcana ${num} by practicing grounding exercises, releasing control where necessary, and seeking advice that matches this energy.`;

    const howToSteps = [
      {
        name: `Acknowledge the Shadow of ${name}`,
        text: `Recognize where you are feeling blocked, fearful, or out of alignment with the energy of ${name} inside your ${zoneInfo.name}.`
      },
      {
        name: `Cultivate Positive Qualities`,
        text: `Intentionally apply the core positive keywords (${kw}) to your daily routines and mindset.`
      },
      {
        name: `Take Inspired Action`,
        text: `Step out of your comfort zone using the advice: ${transitionStep}`
      }
    ];
    
    const faqs = [
      {
        q: `How do I know if my Arcana ${num} in ${zoneInfo.name} is in a shadow state?`,
        a: `You will likely feel stagnant, blocked, or repeatedly hit the same obstacles in relation to this zone's theme: ${zoneInfo.desc}`
      },
      {
        q: `What is the fastest way to align Arcana ${num} here?`,
        a: `By shifting your focus to the light state: ${lightState.replace('To transition to the light state, you must ', '')}`
      }
    ];
    
    data.arcana[num].zones[zoneKey] = {
      core: coreMeaning,
      shadow: shadowState,
      light: lightState,
      advice: transitionStep,
      howToSteps: howToSteps,
      faq: faqs
    };
  }
}

// Ensure data folder exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

fs.writeFileSync(
  path.join(dataDir, 'arcana-definitions.json'),
  JSON.stringify(data, null, 2)
);

console.log('Successfully generated data/arcana-definitions.json!');
