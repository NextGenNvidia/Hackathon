import React from "react";
import "./BatSignalIntro.css";

function BatSignalIntro({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 3500);

    const timer2 = setTimeout(() => {
      onFinish();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div className={`intro ${fadeOut ? "fade-out" : ""}`}>
      <div className="spotlight"></div>
      <div className="bat-logo">🦇</div>
      <h1 className="intro-text">NEXTGEN HACKATHON</h1>
    </div>
  );
}

export default BatSignalIntro;
