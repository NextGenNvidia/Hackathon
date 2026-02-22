import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img src="/assets/sidebar/home.svg" alt="Home" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/timeline">
              <img src="/assets/sidebar/events.svg" alt="Timeline" />
              <span>Timeline</span>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <img src="/assets/sidebar/contact.svg" alt="Contact" />
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <img src="/assets/sidebar/about.svg" alt="About Us" />
              <span>About us</span>
            </Link>
          </li>
          <li>
            <Link to="/sponsors">
              <img src="/assets/sidebar/sponsors.svg" alt="Sponsors" />
              <span>Sponsors</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
