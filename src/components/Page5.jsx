import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { 
  ArrowDown, Phone, Mail, MapPin, ExternalLink, 
  Briefcase, Scale, Building2, Gavel, FileText, Users 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- ASSETS & THEME ---
const images = {
  hero: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop",
  govt: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1932&auto=format&fit=crop",
  corp: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  social: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
  meeting: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
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
      
      // 1. HERO EXPANSION
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

      // 2. TEXT REVEAL ANIMATION
      gsap.utils.toArray(".reveal-up").forEach(elem => {
        gsap.fromTo(elem, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%"
            }
          }
        );
      });

      // 3. FIXED STACKED CARDS (IMPROVED LOGIC)
      // Instead of pinning individual cards, we use CSS sticky and animate the scale
      const cards = gsap.utils.toArray(".stack-card");
      cards.forEach((card, i) => {
        gsap.to(card, {
          scale: 0.9, // Shrink slightly as it hits the top
          opacity: 1,
          scrollTrigger: {
            trigger: card,
            start: "top top+=100", // When card hits top area
            end: "bottom top", 
            scrub: true,
            // We do NOT pin here, we let CSS sticky handle the position
          }
        });
      });

      // 4. IMAGE REVEAL
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

      {/* --- 1. HERO SECTION --- */}
      <section className="hero-container w-full h-screen flex flex-col justify-center items-center relative overflow-hidden bg-white">
        <div className="hero-text text-center z-10 px-4">
          <p className="text-white font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base">Since 2007</p>
          <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight mb-6">
            Industrial <br/> <span className="text-slate-400">Authority.</span>
          </h1>
          <div className="animate-bounce mt-8 flex justify-center text-slate-400">
             <ArrowDown />
          </div>
        </div>
        <div className="hero-img-mask absolute z-0 w-[400px] h-[250px] md:w-[600px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
          <img src={images.hero} className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="hero-overlay-text absolute z-20 text-center opacity-0 text-white px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Senior Project Consultant</h2>
          <p className="text-xl font-light tracking-wide max-w-2xl mx-auto">
            Providing strategic direction to Government & Corporate Giants.
          </p>
        </div>
      </section>

      {/* --- 2. ABOUT & INTRO --- */}
      <section id="about" className="py-24 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal-up">
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">Professional Overview</h2>
            <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Bridging the gap between <span className="underline decoration-blue-200 underline-offset-4">Strategy</span> and <span className="underline decoration-blue-200 underline-offset-4">Execution</span>.
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              H.C. Parekh is a seasoned Project Consultant with over 18 years of experience. Whether it's Government of India projects (NPCIL) or large-scale Corporate Manufacturing, I ensure seamless implementation and dispute resolution.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-bold text-blue-800">18+</p>
                <p className="text-sm text-gray-500 uppercase font-semibold">Years Active</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-800">Govt</p>
                <p className="text-sm text-gray-500 uppercase font-semibold">Trusted Partner</p>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl reveal-img">
            <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: `url(${images.meeting})`}}></div>
          </div>
        </div>
      </section>

      {/* --- 3. NEW SECTION: CORE COMPETENCIES (Dark Grid) --- */}
      <section className="bg-slate-900 text-white py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 reveal-up">
             <h2 className="text-blue-400 font-bold tracking-widest uppercase mb-2">My Expertise</h2>
             <h3 className="text-4xl md:text-5xl font-bold">Core Competencies</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: <Gavel size={32}/>, title: "Dispute Resolution", desc: "Expert handling of corporate disputes, arbitration, and legal liaising." },
               { icon: <Building2 size={32}/>, title: "Industrial Setup", desc: "End-to-end consultancy for setting up large scale manufacturing units." },
               { icon: <FileText size={32}/>, title: "Govt. Contracts", desc: "Navigating complex tenders and compliance for NPCIL and BARC." },
               { icon: <Users size={32}/>, title: "Union Management", desc: "Strategic negotiation with labor unions to ensure operational peace." },
               { icon: <Briefcase size={32}/>, title: "Debt Recovery", desc: "Specialized strategies for recovering stalled corporate funds." },
               { icon: <Scale size={32}/>, title: "Legal Activism", desc: "Leading PILs for social justice and environmental compliance." },
             ].map((item, i) => (
               <div key={i} className="reveal-up p-8 border border-slate-700 hover:bg-slate-800 transition-colors rounded-xl group">
                  <div className="mb-6 text-blue-400 group-hover:text-white transition-colors">{item.icon}</div>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-slate-400">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- 4. FIXED STACKED CARDS (PORTFOLIO) --- */}
      <section className="bg-slate-100 py-32 px-4 md:px-10 relative">
        <div className="mb-20 px-6 max-w-7xl mx-auto text-center reveal-up">
           <h2 className="text-sm font-bold tracking-widest uppercase text-blue-600 mb-2">My Portfolio</h2>
           <h3 className="text-5xl font-bold text-slate-900">Key Sectors</h3>
        </div>

        {/* The Container for Cards */}
        <div className="flex flex-col gap-10 max-w-5xl mx-auto pb-24">
          
          {/* CARD 1 */}
          <div className="stack-card sticky top-24 w-full h-[550px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-200 z-10">
             <div className="md:w-1/2 p-12 flex flex-col justify-center">
                <span className="text-blue-600 font-bold text-6xl mb-4">01</span>
                <h3 className="text-3xl font-bold mb-4">Government Projects</h3>
                <p className="text-slate-600 text-lg mb-6">Strategic consultancy for national infrastructure and nuclear power sectors.</p>
                <div className="flex gap-2 flex-wrap">
                   <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium">NPCIL</span>
                   <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium">BARC</span>
                   <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium">Infrastructure</span>
                </div>
             </div>
             <div className="md:w-1/2 h-full">
                <img src={images.govt} className="w-full h-full object-cover" alt="Govt" />
             </div>
          </div>

          {/* CARD 2 */}
          <div className="stack-card sticky top-32 w-full h-[550px] bg-[#0F172A] text-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-800 z-20">
             <div className="md:w-1/2 p-12 flex flex-col justify-center">
                <span className="text-yellow-500 font-bold text-6xl mb-4">02</span>
                <h3 className="text-3xl font-bold mb-4">Corporate Industry</h3>
                <p className="text-slate-400 text-lg mb-6">Operations & Management for large-scale manufacturing and textile units.</p>
                <div className="flex gap-2 flex-wrap">
                   <span className="px-3 py-1 bg-slate-800 text-white text-sm rounded-full font-medium">Textile</span>
                   <span className="px-3 py-1 bg-slate-800 text-white text-sm rounded-full font-medium">Paper & Pulp</span>
                   <span className="px-3 py-1 bg-slate-800 text-white text-sm rounded-full font-medium">FMCG</span>
                </div>
             </div>
             <div className="md:w-1/2 h-full">
                <img src={images.corp} className="w-full h-full object-cover grayscale" alt="Corp" />
             </div>
          </div>

          {/* CARD 3 */}
          <div className="stack-card sticky top-40 w-full h-[550px] bg-blue-900 text-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-blue-800 z-30">
             <div className="md:w-1/2 p-12 flex flex-col justify-center">
                <span className="text-white/30 font-bold text-6xl mb-4">03</span>
                <h3 className="text-3xl font-bold mb-4">Social Impact</h3>
                <p className="text-blue-200 text-lg mb-6">Legal activism, corporate fraud investigation, and charitable consulting.</p>
                <div className="flex gap-2 flex-wrap">
                   <span className="px-3 py-1 bg-blue-800 text-white text-sm rounded-full font-medium">PILs</span>
                   <span className="px-3 py-1 bg-blue-800 text-white text-sm rounded-full font-medium">Investigation</span>
                   <span className="px-3 py-1 bg-blue-800 text-white text-sm rounded-full font-medium">NGOs</span>
                </div>
             </div>
             <div className="md:w-1/2 h-full">
                <img src={images.social} className="w-full h-full object-cover mix-blend-overlay" alt="Social" />
             </div>
          </div>

        </div>
      </section>

      {/* --- 5. NEW SECTION: THE PROCESS (Vertical Steps) --- */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 reveal-up">
               <h2 className="text-3xl md:text-5xl font-bold mb-4">How I Deliver Results</h2>
               <p className="text-slate-500">A systematic approach to complex problems.</p>
            </div>

            <div className="relative border-l-2 border-slate-200 ml-6 md:ml-12 space-y-12">
               {/* Step 1 */}
               <div className="relative pl-12 reveal-up">
                  <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white"></span>
                  <h3 className="text-2xl font-bold mb-2">01. Strategic Assessment</h3>
                  <p className="text-slate-600">Deep dive analysis of the project requirements, legal constraints, and financial feasibility. Identifying bottlenecks before they happen.</p>
               </div>
               {/* Step 2 */}
               <div className="relative pl-12 reveal-up">
                  <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white"></span>
                  <h3 className="text-2xl font-bold mb-2">02. Liaison & Approval</h3>
                  <p className="text-slate-600">Navigating government bureaucracy. Securing necessary clearances from environmental, industrial, and local bodies.</p>
               </div>
               {/* Step 3 */}
               <div className="relative pl-12 reveal-up">
                  <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white"></span>
                  <h3 className="text-2xl font-bold mb-2">03. Execution & Monitoring</h3>
                  <p className="text-slate-600">On-ground implementation oversight. Managing contractors, unions, and timelines to ensure project delivery.</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- 6. CURRENT ENGAGEMENT --- */}
      <section className="py-10 px-6 bg-white pb-32">
         <div className="max-w-7xl mx-auto relative overflow-hidden rounded-2xl bg-slate-900 text-white p-12 md:p-24 text-center group cursor-pointer reveal-up">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:scale-105 transition-transform duration-1000"></div>
            
            <div className="relative z-10">
               <span className="inline-block px-4 py-2 border border-white/30 rounded-full text-xs uppercase tracking-widest mb-8">Currently Active</span>
               <h2 className="text-4xl md:text-6xl font-bold mb-6">Digital Transformation</h2>
               <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">Implementing large-scale IT solutions for the Govt. High School for Deaf & Dumb, Andhra Pradesh.</p>
               <div className="inline-flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest border-b border-yellow-500 pb-1">
                  Read Case Study <ExternalLink size={16}/>
               </div>
            </div>
         </div>
      </section>

      {/* --- 7. FOOTER --- */}
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