import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Navbar from "../components/Navbar";

const REGISTER_URL =
  "https://unstop.com/hackathons/ai-arena-gotham-edition-kiet-group-of-institutions-1640378?lb=i1Fw6PAU";

function Home() {
  const spotlightRef = useRef();
  const torchBeamRef = useRef();
  const layer1Ref = useRef();
  const layer2Ref = useRef();
  const mobileThreeRef = useRef();
  const mobileScrollRef = useRef();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  // Mobile touch move handler
  const phonemove = (e) => {
    let x, y;
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      const { innerWidth, innerHeight } = window;
      x = (touch.clientX - innerWidth / 2) / (innerWidth / 2);
      y = (touch.clientY - innerHeight / 2) / (innerHeight / 2);
    } else {
      x = 0; y = 0;
    }
    if (layer1Ref.current) {
      layer1Ref.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    }
    if (layer2Ref.current) {
      layer2Ref.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    }
  };

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    if (layer1Ref.current) {
      layer1Ref.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    }
    if (layer2Ref.current) {
      layer2Ref.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return undefined;

    function updateBeam() {
      if (!spotlightRef.current || !torchBeamRef.current) return;
      const spot = spotlightRef.current.getBoundingClientRect();
      const homeRoot =
        document.querySelector(".home.desktop") || document.querySelector(".home");
      if (!homeRoot) return;

      const home = homeRoot.getBoundingClientRect();
      // Center of spotlight relative to .home
      const spotX = spot.left + spot.width / 2 - home.left;
      const spotY = spot.top + spot.height / 2 - home.top;
      // Torch base (bottom center)
      const baseX = home.width / 2;
      const baseY = home.height;
      // Angle from base to spotlight
      const dx = spotX - baseX;
      const dy = spotY - baseY;
      const angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
      torchBeamRef.current.style.transform = `translateX(-50%) rotate(${angle}deg)`;
      // Set beam length
      const dist = Math.sqrt(dx * dx + dy * dy);
      torchBeamRef.current.style.height = `${dist}px`;
    }
    updateBeam();
    window.addEventListener("resize", updateBeam);
    return () => window.removeEventListener("resize", updateBeam);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || !mobileScrollRef.current) return undefined;

    const scrollContainer = mobileScrollRef.current;
    const onScroll = () => setScrollY(scrollContainer.scrollTop || 0);

    scrollContainer.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => scrollContainer.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || !mobileScrollRef.current) return undefined;

    const scrollContainer = mobileScrollRef.current;
    const sections = Array.from(
      scrollContainer.querySelectorAll("[data-mobile-section]")
    );

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const sectionIndex = Number(entry.target.getAttribute("data-index"));
          if (!Number.isNaN(sectionIndex)) {
            setActiveSection(sectionIndex);
          }
        });
      },
      { root: scrollContainer, threshold: 0.55 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || !mobileThreeRef.current || !mobileScrollRef.current) return undefined;

    let renderer;
    let animationFrameId;
    let resizeHandler;
    let disposeScene = () => {};
    let destroyed = false;

    const host = mobileThreeRef.current;
    const scrollContainer = mobileScrollRef.current;

    const initializeScene = (THREE) => {
      if (!host || destroyed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        46,
        host.clientWidth / host.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 12);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);

      const sceneGroup = new THREE.Group();
      scene.add(sceneGroup);

      const coreGeometry = new THREE.TorusKnotGeometry(2, 0.45, 180, 26);
      const coreMaterial = new THREE.MeshStandardMaterial({
        color: 0x6fdfff,
        emissive: 0x002f4b,
        roughness: 0.24,
        metalness: 0.55,
        wireframe: true,
      });
      const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
      sceneGroup.add(coreMesh);

      const ringGeometry = new THREE.RingGeometry(2.9, 3.2, 96);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xffb347,
        transparent: true,
        opacity: 0.32,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.rotation.x = Math.PI / 3;
      sceneGroup.add(ringMesh);

      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 480;
      const particleData = new Float32Array(particleCount * 3);

      for (let index = 0; index < particleCount; index += 1) {
        const offset = index * 3;
        const radius = 5 + Math.random() * 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        particleData[offset] = radius * Math.sin(phi) * Math.cos(theta);
        particleData[offset + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particleData[offset + 2] = radius * Math.cos(phi);
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(particleData, 3)
      );

      const particlesMaterial = new THREE.PointsMaterial({
        color: 0xb7f3ff,
        size: 0.055,
        transparent: true,
        opacity: 0.88,
      });
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      const keyLight = new THREE.PointLight(0x88e8ff, 1.6, 45);
      keyLight.position.set(6, 5, 9);
      scene.add(keyLight);

      const fillLight = new THREE.AmbientLight(0x244a72, 0.95);
      scene.add(fillLight);

      const clock = new THREE.Clock();

      const animate = () => {
        if (destroyed || !renderer) return;

        const elapsed = clock.getElapsedTime();
        const maxScroll = Math.max(
          scrollContainer.scrollHeight - scrollContainer.clientHeight,
          1
        );
        const scrollProgress = Math.min(scrollContainer.scrollTop / maxScroll, 1);

        sceneGroup.rotation.x = elapsed * 0.16 + scrollProgress * 1.35;
        sceneGroup.rotation.y = elapsed * 0.22 + scrollProgress * 3.4;
        ringMesh.rotation.z = elapsed * 0.42 + scrollProgress * 2.2;
        coreMesh.scale.setScalar(1 + scrollProgress * 0.24);

        particles.rotation.y = -elapsed * 0.05 - scrollProgress * 1.8;
        particles.rotation.x = elapsed * 0.025 + scrollProgress * 0.5;

        camera.position.z = 12 - scrollProgress * 2.2;

        renderer.render(scene, camera);
        animationFrameId = window.requestAnimationFrame(animate);
      };

      animate();

      resizeHandler = () => {
        if (!renderer || !host) return;
        const width = host.clientWidth;
        const height = host.clientHeight || window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      window.addEventListener("resize", resizeHandler);

      disposeScene = () => {
        window.removeEventListener("resize", resizeHandler);
        if (animationFrameId) window.cancelAnimationFrame(animationFrameId);

        coreGeometry.dispose();
        coreMaterial.dispose();
        ringGeometry.dispose();
        ringMaterial.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();

        if (renderer) {
          renderer.dispose();
          if (host.contains(renderer.domElement)) {
            host.removeChild(renderer.domElement);
          }
        }
      };
    };

    const loadThreeAndStart = async () => {
      try {
        if (window.THREE) {
          initializeScene(window.THREE);
          return;
        }

        const existingScript = document.getElementById("mobile-three-cdn");
        if (existingScript) {
          await new Promise((resolve, reject) => {
            if (window.THREE) {
              resolve();
              return;
            }

            existingScript.addEventListener("load", resolve, { once: true });
            existingScript.addEventListener("error", reject, { once: true });
          });

          if (window.THREE) initializeScene(window.THREE);
          return;
        }

        const script = document.createElement("script");
        script.id = "mobile-three-cdn";
        script.src = "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.min.js";
        script.async = true;

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });

        if (window.THREE) {
          initializeScene(window.THREE);
        }
      } catch (error) {
        // Keep experience usable without 3D layer if CDN fails.
        console.error("Unable to load Three.js for mobile home scene.", error);
      }
    };

    loadThreeAndStart();

    return () => {
      destroyed = true;
      disposeScene();
    };
  }, [isMobile]);

  const goToSection = (sectionId) => {
    const section = mobileScrollRef.current?.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const maxMobileScroll = mobileScrollRef.current
    ? Math.max(
        mobileScrollRef.current.scrollHeight - mobileScrollRef.current.clientHeight,
        1
      )
    : 1;

  const mobileScrollProgress = isMobile ? Math.min(scrollY / maxMobileScroll, 1) : 0;

  if (isMobile) {
    return (
      <div
        className="home mobile mobile-onepage"
        style={{ "--mobile-scroll-progress": mobileScrollProgress }}
      >
        <Navbar />

        <div className="mobile-three-layer" ref={mobileThreeRef} aria-hidden="true"></div>
        <div className="mobile-chroma-fog" aria-hidden="true"></div>
        <div className="mobile-noise-mask" aria-hidden="true"></div>

        <div className="mobile-progress-rail" aria-hidden="true">
          <span
            className="mobile-progress-fill"
            style={{ transform: `scaleY(${Math.max(mobileScrollProgress, 0.02)})` }}
          ></span>
        </div>

        <main className="mobile-scroll-deck" ref={mobileScrollRef}>
          <section
            className={`mobile-panel panel-hero ${activeSection === 0 ? "is-active" : ""}`}
            data-mobile-section
            data-index="0"
          >
            <p className="panel-kicker">AI Arena 2026</p>
            <img src="/assets/Batman.png" alt="Next Gen Emblem" className="mobile-crest" />
            <h1>NEXT GEN GOTHAM</h1>
            <p className="panel-copy">
              A mobile-first hackathon journey with cinematic visuals, AI challenges, and
              intense build energy from the first swipe.
            </p>

            <div className="panel-actions">
              <a
                href={REGISTER_URL}
                className="mobile-solid-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register Now
              </a>
              <button
                type="button"
                className="mobile-ghost-btn"
                onClick={() => goToSection("mobile-mission")}
              >
                Explore Scroll
              </button>
            </div>

            <div className="hero-metrics">
              <div>
                <strong>24H</strong>
                <span>Build Sprint</span>
              </div>
              <div>
                <strong>AI + Web3</strong>
                <span>Theme Focus</span>
              </div>
              <div>
                <strong>Live</strong>
                <span>Mentor War Room</span>
              </div>
            </div>
          </section>

          <section
            id="mobile-mission"
            className={`mobile-panel panel-story ${activeSection === 1 ? "is-active" : ""}`}
            data-mobile-section
            data-index="1"
          >
            <p className="panel-kicker">Mission Control</p>
            <h2>Built For Ambitious Teams</h2>
            <p className="panel-copy">
              The home flow now tells the full story so participants instantly understand
              what they are entering and why they should join.
            </p>

            <div className="story-cards">
              <article>
                <h3>Immersive Setup</h3>
                <p>Stage visuals, lighting cues, and guided checkpoints throughout the night.</p>
              </article>
              <article>
                <h3>Mentor Drops</h3>
                <p>Rapid technical interventions to unblock architecture and deployment issues.</p>
              </article>
              <article>
                <h3>Showtime Finale</h3>
                <p>High-impact demo round with live scoring and spotlight moments.</p>
              </article>
            </div>
          </section>

          <section
            className={`mobile-panel panel-tracks ${activeSection === 2 ? "is-active" : ""}`}
            data-mobile-section
            data-index="2"
          >
            <p className="panel-kicker">Build Tracks</p>
            <h2>Choose Your Arena</h2>
            <p className="panel-copy">
              Compete in high-value problem statements and ship a working build, not just a pitch.
            </p>

            <div className="tracks-grid">
              <span>Autonomous Agents</span>
              <span>On-Device AI</span>
              <span>Health Intelligence</span>
              <span>Climate Signal Systems</span>
              <span>Fintech Defense</span>
              <span>Public Safety Tech</span>
            </div>

            <Link to="/timeline" className="panel-inline-link">
              Open Full Timeline
            </Link>
          </section>

          <section
            className={`mobile-panel panel-flow ${activeSection === 3 ? "is-active" : ""}`}
            data-mobile-section
            data-index="3"
          >
            <p className="panel-kicker">Night Protocol</p>
            <h2>Event Flow Snapshot</h2>

            <ol className="flow-list">
              <li>
                <strong>Launch Sequence</strong>
                <p>Opening keynote, track reveal, and team lock-in.</p>
              </li>
              <li>
                <strong>Build Window</strong>
                <p>Hands-on coding with mentor checkpoints and challenge boosters.</p>
              </li>
              <li>
                <strong>Demo Grid</strong>
                <p>Shortlisted teams present for jury scoring and final rankings.</p>
              </li>
            </ol>
          </section>

          <section
            className={`mobile-panel panel-cta ${activeSection === 4 ? "is-active" : ""}`}
            data-mobile-section
            data-index="4"
          >
            <p className="panel-kicker">Final Call</p>
            <h2>Own The Night</h2>
            <p className="panel-copy">
              Bring your team, build a serious product, and compete for recognition in the
              most cinematic edition of Next Gen yet.
            </p>

            <a
              href={REGISTER_URL}
              className="mobile-solid-btn wide"
              target="_blank"
              rel="noopener noreferrer"
            >
              Secure Your Spot
            </a>

            <div className="panel-links">
              <Link to="/sponsors">Sponsors</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div
      className="home desktop"
      onMouseMove={handleMouseMove}
      onTouchMove={phonemove}
    >
      <Navbar />
      {/* Dark overlay with blue tint */}
      <div className="dark-overlay"></div>

      {/* Static Background Layer */}
      <img
        src="/assets/Static-layer.png"
        alt="Static Background"
        className="bat-parallax layer-static"
        draggable="false"
      />

      {/* Layer 2 - Middle - PARALLAX */}
      <img
        ref={layer2Ref}
        src="/assets/Untitled-1.png"
        alt="Middle Layer"
        className="bat-parallax layer2"
        draggable="false"
      />
      {/* Layer 1 - Front - PARALLAX */}
      <img
        ref={layer1Ref}
        src="/assets/22.png"
        alt="Front Layer"
        className="bat-parallax layer1"
        draggable="false"
      />

      {/* Torch Beam (Bottom -> Top Left) */}
      <div
        className="torch-beam"
        ref={torchBeamRef}
        style={{ transition: "transform 0.3s, height 0.3s" }}
      ></div>

      {/* Bat Logo with Spotlight */}
      <div className="bat-logo-container">
        <div className="spotlight-beam" ref={spotlightRef}></div>
        <img
          src="/assets/Batman.png"
          alt="Batman Logo"
          className="bat-logo"
        />
      </div>

      {/* Bat Mobile */}
      <img
        src="/assets/Bat-mobile.png"
        alt="Batmobile"
        className="batmobile"
      />
      {/* Road Layer at Bottom */}
      <div className="road-layer"></div>
      {/* Road SVG layer */}
      <div className="road-wrapper">
        <img src="/assets/download.svg"
          className="road"
          alt="road"
        />
        <img src="/assets/download.svg"
          className="road"
          alt="road"
        />
      </div>
      {/* Social Sidebar - Right Side */}
      <div className="social-sidebar">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <svg viewBox="0 0 448 512" width="28" height="28" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <svg viewBox="0 0 448 512" width="28" height="28" fill="currentColor"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <svg viewBox="0 0 576 512" width="28" height="28" fill="currentColor"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <svg viewBox="0 0 512 512" width="28" height="28" fill="currentColor"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <svg viewBox="0 0 512 512" width="28" height="28" fill="currentColor"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" /></svg>
        </a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <svg viewBox="0 0 640 512" width="28" height="28" fill="currentColor"><path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,1.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" /></svg>
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <svg viewBox="0 0 512 512" width="28" height="28" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-//12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
        </a>
      </div>
      {/* Hackathon logo overlay - only on desktop */}
      <img
        src="/assets/hackathon-removebg-preview.png"
        alt="Hackathon Logo"
        className="hackathon-logo"
        style={{
          position: "absolute",
          top: "5rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "30rem",
          zIndex: 100,
          pointerEvents: "none"
        }}
      />
    </div>
  );
}

export default Home;
