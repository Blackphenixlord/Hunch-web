import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { Cpu, Database, Layout, ArrowDown, X } from "lucide-react";

// Nord Color Palette
const NORD = {
  bg: "#2E3440",
  card: "#3B4252",
  text: "#ECEFF4",
  muted: "#D8DEE9",
  blue: "#88C0D0",
  deepBlue: "#5E81AC",
  snow: "#E5E9F0",
  dark: "#242933",
  orange: "#f97316", // Brand accent color
};

const TeamMember = ({
  name,
  role,
  bio,
  icon: Icon,
  accentColor,
  isLightMode,
  imgSrc,
}: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10, borderColor: accentColor }}
    style={{
      background: isLightMode ? "#FFFFFF" : NORD.card,
      padding: "2rem",
      borderRadius: "28px",
      border: `1px solid ${isLightMode ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}`,
      boxShadow: isLightMode ? "0 20px 40px rgba(0,0,0,0.05)" : "none",
      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    }}
  >
    <div
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        borderRadius: "18px",
        backgroundColor: isLightMode ? "#F8FAFC" : NORD.dark,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.8s ease",
      }}
    >
      <AnimatePresence>
        {isLightMode && (
          <motion.img
            key={imgSrc}
            src={imgSrc}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        )}
      </AnimatePresence>

      {!isLightMode && (
        <Icon size={48} style={{ opacity: 0.2, color: NORD.orange }} />
      )}
    </div>

    <div>
      <div
        style={{
          color: accentColor,
          background: isLightMode ? "#F8FAFC" : NORD.dark,
          width: "fit-content",
          padding: "12px",
          borderRadius: "12px",
          marginBottom: "1.5rem",
          transition: "all 0.8s ease",
        }}
      >
        <Icon size={24} />
      </div>
      <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>{name}</h3>
      <p
        style={{
          color: accentColor,
          fontSize: "0.9rem",
          fontWeight: 500,
          margin: "8px 0 16px 0",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          transition: "color 0.8s ease",
        }}
      >
        {role}
      </p>
      <p
        style={{
          color: isLightMode ? "#4C566A" : NORD.muted,
          fontSize: "1rem",
          lineHeight: 1.6,
          margin: 0,
          transition: "color 0.8s ease",
        }}
      >
        {bio}
      </p>
    </div>
  </motion.div>
);

const navLinkStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  fontWeight: 600,
  letterSpacing: "0.25em",
  textDecoration: "none",
  transition: "color 0.8s ease-in-out",
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 150) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const headerScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const currentBg = isAboutInView ? NORD.snow : NORD.bg;
  const currentText = isAboutInView ? NORD.bg : NORD.text;
  const currentAccent = NORD.orange;

  return (
    <div
      style={{
        backgroundColor: currentBg,
        color: currentText,
        fontFamily: "Inter, sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        transition:
          "background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1), color 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.9)",
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "5%",
              cursor: "zoom-out",
            }}
          >
            <motion.button
              style={{
                position: "absolute",
                top: "30px",
                right: "30px",
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <X size={40} />
            </motion.button>
            <motion.img
              layoutId={selectedImg}
              src={selectedImg}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "12px",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          padding: "2rem 0",
          background: isAboutInView
            ? "rgba(229, 233, 240, 0.8)"
            : "rgba(46, 52, 64, 0.2)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${isAboutInView ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.05)"}`,
          display: "flex",
          justifyContent: "center",
          transition:
            "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.8s ease-in-out",
          transform: isNavVisible ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: isNavVisible ? "auto" : "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
            padding: "0 7%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a
            href="#"
            style={{
              fontSize: "1.2rem",
              fontWeight: 900,
              letterSpacing: "0.3em",
              color: currentText,
              textDecoration: "none",
              transition: "color 0.8s ease-in-out",
            }}
          >
            PROJECT{" "}
            <span
              style={{ color: currentAccent, transition: "color 0.8s ease" }}
            >
              AETHER
            </span>
          </a>
          <div style={{ display: "flex", gap: "3rem" }}>
            <a href="#about" style={{ ...navLinkStyle, color: currentText }}>
              ABOUT US
            </a>
            <a
              href="#deep-dive"
              style={{ ...navLinkStyle, color: currentText }}
            >
              DIVE DEEPER
            </a>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <motion.section
        style={{
          scale: headerScale,
          opacity: headerOpacity,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            border: `1px solid ${currentAccent}`,
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "0.75rem",
            color: currentAccent,
            fontWeight: 600,
            marginBottom: "2rem",
            letterSpacing: "0.1em",
            transition: "all 0.8s ease",
          }}
        >
          NASA HUNCH PROJECT 2026
        </div>
        <h1
          style={{
            fontSize: "clamp(3.5rem, 12vw, 7rem)",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            margin: 0,
            lineHeight: 0.9,
            color: "#FFFFFF",
          }}
        >
          PROJECT{" "}
          <span style={{ color: currentAccent, transition: "color 0.8s ease" }}>
            AETHER
          </span>
        </h1>
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p
            style={{
              opacity: 0.8,
              maxWidth: "600px",
              fontSize: "1.1rem",
              lineHeight: 1.5,
              letterSpacing: "0.1em",
              fontWeight: 500,
              color: isAboutInView ? NORD.bg : "#FFFFFF",
            }}
          >
            An inventory system for Gateway's Deep Space Logistics Module
          </p>
          <p
            style={{
              color: currentAccent,
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
            }}
          >
            NASA HUNCH
          </p>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ marginTop: "4rem", opacity: 0.5, color: currentAccent }}
        >
          <ArrowDown size={30} />
        </motion.div>
      </motion.section>

      {/* 2. SYSTEM INTERFACES */}
      <section
        style={{
          padding: "120px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "1400px", padding: "0 7%" }}>
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            System Interfaces
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              opacity: 0.6,
              marginBottom: "4rem",
              maxWidth: "600px",
            }}
          >
            Project Aether provides distinct environments tailored for ground
            control oversight and active lunar mission logistics. Click to
            enlarge.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: "3rem",
            }}
          >
            {/* Operator Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                background: isAboutInView ? "#FFFFFF" : NORD.card,
                borderRadius: "40px",
                overflow: "hidden",
                border: `1px solid ${isAboutInView ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.03)"}`,
                transition: "all 0.8s ease",
              }}
            >
              <div
                onClick={() => setSelectedImg("operatorView.png")}
                style={{
                  width: "100%",
                  aspectRatio: "16 / 10",
                  backgroundColor: isAboutInView ? "#F8FAFC" : NORD.dark,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "zoom-in",
                  overflow: "hidden",
                  borderBottom: `1px solid ${isAboutInView ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                <motion.img
                  layoutId="operatorView.png"
                  whileHover={{ scale: 1.05 }}
                  src="operatorView.png"
                  alt="Operator Interface"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "40px" }}>
                <h3
                  style={{
                    fontSize: "1.8rem",
                    marginBottom: "1rem",
                    color: currentAccent,
                  }}
                >
                  Operator View
                </h3>
                <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
                  The high-level administrative dashboard. Operators can manage
                  the entire global inventory, track item history across
                  modules, and generate logistics reports for NASA mission
                  planning.
                </p>
              </div>
            </motion.div>

            {/* Crew Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                background: isAboutInView ? "#FFFFFF" : NORD.card,
                borderRadius: "40px",
                overflow: "hidden",
                border: `1px solid ${isAboutInView ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.03)"}`,
                transition: "all 0.8s ease",
              }}
            >
              <div
                onClick={() => setSelectedImg("crewView.png")}
                style={{
                  width: "100%",
                  aspectRatio: "16 / 10",
                  backgroundColor: isAboutInView ? "#F8FAFC" : NORD.dark,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "zoom-in",
                  overflow: "hidden",
                  borderBottom: `1px solid ${isAboutInView ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                <motion.img
                  layoutId="crewView.png"
                  whileHover={{ scale: 1.05 }}
                  src="crewView.png"
                  alt="Crew Interface"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "40px" }}>
                <h3
                  style={{
                    fontSize: "1.8rem",
                    marginBottom: "1rem",
                    color: currentAccent,
                  }}
                >
                  Crew View
                </h3>
                <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
                  The streamlined, tablet-optimized interface for astronauts.
                  Optimized for quick RFID scanning, rapid item check-outs, and
                  immediate visual feedback on module supply levels.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MEET THE GEEK SQUAD */}
      <section
        ref={aboutRef}
        id="about"
        style={{
          padding: "120px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "1400px", padding: "0 7%" }}>
          <div style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "3rem", fontWeight: 700, margin: 0 }}>
              Meet the{" "}
              <span
                style={{ color: currentAccent, transition: "color 0.8s ease" }}
              >
                Geek Squad
              </span>
            </h2>
            <p
              style={{
                color: currentAccent,
                fontWeight: 500,
                marginTop: "10px",
                transition: "color 0.8s ease",
              }}
            >
              PROJECT AETHER CORE TEAM
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            <TeamMember
              name="Max Moyle"
              role="Team Lead & Lead Programmer"
              icon={Layout}
              bio="Leading technical strategy and hardware integration for the DLSM system."
              accentColor={currentAccent}
              isLightMode={isAboutInView}
              imgSrc="maxPortrait.png"
            />
            <TeamMember
              name="Benjamin Lu"
              role="Database Architect"
              icon={Database}
              bio="Designing scalable data structures for real-time lunar inventory tracking."
              accentColor={currentAccent}
              isLightMode={isAboutInView}
              imgSrc="benPortrait.png"
            />
            <TeamMember
              name="Josue Collado"
              role="Systems Lead"
              icon={Cpu}
              bio="Optimizing hardware performance and RFID scanning latency."
              accentColor={currentAccent}
              isLightMode={isAboutInView}
              imgSrc="joshPortrait.png"
            />
          </div>
        </div>
      </section>

      {/* 4. DIVE DEEPER */}
      {/* 4. PHYSICAL ARCHITECTURE SECTION */}
      <section
        id="deep-dive"
        style={{
          padding: "120px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "1400px", padding: "0 7%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            {/* Left Column: Technical Specs */}
            <div>
              <h2
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 800,
                  marginBottom: "2rem",
                }}
              >
                Hardware{" "}
                <span
                  style={{
                    color: currentAccent,
                    transition: "color 0.8s ease",
                  }}
                >
                  Structure
                </span>
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  opacity: 0.8,
                  lineHeight: 1.8,
                  marginBottom: "3rem",
                }}
              >
                Our architecture leverages high-performance edge computing to
                manage real-time telemetry and inventory tracking across the
                DLSM.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                <div>
                  <h4
                    style={{
                      color: currentAccent,
                      marginBottom: "0.5rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    CORE PROCESSOR
                  </h4>
                  <p
                    style={{ opacity: 0.8, fontSize: "1rem", fontWeight: 600 }}
                  >
                    NVIDIA Jetson Orin Nano Super
                  </p>
                  <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>
                    Acting as the central intelligence hub for AI-driven
                    logistics processing.
                  </p>
                </div>

                <div>
                  <h4
                    style={{
                      color: currentAccent,
                      marginBottom: "0.5rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    DISTRIBUTED NODES
                  </h4>
                  <p
                    style={{ opacity: 0.8, fontSize: "1rem", fontWeight: 600 }}
                  >
                    Raspberry Pi 5 Array
                  </p>
                  <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>
                    Handling localized data ingestion and module-specific
                    control logic.
                  </p>
                </div>

                <div>
                  <h4
                    style={{
                      color: currentAccent,
                      marginBottom: "0.5rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    TELEMETRY
                  </h4>
                  <p
                    style={{ opacity: 0.8, fontSize: "1rem", fontWeight: 600 }}
                  >
                    Integrated RFID Scanning System
                  </p>
                  <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>
                    High-frequency scanners providing 100% visibility on
                    equipment movement.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Representation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: isAboutInView
                  ? "rgba(0,0,0,0.03)"
                  : "rgba(255,255,255,0.03)",
                borderRadius: "40px",
                aspectRatio: "1/1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${isAboutInView ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"}`,
                position: "relative",
                padding: "40px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  opacity: 0.4,
                  fontSize: "0.8rem",
                  letterSpacing: "0.3em",
                  marginBottom: "2rem",
                }}
              >
                HARDWARE_STACK_V2
              </div>

              {/* Placeholder for a 3D model or diagram */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Cpu
                  size={120}
                  strokeWidth={1}
                  style={{ color: currentAccent, opacity: 0.5 }}
                />
                {/* If you have a specific image, replace the Icon above with an <img> tag */}
              </div>

              <div
                style={{
                  marginTop: "2rem",
                  padding: "1rem 2rem",
                  border: `1px solid ${currentAccent}`,
                  borderRadius: "12px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: currentAccent,
                }}
              >
                EDGE COMPUTING ENABLED
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer
        style={{
          padding: "80px 7%",
          textAlign: "center",
          borderTop: `1px solid ${isAboutInView ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.05)"}`,
          transition: "border 0.8s ease",
        }}
      >
        <div
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          PROJECT AETHER
        </div>
        <div style={{ opacity: 0.4, fontSize: "0.8rem" }}>
          © 2026 | NASA HUNCH DLSM INVENTORY SYSTEM
        </div>
      </footer>
    </div>
  );
}
