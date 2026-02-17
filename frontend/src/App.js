import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BatSignalIntro from "./components/batmanloader";
import Home from "./pages/home";
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
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} /> */}
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
