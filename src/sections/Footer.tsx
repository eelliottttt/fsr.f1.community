import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flag, Heart, ExternalLink, Instagram, Twitter, Youtube, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const checkeredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Checkered flag wave animation
      gsap.fromTo(
        checkeredRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content fade in
      gsap.fromTo(
        '.footer-content',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0a0a0a] overflow-hidden"
    >
      {/* Checkered Flag Pattern */}
      <div
        ref={checkeredRef}
        className="relative h-24 overflow-hidden"
      >
        <div className="absolute inset-0 flex">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full ${
                i % 2 === 0 ? 'bg-white' : 'bg-black'
              }`}
              style={{
                transform: `skewX(-20deg) translateX(${i * -5}px)`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#e63946] flex items-center justify-center">
            <Flag className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative py-20">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, white 1px, transparent 1px),
                linear-gradient(white 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Brand */}
            <div className="footer-content">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#e63946] to-[#c1121f] flex items-center justify-center">
                  <span className="text-white font-bold text-xl font-['Orbitron']">F1</span>
                </div>
                <div>
                  <h3 className="text-xl font-['Orbitron'] font-bold text-white">PREMIUM</h3>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Experience</p>
                </div>
              </div>
              <p className="text-white/60 mb-6 leading-relaxed">
                L'expérience ultime pour les passionnés de Formule 1. 
                Découvrez l'excellence du sport automobile à travers un design immersif et luxueux.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Youtube, href: '#' },
                  { icon: Mail, href: '#' },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#e63946] hover:text-white transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-content">
              <h4 className="text-lg font-['Orbitron'] font-semibold text-white mb-6 flex items-center gap-2">
                <Flag className="w-5 h-5 text-[#e63946]" />
                Navigation
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Accueil', href: '#hero' },
                  { label: 'Les Équipes', href: '#teams' },
                  { label: 'Circuits', href: '#circuits' },
                  { label: 'Classement', href: '#standings' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-[#e63946] group-hover:w-4 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* F1 Info */}
            <div className="footer-content">
              <h4 className="text-lg font-['Orbitron'] font-semibold text-white mb-6 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-[#e63946]" />
                Formula 1
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Site Officiel F1', href: 'https://www.formula1.com' },
                  { label: 'F1 TV', href: 'https://f1tv.formula1.com' },
                  { label: 'Règlements', href: '#' },
                  { label: 'Historique', href: '#' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-[#e63946] group-hover:w-4 transition-all duration-300" />
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Bottom Bar */}
          <div className="footer-content flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              <span className="text-[#e63946]">Created by Mouad EL Marsse</span>
            </p>
            <p className="text-white/40 text-sm flex items-center gap-2">
              Fait avec <Heart className="w-4 h-4 text-[#e63946] fill-[#e63946]" /> pour les fans de F1
            </p>
            <p className="text-white/40 text-sm">
              © 2026 F1 Premium Experience. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e63946]/50 to-transparent" />
    </footer>
  );
}
