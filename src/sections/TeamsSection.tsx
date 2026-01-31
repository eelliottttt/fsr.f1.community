import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teams } from '../data/teams';
import { Trophy, ChevronRight, Users, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function TeamsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeTeam, setActiveTeam] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.teams-title-char',
        { opacity: 0, skewX: 20, x: -50 },
        {
          opacity: 1,
          skewX: 0,
          x: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'steps(5)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards 3D flip animation
      gsap.fromTo(
        '.team-card',
        { rotateY: 90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subtitle animation
      gsap.fromTo(
        '.teams-subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText = 'THE GRID';
  const titleChars = titleText.split('').map((char, i) => (
    <span key={i} className="teams-title-char inline-block">
      {char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="teams"
      className="relative min-h-screen py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#e63946]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Users className="w-4 h-4 text-[#e63946]" />
            <span className="text-xs font-['Rajdhani'] font-semibold tracking-widest uppercase text-white/80">
              Les Équipes 2026
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-['Orbitron'] font-black text-white mb-6">
            {titleChars}
          </h2>
          <p className="teams-subtitle text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
            Découvrez les écuries de pointe qui façonnent l'avenir de la Formule 1
          </p>
        </div>

        {/* Teams Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000"
        >
          {teams.map((team) => (
            <div
              key={team.id}
              className="team-card preserve-3d"
              onMouseEnter={() => setActiveTeam(team.id)}
              onMouseLeave={() => setActiveTeam(null)}
            >
              <div
                className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-500"
                style={{
                  transform: activeTeam === team.id ? 'translateZ(30px) rotateY(3deg) rotateX(-3deg)' : 'translateZ(0)',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
                }}
              >
                {/* Team Color Accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${team.color}, ${team.secondaryColor})` }}
                />

                {/* Team Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={team.image}
                    alt={team.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
                  
                  {/* Championships Badge */}
                  {team.championships > 0 && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                      <Trophy className="w-3 h-3 text-[#e63946]" />
                      <span className="text-xs font-semibold text-white">{team.championships}</span>
                    </div>
                  )}
                </div>

                {/* Team Info */}
                <div className="p-6">
                  <h3 className="text-xl font-['Orbitron'] font-bold text-white mb-1">
                    {team.name}
                  </h3>
                  <p className="text-sm text-white/50 mb-4">{team.fullName}</p>

                  {/* Drivers */}
                  <div className="space-y-3">
                    <p className="text-xs text-white/40 uppercase tracking-wider font-['Rajdhani']">
                      Pilotes
                    </p>
                    {team.drivers.map((driver, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10">
                          <img
                            src={driver.image}
                            alt={driver.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{driver.name}</p>
                          <p className="text-xs text-white/50">#{driver.number}</p>
                        </div>
                        <Star className="w-4 h-4 text-white/20" />
                      </div>
                    ))}
                  </div>

                  {/* View Button */}
                  <button className="mt-6 w-full py-3 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-[#e63946]/50 hover:bg-[#e63946]/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium">
                    <span>Voir l'équipe</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${team.color}20, transparent 70%)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Équipes', value: '10' },
            { label: 'Pilotes', value: '20' },
            { label: 'Moteurs', value: '4' },
            { label: 'Constructeurs', value: '10' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-xl glass hover:bg-white/10 transition-colors"
            >
              <p className="text-3xl sm:text-4xl font-['Orbitron'] font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
