import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ArrowDown, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- PREMIUM ASSETS ---
const images = {
  hero: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop", // Abstract Building
  govt: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1932&auto=format&fit=crop", // Nuclear/Industrial
  corp: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop", // Corporate Office
  social: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop", // Legal/Justice
};

const Page5 = () => {
  const container = useRef(null);

  // --- SMOOTH SCROLL & ANIMATIONS ---
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HERO EXPANSION (The "Unique" Trigger)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        }
      });

      tl.to(".hero-img-mask", {
        width: "100%",
        height: "100%",
        borderRadius: "0px",
        ease: "power2.inOut"
      }, "start")
      .to(".hero-text", {
        scale: 0.8,
        opacity: 0,
        y: -50,
        ease: "power2.inOut"
      }, "start")
      .to(".hero-overlay-text", {
        opacity: 1,
        y: 0,
        delay: 0.5
      }, "start");


      // 2. STACKED CARDS (Experience Section)
      const cards = gsap.utils.toArray(".stack-card");
      cards.forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top top+=100", // Stuck a bit from top
            end: "bottom top",
            pin: true,
            pinSpacing: false, // Cards pile on top of each other
            scrub: true,
          },
          scale: 1 - (cards.length - i) * 0.05, // Subtle shrink effect
          transformOrigin: "center top",
        });
      });

      // 3. IMAGE REVEAL ON SCROLL
      gsap.utils.toArray(".reveal-img").forEach(img => {
        gsap.fromTo(img, 
          { clipPath: "inset(0% 100% 0% 0%)", scale: 1.2 },
          { 
            clipPath: "inset(0% 0% 0% 0%)", 
            scale: 1,
            duration: 1.5, 
            ease: "power4.out",
            scrollTrigger: { trigger: img, start: "top 80%" }
          }
        );
      });

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="bg-slate-50 text-slate-900 font-sans selection:bg-blue-900 selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 mix-blend-difference text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tighter uppercase">H.C. Parekh</h1>
        <button className="text-sm font-semibold tracking-widest border-b-2 border-white pb-1 hover:text-blue-300 hover:border-blue-300 transition-all">
          CONTACT
        </button>
      </nav>

      {/* --- 1. HERO SECTION (EXPANDING IMAGE) --- */}
      <section className="hero-container w-full h-screen flex flex-col justify-center items-center relative overflow-hidden bg-white">
        
        {/* Initial Text */}
        <div className="hero-text text-center z-10 px-4">
          <p className="text-white font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base">Since 2007</p>
          <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight mb-6">
            Industrial <br/> <span className="text-slate-400">Authority.</span>
          </h1>
          <div className="animate-bounce mt-8 flex justify-center text-slate-400">
             <ArrowDown />
          </div>
        </div>

        {/* The Expandable Image Window */}
        <div className="hero-img-mask absolute z-0 w-[400px] h-[250px] md:w-[600px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
          <img src={images.hero} className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Text that appears AFTER expansion */}
        <div className="hero-overlay-text absolute z-20 text-center opacity-0 text-white px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Senior Project Consultant</h2>
          <p className="text-xl font-light tracking-wide max-w-2xl mx-auto">
            Providing strategic direction to Government & Corporate Giants.
          </p>
        </div>
      </section>


      {/* --- 2. THE INTRO (CLEAN TYPOGRAPHY) --- */}
      <section className="py-32 px-6 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl md:text-4xl leading-relaxed font-light text-slate-800">
            For over <span className="font-bold text-blue-900">18 years</span>, I have bridged the gap between <span className="border-b-2 border-blue-900">complex government regulations</span> and <span className="border-b-2 border-blue-900">corporate execution</span>.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8 text-sm tracking-widest uppercase text-slate-500">
             <div>Based in Bhubaneswar & Bengaluru</div>
             <div className="text-right">Senior Investor & Mentor</div>
          </div>
        </div>
      </section>


      {/* --- 3. STACKED CARDS (EXPERIENCE) --- */}
      <section className="bg-slate-100 py-20 pb-40 px-4 md:px-10 relative">
        <div className="mb-20 px-6 max-w-7xl mx-auto">
           <h2 className="text-sm font-bold tracking-widest uppercase text-blue-600 mb-2">My Portfolio</h2>
           <h3 className="text-5xl font-bold text-slate-900">Key Sectors</h3>
        </div>

        {/* CARD 1: GOVT */}
        <div className="stack-card sticky top-24 w-full max-w-5xl mx-auto h-[500px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-200 mb-10">
           <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <span className="text-blue-600 font-bold text-6xl mb-4">01</span>
              <h3 className="text-3xl font-bold mb-4">Government Projects</h3>
              <p className="text-slate-600 text-lg mb-6">Strategic consultancy for national infrastructure.</p>
              <ul className="space-y-2 text-slate-800 font-medium">
                 <li>• NPCIL (Nuclear Power)</li>
                 <li>• BARC (Radiological Labs)</li>
                 <li>• Medical Infrastructure</li>
              </ul>
           </div>
           <div className="md:w-1/2 h-full reveal-img">
              <img src={images.govt} className="w-full h-full object-cover" alt="Govt" />
           </div>
        </div>

        {/* CARD 2: CORPORATE */}
        <div className="stack-card sticky top-32 w-full max-w-5xl mx-auto h-[500px] bg-[#0F172A] text-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-800 mb-10">
           <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <span className="text-yellow-500 font-bold text-6xl mb-4">02</span>
              <h3 className="text-3xl font-bold mb-4">Corporate Industry</h3>
              <p className="text-slate-400 text-lg mb-6">Operations & Management for large-scale manufacturing.</p>
              <ul className="space-y-2 text-slate-300 font-medium">
                 <li>• Textile & Garment Sector</li>
                 <li>• Pulp & Paper Industry</li>
                 <li>• IT & FMCG</li>
              </ul>
           </div>
           <div className="md:w-1/2 h-full reveal-img">
              <img src={images.corp} className="w-full h-full object-cover grayscale" alt="Corp" />
           </div>
        </div>

        {/* CARD 3: SOCIAL */}
        <div className="stack-card sticky top-40 w-full max-w-5xl mx-auto h-[500px] bg-blue-900 text-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-blue-800">
           <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <span className="text-white/30 font-bold text-6xl mb-4">03</span>
              <h3 className="text-3xl font-bold mb-4">Social Impact</h3>
              <p className="text-blue-200 text-lg mb-6">Legal activism and charitable consulting.</p>
              <ul className="space-y-2 text-white font-medium">
                 <li>• Public Interest Litigations (PILs)</li>
                 <li>• Corporate Fraud Investigation</li>
                 <li>• Fundraising for NGOs</li>
              </ul>
           </div>
           <div className="md:w-1/2 h-full reveal-img">
              <img src={images.social} className="w-full h-full object-cover mix-blend-overlay" alt="Social" />
           </div>
        </div>

      </section>


      {/* --- 4. CURRENT ENGAGEMENT (Wide Banner) --- */}
      <section className="py-32 px-6 bg-white">
         <div className="max-w-7xl mx-auto relative overflow-hidden rounded-2xl bg-slate-900 text-white p-12 md:p-24 text-center group cursor-pointer">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:scale-105 transition-transform duration-1000"></div>
            
            <div className="relative z-10">
               <span className="inline-block px-4 py-2 border border-white/30 rounded-full text-xs uppercase tracking-widest mb-8">Currently Active</span>
               <h2 className="text-4xl md:text-6xl font-bold mb-6">Digital Transformation Project</h2>
               <p className="text-xl text-slate-300 mb-8">Implementing large-scale IT solutions for the Govt. High School for Deaf & Dumb, Andhra Pradesh.</p>
               <div className="inline-flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest border-b border-yellow-500 pb-1">
                  Read Case Study <ExternalLink size={16}/>
               </div>
            </div>
         </div>
      </section>


      {/* --- 5. FOOTER (CLEAN & DIRECT) --- */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-24 pb-12 px-6">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
               <h2 className="text-5xl font-bold text-slate-900 mb-8">H.C. Parekh</h2>
               <div className="space-y-4 text-lg text-slate-600">
                  <div className="flex items-center gap-4">
                     <MapPin className="text-blue-600" />
                     <span>A-3, Hi-Tech Plaza, Bhubaneswar</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <Phone className="text-blue-600" />
                     <span>+91 82602 32337 / 63537 78329</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <Mail className="text-blue-600" />
                     <span>hemant.parekh2012@gmail.com</span>
                  </div>
               </div>
            </div>
            <div className="flex flex-col justify-end items-start md:items-end">
               <p className="text-slate-400 text-sm max-w-xs text-right mb-6">
                  Senior Project Consultant specializing in Industrial MOUs, Debt Recovery, and Government Contracts.
               </p>
               <button className="bg-blue-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-all shadow-lg hover:shadow-blue-900/30">
                  Contact Me
               </button>
            </div>
         </div>
         <div className="mt-20 text-center text-slate-400 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} H.C. Parekh. All Rights Reserved.
         </div>
      </footer>

    </div>
  );
};

export default Page5;