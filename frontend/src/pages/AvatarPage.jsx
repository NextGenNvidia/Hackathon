
import React from "react";
import { useAuth } from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RightSidebar from "../components/RightSidebar";
import "./AvatarPage.css";

export default function AvatarPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();
  // Placeholder avatars
  const avatars = [
    "/assets/avatar1.png",
    "/assets/avatar2.png",
    "/assets/avatar3.png",
    "/assets/avatar4.png"
  ];

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  return (
    <div className="avatar-page-bg">
      <Navbar />
      <RightSidebar />
      <div className="avatar-card">
        <div className="avatar-header">
          <span>Terminal live...</span>
          <br />
          <span>{user?.displayName || user?.email}</span>
        </div>
        <div className="avatar-main">
          <img
            src={avatars[0]}
            alt="Avatar"
            className="avatar-img"
          />
          <div className="avatar-info">
            <div className="avatar-name">{user?.displayName || user?.email}</div>
            <button className="avatar-btn">Change Avatar</button>
            <button className="avatar-btn logout-btn" onClick={handleLogout} style={{marginTop:12}}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
