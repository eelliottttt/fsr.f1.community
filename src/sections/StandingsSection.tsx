import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { driverStandings, teamStandings, type DriverStanding, type TeamStanding } from '../data/standings';
import { Trophy, Medal, TrendingUp, Users, User, Crown, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const getPositionColor = (position: number) => {
  switch (position) {
    case 1:
      return 'from-[#d4af37] to-[#f4d03f]';
    case 2:
      return 'from-[#c0c0c0] to-[#e8e8e8]';
    case 3:
      return 'from-[#cd7f32] to-[#e59866]';
    default:
      return 'from-white/10 to-white/5';
  }
};

const getPositionGlow = (position: number) => {
  switch (position) {
    case 1:
      return 'shadow-[0_0_40px_rgba(212,175,55,0.4)]';
    case 2:
      return 'shadow-[0_0_40px_rgba(192,192,192,0.3)]';
    case 3:
      return 'shadow-[0_0_40px_rgba(205,127,50,0.3)]';
    default:
      return '';
  }
};

const getPositionIcon = (position: number) => {
  switch (position) {
    case 1:
      return <Crown className="w-5 h-5 text-[#d4af37]" />;
    case 2:
      return <Medal className="w-5 h-5 text-[#c0c0c0]" />;
    case 3:
      return <Medal className="w-5 h-5 text-[#cd7f32]" />;
    default:
      return <span className="text-white/60 font-['Orbitron']">{position}</span>;
  }
};

export function StandingsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'drivers' | 'teams'>('drivers');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.standings-title',
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

      gsap.fromTo(
        '.standing-bar',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.standings-list',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  const currentDriverStandings = activeTab === 'drivers' ? driverStandings : [];
  const currentTeamStandings = activeTab === 'teams' ? teamStandings : [];
  const maxPoints = activeTab === 'drivers' 
    ? Math.max(...driverStandings.map((s) => s.points))
    : Math.max(...teamStandings.map((s) => s.points));

  const renderPodiumItem = (standing: DriverStanding | TeamStanding | undefined, position: number, isLarge: boolean) => {
    if (!standing) return null;

    const borderColor = position === 1 ? '#d4af37' : position === 2 ? '#c0c0c0' : '#cd7f32';
    const heightClass = position === 1 ? 'h-32 sm:h-40' : position === 2 ? 'h-24 sm:h-32' : 'h-20 sm:h-24';
    const widthClass = position === 1 ? 'w-28 sm:w-40' : 'w-24 sm:w-32';
    const avatarSize = isLarge ? 'w-24 h-24 sm:w-36 sm:h-36' : 'w-20 h-20 sm:w-28 sm:h-28';

    const isDriver = activeTab === 'drivers';
    const driverStanding = isDriver ? (standing as DriverStanding) : null;
    const teamStanding = !isDriver ? (standing as TeamStanding) : null;

    return (
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div 
            className={`${avatarSize} rounded-full overflow-hidden border-4 shadow-[0_0_30px_rgba(0,0,0,0.3)]`}
            style={{ borderColor }}
          >
            {isDriver && driverStanding ? (
              <img
                src={driverStanding.image}
                alt={driverStanding.driver}
                className="w-full h-full object-cover"
              />
            ) : teamStanding ? (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: teamStanding.color }}
              >
                <span className="text-white font-['Orbitron'] font-bold text-xl sm:text-3xl">
                  {teamStanding.team.charAt(0)}
                </span>
              </div>
            ) : null}
          </div>
          <div 
            className="absolute -bottom-2 -right-2 w-8 h-10 rounded-full flex items-center justify-center"
            style={{ background: borderColor }}
          >
            {position === 1 ? (
              <Crown className="w-5 h-5 text-black" />
            ) : (
              <span className="text-black font-bold text-sm">{position}</span>
            )}
          </div>
        </div>
        <div 
          className={`${widthClass} ${heightClass} rounded-t-lg flex flex-col items-center justify-end pb-4`}
          style={{ 
            background: `linear-gradient(to bottom, ${borderColor}40, ${borderColor}10)` 
          }}
        >
          <p className="text-white font-['Orbitron'] font-bold text-sm sm:text-lg text-center px-2 truncate w-full">
            {isDriver && driverStanding 
              ? driverStanding.driver.split(' ')[0] 
              : teamStanding?.team}
          </p>
          <p className="font-bold text-lg" style={{ color: borderColor }}>
            {standing.points} pts
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="standings"
      className="relative min-h-screen py-32 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#e63946]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-white" />
          <div className="absolute top-2/4 left-0 right-0 h-px bg-white" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-white" />
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white" />
          <div className="absolute top-0 bottom-0 left-2/4 w-px bg-white" />
          <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Trophy className="w-4 h-4 text-[#e63946]" />
            <span className="text-xs font-['Rajdhani'] font-semibold tracking-widest uppercase text-white/80">
              Championnat 2026
            </span>
          </div>
          <h2 className="standings-title text-5xl sm:text-6xl md:text-7xl font-['Orbitron'] font-black text-white mb-6">
            <span className="text-gradient-red">STANDINGS</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
            Le classement officiel de la saison 2026 de Formule 1
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('drivers')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-['Rajdhani'] font-semibold tracking-wider uppercase transition-all duration-300 ${
              activeTab === 'drivers'
                ? 'bg-[#e63946] text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            Pilotes
          </button>
          <button
            onClick={() => setActiveTab('teams')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-['Rajdhani'] font-semibold tracking-wider uppercase transition-all duration-300 ${
              activeTab === 'teams'
                ? 'bg-[#e63946] text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Équipes
          </button>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-16">
          <div className="flex justify-center items-end gap-4 sm:gap-8">
            {activeTab === 'drivers' ? (
              <>
                {renderPodiumItem(currentDriverStandings[1], 2, false)}
                <div className="-mt-8">{renderPodiumItem(currentDriverStandings[0], 1, true)}</div>
                {renderPodiumItem(currentDriverStandings[2], 3, false)}
              </>
            ) : (
              <>
                {renderPodiumItem(currentTeamStandings[1], 2, false)}
                <div className="-mt-8">{renderPodiumItem(currentTeamStandings[0], 1, true)}</div>
                {renderPodiumItem(currentTeamStandings[2], 3, false)}
              </>
            )}
          </div>
        </div>

        {/* Full Standings List */}
        <div className="standings-list space-y-3">
          <h4 className="text-lg font-['Orbitron'] font-semibold text-white/80 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#e63946]" />
            Classement Complet
          </h4>

          {(activeTab === 'drivers' ? driverStandings : teamStandings).map((standing) => (
            <div
              key={standing.position}
              className={`relative group p-4 rounded-xl overflow-hidden transition-all duration-300 ${
                standing.position <= 3
                  ? `bg-gradient-to-r ${getPositionColor(standing.position)} ${getPositionGlow(standing.position)}`
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div
                className="standing-bar absolute left-0 top-0 bottom-0 bg-white/10 origin-left"
                style={{ width: `${(standing.points / maxPoints) * 100}%` }}
              />

              <div className="relative flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                    standing.position <= 3 ? 'bg-black/30' : 'bg-white/10'
                  }`}
                >
                  {getPositionIcon(standing.position)}
                </div>

                {activeTab === 'drivers' ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                    <img
                      src={(standing as DriverStanding).image}
                      alt={(standing as DriverStanding).driver}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: (standing as TeamStanding).color }}
                  >
                    <span className="text-white font-['Orbitron'] font-bold">
                      {(standing as TeamStanding).team.charAt(0)}
                    </span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-['Orbitron'] font-semibold text-white truncate">
                    {activeTab === 'drivers'
                      ? (standing as DriverStanding).driver
                      : (standing as TeamStanding).team}
                  </p>
                  {activeTab === 'drivers' && (
                    <p className="text-sm text-white/50">
                      {(standing as DriverStanding).team}
                    </p>
                  )}
                </div>

                <div className="hidden sm:flex items-center gap-6 text-right">
                  <div>
                    <p className="text-xs text-white/40 uppercase">Victoires</p>
                    <p className="text-sm font-semibold text-white">{standing.wins}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase">Podiums</p>
                    <p className="text-sm font-semibold text-white">{standing.podiums}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`points-number text-2xl font-['Orbitron'] font-bold ${
                      standing.position === 1
                        ? 'text-[#d4af37]'
                        : standing.position === 2
                        ? 'text-[#c0c0c0]'
                        : standing.position === 3
                        ? 'text-[#cd7f32]'
                        : 'text-white'
                    }`}
                  >
                    {standing.points}
                  </p>
                  <p className="text-xs text-white/40 uppercase">Points</p>
                </div>

                <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
