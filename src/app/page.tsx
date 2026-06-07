import Hero from '@/components/Hero/Hero';
import UnifiedAboutSection from '@/components/About/UnifiedAboutSection';

import TechnicalStockExchange from '@/components/Skills/TechnicalStockExchange';
import InvestmentPortfolioSection from '@/components/Projects/InvestmentPortfolioSection';
import CurrentPositionSection from '@/components/Position/CurrentPositionSection';
import ExecutiveBoardroomContactSection from '@/components/Contact/ExecutiveBoardroomContactSection';

import ExecutiveNavbar from '@/components/Navigation/ExecutiveNavbar';
import AssistantBot from '@/components/Chat/AssistantBot';
import PenguinCompanion from '@/components/Companion/PenguinCompanion';
import Preloader from '@/components/Preloader/Preloader';

export default function Home() {
  return (
    <main className="w-full bg-[#050505] text-white selection:bg-slate-200 selection:text-black relative">
      {/* Dynamic Glassmorphic Preloader Screen */}
      <Preloader />

      {/* Executive Sticky Navigation Bar */}
      <ExecutiveNavbar />

      {/* 1. Landing (Hero) Page */}
      <Hero />

      {/* 2. Unified About Section */}
      <UnifiedAboutSection />

      {/* 3. Technical Stock Exchange (Skills) */}
      <TechnicalStockExchange />

      {/* 4. Investment Portfolio (Projects) */}
      <InvestmentPortfolioSection />

      {/* 5. Current Position Section */}
      <CurrentPositionSection />

      {/* 6. Executive Boardroom Contact Section */}
      <ExecutiveBoardroomContactSection />

      {/* Interactive 2D Blue-Scarf Penguin Website Companion */}
      <PenguinCompanion />

      {/* Floating AI Assistant */}
      <AssistantBot />
    </main>
  );
}
