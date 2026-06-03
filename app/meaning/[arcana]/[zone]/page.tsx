import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import arcanaData from '@/data/arcana-definitions.json';

interface Props {
  params: Promise<{ arcana: string; zone: string }>;
}

const zoneNames: Record<string, string> = {
  soul: 'Soul & Personality',
  spiritual: 'Spiritual Connection',
  material: 'Material & Career',
  karma: 'Karmic Lessons',
  comfort: 'Comfort Zone & Core'
};

const zonesOrder = ['soul', 'spiritual', 'material', 'karma', 'comfort'];

// Dynamically generate SEO-optimized Metadata for Spoke pages
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { arcana, zone } = await params;
  const arcanaNum = parseInt(arcana, 10);
  const zoneKey = zone.toLowerCase();

  const data = (arcanaData as any).arcana[arcanaNum];
  const zoneName = zoneNames[zoneKey];

  if (!data || !zoneName) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `Arcana ${arcanaNum} in the ${zoneName} Zone: Why You Feel Blocked (And How to Fix It)`,
    description: `Experiencing blocks with Arcana ${arcanaNum} (${data.name}) in your ${zoneName} Zone? Learn the exact shadow states and light alignments to manifest transformation.`,
  };
}

export default async function ArcanaZoneSpokePage({ params }: Props) {
  const { arcana, zone } = await params;
  const arcanaNum = parseInt(arcana, 10);
  const zoneKey = zone.toLowerCase();

  // Validate inputs
  const data = (arcanaData as any).arcana[arcanaNum];
  const zoneName = zoneNames[zoneKey];

  if (!data || !zoneName) {
    notFound();
  }

  const zoneData = data.zones[zoneKey];
  if (!zoneData) {
    notFound();
  }

  // 1. Calculate Internal Link Loop: Next Zone
  const currentZoneIndex = zonesOrder.indexOf(zoneKey);
  const nextZoneKey = zonesOrder[(currentZoneIndex + 1) % zonesOrder.length];
  const nextZoneName = zoneNames[nextZoneKey];

  // 2. Calculate Internal Link Loop: Related Arcana
  // We link to the next sequential Arcana, wrapping back to 1
  const relatedArcanaNum = (arcanaNum % 22) + 1;
  const relatedArcanaName = (arcanaData as any).arcana[relatedArcanaNum].name;

  // JSON-LD FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': zoneData.faq.map((item: any) => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a
      }
    }))
  };

  // JSON-LD HowTo Schema (highly prioritized for indexing snippets)
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': `How to Align Arcana ${arcanaNum} (${data.name}) in your ${zoneName}`,
    'description': `Actionable guide to shift Arcana ${arcanaNum} from its shadow state to its fully aligned light frequency inside your ${zoneName}.`,
    'step': zoneData.howToSteps.map((step: any, idx: number) => ({
      '@type': 'HowToStep',
      'position': idx + 1,
      'name': step.name,
      'text': step.text
    }))
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-start bg-[#050508] overflow-hidden px-4 mt-32 md:mt-40 pb-16 flex-auto">
      {/* Dynamic JSON-LD injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Aurora Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-[var(--aurora-1)] blur-[100px] opacity-40 animate-aurora-1" />
        <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-[var(--aurora-2)] blur-[110px] opacity-30 animate-aurora-2" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col gap-6">
        {/* Navigation Breadcrumb */}
        <div className="text-zinc-500 text-xs md:text-sm font-sans flex items-center gap-2">
          <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/meaning/${arcanaNum}`} className="hover:text-purple-400 transition-colors">Arcana {arcanaNum}</Link>
          <span>/</span>
          <span className="text-zinc-300">{zoneName}</span>
        </div>

        <GlassCard glow={true} className="flex flex-col gap-6">
          {/* Header Block */}
          <div>
            <span className="text-purple-400 font-semibold tracking-wider text-xs uppercase mb-2 block">
              {zoneName} Optimization Guide
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-white font-medium mb-2">
              Arcana {arcanaNum}: {data.name}
            </h1>
            <div className="text-xs tracking-widest text-white/50 uppercase border border-white/5 bg-white/5 px-3 py-1 rounded-full w-max mx-auto mt-2">
              Keywords: {data.keywords}
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Data Depth Audit: 5-7 distinct data points */}
          <div className="flex flex-col gap-6 text-left">
            {/* 1. Core Meaning */}
            <div>
              <h2 className="text-white font-serif font-medium text-lg mb-2">1. Core Energetic Impact</h2>
              <p className="text-zinc-300 text-sm leading-relaxed">{zoneData.core}</p>
            </div>

            {/* 2. Shadow State */}
            <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/[0.01]">
              <h2 className="text-red-400 font-serif font-medium text-lg mb-2">2. The Shadow State (Challenge)</h2>
              <p className="text-zinc-300 text-sm leading-relaxed">{zoneData.shadow}</p>
            </div>

            {/* 3. Light State */}
            <div className="p-4 rounded-xl border border-green-500/10 bg-green-500/[0.01]">
              <h2 className="text-green-400 font-serif font-medium text-lg mb-2">3. The Light State (Solution)</h2>
              <p className="text-zinc-300 text-sm leading-relaxed">{zoneData.light}</p>
            </div>

            {/* 4. Action Plan / Transition Steps */}
            <div>
              <h2 className="text-white font-serif font-medium text-lg mb-3">4. Strategic Alignment Steps</h2>
              <div className="flex flex-col gap-3">
                {zoneData.howToSteps.map((step: any, idx: number) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-white text-sm font-semibold">{step.name}</h3>
                      <p className="text-zinc-400 text-xs leading-relaxed mt-0.5">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Frequently Asked Questions */}
            <div className="border-t border-white/5 pt-6">
              <h2 className="text-white font-serif font-medium text-lg mb-3">5. Common Questions & Direct Answers</h2>
              <div className="flex flex-col gap-4">
                {zoneData.faq.map((item: any, idx: number) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <h3 className="text-purple-300 text-sm font-semibold">Q: {item.q}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">A: {item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-white/10 my-2" />

          {/* Internal Link Loop */}
          <div className="text-left flex flex-col gap-4">
            <h3 className="text-white font-serif text-sm font-medium uppercase tracking-wider">Next Optimization Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link
                href={`/meaning/${arcanaNum}/${nextZoneKey}`}
                className="p-3 rounded-lg border border-white/5 bg-white/[0.005] hover:bg-white/[0.02] text-xs transition-colors"
              >
                <span className="text-zinc-500 block mb-1">Analyze next life sector:</span>
                <span className="text-purple-400 font-semibold">{nextZoneName} &rarr;</span>
              </Link>
              <Link
                href={`/meaning/${relatedArcanaNum}/${zoneKey}`}
                className="p-3 rounded-lg border border-white/5 bg-white/[0.005] hover:bg-white/[0.02] text-xs transition-colors"
              >
                <span className="text-zinc-500 block mb-1">Explore related energy in this sector:</span>
                <span className="text-purple-400 font-semibold">Arcana {relatedArcanaNum} ({relatedArcanaName}) &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Action Navigation */}
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <Link
              href={`/meaning/${arcanaNum}`}
              className="px-5 py-2 border border-white/5 hover:border-white/10 text-zinc-400 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Arcana Profile Hub
            </Link>
            <Link
              href="/"
              className="px-5 py-2 bg-purple-600/80 hover:bg-purple-500 text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Run Calculations
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const zones = ['soul', 'spiritual', 'material', 'karma', 'comfort'];
  const params: { arcana: string; zone: string }[] = [];
  
  for (let arcana = 1; arcana <= 22; arcana++) {
    for (const zone of zones) {
      params.push({
        arcana: arcana.toString(),
        zone: zone,
      });
    }
  }
  return params;
}
