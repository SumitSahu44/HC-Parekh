import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const Page4 = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Setup Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Custom cursor for mouse attraction
    const cursor = document.querySelector('.cursor');
    const cursorScaleElements = document.querySelectorAll('.cursor-scale');

    window.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power3.out',
      });
    });

    cursorScaleElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 2, duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      });
    });

    // GSAP ScrollTrigger animations for sections
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div style={styles.container}>
      {/* Custom Cursor */}
      <div className="cursor" style={styles.cursor}></div>

      {/* Hero Section */}
      <section ref={(el) => (sectionsRef.current[0] = el)} style={styles.section}>
        <img
          src="https://via.placeholder.com/200x100/0000FF/FFFFFF?text=Logo"
          alt="H.C. Parekh Logo"
          style={styles.logo}
          className="cursor-scale"
        />
        <h1 style={styles.title}>H.C. Parekh</h1>
        <p style={styles.subtitle}>Project Consultant (Industrial & Corporate)</p>
        <p style={styles.subtitle}>Senior Project Consultant & Investor</p>
        <p style={styles.text}>Since 2007</p>
      </section>

      {/* Professional Overview */}
      <section ref={(el) => (sectionsRef.current[1] = el)} style={styles.section}>
        <h2 style={styles.heading}>Professional Overview</h2>
        <p style={styles.text}>Experience: 18+ Years (October 2007 – Present)</p>
        <p style={styles.text}>Working Model: Freelance</p>
        <p style={styles.text}>Industries Served: Government, Corporate & Manufacturing</p>
        <p style={styles.text}>Base Locations: Bhubaneswar / Bengaluru</p>
        <img
          src="https://via.placeholder.com/800x400/0000FF/FFFFFF?text=Professional+Overview+Image"
          alt="Overview Image"
          style={styles.image}
          className="cursor-scale"
        />
      </section>

      {/* Area of Experience */}
      <section ref={(el) => (sectionsRef.current[2] = el)} style={styles.section}>
        <h2 style={styles.heading}>Area of Experience</h2>
        <ul style={styles.list}>
          <li>Government of India – Nuclear Power Corporation of India Ltd. (NPCIL)</li>
          <li>Medical & Healthcare Projects (Government of India)</li>
          <li>Environment & Radiological Laboratory – Bhabha Atomic Research Centre (Government of India)</li>
          <li>Textile & Garment Industry</li>
          <li>Pulp & Paper Industry</li>
          <li>Plastic Manufacturing Industry</li>
          <li>Information Technology</li>
          <li>FMCG</li>
        </ul>
        <img
          src="https://via.placeholder.com/800x400/0000FF/FFFFFF?text=Experience+Image"
          alt="Experience Image"
          style={styles.image}
          className="cursor-scale"
        />
      </section>

      {/* Present Engagement */}
      <section ref={(el) => (sectionsRef.current[3] = el)} style={styles.section}>
        <h2 style={styles.heading}>Present Engagement</h2>
        <p style={styles.text}>Large IT & Digitalization Project</p>
        <p style={styles.text}>Client: Government High School for Deaf and Dumb</p>
        <p style={styles.text}>Location: Andhra Pradesh</p>
        <img
          src="https://via.placeholder.com/800x400/0000FF/FFFFFF?text=Present+Engagement+Image"
          alt="Engagement Image"
          style={styles.image}
          className="cursor-scale"
        />
      </section>

      {/* Professional Engagement History */}
      <section ref={(el) => (sectionsRef.current[4] = el)} style={styles.section}>
        <h2 style={styles.heading}>Professional Engagement History</h2>
        <ul style={styles.list}>
          <li>Chief Business Officer (CBO) – IT Company, Pune, Maharashtra</li>
          <li>General Manager (Business) – Plastic Manufacturing Industry, Odisha</li>
          <li>Nuclear Power Corporation of India Ltd. (NPCIL) – Government of India</li>
        </ul>
        <img
          src="https://via.placeholder.com/800x400/0000FF/FFFFFF?text=History+Image"
          alt="History Image"
          style={styles.image}
          className="cursor-scale"
        />
      </section>

      {/* Corporate & Industrial Expertise */}
      <section ref={(el) => (sectionsRef.current[5] = el)} style={styles.section}>
        <h2 style={styles.heading}>Corporate & Industrial Expertise</h2>
        <ul style={styles.list}>
          <li>Industrial MOUs & Joint Ventures</li>
          <li>Corporate Investors & Investments</li>
          <li>Tenders & Contracts</li>
          <li>Dealers, Distributors & Franchise Management</li>
          <li>Indenting & Procurement</li>
          <li>Central Material Management</li>
          <li>Vendor Management</li>
          <li>Company Debt Recovery & Settlement</li>
          <li>Labour Dispute Settlement</li>
          <li>Consumer Grievance & Dispute Resolution</li>
          <li>Government Arbitration & Conciliation</li>
          <li>End-to-End Corporate & Industrial Project Implementation</li>
        </ul>
        <img
          src="https://via.placeholder.com/800x400/0000FF/FFFFFF?text=Expertise+Image"
          alt="Expertise Image"
          style={styles.image}
          className="cursor-scale"
        />
      </section>

      {/* Social Work & Public Engagement */}
      <section ref={(el) => (sectionsRef.current[6] = el)} style={styles.section}>
        <h2 style={styles.heading}>Social Work & Public Engagement</h2>
        <ul style={styles.list}>
          <li>Public Interest Litigations against Corporate Fraud & Money Laundering</li>
          <li>Fundraising Consultant to Charitable Organizations</li>
          <li>Socio-Commercial Projects for Social Organizations</li>
        </ul>
        <img
          src="https://via.placeholder.com/800x400/0000FF/FFFFFF?text=Social+Work+Image"
          alt="Social Work Image"
          style={styles.image}
          className="cursor-scale"
        />
      </section>

      {/* Entrepreneurial Experience */}
      <section ref={(el) => (sectionsRef.current[7] = el)} style={styles.section}>
        <h2 style={styles.heading}>Entrepreneurial Experience</h2>
        <p style={styles.text}>Entrepreneur in the Textile Sector</p>
        <img
          src="https://via.placeholder.com/800x400/0000FF/FFFFFF?text=Entrepreneurial+Image"
          alt="Entrepreneurial Image"
          style={styles.image}
          className="cursor-scale"
        />
      </section>

      {/* Contact Information */}
      <section ref={(el) => (sectionsRef.current[8] = el)} style={styles.section}>
        <h2 style={styles.heading}>Contact Information</h2>
        <p style={styles.text}>Location: Bhubaneswar / Bengaluru</p>
        <p style={styles.text}>Office Address: A-3, Hi-Tech Plaza, Sundarpada, Bhubaneswar – 751002, Odisha</p>
        <p style={styles.text}>Mobile Numbers: 8260232337 / 6353778329</p>
        <p style={styles.text}>Email ID: hemant.parekh2012@gmail.com</p>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    overflowX: 'hidden',
  },
  cursor: {
    position: 'fixed',
    width: '20px',
    height: '20px',
    backgroundColor: '#0000FF',
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    transition: 'transform 0.1s ease',
  },
  section: {
    padding: '60px 20px',
    textAlign: 'center',
    borderBottom: '1px solid #0000FF',
  },
  logo: {
    width: '200px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '48px',
    color: '#0000FF',
    margin: '10px 0',
  },
  subtitle: {
    fontSize: '24px',
    color: '#000000',
    margin: '5px 0',
  },
  heading: {
    fontSize: '32px',
    color: '#0000FF',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    color: '#000000',
    margin: '10px 0',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'left',
    maxWidth: '600px',
    margin: '0 auto',
  },
  image: {
    width: '100%',
    maxWidth: '800px',
    marginTop: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
};

export default Page4;