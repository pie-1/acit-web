// src/pages/Home.jsx
import { Hero } from '@/components/home/Hero';
import { MissionBriefs, ActivePrototypes, NeuralPlayground, JoinCTA } from '@/components/home/HomeSections';

export function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <MissionBriefs />
      <ActivePrototypes />
      <NeuralPlayground />
      <JoinCTA />
    </div>
  );
}