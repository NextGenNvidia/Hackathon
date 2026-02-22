import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import RightSidebar from "../components/RightSidebar";
import "./AuthPage.css";

const provider = new GoogleAuthProvider();

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth(app);
  const { user, loading } = useAuth();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return (
    <div className="auth-bg">
      <Navbar />
      <RightSidebar />
      <div className="auth-overlay">
        <div className="auth-glassmorphic">
          Loading...
        </div>
      </div>
    </div>
  );
  if (user) return (
    <div className="auth-bg">
      <Navbar />
      <RightSidebar />
      <div className="auth-overlay">
        <div className="auth-glassmorphic">
          You are already signed in as {user.email || user.displayName}.
        </div>
      </div>
    </div>
  );

  return (
    <div className="auth-bg">
      <Navbar />
      <RightSidebar />
      <div className="auth-overlay">
        <div className="auth-glassmorphic">
          <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
          <form onSubmit={handleAuth}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
          </form>
          <button onClick={handleGoogle}>Continue with Google</button>
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button onClick={() => setIsSignUp((s) => !s)} style={{ marginLeft: 8 }}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
          {error && <p style={{ color: "#ffb3b3" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
