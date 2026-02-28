import React, { useState } from "react";
import Navbar from "../components/Navbar";
import RightSidebar from "../components/RightSidebar";
import "./AboutUs.css";

const ABOUT_PANELS = [
  {
    id: "mission",
    title: "Mission",
    subtitle: "What We Build",
    body:
      "We create an intense, practical hackathon ecosystem where participants build real products, collaborate across disciplines, and ship under pressure.",
  },
  {
    id: "experience",
    title: "Experience",
    subtitle: "How It Feels",
    body:
      "From opening keynote to final showcase, every stage is designed to feel cinematic, structured, and highly engaging for both newcomers and advanced teams.",
  },
  {
    id: "community",
    title: "Community",
    subtitle: "Who Joins",
    body:
      "Students, mentors, organizers, and partners come together for a shared build culture focused on contribution, growth, and high execution quality.",
  },
  {
    id: "innovation",
    title: "Innovation",
    subtitle: "What We Push",
    body:
      "Problem statements focus on modern engineering challenges including AI, product design, deployment readiness, and measurable user impact.",
  },
  {
    id: "support",
    title: "Support",
    subtitle: "What You Get",
    body:
      "Participants get mentor checkpoints, infrastructure guidance, event coordination support, and a clear timeline to stay productive throughout the event.",
  },
  {
    id: "legal",
    title: "Legal",
    subtitle: "Policies & Rights",
    legalSections: [
      {
        heading: "Terms and Conditions",
        text:
          "These terms and conditions outline the rules and regulations for using the event website and participating in the platform experience.",
      },
      {
        heading: "General Data Protection Regulations (GDPR)",
        text:
          "We process personal data lawfully, transparently, and only for valid event operations, communication, and participant support.",
      },
      {
        heading: "Cookies",
        text:
          "Cookies may be used to improve functionality, remember preferences, and analyze usage for performance improvements.",
      },
      {
        heading: "Privacy Policies",
        text:
          "Privacy policies explain what information is collected, why it is collected, how it is protected, and how users can contact us for clarification.",
      },
      {
        heading: "Hyperlinking to Our Content",
        text:
          "Approved entities may link to public pages in a fair and non-misleading way, without implying sponsorship or endorsement.",
      },
      {
        heading: "Frames",
        text:
          "You may not create frames around our pages that alter the visual presentation or context without prior written approval.",
      },
      {
        heading: "Content Liability",
        text:
          "We are not responsible for content appearing on external websites linking to or referencing our pages.",
      },
      {
        heading: "Reservation of Rights",
        text:
          "We reserve the right to request removal of links, update policies, and modify terms as required by operational or legal needs.",
      },
      {
        heading: "Disclaimer",
        text:
          "Website content is provided for general event information and may be revised without prior notice.",
      },
      {
        heading: "Privacy Policy",
        text:
          "This policy describes how information is collected, used, stored, and protected when users access the website and event services.",
      },
      {
        heading: "General Data Protection Rules (GDPR)",
        text:
          "Users can request access, correction, or deletion of eligible personal data in accordance with applicable protection standards.",
      },
      {
        heading: "Log Files",
        text:
          "Server logs may record technical visit data for diagnostics, security monitoring, and platform stability.",
      },
      {
        heading: "Cookies and Web Beacons",
        text:
          "Cookies and similar technologies may support analytics, session continuity, and service quality improvements.",
      },
      {
        heading: "Third-Party Privacy Policies",
        text:
          "External providers used for payment, hosting, analytics, or social links have their own policies that should be reviewed independently.",
      },
      {
        heading: "Children's Information",
        text:
          "We do not knowingly collect personal data from children in violation of legal requirements and will remove such data when identified.",
      },
      {
        heading: "Online Privacy Policy",
        text:
          "This policy applies to information collected through online interactions with this website and related digital event services.",
      },
      {
        heading: "Consent",
        text:
          "By accessing and using this website, users acknowledge and agree to the active terms, policy practices, and data handling disclosures.",
      },
    ],
  },
];

export default function AboutUs() {
  const [mobileOpen, setMobileOpen] = useState(null);

  return (
    <div className="about-shell">
      <Navbar />
      <RightSidebar />

      <div className="about-bg" aria-hidden="true"></div>
      <div className="about-noise" aria-hidden="true"></div>

      <main className="about-wrap">
        <header className="about-hero">
          <p className="about-kicker">About Next Gen</p>
          <h1>Hover Panels</h1>
          <p className="about-lead">
            Explore the event through interactive cards. On desktop, hover to reveal details.
            On mobile, tap a card to expand.
          </p>
        </header>

        <section className="about-panel-grid">
          {ABOUT_PANELS.map((panel) => {
            const isLegal = panel.id === "legal";
            const expanded = mobileOpen === panel.id;

            return (
              <article
                key={panel.id}
                className={`about-panel ${isLegal ? "legal-panel" : ""} ${
                  expanded ? "mobile-expanded" : ""
                }`}
                onClick={() =>
                  setMobileOpen((current) => (current === panel.id ? null : panel.id))
                }
              >
                <div className="about-panel-top">
                  <h2>{panel.title}</h2>
                  <span>{panel.subtitle}</span>
                </div>

                {!isLegal && <p className="about-panel-body">{panel.body}</p>}

                {isLegal && (
                  <div className="about-legal-list">
                    {panel.legalSections.map((section) => (
                      <div className="about-legal-item" key={section.heading}>
                        <h3>{section.heading}</h3>
                        <p>{section.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
