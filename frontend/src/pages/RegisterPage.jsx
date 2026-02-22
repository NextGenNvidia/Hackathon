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
        <div className="register-glassmorphic">
          <h2>Team Registration</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={e => setTeamName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Leader college Name"
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
            <div className="register-members">
              <label>Team Members (including leader, 2-4):</label>
              {members.map((member, idx) => (
                <div key={idx} className="register-member-row">
                  <input
                    type="text"
                    placeholder={`Member ${idx + 2} Name`}
                    value={member.name}
                    onChange={e => handleMemberChange(idx, "name", e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder={`Member ${idx + 2} Email`}
                    value={member.email}
                    onChange={e => handleMemberChange(idx, "email", e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder={`Member ${idx + 2} College`}
                    value={member.college}
                    onChange={e => handleMemberChange(idx, "college", e.target.value)}
                    required
                  />
                  {members.length > 2 && (
                    <button type="button" className="remove-member-btn" onClick={() => removeMember(idx)}>-</button>
                  )}
                </div>
              ))}
              {members.length < 4 && (
                <button type="button" className="add-member-btn" onClick={addMember}>Add Member</button>
              )}
            </div>
            <button type="submit">Register</button>
          </form>
          {error && <p className="register-error">{error}</p>}
          {success && <p className="register-success">{success}</p>}
        </div>
      </div>
    </div>
  );
}
