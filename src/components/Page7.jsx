import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
// import './Page7.css';

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

    gsap.to('.parallax-bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.portfolio-website',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
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
    <div className="portfolio-website">
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={cursorFollowerRef} className="cursor-follower"></div>

      <div className="floating-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-square rotating-element"></div>
      </div>

      <header className="header">
        <div className="logo-container">
          <div className="logo-placeholder">
            <span className="logo-text">HCP</span>
            <div className="logo-dot"></div>
          </div>
          <div className="brand-info">
            <h1 className="brand-name">H.C. Parekh</h1>
            <p className="designation">Senior Project Consultant & Investor</p>
          </div>
        </div>
        <nav className="nav">
          <a href="#about" className="nav-link">About</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </header>

    <section ref={heroRef} className="hero-section">
  <div className="hero-container">
    <div className="hero-content">
      <div className="hero-badge">
        <span className="badge-text">Est. 2007</span>
        <div className="badge-dot"></div>
      </div>
      
      <h1 className="hero-title reveal-text">
        Industrial & Corporate
        <span className="title-highlight">Project Consultant</span>
      </h1>
      
      <p className="hero-subtitle reveal-text">
        {getExperienceYears()}+ years of expertise in Government, Corporate & Manufacturing sectors
      </p>
      
      <div className="hero-stats">
        <div className="stat">
          <h3>18+</h3>
          <p>Years Experience</p>
        </div>
        <div className="stat">
          <h3>50+</h3>
          <p>Projects Delivered</p>
        </div>
        <div className="stat">
          <h3>2</h3>
          <p>Base Locations</p>
        </div>
      </div>

      <a href="#contact" className="cta-button interactive">
        <span>Get In Touch</span>
        <div className="button-arrow">→</div>
      </a>
    </div>
    
    <div className="hero-image-container">
      <div className="image-frame">
        <div className="image-wrapper">
  <img 
    src="https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg?semt=ais_hybrid&w=740&q=80" 
    alt="H.C. Parekh - Professional Consultant"
    className="professional-image"
  />
  
  {/* Floating Elements Around Image */}
  <div className="floating-badge badge-1">
    <div className="badge-icon">🏭</div>
    <span>Industrial</span>
  </div>
  <div className="floating-badge badge-2">
    <div className="badge-icon">🏛️</div>
    <span>Government</span>
  </div>
  <div className="floating-badge badge-3">
    <div className="badge-icon">💼</div>
    <span>Corporate</span>
  </div>
</div>
      </div>
    </div>
  </div>
  
  <div className="hero-background parallax-bg">
    <div className="grid-overlay"></div>
  </div>
</section>
      <section ref={el => sectionsRef.current[0] = el} className="section" id="about">
        <div className="section-header">
          <h2 className="section-title reveal-text">Professional Overview</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="about-grid">
          <div className="about-card">
            <div className="card-icon">📋</div>
            <h3>Working Model</h3>
            <p>Freelance Consultant</p>
            <p className="card-desc">Independent consultant offering flexible engagement models</p>
          </div>
          
          <div className="about-card">
            <div className="card-icon">🏭</div>
            <h3>Industries Served</h3>
            <p>Government, Corporate & Manufacturing</p>
            <p className="card-desc">Multi-sector expertise with deep industry knowledge</p>
          </div>
          
          <div className="about-card">
            <div className="card-icon">📍</div>
            <h3>Base Locations</h3>
            <p>Bhubaneswar / Bengaluru</p>
            <p className="card-desc">Operating pan-India with dual operational bases</p>
          </div>
          
          <div className="about-card">
            <div className="card-icon">🎯</div>
            <h3>Specialization</h3>
            <p>End-to-End Project Implementation</p>
            <p className="card-desc">From concept to completion and beyond</p>
          </div>
        </div>
      </section>

      <section ref={el => sectionsRef.current[1] = el} className="section dark-section" id="experience">
        <div className="section-header">
          <h2 className="section-title reveal-text">Area of Expertise</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Government Projects</h3>
              <ul className="experience-list">
                <li>Nuclear Power Corporation of India Ltd. (NPCIL)</li>
                <li>Medical & Healthcare Projects (Government of India)</li>
                <li>Bhabha Atomic Research Centre - Environment & Radiological Laboratory</li>
              </ul>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Industrial Sectors</h3>
              <ul className="experience-list">
                <li>Textile & Garment Industry</li>
                <li>Pulp & Paper Industry</li>
                <li>Plastic Manufacturing Industry</li>
                <li>Information Technology</li>
                <li>FMCG</li>
              </ul>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Current Engagement</h3>
              <div className="current-project">
                <h4>Large IT & Digitalization Project</h4>
                <p>Government High School for Deaf and Dumb, Andhra Pradesh</p>
                <span className="project-status">Ongoing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={el => sectionsRef.current[2] = el} className="section">
        <div className="section-header">
          <h2 className="section-title reveal-text">Corporate Expertise</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="expertise-grid">
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
            <div key={index} className="expertise-item interactive">
              <div className="expertise-icon">✓</div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section ref={el => sectionsRef.current[3] = el} className="section dark-section">
        <div className="section-header">
          <h2 className="section-title reveal-text">Professional History</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="history-cards">
          <div className="history-card">
            <div className="history-card-header">
              <h3>Chief Business Officer (CBO)</h3>
              <span className="history-period">IT Company</span>
            </div>
            <p className="history-location">Pune, Maharashtra</p>
            <div className="history-tags">
              <span className="tag">Leadership</span>
              <span className="tag">Strategy</span>
              <span className="tag">Business Development</span>
            </div>
          </div>
          
          <div className="history-card">
            <div className="history-card-header">
              <h3>General Manager (Business)</h3>
              <span className="history-period">Plastic Manufacturing</span>
            </div>
            <p className="history-location">Odisha</p>
            <div className="history-tags">
              <span className="tag">Operations</span>
              <span className="tag">Manufacturing</span>
              <span className="tag">Management</span>
            </div>
          </div>
          
          <div className="history-card">
            <div className="history-card-header">
              <h3>Project Consultant</h3>
              <span className="history-period">NPCIL - Government of India</span>
            </div>
            <p className="history-location">Pan-India Projects</p>
            <div className="history-tags">
              <span className="tag">Government</span>
              <span className="tag">Nuclear</span>
              <span className="tag">Infrastructure</span>
            </div>
          </div>
        </div>
      </section>

      <section ref={el => sectionsRef.current[4] = el} className="section">
        <div className="split-section">
          <div className="split-left">
            <div className="section-header">
              <h2 className="section-title reveal-text">Social Work & Public Engagement</h2>
            </div>
            <div className="social-list">
              <div className="social-item">
                <div className="social-icon">⚖️</div>
                <div>
                  <h4>Public Interest Litigations</h4>
                  <p>Against Corporate Fraud & Money Laundering</p>
                </div>
              </div>
              <div className="social-item">
                <div className="social-icon">🤝</div>
                <div>
                  <h4>Fundraising Consultant</h4>
                  <p>To Charitable Organizations</p>
                </div>
              </div>
              <div className="social-item">
                <div className="social-icon">🌍</div>
                <div>
                  <h4>Socio-Commercial Projects</h4>
                  <p>For Social Organizations</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="split-right">
            <div className="section-header">
              <h2 className="section-title reveal-text">Entrepreneurial Experience</h2>
            </div>
            <div className="entrepreneur-card">
              <div className="entrepreneur-icon">👔</div>
              <h3>Textile Sector Entrepreneur</h3>
              <p>Hands-on experience in business development, operations, and market expansion in the textile industry</p>
              <div className="entrepreneur-tags">
                <span className="tag">Business Development</span>
                <span className="tag">Market Strategy</span>
                <span className="tag">Operations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={el => sectionsRef.current[5] = el} className="section contact-section" id="contact">
        <div className="section-header">
          <h2 className="section-title reveal-text">Get In Touch</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h4>Office Address</h4>
                <p>A-3, Hi-Tech Plaza, Sundarpada</p>
                <p>Bhubaneswar – 751002, Odisha</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div>
                <h4>Mobile Numbers</h4>
                <p>+91 8260232337</p>
                <p>+91 6353778329</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <h4>Email</h4>
                <p>hemant.parekh2012@gmail.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">🏙️</div>
              <div>
                <h4>Base Locations</h4>
                <p>Bhubaneswar / Bengaluru</p>
                <p className="location-note">Available for projects across India</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Send a Message</h3>
            <form>
              <div className="form-group">
                <input type="text" placeholder="Your Name" className="form-input" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" className="form-input" />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" className="form-input" />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="4" className="form-input"></textarea>
              </div>
              <button type="submit" className="submit-button interactive">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">HCP</div>
            <div>
              <h4>H.C. Parekh</h4>
              <p>Senior Project Consultant & Investor</p>
              <p>Since 2007</p>
            </div>
          </div>
          
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          
          <div className="footer-legal">
            <p>© {new Date().getFullYear()} H.C. Parekh. All rights reserved.</p>
            <p className="footer-note">Professional Project Consultant - Industrial & Corporate</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioWebsite;