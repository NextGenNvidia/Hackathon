import "./contact.css";
import React from "react";
import Navbar from "../components/Navbar";
import RightSidebar from "../components/RightSidebar";

export default function ContactPage() {
  const teamMembers = [
    {
      fullName: "Raj Ojha",
      image: "/assets/Raj.png",
      role: "Core Team",
      email: "raj.ai.arena.kiet@gmail.com",
    },
    {
      fullName: "Tushar Bhardwaj",
      image: "/assets/Tushar.png",
      role: "Core Team",
      email: "tushar.ai.arena.kiet@gmail.com",
    },
    {
      fullName: "Samarth Shukla",
      image: "/assets/Samarth.png",
      role: "Core Team",
      email: "samarth.ai.arena.kiet@gmail.com",
    },
    {
      fullName: "Shreya Jain",
      image: "/assets/shreya.png",
      role: "Core Team",
      email: "shreya.ai.arena.kiet@gmail.com",
    },
    {
      fullName: "Ujjawal Tyagi",
      image: "/assets/Ujjawal.png",
      role: "Core Team",
      email: "ujjawal.ai.arena.kiet@gmail.com",
    },
    {
      fullName: "Aditya Kanaujiya",
      image: "/assets/Aditya.png",
      role: "Core Team",
      email: "aditya.ai.arena.kiet@gmail.com",
    },
  ];

  const initials = (name) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="contact-shell">
      <Navbar />
      <RightSidebar />
      <div className="contact-bg" aria-hidden="true"></div>
      <div className="contact-noise" aria-hidden="true"></div>

      <main className="contact-overlay">
        <section className="contact-container">
          <header className="contact-hero">
            <p className="contact-kicker">Get In Touch</p>
            <h1>Contact Team</h1>
            <p className="contact-lead">
              Reach out to the core organizing team for event updates, queries, and on-ground coordination.
            </p>
          </header>

          <div className="contact-team-grid">
            {teamMembers.map((member) => (
              <article className="contact-card" key={member.fullName}>
                <div className="contact-photo-wrap">
                  <img
                    src={member.image}
                    alt={member.fullName}
                    className="contact-photo"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      const fallback = event.currentTarget.nextElementSibling;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="contact-photo-fallback" aria-hidden="true">
                    {initials(member.fullName)}
                  </div>
                </div>

                <div className="contact-name">{member.fullName}</div>
                <a className="contact-email" href={`mailto:${member.email}`}>
                  {member.email}
                </a>
                <div className="contact-role">{member.role}</div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
