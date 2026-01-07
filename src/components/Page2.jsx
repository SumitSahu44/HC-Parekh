import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ArrowDown, MapPin, Mail, Phone, Briefcase, Building2, Gavel, HandHeart, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- POWERFUL DARK & GOLD THEME ---
const colors = {
  bg: "#0B0F17",           // Deepest Charcoal Black
  surface: "#161B26",      // Slightly lighter for cards
  textPrimary: "#FFFFFF",  // Pure White text for contrast
  textSecondary: "#9CA3AF",// Muted silver/gray
  accent: "#D4AF37",       // Metallic Gold/Bronze for luxury & power
};

// --- IMPOSING INDUSTRIAL IMAGES ---
const images = {
  hero: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop", // Dark corporate architecture
  about: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop", // Executive boardroom view
  engagement: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop", // Global digital network connecting
  factory: "https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=2070&auto=format&fit=crop" // Heavy Industry
};

const Page2 = () => {
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // --- SMOOTH SCROLL ---
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', ({ scroll }) => { setIsScrolled(scroll > 50); });
    return () => lenis.destroy();
  }, []);

  // --- GSAP ANIMATIONS ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Intro
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from(".hero-title-char", { y: 150, opacity: 0, rotateX: -45, stagger: 0.05, duration: 1, ease: "power4.out" })
        .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5");

      // Parallax Images
      gsap.utils.toArray('.parallax-img').forEach(img => {
         gsap.to(img, {
            yPercent: 30, ease: "none",
            scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true }
         });
      });

      // Reveal Sections
      gsap.utils.toArray('.section-reveal').forEach(elem => {
        gsap.from(elem, {
          scrollTrigger: { trigger: elem, start: "top 85%" },
          y: 50, opacity: 0, duration: 1, ease: "power3.out"
        });
      });

      // Card Stagger
      gsap.from(".power-card", {
         scrollTrigger: { trigger: ".expertise-grid", start: "top 80%" },
         y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: "expo.out"
       });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Helper to split text for animation
  const splitText = (text) => text.split("").map((char, index) => (
    <span key={index} className="hero-title-char inline-block whitespace-pre">{char}</span>
  ));

  return (
    <div ref={containerRef} className={`bg-[${colors.bg}] text-[${colors.textPrimary}] min-h-screen font-sans selection:bg-[${colors.accent}] selection:text-black`}>
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? `bg-[${colors.bg}]/90 backdrop-blur-xl border-b border-white/10 py-4` : 'py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter uppercase text-white">
            H.C. PAREKH<span className={`text-[${colors.accent}]`}>.</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="text-sm font-bold tracking-widest text-gray-400 hidden md:block">EST. 2007</span>
            <a href="#contact" className={`px-6 py-2 text-xs font-bold tracking-widest uppercase border-2 border-[${colors.accent}] text-[${colors.accent}] hover:bg-[${colors.accent}] hover:text-black transition-all`}>
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (IMMERSIVE) --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center">
         {/* Background Image with heavy overlay */}
         <div className="absolute inset-0 overflow-hidden">
            <div className="parallax-img w-full h-[130%] bg-cover bg-center grayscale-[50%] scale-105" style={{ backgroundImage: `url(${images.hero})` }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent"></div>
         </div>

         <div className="container mx-auto px-6 md:px-12 relative z-10">
            <h2 className={`text-[${colors.accent}] font-bold tracking-[0.2em] uppercase mb-6 hero-subtitle relative pl-12 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-8 before:h-[2px] before:bg-[${colors.accent}]`}>
               Senior Role & Investor
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.9] uppercase overflow-hidden mb-8">
               <div className="flex overflow-hidden">{splitText("Industrial")}</div>
               <div className="flex overflow-hidden text-gray-400">{splitText("Strategy &")}</div>
               <div className="flex overflow-hidden text-[${colors.accent}]">{splitText("Consulting.")}</div>
            </h1>
            <div className="hero-subtitle flex flex-col md:flex-row gap-4 md:gap-12 text-lg md:text-xl text-gray-300 font-light max-w-3xl">
               <p>Driving growth for Government, Corporate & Manufacturing sectors.</p>
               <p className="flex items-center gap-2"><span className={`text-[${colors.accent}] font-bold`}>18+ Years</span> Proven Track Record.</p>
            </div>
         </div>
         <a href="#about" className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-pulse z-20 flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest">Explore</span>
            <ArrowDown className={`text-[${colors.accent}]`} />
         </a>
      </section>

      {/* --- THE PROFILE (BOLD) --- */}
      <section id="about" className={`py-32 px-6 bg-[${colors.bg}] relative`}>
         {/* Big Background Text Effect */}
         <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
            <h2 className="text-[20vw] font-black text-white leading-none uppercase whitespace-nowrap">Since 2007</h2>
         </div>

         <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="section-reveal">
               <h2 className="text-4xl md:text-6xl font-bold mb-12 leading-tight">
                  Architecting Success for <span className={`text-[${colors.accent}] decoration-4 underline-offset-4 underline`}>Govt & Industry</span> Giants.
               </h2>
               
               <div className="space-y-12">
                  {/* Govt Block */}
                  <div className="pl-6 border-l-2 border-[#D4AF37] group hover:border-white transition-colors">
                     <div className="flex items-center gap-4 mb-4">
                        <Building2 size={32} className={`text-[${colors.accent}]`} />
                        <h3 className="text-2xl font-bold uppercase">Government of India</h3>
                     </div>
                     <p className="text-gray-400 mb-4">Strategic projects for national infrastructure and research.</p>
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-medium text-white/80">
                        <li className="flex items-center gap-2"><ChevronRight size={14} className={`text-[${colors.accent}]`} /> NPCIL (Nuclear Power)</li>
                        <li className="flex items-center gap-2"><ChevronRight size={14} className={`text-[${colors.accent}]`} /> BARC (Environment Labs)</li>
                        <li className="flex items-center gap-2"><ChevronRight size={14} className={`text-[${colors.accent}]`} /> Medical Healthcare Projects</li>
                     </ul>
                  </div>

                  {/* Corporate Block */}
                  <div className="pl-6 border-l-2 border-gray-700 group hover:border-[#D4AF37] transition-colors">
                     <div className="flex items-center gap-4 mb-4">
                        <Briefcase size={32} className="text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
                        <h3 className="text-2xl font-bold uppercase">Corporate Sector</h3>
                     </div>
                     <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm font-medium text-white/80">
                        <li>Textile & Garment</li>
                        <li>Pulp & Paper</li>
                        <li>Plastic Mfg.</li>
                        <li>Information Tech</li>
                        <li>FMCG</li>
                     </ul>
                  </div>
               </div>
            </div>

            {/* Imposing Image */}
            <div className="h-[600px] relative section-reveal overflow-hidden rounded-sm">
               <div className="absolute inset-0 border-2 border-[${colors.accent}]/30 translate-x-4 translate-y-4 z-0"></div>
               <img src={images.about} alt="Executive Profile" className="w-full h-full object-cover grayscale-[30%] relative z-10 hover:scale-105 transition-transform duration-700" />
               <div className={`absolute bottom-0 left-0 bg-[${colors.accent}] text-black p-6 z-20`}>
                  <p className="text-4xl font-black">18+</p>
                  <p className="text-sm font-bold uppercase tracking-wider">Years of Excellence</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- CORE EXPERTISE (POWER CARDS) --- */}
      <section className={`py-32 bg-[${colors.surface}] px-6`}>
         <div className="container mx-auto">
            <div className="section-reveal mb-20 text-center">
               <h2 className={`text-[${colors.accent}] font-bold tracking-[0.3em] uppercase mb-6`}>Capabilities</h2>
               <h3 className="text-5xl font-black uppercase text-white">Corporate & Industrial Power</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 expertise-grid">
               {[
                  "Industrial MOUs & Joint Ventures",
                  "Corporate Investors & Investments",
                  "Tenders & Contracts Management",
                  "Indenting & Procurement",
                  "Dealers & Franchise Management",
                  "Company Debt Recovery",
                  "Labour Dispute Settlement",
                  "Government Arbitration",
                  "End-to-End Project Implementation"
               ].map((item, index) => (
                  <div key={index} className={`power-card group bg-[${colors.bg}] p-8 border border-white/5 hover:border-[${colors.accent}] hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500 relative overflow-hidden`}>
                     <div className={`absolute top-0 right-0 text-[8rem] font-black text-white/5 leading-none -translate-y-8 translate-x-8 group-hover:text-[${colors.accent}]/10 transition-colors`}>
                        {index + 1}
                     </div>
                     <h4 className="text-xl font-bold text-white group-hover:text-[${colors.accent}] transition-colors relative z-10 leading-tight">{item}</h4>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- CURRENT ENGAGEMENT (HIGH IMPACT) --- */}
      <section className="relative py-40 px-6 overflow-hidden">
         <div className="absolute inset-0">
            <div className="parallax-img w-full h-[130%] bg-cover bg-center" style={{ backgroundImage: `url(${images.engagement})` }}></div>
            <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] to-transparent"></div>
         </div>

         <div className="container mx-auto relative z-10 section-reveal border-l-4 border-[${colors.accent}] pl-8 md:pl-16">
            <span className={`inline-block mb-6 text-[${colors.accent}] font-bold tracking-[0.2em] uppercase`}>Currently Leading</span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 max-w-4xl leading-none uppercase">
               Large-Scale IT & <br/> Digitalization Project
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white/80 max-w-3xl">
               <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Client</p>
                  <p className="text-2xl font-bold text-white">Govt. High School for Deaf and Dumb</p>
               </div>
               <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Location</p>
                  <p className="text-2xl font-bold text-white">Andhra Pradesh</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- HISTORY & SOCIAL IMPACT (DARK TIMELINE) --- */}
      <section className={`py-32 bg-[${colors.bg}] px-6`}>
         <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
            
            {/* History Column */}
            <div className="section-reveal">
               <h3 className="text-3xl font-bold uppercase mb-12 flex items-center gap-4"><Briefcase className={`text-[${colors.accent}]`}/> Professional History</h3>
               <div className="space-y-0 relative before:absolute before:left-2 before:top-2 before:h-[90%] before:w-[1px] before:bg-white/20">
                  
                  <div className="relative pl-12 pb-12 group">
                     <div className={`absolute left-0 top-2 w-5 h-5 rounded-full bg-[${colors.bg}] border-2 border-white group-hover:border-[${colors.accent}] group-hover:bg-[${colors.accent}] transition-all`}></div>
                     <h4 className="text-xl font-bold text-white">Chief Business Officer (CBO)</h4>
                     <p className="text-gray-500">IT Company, Pune</p>
                  </div>
                  <div className="relative pl-12 pb-12 group">
                     <div className={`absolute left-0 top-2 w-5 h-5 rounded-full bg-[${colors.bg}] border-2 border-white group-hover:border-[${colors.accent}] group-hover:bg-[${colors.accent}] transition-all`}></div>
                     <h4 className="text-xl font-bold text-white">General Manager (Business)</h4>
                     <p className="text-gray-500">Plastic Manufacturing Industry, Odisha</p>
                  </div>
                  <div className="relative pl-12 group">
                     <div className={`absolute left-0 top-2 w-5 h-5 rounded-full bg-[${colors.bg}] border-2 border-white group-hover:border-[${colors.accent}] group-hover:bg-[${colors.accent}] transition-all`}></div>
                     <h4 className="text-xl font-bold text-white">NPCIL Project Consultant</h4>
                     <p className="text-gray-500">Government of India</p>
                  </div>

               </div>
            </div>

            {/* Social Impact Column */}
            <div className="section-reveal">
               <h3 className="text-3xl font-bold uppercase mb-12 flex items-center gap-4"><HandHeart className={`text-[${colors.accent}]`}/> Social Impact</h3>
               <div className="bg-[${colors.surface}] p-8 border-t-4 border-[${colors.accent}]">
                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                     Leveraging expertise for public welfare and fighting corporate malpractices.
                  </p>
                  <ul className="space-y-6">
                     <li className="flex items-start gap-4">
                        <div className={`p-3 bg-[${colors.bg}] rounded-full text-[${colors.accent}]`}><Gavel size={20}/></div>
                        <div>
                           <h5 className="text-lg font-bold">Public Interest Litigations (PILs)</h5>
                           <p className="text-gray-500 text-sm">Against Corporate Fraud & Money Laundering.</p>
                        </div>
                     </li>
                     <li className="flex items-start gap-4">
                        <div className={`p-3 bg-[${colors.bg}] rounded-full text-[${colors.accent}]`}><Building2 size={20}/></div>
                        <div>
                           <h5 className="text-lg font-bold">Fundraising Consultant</h5>
                           <p className="text-gray-500 text-sm">For Charitable & Social Organizations.</p>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </section>

      {/* --- FOOTER (MASSIVE CTA) --- */}
      <footer id="contact" className={`py-32 px-6 bg-black relative overflow-hidden`}>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
         <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] bg-[${colors.accent}] rounded-full blur-[200px] opacity-10 pointer-events-none`}></div>

         <div className="container mx-auto relative z-10">
            <h2 className="section-reveal text-[12vw] md:text-[8vw] font-black leading-none uppercase text-white/90 mb-20">
               Let's Talk <br/><span className={`text-[${colors.accent}]`}>Business.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-16 section-reveal">
               <div>
                  <p className="text-xs uppercase tracking-widest text-[${colors.accent}] mb-4 flex items-center gap-2"><MapPin size={14}/> Base Locations</p>
                  <p className="text-2xl font-bold text-white">Bhubaneswar / Bengaluru</p>
                  <p className="text-gray-500 mt-2 text-sm">A-3, Hi-Tech Plaza, Sundarpada, Bhubaneswar</p>
               </div>
               <div>
                  <p className="text-xs uppercase tracking-widest text-[${colors.accent}] mb-4 flex items-center gap-2"><Phone size={14}/> Direct Line</p>
                  <div className="flex flex-col gap-1">
                    <a href="tel:8260232337" className="text-2xl font-bold text-white hover:text-[${colors.accent}] transition-colors">+91 82602 32337</a>
                    <a href="tel:6353778329" className="text-2xl font-bold text-white hover:text-[${colors.accent}] transition-colors">+91 63537 78329</a>
                  </div>
               </div>
               <div>
                  <p className="text-xs uppercase tracking-widest text-[${colors.accent}] mb-4 flex items-center gap-2"><Mail size={14}/> Email</p>
                  <a href="mailto:hemant.parekh2012@gmail.com" className="text-xl font-bold text-white hover:text-[${colors.accent}] transition-colors break-all">hemant.parekh2012@gmail.com</a>
               </div>
            </div>
            
            <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-wider font-bold">
               <p>© {new Date().getFullYear()} H.C. Parekh. Industrial Investor.</p>
               <p>Tagda Variant. All Rights Reserved.</p>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Page2;