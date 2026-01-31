import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Navigation } from './components/Navigation';
import { HeroSection } from './sections/HeroSection';
import { TeamsSection } from './sections/TeamsSection';
import { CircuitsSection } from './sections/CircuitsSection';
import { StandingsSection } from './sections/StandingsSection';
import { Footer } from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenisRef.current?.destroy();
      gsap.ticker.remove((time) => {
        lenisRef.current?.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#0a0a0a] noise">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        {/* Page 1: Hero + Introduction + Teams */}
        <HeroSection />
        <TeamsSection />
        
        {/* Page 2: Circuits */}
        <CircuitsSection />
        
        {/* Page 3: Standings */}
        <StandingsSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Background Grid Lines */}
      <div className="fixed inset-0 grid-lines pointer-events-none z-0 opacity-50" />
    </div>
  );
}

export default App;
