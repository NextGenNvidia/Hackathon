import Accommodation from "./pages/Accommodation";
              
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BatSignalIntro from "./components/batmanloader";
import Home from "./pages/home";
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/RegisterPage";
import TimelinePage from "./components/ModernTimeline";
import { AuthProvider } from "./context/AuthContext";
import LeftSidebar from "./components/LeftSidebar";
import AvatarPage from "./pages/AvatarPage";
import AboutUs from "./pages/AboutUs";
import Sponsors from "./pages/Sponsors";

function App() {
  const [introDone, setIntroDone] = useState(() => {
    // Only show intro if not shown before
    return !localStorage.getItem("batmanIntroDone");
  });

  const handleIntroFinish = () => {
    setIntroDone(true);
    localStorage.setItem("batmanIntroDone", "true");
  };

  return (
    <>
      {!introDone && (
        <BatSignalIntro onFinish={handleIntroFinish} />
      )}
      {introDone && (
        <AuthProvider>
          <Router>
            <LeftSidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/accommodation" element={<Accommodation />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/avatar" element={<AvatarPage />} />
            </Routes>
          </Router>
        </AuthProvider>
      )}
    </>
  );
}

export default App;
