import type { ImageMetadata } from "astro";

/**
 * All images in src/assets/images/ — resolved at build time by Vite.
 * Supports PNG, JPG, JPEG, WebP, GIF, AVIF.
 */
const allImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/**/*.{png,jpg,jpeg,webp,gif,avif}"
);

/**
 * Given a public-style path like "/images/foo.png", returns the
 * Astro ImageMetadata object so you can pass it to <Image />.
 * Falls back to undefined if the file isn't in src/assets/images/.
 */
export async function resolveImage(
  src: string | undefined
): Promise<ImageMetadata | undefined> {
  if (!src) return undefined;

  // Map  "/images/foo.png"  →  "/src/assets/images/foo.png"
  const key = src.startsWith("/images/")
    ? `/src/assets/images/${src.slice("/images/".length)}`
    : src;

  const loader = allImages[key];
  if (!loader) return undefined;

  return (await loader()).default;
}
