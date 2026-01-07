import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
// Ensure correct import matches the installed package
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const PortfolioWebsite = () => {
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Mouse attraction and cursor effects
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorFollower = cursorFollowerRef.current;
    
    if (!cursor || !cursorFollower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
      });
    };

    const updatePosition = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      gsap.to(cursorFollower, {
        x: followerX,
        y: followerY,
        duration: 0.3,
      });
      
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', moveCursor);
    updatePosition();

    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1.5, duration: 0.2 });
        gsap.to(cursorFollower, { scale: 1.5, backgroundColor: 'rgba(59, 130, 246, 0.3)', duration: 0.2 });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, duration: 0.2 });
        gsap.to(cursorFollower, { scale: 1, backgroundColor: 'rgba(59, 130, 246, 0.1)', duration: 0.2 });
      });
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  // GSAP animations on scroll
  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    sectionsRef.current.forEach((section, index) => {
      if (!section) return;
      
      gsap.fromTo(section,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    const textElements = document.querySelectorAll('.reveal-text');
    textElements.forEach(text => {
      gsap.fromTo(text,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.5,
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
          }
        }
      );
    });

    gsap.to('.rotating-element', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const getExperienceYears = () => {
    const startYear = 2007;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  };

  return (
    <div className="relative min-h-screen bg-white cursor-none font-sans">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="fixed w-2 h-2 bg-blue-600 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"></div>
      <div ref={cursorFollowerRef} className="fixed w-10 h-10 border-2 border-blue-600 rounded-full pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2 opacity-30 transition-transform duration-300"></div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-72 h-72 top-10 -right-36 bg-gradient-to-br from-blue-600 to-transparent rounded-full opacity-10 animate-float-1"></div>
        <div className="absolute w-48 h-48 bottom-20 -left-24 bg-gradient-to-br from-blue-600 to-transparent rounded-full opacity-10 animate-float-2"></div>
        <div className="absolute w-36 h-36 top-60 right-1/4 bg-gradient-to-br from-blue-600 to-transparent rounded-full opacity-10 animate-float-3"></div>
        <div className="absolute w-24 h-24 top-1/3 left-1/4 border-2 border-blue-600 opacity-5 rotating-element"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full px-4 sm:px-6 lg:px-8 py-6 bg-white/95 backdrop-blur-lg z-40 border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white font-bold text-xl">HCP</span>
              <div className="absolute bottom-3 right-3 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">H.C. Parekh</h1>
              <p className="text-sm text-blue-600 font-medium">Senior Project Consultant</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            {['About', 'Experience', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 font-medium hover:text-blue-600 transition-colors relative group py-2 interactive">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen px-4 sm:px-6 lg:px-8 flex items-center relative overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="inline-flex items-center space-x-3 bg-blue-50 px-5 py-2 rounded-full border border-blue-100">
                <span className="text-blue-700 font-semibold text-sm tracking-wide">EST. 2007</span>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] reveal-text">
                Industrial & Corporate <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Authority.</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed reveal-text max-w-lg">
                Bridging the gap between complex government regulations and corporate execution for over {getExperienceYears()} years.
              </p>
              
              <div className="flex items-center gap-8 pt-4">
                <a href="#contact" className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 interactive">
                  Get In Touch
                </a>
                <div className="flex flex-col">
                   <span className="text-3xl font-bold text-gray-900">18+</span>
                   <span className="text-xs text-gray-500 uppercase tracking-widest">Years Active</span>
                </div>
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" 
                  alt="Corporate Building"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                   <p className="font-bold text-lg">Strategic Consultant</p>
                   <p className="text-sm opacity-80">Government & Private Sector</p>
                </div>
              </div>
              {/* Decorative elements behind image */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-blue-600 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={el => sectionsRef.current[0] = el} className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
               <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2">My Expertise</h2>
               <h3 className="text-4xl font-bold text-gray-900">Professional Overview</h3>
            </div>
            <p className="text-gray-500 max-w-md">Operating from dual bases in Bhubaneswar and Bengaluru to serve clients Pan-India.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📋', title: 'Consultancy', desc: 'Flexible engagement models for diverse needs.' },
              { icon: '🏭', title: 'Industries', desc: 'NPCIL, BARC, Textile & Heavy Mfg.' },
              { icon: '📍', title: 'Locations', desc: 'Bhubaneswar & Bengaluru Bases.' },
              { icon: '🎯', title: 'Execution', desc: 'End-to-End Project Implementation.' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group interactive">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section ref={el => sectionsRef.current[1] = el} className="py-24 px-4 sm:px-6 lg:px-8" id="experience">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-widest uppercase text-blue-600 mb-3">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">Key Sectors Served</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Govt Card */}
            <div className="bg-slate-900 text-white p-10 rounded-3xl shadow-xl relative overflow-hidden group interactive">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
               <h3 className="text-3xl font-bold mb-6 relative z-10">Government Projects</h3>
               <ul className="space-y-4 relative z-10 text-slate-300">
                  <li className="flex items-start"><span className="text-blue-400 mr-2">➜</span> Nuclear Power Corporation (NPCIL)</li>
                  <li className="flex items-start"><span className="text-blue-400 mr-2">➜</span> Medical Infrastructure (Govt. of India)</li>
                  <li className="flex items-start"><span className="text-blue-400 mr-2">➜</span> BARC Radiological Labs</li>
               </ul>
            </div>

            {/* Industrial Card */}
            <div className="bg-blue-50 text-slate-900 p-10 rounded-3xl shadow-xl border border-blue-100 relative overflow-hidden group interactive">
               <h3 className="text-3xl font-bold mb-6">Industrial Sectors</h3>
               <ul className="space-y-4 text-slate-700">
                  <li className="flex items-start"><span className="text-blue-600 mr-2">➜</span> Textile & Garment Units</li>
                  <li className="flex items-start"><span className="text-blue-600 mr-2">➜</span> Pulp & Paper Industry</li>
                  <li className="flex items-start"><span className="text-blue-600 mr-2">➜</span> FMCG & Plastic Manufacturing</li>
               </ul>
            </div>
          </div>

          {/* Current Project Banner */}
          <div className="mt-8 bg-blue-600 text-white p-10 rounded-3xl shadow-xl relative overflow-hidden interactive">
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                   <span className="bg-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Currently Active</span>
                   <h3 className="text-2xl font-bold mt-4">Govt. High School for Deaf & Dumb</h3>
                   <p className="text-blue-100 mt-2">Large-scale IT & Digitalization Project in Andhra Pradesh.</p>
                </div>
                <div className="text-5xl font-bold opacity-20">2026</div>
             </div>
          </div>
        </div>
      </section>

      {/* Corporate Expertise Checklist */}
      <section ref={el => sectionsRef.current[2] = el} className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Corporate Capabilities</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Industrial MOUs & Joint Ventures',
                'Corporate Investment Planning',
                'Government Tenders & Contracts',
                'Franchise & Dealer Management',
                'Procurement & Indenting',
                'Vendor Management',
                'Debt Recovery & Settlement',
                'Labour Dispute Resolution',
                'Arbitration & Conciliation'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={el => sectionsRef.current[5] = el} className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100" id="contact">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Let's Discuss Your Project</h2>
              <p className="text-gray-600 mb-12 text-lg">
                 Whether you need strategic direction for a government project or operational efficiency in manufacturing, I am available for consultation.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                   <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl">📍</div>
                   <div>
                      <h4 className="font-bold text-gray-900 text-lg">Headquarters</h4>
                      <p className="text-gray-600 mt-1">A-3, Hi-Tech Plaza, Sundarpada<br/>Bhubaneswar – 751002, Odisha</p>
                   </div>
                </div>
                <div className="flex items-start space-x-6">
                   <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl">📞</div>
                   <div>
                      <h4 className="font-bold text-gray-900 text-lg">Direct Contact</h4>
                      <p className="text-gray-600 mt-1">+91 82602 32337</p>
                      <p className="text-gray-600">+91 63537 78329</p>
                   </div>
                </div>
                <div className="flex items-start space-x-6">
                   <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl">✉️</div>
                   <div>
                      <h4 className="font-bold text-gray-900 text-lg">Email</h4>
                      <p className="text-gray-600 mt-1">hemant.parekh2012@gmail.com</p>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                   <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white" />
                   <input type="text" placeholder="Phone" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white" />
                <textarea placeholder="Project Details" rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"></textarea>
                <button type="submit" className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors duration-300 shadow-lg interactive">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">HCP</div>
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} H.C. Parekh. All rights reserved.</p>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
      </footer>

      {/* Add custom animations to tailwind.config.js */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-1 {
          animation: float1 6s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float2 8s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float3 10s ease-in-out infinite;
        }
        .rotating-element {
          animation: float 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PortfolioWebsite;