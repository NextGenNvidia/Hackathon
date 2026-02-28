import React, { useMemo, useState } from "react";
import Navbar from "./Navbar";
import RightSidebar from "./RightSidebar";
import "./ModernTimeline.css";

const TIMELINE_EVENTS = [
  {
    day: "Day 0",
    slot: "08:00 PM",
    title: "Gate Desk Opens",
    detail: "Participant entry, registration help desk, and check-in verification.",
    stage: "Arrival",
    accent: "cyan",
  },
  {
    day: "Day 0",
    slot: "08:00 PM",
    title: "Dinner",
    detail: "Initial networking dinner for all teams and volunteers.",
    stage: "Hospitality",
    accent: "amber",
  },
  {
    day: "Day 0",
    slot: "09:00 PM",
    title: "Accommodation Window",
    detail: "Room and resting-zone allocation for registered participants.",
    stage: "Ops",
    accent: "violet",
  },
  {
    day: "Day 1",
    slot: "08:00 AM - 09:00 AM",
    title: "Breakfast",
    detail: "Morning meal before the formal opening.",
    stage: "Hospitality",
    accent: "amber",
  },
  {
    day: "Day 1",
    slot: "09:00 AM - 10:30 AM",
    title: "Intro Event",
    detail: "Main stage launch, event briefing, and opening announcements.",
    stage: "Main Stage",
    accent: "cyan",
  },
  {
    day: "Day 1",
    slot: "10:30 AM - 11:00 AM",
    title: "Problem Reveal",
    detail: "Official challenge themes and judging focus areas go live.",
    stage: "Main Stage",
    accent: "cyan",
  },
  {
    day: "Day 1",
    slot: "11:00 AM - 05:00 PM",
    title: "Round 1",
    detail: "Core ideation and build sprint starts with mentor checkpoints.",
    stage: "Build Arena",
    accent: "violet",
  },
  {
    day: "Day 1",
    slot: "05:00 PM - 11:00 PM",
    title: "Round 2",
    detail: "Feature expansion, integrations, and architecture hardening.",
    stage: "Build Arena",
    accent: "violet",
  },
  {
    day: "Day 1",
    slot: "11:00 PM - 12:30 AM",
    title: "Dance and Music Break",
    detail: "Recharge block with live music and informal networking.",
    stage: "Experience",
    accent: "amber",
  },
  {
    day: "Day 2",
    slot: "12:30 AM - 11:00 AM",
    title: "Round 3",
    detail: "Final coding window, testing, and demo readiness.",
    stage: "Build Arena",
    accent: "violet",
  },
  {
    day: "Day 2",
    slot: "09:00 AM - 10:00 AM",
    title: "Breakfast @ TBI",
    detail: "Breakfast service near the presentation zones.",
    stage: "Hospitality",
    accent: "amber",
  },
  {
    day: "Day 2",
    slot: "10:00 AM",
    title: "AI Summit Inauguration",
    detail: "Ceremonial opening for summit track and keynote block.",
    stage: "Summit",
    accent: "cyan",
  },
  {
    day: "Day 2",
    slot: "10:00 AM - 12:30 PM",
    title: "Power Talk",
    detail: "Expert sessions on AI engineering, product strategy, and scale.",
    stage: "Summit",
    accent: "cyan",
  },
  {
    day: "Day 2",
    slot: "12:30 PM - 01:30 PM",
    title: "Lunch",
    detail: "Lunch interval before final results and ceremony.",
    stage: "Hospitality",
    accent: "amber",
  },
  {
    day: "Day 2",
    slot: "01:30 PM - 02:30 PM",
    title: "Prize Distribution",
    detail: "Winning teams announced with jury recognition and awards.",
    stage: "Finale",
    accent: "cyan",
  },
  {
    day: "Day 2",
    slot: "02:30 PM - 03:30 PM",
    title: "High Tea",
    detail: "Closing refreshments and final networking before departure.",
    stage: "Closing",
    accent: "amber",
  },
];

const DAY_ORDER = ["All", "Day 0", "Day 1", "Day 2"];

export default function ModernTimeline() {
  const [activeDay, setActiveDay] = useState("All");

  const visibleEvents = useMemo(() => {
    if (activeDay === "All") return TIMELINE_EVENTS;
    return TIMELINE_EVENTS.filter((event) => event.day === activeDay);
  }, [activeDay]);

  const stats = useMemo(
    () => [
      { label: "Total Slots", value: TIMELINE_EVENTS.length },
      { label: "Build Rounds", value: TIMELINE_EVENTS.filter((item) => item.title.startsWith("Round")).length },
      { label: "Days", value: 3 },
    ],
    []
  );

  return (
    <div className="timeline-shell">
      <Navbar />
      <RightSidebar />

      <div className="timeline-bg" aria-hidden="true"></div>
      <div className="timeline-noise" aria-hidden="true"></div>

      <main className="timeline-page">
        <section className="timeline-hero">
          <p className="timeline-kicker">Schedule Deck</p>
          <h1>Event Timeline</h1>
          <p className="timeline-lead">
            Complete flow from arrival to closing ceremony, redesigned for both desktop and phone.
          </p>

          <div className="timeline-stats">
            {stats.map((stat) => (
              <article key={stat.label} className="timeline-stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="timeline-filter-row" aria-label="Timeline day filters">
          {DAY_ORDER.map((day) => (
            <button
              key={day}
              type="button"
              className={`timeline-filter-chip ${activeDay === day ? "active" : ""}`}
              onClick={() => setActiveDay(day)}
            >
              {day}
            </button>
          ))}
        </section>

        <section className="timeline-track">
          <div className="timeline-center-line" aria-hidden="true"></div>
          {visibleEvents.map((event, index) => {
            const leftSide = index % 2 === 0;
            return (
              <article
                key={`${event.day}-${event.slot}-${event.title}`}
                className={`timeline-item ${leftSide ? "left" : "right"} accent-${event.accent}`}
              >
                <div className="timeline-node" aria-hidden="true"></div>
                <div className="timeline-card">
                  <div className="timeline-card-top">
                    <span className="timeline-day">{event.day}</span>
                    <span className="timeline-time">{event.slot}</span>
                  </div>
                  <h3>{event.title}</h3>
                  <p>{event.detail}</p>
                  <span className="timeline-stage">{event.stage}</span>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
