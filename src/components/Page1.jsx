import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ArrowDownRight, MapPin, Mail, Phone, Briefcase, Building2, Gavel, HandHeart, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- PROFESSIONAL BLUE & WHITE THEME ---
const colors = {
  bg: "#FFFFFF",           // Pure White
  textPrimary: "#0F172A",  // Deep Navy (Slate 900) for strong headings
  textSecondary: "#475569",// Slate Grey for paragraphs
  accent: "#2563EB",       // Royal Blue for highlights/buttons
  lightBlue: "#F0F9FF",    // Very light blue for section backgrounds
  darkBg: "#1E3A8A",       // Dark Blue for Footer/Contrast sections
};

// --- IMAGE ASSETS (Corporate & Industrial) ---
const images = {
  hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", // Modern Architecture
  about: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop", // Professional Meeting
  engagement: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop", // Digital/Tech Project
  social: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop", // Justice/Legal/Social
};

const Page1 = () => {
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // --- SMOOTH SCROLL (Lenis) ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ({ scroll }) => {
      setIsScrolled(scroll > 50);
    });

    return () => lenis.destroy();
  }, []);

  // --- GSAP ANIMATIONS ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Hero Animations
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from(".hero-line", { scaleX: 0, transformOrigin: "left", duration: 0.8, ease: "expo.out" })
        .from(".hero-text-reveal", { y: 100, opacity: 0, duration: 1, stagger: 0.15, ease: "power4.out" }, "-=0.4");

      // 2. Parallax Effects
      gsap.to(".hero-img", {
        yPercent: 20, ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
      });

      // 3. Section Titles Reveal
      gsap.utils.toArray('.section-reveal').forEach(elem => {
        gsap.from(elem, {
          scrollTrigger: { trigger: elem, start: "top 85%" },
          y: 40, opacity: 0, duration: 0.8, ease: "power3.out"
        });
      });

      // 4. Staggered Lists
      gsap.utils.toArray('.stagger-list').forEach(list => {
        gsap.from(list.children, {
          scrollTrigger: { trigger: list, start: "top 80%" },
          y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power2.out"
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`bg-[${colors.bg}] text-[${colors.textPrimary}] min-h-screen font-sans selection:bg-[${colors.accent}] selection:text-white overflow-hidden`}>
      
      {/* =========================================
          NAVBAR SECTION
      ========================================= */}
      <nav className={`fixed top-0 left-0 w-full px-6 md:px-12 py-4 flex justify-between items-center z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent'}`}>
        <div className="flex items-center gap-4">
          <div className={`text-2xl font-bold tracking-tighter uppercase ${isScrolled ? `text-[${colors.textPrimary}]` : `text-[${colors.textPrimary}]`}`}>
            H.C. Parekh
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className={`text-sm font-medium tracking-wide hidden md:block ${isScrolled ? `text-[${colors.textSecondary}]` : `text-[${colors.textPrimary}]`}`}>SINCE 2007</div>
          <a href="#contact" className={`px-6 py-2 text-sm font-semibold tracking-wider border-2 transition-all ${isScrolled ? `border-[${colors.accent}] text-[${colors.accent}] hover:bg-[${colors.accent}] hover:text-white` : `border-[${colors.textPrimary}] text-[${colors.textPrimary}] hover:bg-[${colors.textPrimary}] hover:text-white`}`}>
            CONTACT
          </a>
        </div>
      </nav>

      {/* =========================================
          HERO SECTION
      ========================================= */}
      <section className="hero-section min-h-screen w-full flex items-center relative pt-20 overflow-hidden">
        {/* Abstract Background Shape */}
        <div className={`absolute top-0 right-0 w-[60%] h-full bg-[${colors.lightBlue}] -skew-x-12 translate-x-20 z-0`}></div>

        <div className="container mx-auto px-6 md:px-20 z-20 relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="mt-10 md:mt-0">
            <div className={`hero-line w-24 h-[4px] bg-[${colors.accent}] mb-8`}></div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8 text-[#0F172A]">
              <div className="overflow-hidden"><span className="hero-text-reveal block">Senior</span></div>
              <div className="overflow-hidden"><span className="hero-text-reveal block">Project</span></div>
              <div className="overflow-hidden"><span className="hero-text-reveal block text-[#2563EB]">Consultant.</span></div>
            </h1>
            <div className="hero-text-reveal space-y-2 text-xl text-[${colors.textSecondary}] font-normal">
              <p>Industrial & Corporate Strategy</p>
              <p>Senior Investor & Mentor</p>
            </div>
            
            <div className="hero-text-reveal mt-12 flex items-center gap-4">
               <div className="px-6 py-3 bg-[#0F172A] text-white text-sm tracking-widest uppercase font-semibold">
                  18+ Years Experience
               </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[500px] md:h-[700px] w-full overflow-hidden rounded-lg shadow-2xl">
            <div className="hero-img w-full h-[120%] bg-cover bg-center" style={{ backgroundImage: `url(${images.hero})` }}></div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-6 md:left-20 flex items-center gap-2 animate-bounce z-20 text-[${colors.textSecondary}]">
          <span className="text-xs uppercase tracking-widest">Scroll Down</span>
          <ArrowDownRight size={16} />
        </div>
      </section>

      {/* =========================================
          ABOUT / PROFILE OVERVIEW SECTION
      ========================================= */}
      <section className="py-24 px-6 md:px-20 bg-white relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Stats & Image */}
            <div className="md:col-span-5 section-reveal">
               <div className="relative h-[400px] overflow-hidden rounded-lg shadow-lg mb-8">
                  <div className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${images.about})` }}></div>
               </div>
               <div className="flex justify-between items-center border-t border-gray-200 pt-6">
                  <div>
                    <span className="block text-4xl font-bold text-[#2563EB]">2007</span>
                    <span className="text-sm text-gray-500 uppercase tracking-wider">Established</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-4xl font-bold text-[#0F172A]">Govt</span>
                    <span className="text-sm text-gray-500 uppercase tracking-wider">Major Clients</span>
                  </div>
               </div>
            </div>

            {/* Right Column: Description */}
            <div className="md:col-span-7">
               <div className="section-reveal mb-10">
                  <h2 className="text-[#2563EB] font-bold tracking-widest uppercase text-sm mb-4">Professional Overview</h2>
                  <h3 className="text-3xl md:text-4xl font-light leading-snug text-[#0F172A]">
                    Delivering strategic excellence in <span className="font-semibold underline decoration-[#2563EB] decoration-4 underline-offset-4">Industrial, Corporate & Government</span> sectors.
                  </h3>
               </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-list">
                {/* Industry Cards */}
                <div className="p-6 bg-[#F8FAFC] rounded-lg border-l-4 border-[#2563EB]">
                  <Building2 className="mb-4 text-[#2563EB]" />
                  <h4 className="font-bold text-lg mb-2">Government Projects</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Nuclear Power Corp (NPCIL)</li>
                    <li>• Environment Labs (BARC)</li>
                    <li>• Medical & Healthcare Projects</li>
                  </ul>
                </div>

                <div className="p-6 bg-[#F8FAFC] rounded-lg border-l-4 border-[#0F172A]">
                  <Briefcase className="mb-4 text-[#0F172A]" />
                  <h4 className="font-bold text-lg mb-2">Corporate Industries</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Textile & Garment</li>
                    <li>• Pulp, Paper & Plastic Mfg.</li>
                    <li>• IT & FMCG Sectors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          CORE EXPERTISE SECTION
      ========================================= */}
      <section className="py-24 bg-[#F1F5F9] px-6 md:px-20">
        <div className="container mx-auto">
          <div className="section-reveal text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-[#2563EB] font-bold tracking-widest uppercase text-sm mb-4">Capabilities</h2>
             <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A]">Corporate & Industrial Expertise</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-list">
            {[
              "Industrial MOUs & Joint Ventures",
              "Corporate Investors & Investments",
              "Tenders & Contracts Management",
              "Dealers, Distributors & Franchise",
              "Indenting & Central Procurement",
              "Company Debt Recovery & Settlement",
              "Labour Dispute Settlement",
              "Govt. Arbitration & Conciliation",
              "Consumer Grievance Resolution",
              "End-to-End Project Implementation",
              "Vendor Management",
              "Material Management"
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start gap-4 border border-gray-100">
                 <span className="text-[#2563EB] font-bold text-xl">0{index + 1}</span>
                 <h3 className="text-lg font-medium text-gray-800">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          CURRENT ENGAGEMENT SECTION
      ========================================= */}
      <section className="py-24 px-6 md:px-20 bg-[#1E3A8A] text-white relative overflow-hidden">
        {/* Background Overlay Image */}
        <div className="absolute inset-0 z-0 opacity-20 bg-fixed" style={{ backgroundImage: `url(${images.engagement})`, backgroundSize: 'cover' }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] to-[#1E3A8A]/80 z-0"></div>

        <div className="container mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <div className="section-reveal">
              <span className="inline-block py-1 px-4 border border-blue-300 text-blue-200 text-xs uppercase tracking-widest mb-6 rounded-full">Current Engagement</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Large IT & Digitalization Project</h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-8">
                Overseeing a major digital transformation initiative for the education sector in Andhra Pradesh.
              </p>
           </div>
           
           <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 section-reveal">
              <div className="space-y-6">
                <div>
                   <p className="text-xs uppercase tracking-widest text-blue-300 mb-1">Client</p>
                   <p className="text-2xl font-semibold">Government High School for Deaf and Dumb</p>
                </div>
                <div className="w-full h-[1px] bg-white/20"></div>
                <div>
                   <p className="text-xs uppercase tracking-widest text-blue-300 mb-1">Location</p>
                   <p className="text-2xl font-semibold">Andhra Pradesh</p>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* =========================================
          PROFESSIONAL HISTORY SECTION
      ========================================= */}
      <section className="py-24 px-6 md:px-20 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="section-reveal mb-16 text-center">
             <h2 className="text-[#2563EB] font-bold tracking-widest uppercase text-sm mb-4">The Track Record</h2>
             <h2 className="text-4xl font-bold text-[#0F172A]">Professional History</h2>
          </div>
          
          <div className="space-y-12 stagger-list relative before:absolute before:left-0 md:before:left-1/2 before:top-0 before:h-full before:w-[2px] before:bg-gray-200">
            
            {/* Role 1 */}
            <div className="relative pl-8 md:pl-0 md:flex md:justify-between items-center group">
               <div className="hidden md:block w-[45%] text-right pr-8">
                  <h3 className="text-xl font-bold text-[#0F172A]">Chief Business Officer (CBO)</h3>
                  <p className="text-gray-500">IT Company, Pune</p>
               </div>
               <div className="absolute left-[-5px] md:left-1/2 md:-ml-[9px] w-5 h-5 bg-[#2563EB] rounded-full border-4 border-white shadow-sm z-10"></div>
               <div className="md:w-[45%] pl-8 md:pl-8">
                  <h3 className="md:hidden text-xl font-bold text-[#0F172A]">Chief Business Officer (CBO)</h3>
                  <p className="md:hidden text-gray-500 mb-2">IT Company, Pune</p>
                  <p className="text-sm text-gray-600">Strategic Leadership & Business Operations.</p>
               </div>
            </div>

            {/* Role 2 */}
            <div className="relative pl-8 md:pl-0 md:flex md:justify-between items-center group">
               <div className="hidden md:block w-[45%] text-right pr-8">
                  <p className="text-sm text-gray-600">Business Management & Industrial Ops.</p>
               </div>
               <div className="absolute left-[-5px] md:left-1/2 md:-ml-[9px] w-5 h-5 bg-[#0F172A] rounded-full border-4 border-white shadow-sm z-10"></div>
               <div className="md:w-[45%] pl-8 md:pl-8">
                  <h3 className="text-xl font-bold text-[#0F172A]">General Manager (Business)</h3>
                  <p className="text-gray-500">Plastic Manufacturing Industry, Odisha</p>
               </div>
            </div>

             {/* Role 3 */}
             <div className="relative pl-8 md:pl-0 md:flex md:justify-between items-center group">
               <div className="hidden md:block w-[45%] text-right pr-8">
                  <h3 className="text-xl font-bold text-[#0F172A]">Project Consultant</h3>
                  <p className="text-gray-500">Nuclear Power Corporation of India Ltd. (NPCIL)</p>
               </div>
               <div className="absolute left-[-5px] md:left-1/2 md:-ml-[9px] w-5 h-5 bg-gray-400 rounded-full border-4 border-white shadow-sm z-10"></div>
               <div className="md:w-[45%] pl-8 md:pl-8">
                  <h3 className="md:hidden text-xl font-bold text-[#0F172A]">Project Consultant</h3>
                  <p className="md:hidden text-gray-500 mb-2">NPCIL (Govt of India)</p>
                  <p className="text-sm text-gray-600">Government of India Project Execution.</p>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          SOCIAL WORK & PUBLIC ENGAGEMENT
      ========================================= */}
      <section className="py-20 px-6 md:px-20 bg-[#F8FAFC] border-y border-gray-200">
         <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className="section-reveal">
                  <div className="w-12 h-12 bg-[#2563EB] text-white flex items-center justify-center rounded-lg mb-6">
                     <HandHeart size={28} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Social Work & Public Engagement</h2>
                  <p className="text-lg text-gray-600 mb-6">
                     Beyond corporate consulting, deeply committed to social justice and community welfare through strategic intervention.
                  </p>
                  <ul className="space-y-4">
                     <li className="flex items-start gap-3">
                        <Gavel className="text-[#2563EB] mt-1 shrink-0" size={20} />
                        <span className="text-gray-700"><strong>Public Interest Litigations (PILs)</strong> against Corporate Fraud & Money Laundering.</span>
                     </li>
                     <li className="flex items-start gap-3">
                        <Building2 className="text-[#2563EB] mt-1 shrink-0" size={20} />
                        <span className="text-gray-700"><strong>Fundraising Consultant</strong> to Charitable Organizations.</span>
                     </li>
                  </ul>
               </div>
               <div className="h-[300px] rounded-lg overflow-hidden shadow-lg section-reveal">
                  <img src={images.social} alt="Social Work" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
               </div>
            </div>
         </div>
      </section>

      {/* =========================================
          CONTACT / FOOTER SECTION
      ========================================= */}
      <footer id="contact" className="py-24 px-6 md:px-20 bg-[#0F172A] text-white relative overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Let's connect.</h2>
            <div className={`w-24 h-[4px] bg-[#2563EB] mb-8`}></div>
            <p className="text-xl text-blue-200 font-light max-w-md">
               Available for Industrial Project Consulting and Senior Advisory Roles.
            </p>
          </div>
          
          <div className="space-y-12 section-reveal bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-sm">
            {/* Address */}
            <div className="flex items-start gap-6">
              <MapPin className="mt-1 text-[#2563EB]" size={28} />
              <div>
                <p className="text-xs uppercase tracking-widest text-blue-300 mb-2">Base Locations</p>
                <p className="font-semibold text-xl">Bhubaneswar / Bengaluru</p>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                  A-3, Hi-Tech Plaza, Sundarpada,<br/>
                  Bhubaneswar – 751002, Odisha
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-6">
              <Phone className="mt-1 text-[#2563EB]" size={28} />
              <div>
                <p className="text-xs uppercase tracking-widest text-blue-300 mb-2">Call Directly</p>
                 <div className="flex flex-col gap-2">
                    <a href="tel:8260232337" className="text-xl hover:text-[#2563EB] transition-colors font-medium">+91 82602 32337</a>
                    <a href="tel:6353778329" className="text-xl hover:text-[#2563EB] transition-colors font-medium">+91 63537 78329</a>
                 </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-6">
              <Mail className="mt-1 text-[#2563EB]" size={28} />
              <div>
                <p className="text-xs uppercase tracking-widest text-blue-300 mb-2">Email</p>
                <a href="mailto:hemant.parekh2012@gmail.com" className="text-xl hover:text-[#2563EB] transition-colors break-all">
                  hemant.parekh2012@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} H.C. Parekh. Senior Project Consultant & Investor. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Page1;