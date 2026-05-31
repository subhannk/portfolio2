import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [waStatus, setWaStatus] = useState('idle'); // 'idle' | 'sending' | 'success'
  const [emailStatus, setEmailStatus] = useState('idle'); // 'idle' | 'sending' | 'success'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert('Please enter your name.');
      return false;
    }
    if (!formData.message.trim()) {
      alert('Please write your message.');
      return false;
    }
    return true;
  };

  const sendWhatsApp = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setWaStatus('sending');
    setTimeout(() => {
      const text = `Hi Subhan,\n\nI am *${formData.name}* (${formData.email || 'N/A'}).\n\n*Subject:* ${formData.subject || 'Portfolio Contact'}\n*Message:* ${formData.message}`;
      const whatsappUrl = `https://wa.me/919946684018?text=${encodeURIComponent(text)}`;
      
      window.open(whatsappUrl, '_blank');
      setWaStatus('success');

      setTimeout(() => {
        setWaStatus('idle');
      }, 3000);
    }, 800);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setEmailStatus('sending');
    setTimeout(() => {
      const body = `Hi Subhan,\n\nI am ${formData.name} (${formData.email || 'N/A'}).\n\nMessage:\n${formData.message}`;
      const mailtoUrl = `mailto:subhannk2002@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(body)}`;
      
      window.location.href = mailtoUrl;
      setEmailStatus('success');

      setTimeout(() => {
        setEmailStatus('idle');
      }, 3000);
    }, 800);
  };

  return (
    <section id="contact" style={{ background: 'var(--bg)', transition: 'background-color 0.4s' }}>
      <div className="section-header reveal" style={{ maxWidth: '1100px', margin: '0 auto 70px' }}>
        <span className="section-label">Get in touch</span>
        <h2 className="section-title">Contact <span className="outline select-none">Me</span></h2>
      </div>
      <div className="contact-inner">
        <div className="contact-info reveal">
          <h3>Let's work<br />together.</h3>
          <p>I'm open to freelance projects, collaborations, and full-time opportunities. Drop a message — I reply fast!</p>
          
          <div className="contact-detail">
            <div className="contact-icon"><MapPin size={18} /></div>
            <div className="contact-detail-text">
              <span>Location</span>
              <p>Malappuram, Kerala, India — 676306</p>
            </div>
          </div>
          <div className="contact-detail">
            <div className="contact-icon"><Phone size={18} /></div>
            <div className="contact-detail-text">
              <span>Phone</span>
              <p>+91 9946684018</p>
            </div>
          </div>
          <div className="contact-detail">
            <div className="contact-icon"><Mail size={18} /></div>
            <div className="contact-detail-text">
              <span>Email</span>
              <p>subhannk2002@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form reveal reveal-delay-1">
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Your name" 
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                placeholder="your@email.com" 
              />
            </div>
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input 
              type="text" 
              name="subject" 
              value={formData.subject} 
              onChange={handleInputChange} 
              placeholder="Project / Collaboration / Other" 
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleInputChange} 
              placeholder="Tell me about your project..."
            />
          </div>
          <div className="form-submit-row" style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
            <button 
              className="submit-btn" 
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: waStatus === 'success' ? '#2ecc71' : 'var(--accent)',
                color: waStatus === 'success' ? '#ffffff' : '#0a0a0f',
                borderColor: waStatus === 'success' ? '#2ecc71' : 'transparent'
              }} 
              onClick={sendWhatsApp}
            >
              {waStatus === 'idle' && (
                <>
                  WhatsApp <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.2rem' }}></i>
                </>
              )}
              {waStatus === 'sending' && 'Sending...'}
              {waStatus === 'success' && 'Sent ✓'}
            </button>
            
            <button 
              className="submit-btn btn-email" 
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: emailStatus === 'success' ? '#2ecc71' : 'transparent',
                borderColor: emailStatus === 'success' ? '#2ecc71' : 'var(--accent)',
                color: emailStatus === 'success' ? '#ffffff' : 'var(--text)'
              }} 
              onClick={sendEmail}
            >
              {emailStatus === 'idle' && (
                <>
                  Email <Mail size={16} />
                </>
              )}
              {emailStatus === 'sending' && 'Sending...'}
              {emailStatus === 'success' && 'Sent ✓'}
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .contact-inner {
          max-width: 1100px;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
        }
        .contact-info h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 16px;
          transition: color 0.4s;
        }
        .contact-info p {
          font-size: 1rem;
          color: var(--muted);
          line-height: 1.8;
          margin-bottom: 36px;
          transition: color 0.4s;
        }
        .contact-detail {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
        }
        .contact-icon {
          width: 42px;
          height: 42px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          font-size: 1rem;
          flex-shrink: 0;
          transition: background-color 0.4s, border-color 0.4s, color 0.4s;
        }
        .contact-detail-text span {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: var(--muted);
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: color 0.4s;
        }
        .contact-detail-text p {
          color: var(--text);
          font-size: 0.95rem;
          margin: 3px 0 0;
          transition: color 0.4s;
        }
        .contact-form {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 40px;
          border-radius: 4px;
          box-shadow: 0 15px 35px var(--shadow);
          transition: background-color 0.4s, border-color 0.4s, box-shadow 0.4s;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .submit-btn {
          width: 100%;
          padding: 15px;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.9rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: 1px solid transparent;
          border-radius: 2px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s, border-color 0.2s;
        }
        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px var(--glow);
        }
        .btn-email:hover {
          background: var(--accent) !important;
          color: #0a0a0f !important;
          border-color: var(--accent) !important;
        }
        
        @media (max-width: 900px) {
          .contact-inner {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .form-submit-row {
            flex-direction: column;
          }
        }
      `}} />
    </section>
  );
};

export default Contact;
