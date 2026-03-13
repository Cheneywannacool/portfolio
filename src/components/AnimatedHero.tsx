import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const FLIP_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32, rotate: 2 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.75, ease: EASE } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

interface Props {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  photoBack?: string;
}

const faceStyle = (extra?: object): React.CSSProperties => ({
  position: "absolute",
  inset: 0,
  borderRadius: "2rem",
  overflow: "hidden",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  ...extra,
});

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

function ProfilePhoto({ front, back }: { front?: string; back?: string }) {
  const controls = useAnimation();

  useEffect(() => {
    async function playIntro() {
      await controls.start({
        rotateY: 360,
        transition: { duration: 0.75, ease: FLIP_EASE, delay: 0.7 },
      });
      controls.set({ rotateY: 0 });
    }
    playIntro();
  }, []);

  return (
    <motion.div
      variants={fadeIn}
      style={{ width: "100%", maxWidth: "320px", flexShrink: 0, perspective: 1000 }}
      onHoverStart={() =>
        controls.start({ rotateY: 180, transition: { duration: 0.6, ease: FLIP_EASE } })
      }
      onHoverEnd={() =>
        controls.start({ rotateY: 0, transition: { duration: 0.6, ease: FLIP_EASE } })
      }
    >
      <motion.div
        animate={controls}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4/5",
          transformStyle: "preserve-3d",
          cursor: "pointer",
        }}
      >
        {/* Front */}
        <div style={faceStyle()}>
          {front ? (
            <img src={front} alt="Profile photo" style={imgStyle} />
          ) : (
            <div
              style={{
                ...imgStyle,
                background: "var(--bg-alt)",
                border: "1.5px dashed var(--coral-mid)",
                borderRadius: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                color: "var(--coral)",
                opacity: 0.5,
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Profile photo
              </span>
            </div>
          )}
        </div>

        {/* Back */}
        <div style={faceStyle({ transform: "rotateY(180deg)" })}>
          {back ? (
            <img src={back} alt="Profile photo — back" style={imgStyle} />
          ) : (
            <div
              style={{
                ...imgStyle,
                background: "var(--bg-alt)",
                border: "1.5px dashed var(--coral-mid)",
                borderRadius: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                color: "var(--coral)",
                opacity: 0.5,
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Back photo
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AnimatedHero({ name, role, bio, photo, photoBack }: Props) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      style={{ maxWidth: "72rem", margin: "0 auto", padding: "6rem 1.5rem 5rem" }}
    >
      <div
        style={{
          display: "flex",
          gap: "4rem",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* ── Left: text ─────────────────────────────────────── */}
        <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
          {/* Role pill */}
          <motion.div variants={fadeIn} style={{ marginBottom: "1.75rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--coral)",
                background: "var(--coral-dim)",
                padding: "0.35rem 1rem",
                borderRadius: "9999px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "9999px",
                  background: "var(--coral)",
                  flexShrink: 0,
                }}
              />
              {role}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontStyle: "italic",
              fontSize: "clamp(3.25rem, 7vw, 6rem)",
              fontWeight: 400,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              marginBottom: "1.5rem",
              transformOrigin: "left bottom",
            }}
          >
            {name}
          </motion.h1>

          {/* Bio */}
          <motion.p
            variants={fadeIn}
            style={{
              maxWidth: "38rem",
              fontSize: "1.05rem",
              lineHeight: 1.72,
              color: "var(--text-2)",
              marginBottom: "2.5rem",
              fontWeight: 300,
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: bio }} />
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeIn}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
          >
            <a href="/projects" className="btn-coral">
              View work <span aria-hidden="true">→</span>
            </a>
            <a href="/about" className="btn-outline">
              About me
            </a>
          </motion.div>
        </div>

        {/* ── Right: profile image ────────────────────────────── */}
        <ProfilePhoto front={photo} back={photoBack} />
      </div>
    </motion.section>
  );
}
