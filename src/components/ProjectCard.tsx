import { motion } from "framer-motion";
import { useState } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Props {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  featured?: boolean;
  cover?: string;
  url?: string;
  repo?: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  slug,
  featured = false,
  cover,
  url,
  repo,
  index = 0,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, rotate: 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group"
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "1.75rem",
        overflow: "hidden",
        border: hovered ? "1px solid var(--coral-mid)" : "1px solid var(--border)",
        background: "var(--card)",
        boxShadow: hovered
          ? "0 24px 56px rgba(239,70,35,0.16), 0 4px 16px rgba(239,70,35,0.08)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.4s, border-color 0.4s",
        cursor: "pointer",
      }}
    >
      {/* ── Thumbnail ──────────────────────────────────────────── */}
      <a
        href={`/projects/${slug}`}
        aria-hidden="true"
        tabIndex={-1}
        style={{
          display: "block",
          position: "relative",
          aspectRatio: "3 / 2",
          overflow: "hidden",
          background: "var(--bg-alt, #FDF1EE)",
        }}
      >
        {/* Image with scale on hover */}
        {cover ? (
          <motion.img
            src={cover}
            alt={`${title} preview`}
            loading="lazy"
            decoding="async"
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, var(--coral-dim) 0%, rgba(45,59,66,0.08) 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontStyle: "italic",
                fontSize: "3rem",
                color: "var(--coral)",
                opacity: 0.25,
                userSelect: "none",
              }}
            >
              {title[0]}
            </span>
          </div>
        )}

        {/* Slide-up overlay on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 16 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(28,37,41,0.78) 0%, rgba(28,37,41,0.15) 55%, transparent 100%)",
            display: "flex",
            alignItems: "flex-end",
            padding: "1.25rem 1.5rem",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.01em",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            Read case study
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              aria-hidden="true"
            >→</motion.span>
          </span>
        </motion.div>

        {/* Featured badge */}
        {featured && (
          <span
            style={{
              position: "absolute",
              top: "0.875rem",
              left: "0.875rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "var(--coral)",
              padding: "0.22rem 0.7rem",
              borderRadius: "9999px",
              boxShadow: "0 2px 8px rgba(239,70,35,0.35)",
            }}
          >
            Featured
          </span>
        )}

        {/* External links */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "absolute",
            top: "0.875rem",
            right: "0.875rem",
            display: "flex",
            gap: "0.4rem",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "white",
                textDecoration: "none",
                padding: "0.22rem 0.65rem",
                borderRadius: "9999px",
                background: "rgba(28,37,41,0.72)",
                backdropFilter: "blur(8px)",
              }}
            >
              Source
            </a>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "white",
                textDecoration: "none",
                padding: "0.22rem 0.65rem",
                borderRadius: "9999px",
                background: "var(--coral)",
              }}
            >
              Live ↗
            </a>
          )}
        </motion.div>
      </a>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "1.5rem" }}>
        <h3
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontStyle: "italic",
            fontSize: "1.5rem",
            fontWeight: 400,
            lineHeight: 1.18,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: "0.625rem",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            flex: 1,
            fontSize: "0.875rem",
            lineHeight: 1.65,
            color: "var(--text-2)",
            marginBottom: "1.125rem",
            fontWeight: 300,
          }}
        >
          {description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.125rem" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: "var(--tag-text)",
                background: "var(--tag-bg)",
                padding: "0.22rem 0.6rem",
                borderRadius: "9999px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Case study CTA */}
        <a
          href={`/projects/${slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.82rem",
            fontWeight: 700,
            color: "var(--coral)",
            textDecoration: "none",
            borderTop: "1px solid var(--border)",
            paddingTop: "1rem",
          }}
        >
          Read case study
          <motion.span
            animate={{ x: hovered ? 5 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            aria-hidden="true"
          >→</motion.span>
        </a>
      </div>
    </motion.article>
  );
}
