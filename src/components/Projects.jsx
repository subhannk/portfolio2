import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Mouse coords relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize between -10 and 10 degrees rotation for high visual quality
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    card.style.boxShadow = `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(240,224,64,0.1)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
    card.style.boxShadow = '';
  };

  return (
    <div 
      className={`project-card reveal reveal-delay-${(index % 3) + 1}`}
      style={{ perspective: '1000px' }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="project-inner"
        style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          overflow: 'hidden',
          transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.4s, background-color 0.4s',
          position: 'relative'
        }}
      >
        <img 
          src={project.image} 
          alt={project.title}
          className="project-img"
        />
        <div className="project-overlay" />
        <div className="project-num">{project.num}</div>
        <div className="project-body">
          <h3>{project.title}</h3>
          <p>{project.desc}</p>
          <div className="project-tags">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="project-tag">{tag}</span>
            ))}
          </div>
          <a 
            href={project.url} 
            target="_blank" 
            rel="noreferrer" 
            className="project-link"
          >
            View Live <ArrowRight size={14} className="proj-arrow" style={{ transition: 'transform 0.2s' }} />
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const projectsData = [
    {
      num: '02 /',
      title: 'LMS learnix',
      desc: 'Learnix is a fast, modern online learning platform built with React and Tailwind CSS.',
      image: 'images/5de63102937d14a8350c852d3bf689be.jpg',
      tags: ['react', 'Taiwind CSS', 'JavaScript'],
      url: 'https://lms-learnix-2.vercel.app/'
    },
    {
      num: '01 /',
      title: 'LedgerPro',
      desc: 'LedgerPro is a simple app to track income, expenses built with React and Tailwind CSS.',
      image: 'images/ledgerpro.png',
      tags: ['React', 'Tailwind'],
      url: 'https://ledger-mxee7m0g8-subhannks-projects.vercel.app/'
    },
    {
      num: '03 /',
      title: 'Books Library',
      desc: 'A simple book library app built with React and Tailwind CSS.',
      image: 'images/books.jpg',
      tags: ['react', 'Tailwind CSS'],
      url: 'https://librarysystem2.netlify.app/'
    }
  ];

  return (
    <section id="projects" style={{ background: 'var(--surface)', transition: 'background-color 0.4s' }}>
      <div style={{ maxWidth: '1200px', margin: 'auto' }}>
        <div className="section-header reveal">
          <span className="section-label">What I've built</span>
          <h2 className="section-title">My <span className="outline select-none">Projects</span></h2>
        </div>
        <div className="projects-grid">
          {projectsData.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: auto;
        }
        .project-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          filter: grayscale(30%) brightness(0.8);
          transition: filter 0.4s;
        }
        .project-inner:hover .project-img {
          filter: grayscale(0%) brightness(1);
        }
        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(to bottom, transparent 40%, var(--surface2));
        }
        .project-num {
          position: absolute;
          top: 14px;
          left: 18px;
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: var(--accent);
          letter-spacing: 2px;
          z-index: 10;
        }
        .project-body {
          padding: 20px 22px 24px;
        }
        .project-body h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
          transition: color 0.4s;
        }
        .project-body p {
          font-size: 0.85rem;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 18px;
          transition: color 0.4s;
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 18px;
        }
        .project-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 1px;
          color: var(--accent);
          text-transform: uppercase;
          border: 1px solid var(--border);
          padding: 3px 10px;
          border-radius: 1px;
          transition: border-color 0.4s, color 0.4s;
        }
        .project-link {
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent);
          text-decoration: none;
          letter-spacing: 1px;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: gap 0.2s, color 0.4s;
        }
        .project-link:hover {
          gap: 12px;
        }
        .project-inner:hover {
          border-color: rgba(240, 224, 64, 0.4) !important;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(240, 224, 64, 0.1) !important;
        }
        body.light-theme .project-inner:hover {
          border-color: rgba(217, 119, 6, 0.4) !important;
        }
      `}} />
    </section>
  );
};

export default Projects;
