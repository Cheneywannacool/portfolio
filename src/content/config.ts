import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    // ── Core ────────────────────────────────────────────────────
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),

    // ── Executive Summary ────────────────────────────────────────
    /** One-sentence problem statement */
    problem: z.string().optional(),
    /** Key result headline, e.g. "+68%" */
    result: z.string().optional(),
    /** Label for the result, e.g. "Task success rate" */
    resultLabel: z.string().optional(),
    /** Brief context for the result, e.g. "up from 38% pre-launch" */
    resultContext: z.string().optional(),

    // ── Context & Scope ──────────────────────────────────────────
    role: z.string().optional(),
    timeline: z.string().optional(),
    team: z
      .array(z.object({ name: z.string().optional(), role: z.string() }))
      .optional(),

    // ── Big Reveal ───────────────────────────────────────────────
    /** Path to the final high-fidelity design image/mockup */
    reveal: z.string().optional(),
    revealCaption: z.string().optional(),
    /** Optional gallery of phone screens to show instead of a single reveal image */
    revealGallery: z
      .array(z.object({ src: z.string(), label: z.string() }))
      .optional(),

    // ── Impact ───────────────────────────────────────────────────
    metrics: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
          delta: z.string().optional(), // e.g., "↑ from 3.2"
        })
      )
      .optional(),

    // ── Reflection ───────────────────────────────────────────────
    reflection: z.string().optional(),

    // ── Sidebar date cell (label + value) ───────────────────────
    holder: z.string().optional(),
    holderValue: z.string().optional(),

    // ── Links ────────────────────────────────────────────────────
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
  }),
});

export const collections = { projects };
