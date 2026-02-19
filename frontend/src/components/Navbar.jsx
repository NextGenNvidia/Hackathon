import React, { useRef, useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <img src="/assets/Batman.png" alt="Logo" />
        <span className="navbar-title">NEXTGEN</span>
      </div>
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li><a href="/">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#register">Register</a></li>
      </ul>
      <button
        className={`navbar-burger ${menuOpen ? "open" : ""}`}
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      <div
        className={`navbar-backdrop ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
    </nav>
  );
}

export default Navbar;
