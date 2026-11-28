import React, { useState } from 'react';
import '@/assets/styles/Contact.scss';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';

function Contact() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isNameEmpty = name.trim() === '';
    const isEmailEmpty = email.trim() === '';
    const isMsgEmpty = message.trim() === '';

    setNameError(isNameEmpty);
    setEmailError(isEmailEmpty);
    setMessageError(isMsgEmpty);

    if (!isNameEmpty && !isEmailEmpty && !isMsgEmpty) {
      setSubmitted(true);
      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setSubmitted(false);
      }, 4000);
    }
  };

  return (
    <div id="contact">
      <div className="items-container">
        <h1>Contact Me</h1>

        <div className="contact-container">
          {/* Left panel: Direct Contact & Info */}
          <div className="contact-info-panel">
            <p className="contact-intro">
              Got a project in mind, an architectural challenge, or an exciting career opportunity? 
              Feel free to reach out directly or send me a message!
            </p>

            <div className="contact-card-list">
              <a href="mailto:nguyenmanhhuy.dev@gmail.com" className="contact-info-card">
                <div className="icon-box">
                  <EmailIcon />
                </div>
                <div className="card-text">
                  <span className="card-label">Email</span>
                  <span className="card-value">nguyenmanhhuy.dev@gmail.com</span>
                </div>
              </a>
              <a href="tel:0962325643" className="contact-info-card">
                <div className="icon-box">
                  <PhoneIcon />
                </div>
                <div className="card-text">
                  <span className="card-label">Phone</span>
                  <span className="card-value">0962 325 643</span>
                </div>
              </a>
              <div className="contact-info-card">
                <div className="icon-box">
                  <LocationOnIcon />
                </div>
                <div className="card-text">
                  <span className="card-label">Location</span>
                  <span className="card-value">Thanh Liệt, Hà Nội</span>
                </div>
              </div>
            </div>

            <div className="social-links-row">
              <a 
                href="https://github.com/ManhHuy15" 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn"
              >
                <GitHubIcon fontSize="small" /> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/nguyenmanhhuy2003/" 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn"
              >
                <LinkedInIcon fontSize="small" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Right panel: Modern Form */}
          <div className="contact-form-panel">
            <h3 className="form-title">Send a Message</h3>

            {submitted && (
              <div className="success-banner">
                Thank you, {name}! Your message has been received. I will get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="name-input">Your Name *</label>
                  <input
                    id="name-input"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (nameError) setNameError(false);
                    }}
                    className={nameError ? 'error' : ''}
                  />
                  {nameError && <span className="error-msg">Please enter your name</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email-input">Email or Phone *</label>
                  <input
                    id="email-input"
                    type="text"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(false);
                    }}
                    className={emailError ? 'error' : ''}
                  />
                  {emailError && <span className="error-msg">Please enter your email or phone</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message-input">Message *</label>
                <textarea
                  id="message-input"
                  placeholder="Tell me about your project, ideas, or questions..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (messageError) setMessageError(false);
                  }}
                  className={messageError ? 'error' : ''}
                />
                {messageError && <span className="error-msg">Please enter your message</span>}
              </div>

              <button type="submit" className="submit-btn">
                <span>Send Message</span>
                <SendIcon fontSize="small" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
