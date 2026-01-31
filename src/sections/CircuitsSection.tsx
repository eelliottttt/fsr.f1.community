import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { circuits } from '../data/circuits';
import { MapPin, Route, Clock, Flag, ChevronLeft, ChevronRight, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CircuitsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const [activeCircuit, setActiveCircuit] = useState(circuits[0]);
  const [hoveredCircuit, setHoveredCircuit] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.circuits-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Globe rotation on scroll
      gsap.to(globeRef.current, {
        rotateY: 180,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // Circuit cards stagger
      gsap.fromTo(
        '.circuit-card',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.circuits-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextCircuit = () => {
    const currentIndex = circuits.findIndex((c) => c.id === activeCircuit.id);
    const nextIndex = (currentIndex + 1) % circuits.length;
    setActiveCircuit(circuits[nextIndex]);
  };

  const prevCircuit = () => {
    const currentIndex = circuits.findIndex((c) => c.id === activeCircuit.id);
    const prevIndex = (currentIndex - 1 + circuits.length) % circuits.length;
    setActiveCircuit(circuits[prevIndex]);
  };

  return (
    <section
      ref={sectionRef}
      id="circuits"
      className="relative min-h-screen py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Wireframe Globe Background */}
        <div
          ref={globeRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 preserve-3d"
          style={{ perspective: '1000px' }}
        >
          <div className="absolute inset-0 rounded-full border border-white/20" />
          <div className="absolute inset-8 rounded-full border border-white/10" />
          <div className="absolute inset-16 rounded-full border border-white/5" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10" />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#e63946]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Globe className="w-4 h-4 text-[#e63946]" />
            <span className="text-xs font-['Rajdhani'] font-semibold tracking-widest uppercase text-white/80">
              Circuits du Monde
            </span>
          </div>
          <h2 className="circuits-title text-5xl sm:text-6xl md:text-7xl font-['Orbitron'] font-black text-white mb-6">
            CIRCUIT <span className="text-gradient-red">LEGENDS</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
            Explorez les circuits mythiques qui ont façonné l'histoire de la Formule 1
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Active Circuit Display */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10">
              {/* Circuit Image */}
              <div className="relative h-80 sm:h-96">
                <img
                  src={activeCircuit.image}
                  alt={activeCircuit.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

                {/* Navigation Arrows */}
                <button
                  onClick={prevCircuit}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextCircuit}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Country Flag */}
                <div className="absolute top-4 left-4 text-4xl">{activeCircuit.flag}</div>
              </div>

              {/* Circuit Info */}
              <div className="p-8">
                <h3 className="text-2xl sm:text-3xl font-['Orbitron'] font-bold text-white mb-2">
                  {activeCircuit.name}
                </h3>
                <div className="flex items-center gap-2 text-white/60 mb-6">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{activeCircuit.location}, {activeCircuit.country}</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/5">
                    <Route className="w-5 h-5 text-[#e63946] mb-2" />
                    <p className="text-lg font-['Orbitron'] font-bold text-white">{activeCircuit.length}</p>
                    <p className="text-xs text-white/50 uppercase">Longueur</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <Flag className="w-5 h-5 text-[#e63946] mb-2" />
                    <p className="text-lg font-['Orbitron'] font-bold text-white">{activeCircuit.laps}</p>
                    <p className="text-xs text-white/50 uppercase">Tours</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <Clock className="w-5 h-5 text-[#e63946] mb-2" />
                    <p className="text-lg font-['Orbitron'] font-bold text-white">{activeCircuit.lapRecord}</p>
                    <p className="text-xs text-white/50 uppercase">Record</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Circuit Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {circuits.map((circuit) => (
                <button
                  key={circuit.id}
                  onClick={() => setActiveCircuit(circuit)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeCircuit.id === circuit.id
                      ? 'w-8 bg-[#e63946]'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Circuit List */}
          <div className="circuits-grid space-y-4">
            <h4 className="text-lg font-['Orbitron'] font-semibold text-white/80 mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-white/20" />
              Tous les Circuits
            </h4>
            {circuits.map((circuit) => (
              <div
                key={circuit.id}
                className={`circuit-card group p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  activeCircuit.id === circuit.id
                    ? 'bg-white/10 border-[#e63946]/50'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                }`}
                onClick={() => setActiveCircuit(circuit)}
                onMouseEnter={() => setHoveredCircuit(circuit.id)}
                onMouseLeave={() => setHoveredCircuit(null)}
              >
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={circuit.image}
                      alt={circuit.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{circuit.flag}</span>
                      <h5 className="font-['Orbitron'] font-semibold text-white truncate">
                        {circuit.name}
                      </h5>
                    </div>
                    <p className="text-sm text-white/50">{circuit.location}</p>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:flex items-center gap-4 text-right">
                    <div>
                      <p className="text-sm font-['Orbitron'] font-bold text-white">{circuit.length}</p>
                      <p className="text-xs text-white/40">Longueur</p>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-all duration-300 ${
                        activeCircuit.id === circuit.id
                          ? 'text-[#e63946] translate-x-1'
                          : 'text-white/20 group-hover:text-white/60'
                      }`}
                    />
                  </div>
                </div>

                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none ${
                    hoveredCircuit === circuit.id ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: 'radial-gradient(circle at 0% 50%, rgba(230, 57, 70, 0.1), transparent 70%)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* World Map Visualization */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-4xl h-64 relative">
              {/* Simplified World Map Dots */}
              {circuits.map((circuit) => (
                <div
                  key={circuit.id}
                  className="absolute group cursor-pointer"
                  style={{
                    left: `${circuit.coordinates.x}%`,
                    top: `${circuit.coordinates.y}%`,
                  }}
                  onClick={() => setActiveCircuit(circuit)}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeCircuit.id === circuit.id
                        ? 'bg-[#e63946] scale-150'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  >
                    <div className="absolute inset-0 rounded-full bg-[#e63946] animate-ping opacity-30" />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-lg bg-black/80 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {circuit.name}
                  </div>
                </div>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e63946" stopOpacity="0" />
                    <stop offset="50%" stopColor="#e63946" stopOpacity="1" />
                    <stop offset="100%" stopColor="#e63946" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {circuits.map((circuit, idx) => {
                  const nextCircuit = circuits[(idx + 1) % circuits.length];
                  return (
                    <line
                      key={`line-${idx}`}
                      x1={`${circuit.coordinates.x}%`}
                      y1={`${circuit.coordinates.y}%`}
                      x2={`${nextCircuit.coordinates.x}%`}
                      y2={`${nextCircuit.coordinates.y}%`}
                      stroke="url(#lineGradient)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
