import React, { useRef } from "react";
import "./home.css";

function Home() {
  const layer1Ref = useRef();
  const layer2Ref = useRef();

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

    // Layer 1: moves most (foreground)
    if (layer1Ref.current) {
      layer1Ref.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    }

    // Layer 2: moves moderately (middle)
    if (layer2Ref.current) {
      layer2Ref.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    }
  };

  return (
    <div className="home" onMouseMove={handleMouseMove}>
      {/* Static Background Layer - No movement */}
      <img
        src="/assets/Static-layer.png"
        alt="Static Background"
        className="bat-parallax layer-static"
        draggable="false"
      />

      {/* Dark Blue Overlay */}
      <div className="dark-overlay"></div>

      {/* Layer 3 - Batman
      <img
        src="/assets/Batman.png"
        alt="Batman Layer"
        className="bat-parallax layer3"
        draggable="false"
      /> */}

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
      <div className="torch-beam"></div>

      {/* Bat Logo with Spotlight */}
      <div className="bat-logo-container">
        <div className="spotlight-beam"></div>
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
