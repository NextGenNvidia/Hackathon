import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RightSidebar from "../components/RightSidebar";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [members, setMembers] = useState([
    { name: "", email: "", college: "" },
    { name: "", email: "", college: "" }
  ]); // Start with 2 members
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="register-bg">
        <Navbar />
        <RightSidebar />
        <div className="register-overlay">
          <div className="register-glassmorphic">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  const handleMemberChange = (idx, field, value) => {
    const updated = [...members];
    updated[idx][field] = value;
    setMembers(updated);
  };

  const addMember = () => {
    if (members.length < 4) setMembers([...members, { name: "", email: "", college: "" }]);
  };

  const removeMember = (idx) => {
    if (members.length > 2) setMembers(members.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!teamName || !collegeName || !leaderName || !leaderEmail) {
      setError("All fields are required.");
      return;
    }
    // Build members array
    const membersArray = [
      { name: leaderName, email: leaderEmail, college: collegeName },
      ...members.map(m => ({ name: m.name, email: m.email, college: m.college }))
    ].filter(m => m.name && m.email && m.college);
    if (membersArray.length < 2) {
      setError("Minimum 2 members required");
      return;
    }
    if (membersArray.length > 5) {
      setError("Maximum 5 members allowed");
      return;
    }
    // Submit to Supabase
    const { error: supabaseError } = await supabase.from("teams").insert([
      {
        team_name: teamName,
        college_name: collegeName,
        leader_name: leaderName,
        leader_email: leaderEmail,
        members: membersArray
      }
    ]);
    if (supabaseError) {
      setError(supabaseError.message);
      return;
    }
    setSuccess("Registration successful!");
    setTeamName("");
    setCollegeName("");
    setLeaderName("");
    setLeaderEmail("");
    setMembers([
      { name: "", email: "", college: "" },
      { name: "", email: "", college: "" }
    ]);
  };

  return (
    <div className="register-bg">
      <Navbar />
      <RightSidebar />
      <div className="register-overlay">
        <div className="register-container">
          <div className="register-header">
            <h2>Team Registration</h2>
            <div className="accent-line"></div>
          </div>

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-section register-main-card">
              <h3 className="section-title">Squad Identity</h3>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Team Name"
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Leader College Name"
                  value={collegeName}
                  onChange={e => setCollegeName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Leader Name"
                  value={leaderName}
                  onChange={e => setLeaderName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Leader Email"
                  value={leaderEmail}
                  onChange={e => setLeaderEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-section register-members-section">
              <h3 className="section-title">The Roster</h3>
              <div className="members-grid">
                {members.map((member, idx) => (
                  <div key={idx} className="member-identity-card">
                    <div className="card-header">
                      <span>Agent {idx + 2}</span>
                      {members.length > 2 && (
                        <button type="button" className="remove-btn" onClick={() => removeMember(idx)}>✕</button>
                      )}
                    </div>
                    <div className="card-inputs">
                      <input
                        type="text"
                        placeholder="Name"
                        value={member.name}
                        onChange={e => handleMemberChange(idx, "name", e.target.value)}
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={member.email}
                        onChange={e => handleMemberChange(idx, "email", e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="College"
                        value={member.college}
                        onChange={e => handleMemberChange(idx, "college", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              {members.length < 4 && (
                <button type="button" className="add-agent-btn" onClick={addMember}>
                  <span className="plus">+</span> Add New Agent
                </button>
              )}
            </div>

            <button type="submit" className="finalize-registration-btn">
              Execute Registration
            </button>
          </form>

          {error && <div className="status-msg error-msg">{error}</div>}
          {success && <div className="status-msg success-msg">{success}</div>}
        </div>
      </div>
    </div>
  );
}
