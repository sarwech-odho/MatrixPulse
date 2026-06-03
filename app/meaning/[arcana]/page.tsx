import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import arcanaData from '@/data/arcana-definitions.json';

interface Props {
  params: Promise<{ arcana: string }>;
}

// Dynamically generate metadata for the Hub page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { arcana } = await params;
  const arcanaNum = parseInt(arcana, 10);
  
  // Validate Arcana
  const data = (arcanaData as any).arcana[arcanaNum];
  if (!data) {
    return {
      title: 'Arcana Not Found',
    };
  }

  return {
    title: `Arcana ${arcanaNum}: ${data.name} Core Meaning & Destiny Matrix Profile`,
    description: `Explore the core energy, talents, and lessons of Arcana ${arcanaNum} (${data.name}) inside your Destiny Matrix. Learn how it influences your life path.`,
  };
}

export default async function ArcanaHubPage({ params }: Props) {
  const { arcana } = await params;
  const arcanaNum = parseInt(arcana, 10);

  // Validate Arcana Range
  if (isNaN(arcanaNum) || arcanaNum < 1 || arcanaNum > 22) {
    notFound();
  }

  const data = (arcanaData as any).arcana[arcanaNum];
  if (!data) {
    notFound();
  }

  const zonesList = [
    { key: 'soul', name: 'Soul & Personality', desc: 'Your inner core character and personality traits.' },
    { key: 'spiritual', name: 'Spiritual Connection', desc: 'Your connection to intuition and higher wisdom.' },
    { key: 'material', name: 'Material & Career', desc: 'Financial blockages and professional legacy.' },
    { key: 'karma', name: 'Karmic Lessons', desc: 'Past-life tail karma and principal challenges.' },
    { key: 'comfort', name: 'Comfort Zone & Core', desc: 'Your emotional refuge and central balance point.' }
  ];

  return (
    <div className="relative min-h-[calc(100vh-8rem)] w-full flex flex-col items-center justify-center bg-[#050508] overflow-hidden px-4 pt-8 pb-16">
      {/* Aurora Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-[var(--aurora-1)] blur-[100px] opacity-40 animate-aurora-1" />
        <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-[var(--aurora-2)] blur-[110px] opacity-30 animate-aurora-2" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col gap-8">
        <GlassCard glow={true} className="flex flex-col gap-6 text-center">
          <div>
            <span className="text-purple-400 font-semibold tracking-wider text-xs uppercase mb-2 block">
              Destiny Profile Hub
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-white font-medium mb-3">
              Arcana {data.number}: {data.name}
            </h1>
            <p className="text-zinc-500 font-sans text-sm md:text-base tracking-wide max-w-md mx-auto italic">
              Keywords: {data.keywords}
            </p>
          </div>

          <div className="h-px bg-white/10 my-2" />

          <div className="text-left">
            <h2 className="text-white text-lg font-serif font-medium mb-3 uppercase tracking-wide">
              The Five Life Zones
            </h2>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              In the Destiny Matrix, your birth arcana manifests uniquely in each sector of your life. Select a zone below to explore detailed alignments, shadow states, and custom action plans:
            </p>

            <div className="flex flex-col gap-4">
              {zonesList.map((z) => (
                <Link
                  key={z.key}
                  href={`/meaning/${data.number}/${z.key}`}
                  className="group flex flex-col gap-1 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-purple-500/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-serif font-medium text-base group-hover:text-purple-300 transition-colors">
                      {z.name}
                    </span>
                    <span className="text-xs text-purple-400 font-semibold tracking-wider uppercase group-hover:translate-x-1 transition-transform">
                      Explore Zone &rarr;
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs tracking-wide">
                    {z.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Link
              href="/"
              className="px-6 py-2.5 border border-white/10 hover:border-white/20 text-zinc-300 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Back to Calculator
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const params: { arcana: string }[] = [];
  for (let arcana = 1; arcana <= 22; arcana++) {
    params.push({
      arcana: arcana.toString(),
    });
  }
  return params;
}
