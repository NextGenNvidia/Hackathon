import "./contact.css";
import React from "react";
import Navbar from "../components/Navbar";
import RightSidebar from "../components/RightSidebar";
export default function ContactPage() {
  const team = [
    { name: "Devam Jasani", position: "Competitions Manager" },
    { name: "Jaya Meena", position: "Competitions Manager" },
    { name: "Vaibhav Avhad", position: "Competitions Manager" },
    { name: "Manish Chahar", position: "Hospitality & Marketing Manager" },
    { name: "Mohit Doke", position: "Hospitality & Marketing Manager" },
    { name: "Amit Kumar", position: "Sponsorship Lead" },
    { name: "Priya Singh", position: "Design Head" },
    { name: "Rahul Sharma", position: "Technical Lead" },
    { name: "Sneha Patel", position: "PR Manager" },
    { name: "Rohan Gupta", position: "Logistics Head" }
  ];
  return (
    <>
      <Navbar />
      <RightSidebar />
      <div className="contact-bg" />
      <div className="contact-overlay">
        <div className="contact-container">
          <h1>Our Team</h1>
          <div className="contact-team-grid">
            {team.map((member, idx) => (
              <div className="contact-card" key={idx}>
                <div className="contact-photo">
                  <img src="https://via.placeholder.com/100x100?text=Photo" alt="Team Member" />
                </div>
                <div className="contact-name">{member.name}</div>
                <div className="contact-role">{member.position}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
