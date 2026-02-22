import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  // Lock scroll when menu is open (mobile UX)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/assets/LOGO (1).png" alt="Logo" />
      </div>
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li><a href="/">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><Link to="/register">Register</Link></li>
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
