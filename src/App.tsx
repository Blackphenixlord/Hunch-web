import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { Cpu, Database, Layout, ArrowDown } from "lucide-react";

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
    {/* SQUARE Image Container */}
    <div
      style={{
        width: "100%",
        aspectRatio: "1 / 1", // Forces square shape
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
        <Icon size={48} style={{ opacity: 0.2, color: NORD.blue }} />
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
  const currentBlue = isAboutInView ? NORD.deepBlue : NORD.blue;

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
      {/* HEADER */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          padding: "3rem 0",
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
              fontSize: "1.4rem",
              fontWeight: 900,
              letterSpacing: "0.3em",
              color: currentText,
              textDecoration: "none",
              transition: "color 0.8s ease-in-out",
            }}
          >
            GEEK{" "}
            <span style={{ color: currentBlue, transition: "color 0.8s ease" }}>
              SQUAD
            </span>
          </a>
          <div style={{ display: "flex", gap: "4rem" }}>
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
            border: `1px solid ${currentBlue}`,
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "0.75rem",
            color: currentBlue,
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
          }}
        >
          GEEK{" "}
          <span style={{ color: currentBlue, transition: "color 0.8s ease" }}>
            SQUAD
          </span>
        </h1>
        <p
          style={{
            opacity: 0.8,
            maxWidth: "600px",
            fontSize: "1.2rem",
            marginTop: "1.5rem",
            lineHeight: 1.5,
          }}
        >
          Engineering the next generation of lunar logistics through smart
          hardware and seamless data integration.
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ marginTop: "4rem", opacity: 0.5 }}
        >
          <ArrowDown size={30} />
        </motion.div>
      </motion.section>

      {/* 2. PROJECT ARCHITECTURE */}
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
              marginBottom: "4rem",
              letterSpacing: "-0.02em",
            }}
          >
            Project Architecture
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: "3rem",
            }}
          >
            {["The Hardware Interface", "The Logistics Cloud"].map(
              (title, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  style={{
                    background: isAboutInView
                      ? "#D8DEE9"
                      : `linear-gradient(135deg, ${NORD.card} 0%, #242933 100%)`,
                    height: "400px",
                    borderRadius: "40px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${isAboutInView ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.03)"}`,
                    transition: "background 0.8s ease, border 0.8s ease",
                  }}
                >
                  <div
                    style={{
                      opacity: 0.2,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    [ Image Placeholder ]
                  </div>
                  <h3 style={{ marginTop: "20px", opacity: 0.8 }}>{title}</h3>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 3. MEET THE CREW (The Trigger Section) */}
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
              Meet the Crew
            </h2>
            <p
              style={{
                color: currentBlue,
                fontWeight: 500,
                marginTop: "10px",
                transition: "color 0.8s ease",
              }}
            >
              GEEK SQUAD CORE TEAM
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
              accentColor={currentBlue}
              isLightMode={isAboutInView}
              imgSrc="maxPortrait.png"
            />
            <TeamMember
              name="Benjamin Lu"
              role="Database Architect"
              icon={Database}
              bio="Designing scalable data structures for real-time lunar inventory tracking."
              accentColor={currentBlue}
              isLightMode={isAboutInView}
              imgSrc="benPortrait.png"
            />
            <TeamMember
              name="Josue Collado"
              role="Systems Lead"
              icon={Cpu}
              bio="Optimizing hardware performance and RFID scanning latency."
              accentColor={currentBlue}
              isLightMode={isAboutInView}
              imgSrc="joshPortrait.png"
            />
          </div>
        </div>
      </section>

      {/* 4. DIVE DEEPER */}
      <section
        id="deep-dive"
        style={{
          padding: "120px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "1400px", padding: "0 7%" }}>
          <div style={{ maxWidth: "900px" }}>
            <h2
              style={{
                fontSize: "3.5rem",
                fontWeight: 800,
                marginBottom: "2rem",
              }}
            >
              The Logic of{" "}
              <span
                style={{ color: currentBlue, transition: "color 0.8s ease" }}
              >
                DLSM
              </span>
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                opacity: 0.8,
                lineHeight: 1.8,
                marginBottom: "3rem",
              }}
            >
              Our solution tackles the complexity of lunar logistics by
              integrating hardware-level RFID triggers with a real-time cloud
              database.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4rem",
              }}
            >
              <div>
                <h4
                  style={{
                    color: currentBlue,
                    marginBottom: "1rem",
                    transition: "color 0.8s ease",
                  }}
                >
                  HARDWARE
                </h4>
                <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                  Custom-built RFID wedge scanners with latency-optimized
                  processing.
                </p>
              </div>
              <div>
                <h4
                  style={{
                    color: currentBlue,
                    marginBottom: "1rem",
                    transition: "color 0.8s ease",
                  }}
                >
                  SOFTWARE
                </h4>
                <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                  A React-based frontend designed for extreme conditions.
                </p>
              </div>
            </div>
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
          style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}
        >
          GEEK SQUAD
        </div>
        <div style={{ opacity: 0.4, fontSize: "0.8rem" }}>
          © 2026 | NASA HUNCH DLSM INVENTORY SYSTEM
        </div>
      </footer>
    </div>
  );
}
