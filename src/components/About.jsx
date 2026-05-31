import React from 'react';

const About = () => {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" style={{ background: 'var(--surface)', transition: 'background-color 0.4s' }}>
      <div className="about-grid">
        <div className="about-img-wrap reveal">
          <img src="images/WhatsApp Image 2026-01-27 at 2.03.21 PM.jpeg" alt="Subhan NK" />
          <div className="about-tag-stack">
            <div className="about-badge"><strong>6mo+</strong> Experience</div>
            <div className="about-badge"><strong>MERN</strong> Stack</div>
          </div>
        </div>
        <div className="about-text">
          <div className="section-header">
            <span className="section-label">Get to know me</span>
            <h2 className="section-title">About <span className="outline select-none">Me</span></h2>
          </div>
          <p className="reveal">I am a dedicated software developer with expertise in designing, developing, and maintaining high-quality applications tailored to client needs. With a strong foundation in modern programming languages and frameworks, I specialize in building scalable web and mobile solutions.</p>
          <p className="reveal reveal-delay-1">My background in English combined with technical skills gives me a unique ability to communicate complex ideas clearly — both in code and in conversation.</p>
          
          <div className="info-grid reveal reveal-delay-2">
            <div className="info-item"><span>Birthday</span><strong>19 Nov 2002</strong></div>
            <div className="info-item"><span>Degree</span><strong>BA English</strong></div>
            <div className="info-item"><span>Phone</span><strong>+91 9946684018</strong></div>
            <div className="info-item"><span>Email</span><strong>subhannk2002@gmail.com</strong></div>
            <div className="info-item"><span>City</span><strong>Kerala, India</strong></div>
            <div className="info-item"><span>Freelance</span><strong style={{ color: 'var(--accent)' }}>Available</strong></div>
          </div>
          
          <div className="reveal reveal-delay-3">
            <a href="#contact" onClick={scrollToContact} className="btn-primary">Let's Talk</a>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: start;
          max-width: 1200px;
          margin: auto;
        }
        .about-img-wrap {
          position: relative;
        }
        .about-img-wrap img {
          width: 100%;
          aspect-ratio: 4/5;
          object-fit: cover;
          border-radius: 3px;
          filter: grayscale(30%) contrast(1.05);
          box-shadow: 0 15px 35px var(--shadow);
        }
        .about-img-wrap::after {
          content: '';
          position: absolute;
          top: 20px;
          left: 20px;
          right: -20px;
          bottom: -20px;
          border: 1px solid var(--border);
          border-radius: 3px;
          z-index: -1;
          transition: border-color 0.4s;
        }
        .about-tag-stack {
          position: absolute;
          bottom: -16px;
          right: -16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 5;
        }
        .about-badge {
          background: var(--bg);
          border: 1px solid var(--border);
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          color: var(--muted);
          padding: 6px 12px;
          letter-spacing: 1px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          transition: background-color 0.4s, border-color 0.4s, color 0.4s;
        }
        .about-badge strong {
          color: var(--accent);
          transition: color 0.4s;
        }
        .about-text p {
          font-size: 1.02rem;
          color: var(--muted);
          line-height: 1.9;
          margin-bottom: 20px;
          transition: color 0.4s;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin: 36px 0;
          border-top: 1px solid var(--border);
          padding-top: 20px;
          transition: border-color 0.4s;
        }
        .info-item {
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
          font-size: 0.88rem;
          transition: border-color 0.4s;
        }
        .info-item span {
          color: var(--muted);
          font-size: 0.75rem;
          display: block;
          margin-bottom: 3px;
          font-family: 'DM Mono', monospace;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: color 0.4s;
        }
        .info-item strong {
          color: var(--text);
          transition: color 0.4s;
        }
        
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .about-img-wrap {
            max-width: 340px;
            margin: auto;
          }
        }
      `}} />
    </section>
  );
};

export default About;
