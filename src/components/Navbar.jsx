import React, { useEffect, useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a 
          href="#home" 
          className="nav-logo"
          onClick={(e) => handleNavLinkClick(e, 'home')}
        >
          SNK
        </a>

        {/* Desktop Links */}
        <ul className="nav-links" id="navLinks" style={{ display: mobileMenuOpen ? 'none' : 'flex' }}>
          {['home', 'about', 'resume', 'projects', 'contact'].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                onClick={(e) => handleNavLinkClick(e, section)}
              >
                {section}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side controls (Theme Toggle & Menu) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Custom Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              cursor: 'pointer',
              transition: 'border-color 0.2s, transform 0.3s, color 0.2s',
              outline: 'none'
            }}
            className="theme-toggle-btn"
          >
            {theme === 'dark' ? (
              <Sun size={16} />
            ) : (
              <Moon size={16} />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <div
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="nav-toggle"
            id="navToggle"
          >
            {mobileMenuOpen ? (
              <X size={24} style={{ color: 'var(--text)' }} />
            ) : (
              <>
                <span></span><span></span><span></span>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className="mobile-drawer"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 10, 15, 0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: mobileMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 400,
          transition: '0.3s'
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            alignItems: 'center'
          }}
        >
          {['home', 'about', 'resume', 'projects', 'contact'].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                onClick={(e) => handleNavLinkClick(e, section)}
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  textDecoration: 'none',
                  textTransform: 'capitalize',
                  letterSpacing: '1px',
                  transition: 'color 0.3s'
                }}
              >
                {section}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .nav-links {
          display: flex;
          gap: 40px;
          list-style: none;
        }
        .nav-links a {
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: color 0.2s;
          position: relative;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent);
          transition: width 0.3s;
        }
        .nav-links a:hover {
          color: var(--accent);
        }
        .nav-links a:hover::after {
          width: 100%;
        }
        .theme-toggle-btn:hover {
          border-color: var(--accent) !important;
          transform: scale(1.05);
        }
        .nav-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }
        .nav-toggle span {
          width: 26px;
          height: 2px;
          background: var(--text);
          display: block;
          transition: 0.3s;
        }
        
        @media (max-width: 900px) {
          .nav-links {
            display: none !important;
          }
          .nav-toggle {
            display: flex !important;
            z-index: 501;
          }
        }
      `}} />
    </>
  );
};

export default Navbar;
