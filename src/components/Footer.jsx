import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} <span>Subhan NK</span>. All rights reserved.</p>
      <div className="footer-socials">
        <a href="https://www.instagram.com/subhan_nk" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
        <a href="https://www.facebook.com/share/1CwUcs8osY" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook"></i></a>
        <a href="https://wa.me/919946684018" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
        <a href="#" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
        <a href="#" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        footer {
          background: var(--surface);
          border-top: 1px solid var(--border);
          padding: 30px 6vw;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          position: relative;
          z-index: 10;
          transition: background-color 0.4s, border-color 0.4s;
        }
        footer p {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          color: var(--muted);
          transition: color 0.4s;
        }
        footer p span {
          color: var(--accent);
          transition: color 0.4s;
        }
        .footer-socials {
          display: flex;
          gap: 14px;
        }
        .footer-socials a {
          color: var(--muted);
          font-size: 1rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-socials a:hover {
          color: var(--accent);
        }
      `}} />
    </footer>
  );
};

export default Footer;
