import React, { useEffect, useRef, useState } from 'react';

const Resume = () => {
  const [animateSkills, setAnimateSkills] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setAnimateSkills(true);
          observer.unobserve(entry.target); // Trigger once
        }
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const education = [
    {
      title: 'BA English',
      date: '2020 — 2023',
      desc: 'Bachelor of Arts in English, building strong analytical, critical thinking, and communication skills.'
    },
    {
      title: 'Software Development Course',
      date: '2024 — Present',
      desc: '6-month professional course covering full-stack web development, MERN stack, RESTful APIs, and modern dev tools.'
    }
  ];

  const experience = [
    {
      title: 'MERN Stack Developer',
      date: '2024 — Present · Freelance',
      desc: 'Building and maintaining full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Implementing RESTful APIs and contributing to both frontend and backend development.'
    }
  ];

  const skills = [
    { name: 'HTML5', value: 90 },
    { name: 'CSS3 / Bootstrap', value: 95 },
    { name: 'JavaScript', value: 88 },
    { name: 'React.js', value: 85 },
    { name: 'Node.js / Express', value: 80 },
    { name: 'MongoDB', value: 78 }
  ];

  return (
    <section id="resume" style={{ background: 'var(--bg)', transition: 'background-color 0.4s' }}>
      <div style={{ maxWidth: '1200px', margin: 'auto' }}>
        <div className="section-header reveal">
          <span className="section-label">My Background</span>
          <h2 className="section-title">Resume &amp; <span className="outline select-none">Skills</span></h2>
        </div>
        <div className="resume-grid">
          <div>
            <div className="resume-block reveal">
              <h3>Education</h3>
              <div className="timeline-container">
                {education.map((item, idx) => (
                  <div key={idx} className="timeline-item">
                    <h4>{item.title}</h4>
                    <span className="date">{item.date}</span>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="resume-block reveal reveal-delay-1" style={{ marginTop: '40px' }}>
              <h3>Experience</h3>
              <div className="timeline-container">
                {experience.map((item, idx) => (
                  <div key={idx} className="timeline-item">
                    <h4>{item.title}</h4>
                    <span className="date">{item.date}</span>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div ref={skillsRef} className="reveal reveal-delay-2">
            <div className="resume-block">
              <h3>Technical Skills</h3>
              <div style={{ marginTop: '10px' }}>
                {skills.map((skill, idx) => (
                  <div key={idx} className="skill-item" style={{ marginBottom: '22px' }}>
                    <div className="skill-label">
                      <span>{skill.name}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-fill animate" 
                        style={{ 
                          width: animateSkills ? `${skill.value}%` : '0%',
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .resume-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          max-width: 1200px;
          margin: auto;
        }
        .resume-block h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color 0.4s;
        }
        .resume-block h3::before {
          content: '';
          width: 28px;
          height: 2px;
          background: var(--accent);
          transition: background-color 0.4s;
        }
        .timeline-item h4 {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 4px;
          transition: color 0.4s;
        }
        .timeline-item .date {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: var(--accent2);
          letter-spacing: 1px;
          margin-bottom: 8px;
          display: block;
          transition: color 0.4s;
        }
        .timeline-item p {
          font-size: 0.88rem;
          color: var(--muted);
          line-height: 1.7;
          transition: color 0.4s;
        }
        .skill-label {
          display: flex;
          justify-content: space-between;
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          color: var(--muted);
          letter-spacing: 1px;
          margin-bottom: 8px;
          transition: color 0.4s;
        }
        .skill-label span:last-child {
          color: var(--accent);
          transition: color 0.4s;
        }
        
        @media (max-width: 900px) {
          .resume-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }
        }
      `}} />
    </section>
  );
};

export default Resume;
