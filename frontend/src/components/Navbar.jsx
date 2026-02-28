import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [socialsOpen, setSocialsOpen] = useState(false);
  const { user } = useAuth();

  // Lock scroll when menu is open (mobile UX)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSocialsOpen(false); // Reset socials when menu closes
    }
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/assets/LOGO (1).png" alt="Logo" />
      </div>
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
        <li><Link to="/accommodation" onClick={() => setMenuOpen(false)}>Accommodation</Link></li>
        <li><a href="https://unstop.com/hackathons/ai-arena-gotham-edition-kiet-group-of-institutions-1640378?lb=i1Fw6PAU" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Register</a></li>

        {/* Mobile-only additional links */}
        <li className="mobile-only-link"><Link to="/timeline" onClick={() => setMenuOpen(false)}>Timeline</Link></li>
        <li className="mobile-only-link"><Link to="/sponsors" onClick={() => setMenuOpen(false)}>Sponsors</Link></li>
        <li className="mobile-only-link"><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
        <li className="mobile-only-link">
          <Link to={user ? "/avatar" : "/auth"} onClick={() => setMenuOpen(false)}>
            {user ? "My Avatar" : "Sign In"}
          </Link>
        </li>

        {/* Expandable Socials for Mobile */}
        <li className={`nav-socials-accordion ${socialsOpen ? "active" : ""}`}>
          <button
            className="socials-toggle-btn"
            onClick={() => setSocialsOpen(!socialsOpen)}
          >
            Socials {socialsOpen ? "-" : "+"}
          </button>
          <div className="nav-social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </li>
      </ul>
      <div className="navbar-actions">
        <button
          className={`navbar-burger ${menuOpen ? "open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {user ? (
        <Link to="/avatar" className="signup-btn">{user.displayName || user.email}</Link>
      ) : (
        <Link to="/auth" className="signup-btn">Sign In / Sign Up</Link>
      )}
      <div
        className={`navbar-backdrop ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
    </nav>
  );
}

export default Navbar;
