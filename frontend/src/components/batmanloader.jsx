import React, { useEffect } from "react";
import "./batmanloader.css";

function BatmanLoader({ onFinish }) {
  useEffect(() => {
    // Wait for animation to finish then switch to home
    const timer = setTimeout(() => {
      onFinish();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className="loader">
      <div className="loader-torch-beam"></div>

      <div className="loader-bat-logo-container">
        <div className="spotlight-beam"></div>
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
