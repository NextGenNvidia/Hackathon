import React from "react";
import Navbar from "./Navbar";
import RightSidebar from "./RightSidebar";

const MILESTONES = [
  { label: "Desk at main gate", description: "Entry of participants" },
  { label: "Dinner", description: "8:00 pm" },
  { label: "Accommodation", description: "9:00 pm" },
  { label: "Breakfast", description: "8:00 am-9:00 am" },
  { label: "Intro Event", description: "9:00 am-10:30 am" },
  { label: "Problem Reveal", description: "10:30 am-11:00 am" },
  { label: "Round 1", description: "11:00 am – 5:00 pm" },
  { label: "Round 2", description: "5:00 pm – 11:00 pm" },
  { label: "Dance and Music", description: "11:00 pm – 12:30 am" },
  { label: "Round 3", description: "12:30 am – 11:00 am" },
  { label: "Breakfast @TBI", description: "9:00 am – 10:00 am" },
  { label: "AI Summit", description: "Inauguration 10:00 am" },
  { label: "Power Talk", description: "10:00 am – 12:30 pm" },
  { label: "Lunch", description: "12:30 pm – 1:30 pm" },
  { label: "Prize Distribution", description: "1:30 pm – 2:30 pm" },
  { label: "High Tea", description: "2:30 pm – 3:30 pm" },
];

export default function ModernTimeline() {
  return (
    <>
      <Navbar />
      <RightSidebar />
      <div className="contact-bg" />
      <div className="contact-overlay">
        <div style={{ width: "100%", maxWidth: 1200, zIndex: 2, minHeight: "100vh", margin: "0 auto", padding: "40px 32px 0 32px", boxShadow: "none", background: "none" }}>
          <h2 style={{ color: "#22d3ee", textAlign: "left", margin: 0, fontSize: "2.2rem", fontWeight: 700 }}>Event Timeline</h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", position: "relative", minHeight: "80vh" }}>
            <div style={{ width: "100%", maxWidth: 1200, display: "flex", flexDirection: "column", gap: 48, margin: "0 auto", position: "relative" }}>
              {/* Central vertical line below heading, height matches timeline */}
              <div style={{ position: "absolute", left: "50%", top: 32, height: `calc(100% - 32px)`, width: 4, background: "linear-gradient(180deg, #22d3ee 0%, #232946 100%)", transform: "translateX(-50%)", zIndex: 1 }} />
              {MILESTONES.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} style={{ display: "flex", justifyContent: isLeft ? "flex-end" : "flex-start", alignItems: "center", position: "relative", minHeight: 120 }}>
                    {/* Card */}
                    <div style={{
                      background: "#1a2236",
                      color: "#fff",
                      borderRadius: 18,
                      boxShadow: "0 8px 32px rgba(34,211,238,0.18)",
                      padding: "24px 32px",
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      zIndex: 2,
                      width: 420,
                      maxWidth: "90vw",
                      marginLeft: isLeft ? 0 : 64,
                      marginRight: isLeft ? 64 : 0,
                      border: "2px solid #22d3ee",
                    }}>
                      <div style={{ fontWeight: 700, fontSize: "1.3rem", color: "#22d3ee", marginBottom: 8 }}>{m.label}</div>
                      <div style={{ color: "#b9abe0" }}>{m.description}</div>
                    </div>
                    {/* Connector from card to central line */}
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      left: isLeft ? "calc(50% - 2px)" : "calc(50% + 2px)",
                      width: 64,
                      height: 4,
                      background: "linear-gradient(90deg, #22d3ee 0%, #232946 100%)",
                      transform: isLeft ? "" : "translateX(-100%)",
                      zIndex: 1,
                      borderRadius: 2,
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
