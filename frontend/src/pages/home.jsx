import React, { useRef } from "react";
import "./home.css";
import Navbar from "../components/Navbar";

function Home() {
  const spotlightRef = useRef();
  const torchBeamRef = useRef();
  const layer1Ref = useRef();
  const layer2Ref = useRef();

  // Mobile touch move handler
  const phonemove = (e) => {
    let x, y;
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      const { innerWidth, innerHeight } = window;
      x = (touch.clientX - innerWidth / 2) / (innerWidth / 2);
      y = (touch.clientY - innerHeight / 2) / (innerHeight / 2);
    } else {
      x = 0; y = 0;
    }
    if (layer1Ref.current) {
      layer1Ref.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    }
    if (layer2Ref.current) {
      layer2Ref.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    }
  };

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    if (layer1Ref.current) {
      layer1Ref.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    }
    if (layer2Ref.current) {
      layer2Ref.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    }
  };

  React.useEffect(() => {
    function updateBeam() {
      if (!spotlightRef.current || !torchBeamRef.current) return;
      const spot = spotlightRef.current.getBoundingClientRect();
      const home = document.querySelector('.home').getBoundingClientRect();
      // Center of spotlight relative to .home
      const spotX = spot.left + spot.width / 2 - home.left;
      const spotY = spot.top + spot.height / 2 - home.top;
      // Torch base (bottom center)
      const baseX = home.width / 2;
      const baseY = home.height;
      // Angle from base to spotlight
      const dx = spotX - baseX;
      const dy = spotY - baseY;
      const angle = Math.atan2(dx, -dy) * 180 / Math.PI;
      torchBeamRef.current.style.transform = `translateX(-50%) rotate(${angle}deg)`;
      // Set beam length
      const dist = Math.sqrt(dx*dx + dy*dy);
      torchBeamRef.current.style.height = `${dist}px`;
    }
    updateBeam();
    window.addEventListener('resize', updateBeam);
    return () => window.removeEventListener('resize', updateBeam);
  }, []);

  return (
    <div
      className="home"
      onMouseMove={handleMouseMove}
      onTouchMove={phonemove}
    >
      <Navbar />
      {/* Dark overlay with blue tint */}
      <div className="dark-overlay"></div>
      {/* Static Background Layer - No movement */}
      <img
        src="/assets/Static-layer.png"
        alt="Static Background"
        className="bat-parallax layer-static"
        draggable="false"
      />
      {/* Layer 2 - Middle - PARALLAX */}
      <img
        ref={layer2Ref}
        src="/assets/Untitled-1.png"
        alt="Middle Layer"
        className="bat-parallax layer2"
        draggable="false"
      />
      {/* Layer 1 - Front - PARALLAX */}
      <img
        ref={layer1Ref}
        src="/assets/22.png"
        alt="Front Layer"
        className="bat-parallax layer1"
        draggable="false"
      />
      {/* Torch Beam (Bottom -> Top Left) */}
      <div
        className="torch-beam"
        ref={torchBeamRef}
        style={{ transition: 'transform 0.3s, height 0.3s' }}
      ></div>
      {/* Bat Logo with Spotlight */}
      <div className="bat-logo-container">
        <div className="spotlight-beam" ref={spotlightRef}></div>
        <img
          src="/assets/Batman.png"
          alt="Batman Logo"
          className="bat-logo"
        />
      </div>
      {/* Road Layer at Bottom */}
      <div className="road-layer"></div>
      {/* Content */}
      {/* <div className="content">
        <h1>NEXTGEN HACKATHON</h1>
        <p>The Code Rises At Night</p>
      </div> */}
    </div>
  );
}

export default Home;
