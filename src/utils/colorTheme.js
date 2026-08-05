/**
 * Dynamic brand color engine.
 * Takes a single hex color (e.g. from the CMS "Primary Brand Color" field)
 * and derives a full Tailwind-style 50-950 tint/shade ramp from it, then
 * writes it to CSS variables so every `primary-*` utility class in the app
 * (bg-primary-500, text-primary-500/30, ring-primary-500, ...) repaints
 * instantly without a rebuild.
 */

const SHADE_KEYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// How far each shade is mixed toward white (tints) or black (shades),
// relative to the base "500" color.
const MIX_TOWARD_WHITE = { 50: 0.96, 100: 0.91, 200: 0.78, 300: 0.62, 400: 0.32 };
const MIX_TOWARD_BLACK = { 600: 0.15, 700: 0.32, 800: 0.48, 900: 0.62, 950: 0.76 };

export const DEFAULT_BRAND_COLOR = '#A00000';

function hexToRgb(hex) {
  const clean = hex?.replace('#', '').trim();
  if (!clean || (clean.length !== 3 && clean.length !== 6)) return null;
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return null;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(rgb, target, t) {
  return rgb.map((c, i) => Math.round(c * (1 - t) + target[i] * t));
}

/**
 * Generate a { 50: [r,g,b], ..., 950: [r,g,b] } ramp from one base hex color.
 */
export function generateColorScale(baseHex) {
  const base = hexToRgb(baseHex) || hexToRgb(DEFAULT_BRAND_COLOR);
  const white = [255, 255, 255];
  const black = [0, 0, 0];

  const scale = { 500: base };
  Object.entries(MIX_TOWARD_WHITE).forEach(([shade, t]) => {
    scale[shade] = mix(base, white, t);
  });
  Object.entries(MIX_TOWARD_BLACK).forEach(([shade, t]) => {
    scale[shade] = mix(base, black, t);
  });
  return scale;
}

/**
 * Apply CMS-driven brand colors to the document as CSS variables.
 * `colors` mirrors content/settings/general.json's `colors` object,
 * e.g. { primary: '#A00000', gold: '#FFD700', dark: '#1a1a1a' }.
 */
export function applyThemeColors(colors = {}) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  const primaryHex = colors.primary || DEFAULT_BRAND_COLOR;
  const scale = generateColorScale(primaryHex);
  SHADE_KEYS.forEach((shade) => {
    root.style.setProperty(`--color-primary-${shade}-rgb`, scale[shade].join(' '));
  });

  root.style.setProperty('--color-primary', primaryHex);
  root.style.setProperty('--color-gold', colors.gold || '#FFD700');
  root.style.setProperty('--color-forest', colors.forest || '#001b0e');
  root.style.setProperty('--color-dark', colors.dark || '#1a1a1a');
  root.style.setProperty('--color-white', colors.white || '#ffffff');
}
