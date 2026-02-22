import React from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

export default function Sponsors() {
  return (
    <>
      <Navbar />
      <LeftSidebar />
      <RightSidebar />
      <div className="contact-bg" />
      <div className="contact-overlay">
        <div style={{ width: "100%", maxWidth: 1200, zIndex: 2, minHeight: "100vh", margin: "0 auto", padding: "40px 32px 0 32px", boxShadow: "none", background: "none", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ color: "#b9abe0", fontSize: "1.5rem", fontWeight: 600, marginTop: 32 }}>Coming Soon...</div>
        </div>
      </div>
    </>
  );
}
