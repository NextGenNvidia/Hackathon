import React, { useEffect, useRef } from "react";
import "./batmanloader.css";

function BatmanLoader({ onFinish }) {
  const spotlightRef = useRef();
  const torchBeamRef = useRef();
  useEffect(() => {
    // Wait for animation to finish then switch to home
    const timer = setTimeout(() => {
      onFinish();
    }, 4000);

    function updateBeam() {
      if (!spotlightRef.current || !torchBeamRef.current) return;
      const spot = spotlightRef.current.getBoundingClientRect();
      const loader = document.querySelector('.loader').getBoundingClientRect();
      const spotX = spot.left + spot.width / 2 - loader.left;
      const spotY = spot.top + spot.height / 2 - loader.top;
      const baseX = loader.width / 2;
      const baseY = loader.height;
      const dx = spotX - baseX;
      const dy = spotY - baseY;
      const angle = Math.atan2(dx, -dy) * 180 / Math.PI;
      torchBeamRef.current.style.transform = `translateX(-50%) rotate(${angle}deg)`;
      const dist = Math.sqrt(dx*dx + dy*dy);
      torchBeamRef.current.style.height = `${dist}px`;
    }
    updateBeam();
    window.addEventListener('resize', updateBeam);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateBeam);
    };
  }, [onFinish]);

  return (
    <div className="loader">
      <div className="loader-torch-beam" ref={torchBeamRef}></div>
      <div className="loader-bat-logo-container">
        <div className="spotlight-beam" ref={spotlightRef}></div>
        <img
          src="/assets/Batman.png"
          alt="Batman Logo"
          className="bat-logo"
        />
      </div>
    </div>
  );
}

export default BatmanLoader;
