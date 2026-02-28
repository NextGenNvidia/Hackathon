
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RightSidebar from "../components/RightSidebar";
import "./AvatarPage.css";

const AVATAR_POOL = [
  { id: "avatar-01", title: "Avatar 01", image: "/assets/avatar1.png" },
  { id: "avatar-02", title: "Avatar 02", image: "/assets/avatar2.png" },
  { id: "avatar-03", title: "Avatar 03", image: "/assets/avatar3.png" },
  { id: "avatar-04", title: "Avatar 04", image: "/assets/avatar4.png" },
  { id: "avatar-05", title: "Avatar 05", image: "/assets/avatar5.png" },
];
function Typewriter({ text, speed = 100 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;

      if (i === text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayedText}
      <span className="cursor">|</span>
    </span>
  );
}
export default function AvatarPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();
  const [assignedAvatarId, setAssignedAvatarId] = useState(null);

  const userLabel = user?.displayName || user?.email || "Participant";
  const userKey = user?.uid || user?.email || "guest-user";

  useEffect(() => {
    const storageKey = `nextgen-random-avatar-${userKey}`;
    const savedAvatarId = localStorage.getItem(storageKey);

    if (savedAvatarId && AVATAR_POOL.some((avatar) => avatar.id === savedAvatarId)) {
      setAssignedAvatarId(savedAvatarId);
      return;
    }

    const randomAvatar = AVATAR_POOL[Math.floor(Math.random() * AVATAR_POOL.length)];
    localStorage.setItem(storageKey, randomAvatar.id);
    setAssignedAvatarId(randomAvatar.id);
  }, [userKey]);

  const assignedAvatar = useMemo(
    () => AVATAR_POOL.find((avatar) => avatar.id === assignedAvatarId) || AVATAR_POOL[0],
    [assignedAvatarId]
  );

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  const handleChangeAvatar = () => {
    const currentId = assignedAvatar.id;
    const candidates = AVATAR_POOL.filter((avatar) => avatar.id !== currentId);
    const nextAvatar = candidates[Math.floor(Math.random() * candidates.length)];
    const storageKey = `nextgen-random-avatar-${userKey}`;
    localStorage.setItem(storageKey, nextAvatar.id);
    setAssignedAvatarId(nextAvatar.id);
  };

  return (
    <div className="avatar-page">
      <Navbar />
      <RightSidebar />
      <div className="avatar-bg-layer" aria-hidden="true"></div>
      <div className="avatar-noise-layer" aria-hidden="true"></div>

      <main className="avatar-wrap">
        <section className="avatar-hero-card">
          <p className="avatar-kicker">Identity Console</p>
          <h1>
  <Typewriter text="Enter the Arena" speed={80} />
</h1>
          

          <div className="avatar-main-panel">
            <div className="avatar-main-media">
              <img src={assignedAvatar.image} alt={assignedAvatar.title} className="avatar-main-image" />
            </div>

            <div className="avatar-main-info">
              <p className="avatar-main-name">{userLabel}</p>
              <p className="avatar-main-id">Assigned: {assignedAvatar.title}</p>
              <p className="avatar-main-note">
                This avatar is randomly allocated and saved for your account.
              </p>

              <div className="avatar-action-row">
                <button className="avatar-change-btn" onClick={handleChangeAvatar}>
                  Change Avatar
                </button>
                <button className="avatar-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
