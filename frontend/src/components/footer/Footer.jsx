import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { Plane, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <>
      {/* ── CTA SECTION ── */}
      <div className="cta-section">
        <div className="cta-glow cta-g1" />
        <div className="cta-glow cta-g2" />
        <div className="cta-inner">
          <div className="cta-left">
            <span className="cta-tag">✦ JOIN US TODAY</span>
            <h2 className="cta-title">
              Your Next Adventure<br />
              <span className="cta-italic">Starts Here</span>
            </h2>
            <p className="cta-desc">
              Join thousands of travelers discovering and booking<br />
              India's most beautiful destinations through DestiNova.
            </p>
            <div className="cta-stats">
              <div className="cta-stat"><strong>500+</strong><span>Travelers</span></div>
              <div className="cta-divider" />
              <div className="cta-stat"><strong>24</strong><span>Packages</span></div>
              <div className="cta-divider" />
              <div className="cta-stat"><strong>4.8★</strong><span>Rating</span></div>
            </div>
          </div>
          <div className="cta-right">
            <div className="cta-card">
              <p className="cta-card-label">Start your journey today</p>
              <Link to="/users/sign-up" className="cta-btn-primary">
                Get Started — It's Free →
              </Link>
              <Link to="/users/sign-in" className="cta-btn-ghost">
                Already have an account? Sign in
              </Link>
              <p className="cta-card-note">No credit card required</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER MAIN ── */}
      <footer className="footer-main">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon"><Plane size={16} /></div>
              <span>Destino<b>va</b></span>
            </div>
            <p className="footer-brand-desc">
              Handcrafted journeys to India's most breathtaking destinations. Plan, book, and travel — effortlessly.
            </p>
            {/* <div className="footer-socials">
              <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
              <a href="#" aria-label="Youtube"><Youtube size={16} /></a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h6 className="footer-col-title">Explore</h6>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/packages">Packages</Link></li>
              <li><Link to="/booking">My Bookings</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h6 className="footer-col-title">Company</h6>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Travel Blog</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h6 className="footer-col-title">Contact</h6>
            <ul className="footer-contact">
              <li><MapPin size={13} /><span>Indore, India</span></li>
              <li><Mail size={13} /><span>hello@destinova.in</span></li>
              <li><Phone size={13} /><span>+91 98765 43210</span></li>
            </ul>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="footer-bar">
          <p>© 2026 DestiNova. All rights reserved.</p>
          <div className="footer-bar-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;