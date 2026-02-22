import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BatSignalIntro from "./components/batmanloader";
import Home from "./pages/home";
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import LeftSidebar from "./components/LeftSidebar";
import AvatarPage from "./pages/AvatarPage";
// import About from "./pages/About";
// import Register from "./pages/Register";

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && (
        <BatSignalIntro onFinish={() => setIntroDone(true)} />
      )}

      {introDone && (
        <AuthProvider>
          <Router>
            <LeftSidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* <Route path="/about" element={<About />} /> */}
              <Route path="/register" element={<RegisterPage />} />
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
