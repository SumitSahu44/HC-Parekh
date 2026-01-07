import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { 
  ArrowRight, Phone, Mail, MapPin, Building2, Briefcase, 
  Award, Users, ChevronRight, Gavel, TrendingUp, Menu, X 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- THEME CONFIGURATION (Based on JSON) ---
const theme = {
  colors: {
    primary: "#0A4DA2",      // Royal Corporate Blue
    secondary: "#1E88E5",    // Bright Action Blue
    accent: "#E3F2FD",       // Light Blue Backgrounds
    bg: "#FFFFFF",           // Clean White
    textDark: "#0F172A",     // Deep Navy/Black
    textLight: "#64748B",    // Slate Grey
  },
  images: {
    hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", // Corporate Building
    meeting: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop", // Boardroom
    industrial: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop", // Industrial/Factory
    digital: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" // Tech/Digital
  }
};

const App = () => {
  const container = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- SMOOTH SCROLL SETUP ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }, []);

  // --- GSAP ANIMATIONS ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HERO EXPANSION ANIMATION (Cinematic)
      const tlHero = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true
        }
      });

      tlHero.to(".hero-mask", {
        width: "100%",
        height: "100%",
        borderRadius: "0px",
        ease: "power2.inOut"
      }, "start")
      .to(".hero-content", {
        opacity: 0,
        y: -50,
        scale: 0.9
      }, "start");

      // 2. TEXT REVEAL ANIMATIONS
      gsap.utils.toArray('.reveal-text').forEach(elem => {
        gsap.from(elem, {
          scrollTrigger: { trigger: elem, start: "top 85%" },
          y: 50, opacity: 0, duration: 1, ease: "power3.out"
        });
      });

      // 3. STAGGERED LISTS (Services/Industries)
      gsap.utils.toArray('.stagger-container').forEach(container => {
        gsap.from(container.children, {
          scrollTrigger: { trigger: container, start: "top 80%" },
          y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out"
        });
      });

      // 4. PARALLAX IMAGE EFFECT
      gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.to(img, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className={`bg-[${theme.colors.bg}] text-[${theme.colors.textDark}] font-sans overflow-x-hidden selection:bg-[${theme.colors.primary}] selection:text-white`}>
      
      {/* ======================= 
          NAVIGATION (Smart)
      ======================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <div className="flex flex-col">
          <h1 className={`text-2xl font-bold uppercase tracking-tight text-[${theme.colors.primary}]`}>H.C. Parekh</h1>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Senior Project Consultant</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-medium hover:text-[${theme.colors.secondary}] transition-colors">Overview</a>
          <a href="#expertise" className="text-sm font-medium hover:text-[${theme.colors.secondary}] transition-colors">Expertise</a>
          <a href="#experience" className="text-sm font-medium hover:text-[${theme.colors.secondary}] transition-colors">Experience</a>
          <a href="#contact" className={`px-6 py-2.5 bg-[${theme.colors.primary}] text-white text-sm font-bold uppercase tracking-wide rounded hover:bg-[${theme.colors.secondary}] transition-all shadow-lg`}>
            Contact Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col gap-6 md:hidden">
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Overview</a>
          <a href="#expertise" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Expertise</a>
          <a href="#experience" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Experience</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className={`text-2xl font-bold text-[${theme.colors.primary}]`}>Contact Me</a>
        </div>
      )}

      {/* ======================= 
          HERO SECTION (Expanding)
      ======================= */}
      <section className="hero-section relative w-full h-screen flex justify-center items-center overflow-hidden bg-gray-50">
        
        {/* The expanding mask container */}
        <div className="hero-mask absolute w-[90%] md:w-[60%] h-[50%] md:h-[60%] rounded-2xl overflow-hidden shadow-2xl z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A4DA2]/80 to-[#0A4DA2]/40 z-10"></div>
          <img src={theme.images.hero} alt="Corporate" className="w-full h-full object-cover" />
          
          {/* Overlay Text (Hidden initially, reveals on scroll if needed, but here kept expanding) */}
          <div className="absolute bottom-10 left-10 z-20 text-white opacity-0 md:opacity-100">
             <p className="uppercase tracking-widest text-sm font-bold mb-2">Since 2007</p>
             <h2 className="text-3xl font-bold">Industrial Excellence.</h2>
          </div>
        </div>

        {/* The Content that fades out */}
        <div className="hero-content text-center z-20 px-4 relative mt-[-50px]">
          <span className={`inline-block py-1 px-4 rounded-full bg-[${theme.colors.accent}] text-[${theme.colors.primary}] font-bold text-xs uppercase tracking-widest mb-6`}>
            18+ Years of Experience
          </span>
          <h1 className={`text-5xl md:text-7xl font-bold leading-tight mb-6 text-[${theme.colors.textDark}]`}>
            Strategic <br/>
            <span className={`text-[${theme.colors.secondary}]`}>Project Consulting.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
            Driving Industrial & Corporate Projects with Excellence. Serving Government, Corporate & Manufacturing Sectors.
          </p>
          <div className="animate-bounce text-gray-400">
            <p className="text-xs uppercase tracking-widest">Scroll to Explore</p>
          </div>
        </div>
      </section>

      {/* ======================= 
          ABOUT & STATS
      ======================= */}
      <section id="about" className="py-24 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal-text">
            <h2 className={`text-sm font-bold uppercase tracking-widest text-[${theme.colors.secondary}] mb-4`}>Professional Overview</h2>
            <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Bridging the gap between <span className="underline decoration-blue-200 underline-offset-4">Strategy</span> and <span className="underline decoration-blue-200 underline-offset-4">Execution</span>.
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              H.C. Parekh is a seasoned Project Consultant with over 18 years of experience. Whether it's Government of India projects (NPCIL) or large-scale Corporate Manufacturing, I ensure seamless implementation and dispute resolution.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className={`text-4xl font-bold text-[${theme.colors.primary}]`}>18+</p>
                <p className="text-sm text-gray-500 uppercase font-semibold">Years Active</p>
              </div>
              <div>
                <p className={`text-4xl font-bold text-[${theme.colors.primary}]`}>Govt</p>
                <p className="text-sm text-gray-500 uppercase font-semibold">Trusted Partner</p>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl reveal-text">
            <div className="parallax-img w-full h-[120%] bg-cover bg-center" style={{backgroundImage: `url(${theme.images.meeting})`}}></div>
          </div>
        </div>
      </section>

      {/* ======================= 
          INDUSTRIES (Icon Grid)
      ======================= */}
      <section className={`py-24 px-6 md:px-20 bg-[${theme.colors.accent}]/30`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-text">
            <h2 className={`text-3xl md:text-4xl font-bold text-[${theme.colors.textDark}] mb-4`}>Industries Served</h2>
            <p className="text-gray-600">Diverse experience across critical sectors involving high-stakes project management.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-container">
            {[
              { icon: <Building2 className="text-white" size={24}/>, title: "NPCIL (Nuclear Power)", desc: "Government of India" },
              { icon: <Briefcase className="text-white" size={24}/>, title: "BARC Laboratories", desc: "Environment & Radiological" },
              { icon: <TrendingUp className="text-white" size={24}/>, title: "Medical & Healthcare", desc: "Govt Infrastructure" },
              { icon: <Users className="text-white" size={24}/>, title: "Textile & Garment", desc: "Manufacturing" },
              { icon: <Award className="text-white" size={24}/>, title: "Pulp, Paper & Plastic", desc: "Industrial Production" },
              { icon: <Gavel className="text-white" size={24}/>, title: "IT & FMCG", desc: "Corporate Sector" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-transparent hover:border-[${theme.colors.primary}] group">
                <div className={`w-12 h-12 rounded-full bg-[${theme.colors.primary}] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= 
          EXPERTISE (Staggered Text)
      ======================= */}
      <section id="expertise" className="py-24 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="reveal-text">
             <h2 className={`text-sm font-bold uppercase tracking-widest text-[${theme.colors.secondary}] mb-4`}>Core Expertise</h2>
             <h3 className="text-4xl font-bold mb-8">Comprehensive Corporate Solutions.</h3>
             <div className="h-1 w-20 bg-[${theme.colors.primary}] mb-8"></div>
             <p className="text-gray-600 text-lg">
                My consultancy goes beyond advice. I handle the heavy lifting—from legal arbitration and debt recovery to procurement and vendor management.
             </p>
          </div>

          <div className="grid grid-cols-1 gap-4 stagger-container">
            {[
              "Industrial MOUs & Joint Ventures",
              "Corporate Investors & Investments",
              "Tenders & Government Contracts",
              "Govt Arbitration & Conciliation",
              "Debt Recovery & Settlements",
              "Labour Dispute Resolution",
              "End-to-End Project Implementation"
            ].map((service, idx) => (
              <div key={idx} className="flex items-center p-4 bg-gray-50 rounded border border-gray-100 hover:bg-blue-50 transition-colors">
                <ChevronRight className={`text-[${theme.colors.secondary}] mr-4`} size={20} />
                <span className="font-semibold text-lg">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= 
          CURRENT ENGAGEMENT
      ======================= */}
      <section className={`py-20 px-6 bg-[${theme.colors.primary}] text-white relative overflow-hidden`}>
        {/* Abstract Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px"}}></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 reveal-text">
          <p className="text-[${theme.colors.accent}] uppercase tracking-widest font-bold mb-4">Present Engagement</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Large IT & Digitalization Project</h2>
          <div className="inline-block bg-white/10 backdrop-blur-md px-8 py-6 rounded-lg border border-white/20">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <p className="text-xs uppercase text-blue-200 mb-1">Client</p>
                  <p className="text-xl font-bold">Govt High School for Deaf & Dumb</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-blue-200 mb-1">Location</p>
                  <p className="text-xl font-bold">Andhra Pradesh</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ======================= 
          SOCIAL WORK
      ======================= */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto text-center reveal-text border-2 border-dashed border-gray-200 p-10 rounded-2xl">
           <Gavel className={`mx-auto text-[${theme.colors.secondary}] mb-6`} size={40} />
           <h2 className="text-3xl font-bold mb-4">Social Responsibility & Justice</h2>
           <p className="text-gray-600 text-lg mb-6">
             Beyond corporate boardrooms, I am dedicated to social justice. 
             Active in filing <strong>Public Interest Litigations (PILs)</strong> against corporate fraud and serving as a 
             <strong> Fundraising Consultant</strong> for charitable organizations.
           </p>
        </div>
      </section>

      {/* ======================= 
          CONTACT FOOTER
      ======================= */}
      <footer id="contact" className={`pt-24 pb-12 px-6 md:px-20 bg-[#0F172A] text-white`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
             <h2 className="text-5xl font-bold mb-8">Let's Discuss Your Project.</h2>
             <p className="text-gray-400 text-lg max-w-md">
               Available for freelance consultation in Industrial Strategy, Government Contracts, and Corporate Dispute Resolution.
             </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className={`text-[${theme.colors.secondary}] shrink-0`} />
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Office</p>
                <p className="text-xl font-medium">A-3, Hi-Tech Plaza, Sundarpada, Bhubaneswar</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className={`text-[${theme.colors.secondary}] shrink-0`} />
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Direct Line</p>
                <div className="flex flex-col gap-1">
                  <a href="tel:8260232337" className="text-2xl font-bold hover:text-white transition-colors">+91 82602 32337</a>
                  <a href="tel:6353778329" className="text-2xl font-bold hover:text-white transition-colors">+91 63537 78329</a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className={`text-[${theme.colors.secondary}] shrink-0`} />
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Email</p>
                <a href="mailto:hemant.parekh2012@gmail.com" className="text-xl hover:text-white transition-colors">
                  hemant.parekh2012@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
           <p>© {new Date().getFullYear()} H.C. Parekh. Senior Project Consultant. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default App;