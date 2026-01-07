import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
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
    let cursorX = 0;
    let cursorY = 0;
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
    <div className="relative min-h-screen bg-white cursor-none">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="fixed w-2 h-2 bg-blue-600 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"></div>
      <div ref={cursorFollowerRef} className="fixed w-10 h-10 border-2 border-blue-600 rounded-full pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2 opacity-30 transition-transform duration-300"></div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
        <div className="absolute w-72 h-72 top-10 -right-36 bg-gradient-to-br from-blue-600 to-transparent rounded-full opacity-10 animate-float-1"></div>
        <div className="absolute w-48 h-48 bottom-20 -left-24 bg-gradient-to-br from-blue-600 to-transparent rounded-full opacity-10 animate-float-2"></div>
        <div className="absolute w-36 h-36 top-60 right-1/4 bg-gradient-to-br from-blue-600 to-transparent rounded-full opacity-10 animate-float-3"></div>
        <div className="absolute w-24 h-24 top-1/3 left-1/4 border-2 border-blue-600 opacity-5 rotating-element"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full px-4 sm:px-6 lg:px-8 py-6 bg-white/95 backdrop-blur-lg z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">HCP</span>
              <div className="absolute bottom-3 right-3 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">H.C. Parekh</h1>
              <p className="text-sm text-blue-600">Senior Project Consultant & Investor</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-800 font-medium hover:text-blue-600 transition-colors relative group">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto pt-16 md:pt-24 lg:pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-blue-50 px-6 py-3 rounded-full">
                <span className="text-blue-600 font-semibold">Est. 2007</span>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight reveal-text">
                Industrial & Corporate
                <span className="text-blue-600 block mt-2">Project Consultant</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed reveal-text">
                {getExperienceYears()}+ years of expertise in Government, Corporate & Manufacturing sectors
              </p>
              
              <div className="flex space-x-8">
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-blue-600">18+</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Years Experience</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-blue-600">50+</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Projects Delivered</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-blue-600">2</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Base Locations</p>
                </div>
              </div>

              <a href="#contact" className="inline-flex items-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl interactive">
                <span>Get In Touch</span>
                <div className="group-hover:translate-x-2 transition-transform">→</div>
              </a>
            </div>
            
            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-2xl">
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src="https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg?semt=ais_hybrid&w=740&q=80" 
                    alt="H.C. Parekh - Professional Consultant"
                    className="w-full h-[500px] object-cover rounded-xl transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                {/* Floating Badges */}
                <div className="absolute -top-3 right-12 flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg animate-float-1">
                  <span className="text-xl">🏭</span>
                  <span className="font-semibold text-gray-800">Industrial</span>
                </div>
                <div className="absolute bottom-16 -left-3 flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg animate-float-2">
                  <span className="text-xl">🏛️</span>
                  <span className="font-semibold text-gray-800">Government</span>
                </div>
                <div className="absolute -bottom-3 right-16 flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg animate-float-3">
                  <span className="text-xl">💼</span>
                  <span className="font-semibold text-gray-800">Corporate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={el => sectionsRef.current[0] = el} className="py-20 px-4 sm:px-6 lg:px-8" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 reveal-text">Professional Overview</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📋', title: 'Working Model', desc: 'Freelance Consultant', detail: 'Independent consultant offering flexible engagement models' },
              { icon: '🏭', title: 'Industries Served', desc: 'Government, Corporate & Manufacturing', detail: 'Multi-sector expertise with deep industry knowledge' },
              { icon: '📍', title: 'Base Locations', desc: 'Bhubaneswar / Bengaluru', detail: 'Operating pan-India with dual operational bases' },
              { icon: '🎯', title: 'Specialization', desc: 'End-to-End Project Implementation', detail: 'From concept to completion and beyond' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-blue-600 font-semibold mb-3">{item.desc}</p>
                <p className="text-gray-600 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section ref={el => sectionsRef.current[1] = el} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" id="experience">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 reveal-text">Area of Expertise</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-600"></div>
            
            {[
              {
                title: 'Government Projects',
                items: [
                  'Nuclear Power Corporation of India Ltd. (NPCIL)',
                  'Medical & Healthcare Projects (Government of India)',
                  'Bhabha Atomic Research Centre - Environment & Radiological Laboratory'
                ]
              },
              {
                title: 'Industrial Sectors',
                items: [
                  'Textile & Garment Industry',
                  'Pulp & Paper Industry',
                  'Plastic Manufacturing Industry',
                  'Information Technology',
                  'FMCG'
                ]
              },
              {
                title: 'Current Engagement',
                items: [
                  {
                    type: 'project',
                    title: 'Large IT & Digitalization Project',
                    desc: 'Government High School for Deaf and Dumb, Andhra Pradesh',
                    status: 'Ongoing'
                  }
                ]
              }
            ].map((section, idx) => (
              <div key={idx} className="relative mb-12 flex items-start">
                <div className="absolute left-0 w-16 h-16 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center z-10"></div>
                <div className="ml-24 bg-white p-8 rounded-2xl shadow-lg flex-1">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">{section.title}</h3>
                  {section.items.map((item, itemIdx) => (
                    section.title === 'Current Engagement' ? (
                      <div key={itemIdx} className="bg-blue-50 p-6 rounded-xl">
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-600 mb-3">{item.desc}</p>
                        <span className="inline-block bg-emerald-500 text-white px-4 py-1 rounded-full text-sm">
                          {item.status}
                        </span>
                      </div>
                    ) : (
                      <div key={itemIdx} className="flex items-start mb-3">
                        <div className="text-blue-600 mr-3 mt-1">•</div>
                        <p className="text-gray-700">{item}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Expertise */}
      <section ref={el => sectionsRef.current[2] = el} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 reveal-text">Corporate Expertise</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Industrial MOUs & Joint Ventures',
              'Corporate Investors & Investments',
              'Tenders & Contracts',
              'Dealers, Distributors & Franchise Management',
              'Indenting & Procurement',
              'Central Material Management',
              'Vendor Management',
              'Company Debt Recovery & Settlement',
              'Labour Dispute Settlement',
              'Consumer Grievance Resolution',
              'Government Arbitration & Conciliation'
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-300 interactive">
                <div className="text-blue-600 font-bold">✓</div>
                <span className="text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional History */}
      <section ref={el => sectionsRef.current[3] = el} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 reveal-text">Professional History</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Chief Business Officer (CBO)',
                company: 'IT Company',
                location: 'Pune, Maharashtra',
                tags: ['Leadership', 'Strategy', 'Business Development']
              },
              {
                title: 'General Manager (Business)',
                company: 'Plastic Manufacturing',
                location: 'Odisha',
                tags: ['Operations', 'Manufacturing', 'Management']
              },
              {
                title: 'Project Consultant',
                company: 'NPCIL - Government of India',
                location: 'Pan-India Projects',
                tags: ['Government', 'Nuclear', 'Infrastructure']
              }
            ].map((role, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{role.title}</h3>
                  <span className="text-blue-600 font-semibold text-sm">{role.company}</span>
                </div>
                <p className="text-gray-600 mb-6">{role.location}</p>
                <div className="flex flex-wrap gap-2">
                  {role.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social & Entrepreneurial Section */}
      <section ref={el => sectionsRef.current[4] = el} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8 reveal-text">Social Work & Public Engagement</h2>
              <div className="space-y-6">
                {[
                  { icon: '⚖️', title: 'Public Interest Litigations', desc: 'Against Corporate Fraud & Money Laundering' },
                  { icon: '🤝', title: 'Fundraising Consultant', desc: 'To Charitable Organizations' },
                  { icon: '🌍', title: 'Socio-Commercial Projects', desc: 'For Social Organizations' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8 reveal-text">Entrepreneurial Experience</h2>
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="text-4xl mb-4">👔</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Textile Sector Entrepreneur</h3>
                <p className="text-gray-600 mb-6">
                  Hands-on experience in business development, operations, and market expansion in the textile industry
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Business Development', 'Market Strategy', 'Operations'].map((tag, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={el => sectionsRef.current[5] = el} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" id="contact">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 reveal-text">Get In Touch</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { icon: '📍', title: 'Office Address', lines: ['A-3, Hi-Tech Plaza, Sundarpada', 'Bhubaneswar – 751002, Odisha'] },
                { icon: '📱', title: 'Mobile Numbers', lines: ['+91 8260232337', '+91 6353778329'] },
                { icon: '✉️', title: 'Email', lines: ['hemant.parekh2012@gmail.com'] },
                { icon: '🏙️', title: 'Base Locations', lines: ['Bhubaneswar / Bengaluru', 'Available for projects across India'] }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="text-2xl text-blue-600">{item.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                    {item.lines.map((line, lineIdx) => (
                      <p key={lineIdx} className={`text-gray-600 ${lineIdx === item.lines.length - 1 && line.includes('Available') ? 'text-blue-600 text-sm mt-1' : ''}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
              <form className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Your Message" 
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 interactive"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center font-bold">HCP</div>
              <div>
                <h4 className="text-lg font-bold">H.C. Parekh</h4>
                <p className="text-gray-300">Senior Project Consultant & Investor</p>
                <p className="text-gray-400 text-sm">Since 2007</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-6 items-center">
              {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">© {new Date().getFullYear()} H.C. Parekh. All rights reserved.</p>
              <p className="text-gray-500 text-sm mt-2">Professional Project Consultant - Industrial & Corporate</p>
            </div>
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