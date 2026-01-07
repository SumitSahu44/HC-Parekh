import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Phone, Mail, MapPin, Briefcase, Building2, UserCheck, ArrowRight, Gavel, HandHeart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- EXECUTIVE COLOR PALETTE (TRUST & MATURITY) ---
const colors = {
  bg: "#FFFFFF",           // Clean White for best readability
  textDark: "#1E293B",     // Dark Slate (Not pure black, easier on eyes)
  textLight: "#475569",    // Grey for secondary text
  primary: "#0F3556",      // Deep Royal Navy (Traditional Corporate)
  gold: "#C5A059",         // Muted Gold (Shows Premium/Seniority)
  lightSection: "#F1F5F9", // Very light grey for section separation
};

// --- IMAGES (MATURE & PROFESSIONAL) ---
const images = {
  hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", // Stability/Building
  about: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop", // Meeting/Consulting
  engagement: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop", // Strategy/Planning
};

const Page3 = () => {
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // --- SMOOTH SCROLL ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease Out Quart
      smooth: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', ({ scroll }) => setIsScrolled(scroll > 50));
    return () => lenis.destroy();
  }, []);

  // --- ELEGANT ANIMATIONS ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Hero Fade In (Slow & Smooth)
      gsap.from(".hero-content > *", {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.2
      });

      // Section Titles (Slide Up)
      gsap.utils.toArray('.section-header').forEach(elem => {
        gsap.from(elem, {
          scrollTrigger: { trigger: elem, start: "top 85%" },
          y: 30, opacity: 0, duration: 1, ease: "power2.out"
        });
      });

      // Cards (Fade In)
      gsap.utils.toArray('.fade-in-up').forEach(elem => {
        gsap.from(elem, {
          scrollTrigger: { trigger: elem, start: "top 90%" },
          y: 40, opacity: 0, duration: 1, ease: "power2.out"
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`bg-[${colors.bg}] text-[${colors.textDark}] font-sans min-h-screen selection:bg-[${colors.primary}] selection:text-white`}>
      
      {/* =========================================
          NAVBAR (STICKY & CLEAR)
      ========================================= */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 py-5'}`}>
        <div className="container mx-auto px-6 md:px-16 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className={`text-2xl font-bold uppercase tracking-tight text-[${colors.primary}]`}>H.C. Parekh</h1>
            <span className="text-xs tracking-widest text-gray-500 font-medium">SINCE 2007</span>
          </div>
          
          <div className="flex items-center gap-6">
             {/* Hidden on mobile, shown on desktop */}
             <div className="hidden md:flex flex-col items-end text-sm text-gray-600">
                <span>Contact Direct:</span>
                <span className={`font-bold text-[${colors.primary}]`}>+91 82602 32337</span>
             </div>
             <a href="#contact" className={`bg-[${colors.primary}] text-white px-6 py-2.5 rounded-sm font-medium uppercase tracking-wide text-sm hover:bg-[${colors.gold}] transition-colors duration-300 shadow-lg`}>
                Contact Now
             </a>
          </div>
        </div>
      </nav>

      {/* =========================================
          HERO SECTION (AUTHORITY)
      ========================================= */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-16 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
         <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="hero-content relative z-10">
               <div className={`inline-block px-4 py-1.5 bg-[${colors.primary}] text-white text-xs font-bold uppercase tracking-widest mb-6 rounded-full`}>
                  18+ Years Experience
               </div>
               <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-[${colors.primary}]`}>
                  Senior Project <br/>
                  <span className={`text-[${colors.gold}] font-serif italic`}>Consultant</span> & <br/>
                  Investor.
               </h1>
               <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed mb-8">
                  Providing strategic leadership to <strong>Government (NPCIL), Corporate & Industrial</strong> sectors since 2007. Specializing in high-value project execution and dispute resolution.
               </p>
               <div className="flex flex-wrap gap-4">
                  <a href="#expertise" className={`border-2 border-[${colors.primary}] text-[${colors.primary}] px-8 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-[${colors.primary}] hover:text-white transition-all`}>
                     View Expertise
                  </a>
               </div>
            </div>

            {/* Image (Clean & Professional) */}
            <div className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden shadow-2xl hero-content">
               <img src={images.hero} alt="Corporate Building" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]" />
               <div className={`absolute bottom-0 left-0 w-full bg-[${colors.primary}]/90 p-6 text-white backdrop-blur-sm`}>
                  <p className="text-sm font-light uppercase tracking-wider mb-1">Trusted By</p>
                  <p className="text-xl font-bold">Government of India & Top Corporates</p>
               </div>
            </div>
         </div>
      </section>

      {/* =========================================
          TRUST STRIP (CLIENTS)
      ========================================= */}
      <div className={`bg-[${colors.primary}] py-10 px-6`}>
         <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center gap-8 text-white/80">
            <span className="text-lg md:text-2xl font-bold uppercase">NPCIL</span>
            <span className="hidden md:block w-2 h-2 rounded-full bg-white/30"></span>
            <span className="text-lg md:text-2xl font-bold uppercase">BARC Labs</span>
            <span className="hidden md:block w-2 h-2 rounded-full bg-white/30"></span>
            <span className="text-lg md:text-2xl font-bold uppercase">Healthcare Projects</span>
            <span className="hidden md:block w-2 h-2 rounded-full bg-white/30"></span>
            <span className="text-lg md:text-2xl font-bold uppercase">Manufacturing</span>
         </div>
      </div>

      {/* =========================================
          PROFILE & INDUSTRIES
      ========================================= */}
      <section className="py-24 px-6 md:px-16 bg-white">
         <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
               
               {/* Left: Heading */}
               <div className="section-header">
                  <h2 className={`text-[${colors.gold}] font-bold uppercase tracking-widest text-sm mb-3`}>Professional Profile</h2>
                  <h3 className={`text-4xl md:text-5xl font-bold text-[${colors.primary}] leading-tight mb-6`}>
                     End-to-End <br/>Industrial Strategy.
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                     Operating from Bhubaneswar and Bengaluru, I serve as a strategic partner to industries ranging from Textiles to Nuclear Power. My role bridges the gap between <strong>Government regulations</strong> and <strong>Corporate execution</strong>.
                  </p>
               </div>

               {/* Right: List */}
               <div className="fade-in-up space-y-6">
                  <div className={`p-6 bg-[${colors.lightSection}] border-l-4 border-[${colors.primary}] rounded-r-lg`}>
                     <h4 className={`text-xl font-bold text-[${colors.primary}] mb-3 flex items-center gap-3`}>
                        <Building2 size={24}/> Government Projects
                     </h4>
                     <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
                        <li>Nuclear Power Corporation of India Ltd. (NPCIL)</li>
                        <li>Environment & Radiological Labs (BARC)</li>
                        <li>Government Medical & Healthcare Infrastructure</li>
                     </ul>
                  </div>

                  <div className={`p-6 bg-[${colors.lightSection}] border-l-4 border-[${colors.gold}] rounded-r-lg`}>
                     <h4 className={`text-xl font-bold text-[${colors.primary}] mb-3 flex items-center gap-3`}>
                        <Briefcase size={24}/> Corporate Sectors
                     </h4>
                     <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
                        <li>Textile, Pulp & Paper, Plastic Manufacturing</li>
                        <li>Information Technology (IT) & FMCG</li>
                        <li>Large Scale Digitalization Projects</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* =========================================
          EXPERTISE GRID (CLEAR CARDS)
      ========================================= */}
      <section id="expertise" className={`py-24 px-6 md:px-16 bg-[${colors.lightSection}]`}>
         <div className="container mx-auto">
            <div className="section-header text-center mb-16 max-w-3xl mx-auto">
               <h2 className={`text-[${colors.primary}] text-4xl font-bold mb-4`}>Core Competencies</h2>
               <p className="text-gray-600">Comprehensive solutions for industrial setup, management, and legal resolution.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                  "Industrial MOUs & Joint Ventures",
                  "Corporate Investors & Investments",
                  "Tenders & Contracts Management",
                  "Government Arbitration & Conciliation",
                  "Company Debt Recovery & Settlement",
                  "Labour Dispute Settlement",
                  "Dealers & Franchise Management",
                  "Indenting & Procurement",
                  "End-to-End Project Implementation"
               ].map((item, idx) => (
                  <div key={idx} className="fade-in-up bg-white p-8 shadow-sm rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-transparent hover:border-[${colors.primary}]">
                     <div className={`text-[${colors.gold}] text-sm font-bold mb-3`}>0{idx+1}</div>
                     <h3 className={`text-xl font-bold text-[${colors.primary}]`}>{item}</h3>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* =========================================
          CURRENT ENGAGEMENT (DISTINCT)
      ========================================= */}
      <section className={`py-20 px-6 md:px-16 bg-[${colors.primary}] text-white relative`}>
         <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="section-header">
               <span className={`inline-block py-1 px-3 bg-[${colors.gold}] text-[${colors.primary}] text-xs font-bold uppercase tracking-widest mb-6 rounded-sm`}>
                  Currently Active
               </span>
               <h2 className="text-3xl md:text-5xl font-bold mb-6">Large IT & Digitalization Project</h2>
               <div className="space-y-4 text-blue-100 text-lg">
                  <div className="flex items-center gap-4">
                     <span className="w-12 h-[1px] bg-white/50"></span>
                     <p><strong>Client:</strong> Govt. High School for Deaf and Dumb</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="w-12 h-[1px] bg-white/50"></span>
                     <p><strong>Location:</strong> Andhra Pradesh</p>
                  </div>
               </div>
            </div>
            <div className="fade-in-up">
               <div className="bg-white/10 p-8 rounded-lg border border-white/20 backdrop-blur-sm">
                  <p className="italic text-lg text-white/90 leading-relaxed">
                     "Executing a state-level digital transformation to empower education for specially-abled students."
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* =========================================
          SOCIAL IMPACT (SIMPLE & CLEAN)
      ========================================= */}
      <section className="py-20 px-6 md:px-16 bg-white border-b border-gray-200">
         <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 section-header bg-blue-50 p-8 rounded-xl">
               <div className={`p-4 bg-[${colors.primary}] text-white rounded-full shrink-0`}>
                  <HandHeart size={32} />
               </div>
               <div>
                  <h3 className={`text-2xl font-bold text-[${colors.primary}] mb-2`}>Social Responsibility & Legal Activism</h3>
                  <p className="text-gray-700 text-lg">
                     Actively involved in <strong>Public Interest Litigations (PILs)</strong> against corporate fraud and serving as a <strong>Fundraising Consultant</strong> for charitable organizations.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* =========================================
          FOOTER / CONTACT (BIG & CLEAR)
      ========================================= */}
      <footer id="contact" className={`py-20 px-6 md:px-16 bg-[${colors.textDark}] text-white`}>
         <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               
               {/* Contact Title */}
               <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-gray-400 text-lg max-w-md mb-8">
                     Available for senior-level consultation on industrial projects and corporate investments.
                  </p>
                  <div className="flex gap-4">
                     <span className={`h-1 w-20 bg-[${colors.gold}] rounded-full`}></span>
                  </div>
               </div>

               {/* Contact Details (Large text for readability) */}
               <div className="space-y-8">
                  
                  {/* Address */}
                  <div className="flex items-start gap-5">
                     <MapPin className={`text-[${colors.gold}] mt-1 shrink-0`} size={28} />
                     <div>
                        <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-1">Office Address</h4>
                        <p className="text-xl font-medium leading-snug">
                           A-3, Hi-Tech Plaza, Sundarpada,<br/>
                           Bhubaneswar – 751002, Odisha
                        </p>
                     </div>
                  </div>

                  {/* Phone (Priority) */}
                  <div className="flex items-start gap-5">
                     <Phone className={`text-[${colors.gold}] mt-1 shrink-0`} size={28} />
                     <div>
                        <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-1">Call Directly</h4>
                        <div className="flex flex-col gap-2">
                           <a href="tel:8260232337" className="text-2xl font-bold hover:text-[${colors.gold}] transition-colors">+91 82602 32337</a>
                           <a href="tel:6353778329" className="text-2xl font-bold hover:text-[${colors.gold}] transition-colors">+91 63537 78329</a>
                        </div>
                     </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-5">
                     <Mail className={`text-[${colors.gold}] mt-1 shrink-0`} size={28} />
                     <div>
                        <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-1">Email</h4>
                        <a href="mailto:hemant.parekh2012@gmail.com" className="text-xl font-medium hover:text-[${colors.gold}] transition-colors">
                           hemant.parekh2012@gmail.com
                        </a>
                     </div>
                  </div>

               </div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
               © {new Date().getFullYear()} H.C. Parekh. Senior Project Consultant. All Rights Reserved.
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Page3;