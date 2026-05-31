import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Mail, Instagram, Facebook, Github, Linkedin } from 'lucide-react';

const Hero = () => {
  // Roles for Typing effect
  const roles = ['MERN Stack Developer', 'Full Stack Engineer', 'React Specialist', 'Node.js Developer'];
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Refs for magnetic buttons
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);

  // ── TYPING EFFECT LOOP ──
  useEffect(() => {
    let timer;
    const currentWord = roles[roleIndex];
    
    if (!isDeleting) {
      // Typing
      timer = setTimeout(() => {
        setRoleText(currentWord.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 90);

      // Word complete, pause then delete
      if (charIndex === currentWord.length) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      // Deleting
      timer = setTimeout(() => {
        setRoleText(currentWord.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 50);

      // Deleted, go to next word
      if (charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex(prev => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  // ── MAGNETIC BUTTON FUNCTION ──
  const setupMagneticEffect = (ref) => {
    if (!ref.current) return;
    const element = ref.current;
    
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const elX = rect.left + rect.width / 2;
      const elY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - elX, e.clientY - elY);
      
      if (dist < 70) {
        const pullX = (e.clientX - elX) * 0.35;
        const pullY = (e.clientY - elY) * 0.35;
        element.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(1.02)`;
        element.style.boxShadow = `0 10px 30px var(--glow)`;
      } else {
        element.style.transform = `translate3d(0px, 0px, 0) scale(1)`;
        element.style.boxShadow = '';
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = `translate3d(0, 0, 0) scale(1)`;
      element.style.boxShadow = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  };

  useEffect(() => {
    const cleanupBtn1 = setupMagneticEffect(button1Ref);
    const cleanupBtn2 = setupMagneticEffect(button2Ref);

    return () => {
      if (cleanupBtn1) cleanupBtn1();
      if (cleanupBtn2) cleanupBtn2();
    };
  }, []);

  const scrollToSection = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home">
      <div className="hero-bg-grid"></div>
      <div 
        className="hero-glow"
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--glow) 0%, transparent 70%)',
          top: '-100px',
          right: '-100px',
          pointerEvents: 'none',
          opacity: 0.35
        }}
      ></div>
      <div 
        className="hero-glow2"
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)',
          bottom: 0,
          left: 0,
          pointerEvents: 'none'
        }}
      ></div>
      
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-tag">Available for freelance</div>
          <h1 className="hero-name">Hey, I'm<br /><span>Subhan</span></h1>
          <p className="hero-role">
            <span>{roleText}</span>
            <span className="type-cursor font-bold">|</span>
          </p>
          <p className="hero-desc">A dedicated software developer building scalable, high-quality web applications with clean and maintainable code.</p>
          <div className="hero-cta">
            <button 
              ref={button1Ref} 
              onClick={() => scrollToSection('projects')} 
              className="btn-primary"
            >
              View Projects
            </button>
            <button 
              ref={button2Ref} 
              onClick={() => scrollToSection('contact')} 
              className="btn-outline"
            >
              Hire Me
            </button>
          </div>
          <div className="hero-socials">
            <a href="https://www.instagram.com/subhan_nk" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.facebook.com/share/1CwUcs8osY" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook"></i></a>
            <a href="https://wa.me/919946684018" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
            <a href="#" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
            <a href="#" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-img-wrap" style={{ animation: 'float 6s ease-in-out infinite' }}>
            <img src="images/main.png.png" alt="Subhan NK" />
            <div className="hero-img-tag">// Kerala, India</div>
            <div className="floating-badge">Open to work</div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        #home {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 6vw;
          position: relative;
          overflow: hidden;
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin: auto;
        }
        .hero-content {
          animation: fadeUp 0.9s ease both;
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 2px;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 20px;
          border: 1px solid var(--border);
          padding: 6px 14px;
          border-radius: 2px;
        }
        .hero-tag::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: blink 1.2s infinite;
        }
        .hero-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3rem, 7vw, 6rem);
          font-weight: 800;
          line-height: 0.95;
          color: var(--text);
          margin-bottom: 6px;
          transition: color 0.4s;
        }
        .hero-name span {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        .hero-role {
          font-family: 'DM Mono', monospace;
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: var(--muted);
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color 0.4s;
        }
        .hero-role::before {
          content: '//';
          color: var(--accent2);
        }
        .hero-desc {
          font-size: 1rem;
          color: var(--muted);
          line-height: 1.8;
          max-width: 440px;
          margin-bottom: 40px;
          transition: color 0.4s;
        }
        .hero-cta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .hero-socials {
          display: flex;
          gap: 18px;
          margin-top: 36px;
        }
        .hero-socials a {
          width: 40px;
          height: 40px;
          border: 1px solid var(--border);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          font-size: 1.1rem;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .hero-socials a:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-3px);
        }
        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeUp 0.9s 0.2s ease both;
        }
        .hero-img-wrap {
          position: relative;
          width: 340px;
          height: 380px;
        }
        .hero-img-wrap::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: var(--accent-gradient);
          border-radius: 4px;
          z-index: 0;
        }
        .hero-img-wrap::after {
          content: '';
          position: absolute;
          bottom: -20px;
          right: -20px;
          width: 100%;
          height: 100%;
          border: 1px solid var(--border);
          border-radius: 4px;
          z-index: -1;
          transition: border-color 0.4s;
        }
        .hero-img-wrap img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 3px;
          filter: grayscale(20%);
        }
        .hero-img-tag {
          position: absolute;
          bottom: -14px;
          left: -14px;
          background: var(--surface2);
          border: 1px solid var(--border);
          padding: 10px 16px;
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: var(--accent);
          z-index: 5;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          transition: background-color 0.4s, border-color 0.4s, color 0.4s;
        }
        .floating-badge {
          position: absolute;
          top: -16px;
          right: -16px;
          background: var(--accent2);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.65rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 8px 14px;
          border-radius: 2px;
          z-index: 5;
          animation: pulse 2.5s ease-in-out infinite;
        }
        .type-cursor {
          animation: blink 0.9s step-end infinite;
          color: var(--accent);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-visual {
            display: none;
          }
          .hero-desc {
            margin: 0 auto 40px;
          }
          .hero-cta {
            justify-content: center;
          }
          .hero-socials {
            justify-content: center;
          }
        }
      `}} />
    </section>
  );
};

export default Hero;
