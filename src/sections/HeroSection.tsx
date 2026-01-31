import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Play, Zap, Trophy, Timer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set('.hero-char', { y: 100, opacity: 0 });
      gsap.set(subheadingRef.current, { y: 40, opacity: 0 });
      gsap.set(ctaRef.current, { scale: 0, opacity: 0 });
      gsap.set('.stat-item', { y: 30, opacity: 0 });

      // Entrance animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Video entrance
      tl.fromTo(
        videoRef.current,
        { scale: 1.2, filter: 'blur(10px)' },
        { scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }
      );

      // Heading character animation
      tl.to(
        '.hero-char',
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.03,
          ease: 'expo.out',
        },
        '-=1'
      );

      // Subheading
      tl.to(
        subheadingRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.6'
      );

      // CTA button
      tl.to(
        ctaRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.4'
      );

      // Stats
      tl.to(
        '.stat-item',
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
        },
        '-=0.4'
      );

      // Scroll parallax effects
      gsap.to(headingRef.current, {
        y: -200,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(videoRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 10;
      const yPos = (clientY / window.innerHeight - 0.5) * 10;

      gsap.to(headingRef.current, {
        rotateY: xPos,
        rotateX: -yPos,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToTeams = () => {
    const element = document.querySelector('#teams');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split heading into characters
  const headingText = 'FORMULA ONE';
  const headingChars = headingText.split('').map((char, i) => (
    <span key={i} className="hero-char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
      {char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/téléchargement.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Video Overlay */}
        <div className="absolute inset-0 video-overlay" />
        {/* Gradient Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.4) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto perspective-1000">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
          <Zap className="w-4 h-4 text-[#e63946]" />
          <span className="text-xs font-['Rajdhani'] font-semibold tracking-widest uppercase text-white/80">
            Saison 2026
          </span>
        </div>

        {/* Main Heading */}
        <h1
          ref={headingRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-['Orbitron'] font-black text-white mb-6 preserve-3d"
          style={{ textShadow: '0 0 80px rgba(230, 57, 70, 0.3)' }}
        >
          {headingChars}
        </h1>

        {/* Subheading */}
        <p
          ref={subheadingRef}
          className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-10 font-light tracking-wide"
        >
          L'apogée du sport automobile. Vitesse, précision, excellence.
          <br />
          <span className="text-[#e63946] font-semibold">Bienvenue dans l'univers Formula 1.</span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={scrollToTeams}
            className="btn-premium rounded-full px-10 py-4 text-white font-semibold tracking-wider uppercase flex items-center gap-3"
          >
            <Play className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Découvrir</span>
          </button>
          <button
            onClick={scrollToTeams}
            className="px-8 py-4 rounded-full border border-white/20 text-white font-medium tracking-wider uppercase hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
          >
            <span>Les Équipes</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="stat-item text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-[#e63946]" />
              <span className="text-3xl sm:text-4xl font-['Orbitron'] font-bold text-white">24</span>
            </div>
            <p className="text-xs sm:text-sm text-white/50 uppercase tracking-wider">Courses</p>
          </div>
          <div className="stat-item text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-[#e63946]" />
              <span className="text-3xl sm:text-4xl font-['Orbitron'] font-bold text-white">10</span>
            </div>
            <p className="text-xs sm:text-sm text-white/50 uppercase tracking-wider">Équipes</p>
          </div>
          <div className="stat-item text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Timer className="w-5 h-5 text-[#e63946]" />
              <span className="text-3xl sm:text-4xl font-['Orbitron'] font-bold text-white">370</span>
            </div>
            <p className="text-xs sm:text-sm text-white/50 uppercase tracking-wider">km/h max</p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-[#e63946]/50 to-transparent" />
      <div className="absolute top-1/3 right-10 w-px h-48 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
    </section>
  );
}
