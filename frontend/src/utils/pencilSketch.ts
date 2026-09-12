/**
 * NEXORA CRM — Clean Enterprise Vector Monogram & Avatar Generator
 * Pure SVG vector monograms with enterprise gradients and geometric accents.
 * 100% vector, zero AI-generated or stock photo dependencies.
 */

interface VectorStyle {
  bgStart: string;
  bgEnd: string;
  accent: string;
  textColor: string;
  ringColor: string;
}

const PALETTES: VectorStyle[] = [
  {
    bgStart: '#064e3b',
    bgEnd: '#022c22',
    accent: '#34d399',
    textColor: '#ffffff',
    ringColor: 'rgba(52, 211, 153, 0.4)',
  },
  {
    bgStart: '#1e3a8a',
    bgEnd: '#0f172a',
    accent: '#60a5fa',
    textColor: '#ffffff',
    ringColor: 'rgba(96, 165, 250, 0.4)',
  },
  {
    bgStart: '#7c2d12',
    bgEnd: '#431407',
    accent: '#fb923c',
    textColor: '#ffffff',
    ringColor: 'rgba(251, 146, 60, 0.4)',
  },
  {
    bgStart: '#4c1d95',
    bgEnd: '#1e1b4b',
    accent: '#a78bfa',
    textColor: '#ffffff',
    ringColor: 'rgba(167, 139, 250, 0.4)',
  },
  {
    bgStart: '#134e4a',
    bgEnd: '#042f2e',
    accent: '#2dd4bf',
    textColor: '#ffffff',
    ringColor: 'rgba(45, 212, 191, 0.4)',
  },
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  if (!name) return 'NX';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Returns a self-contained SVG Data URI representing a high-end vector enterprise monogram
 */
export function getPencilSketchAvatar(nameOrId: string = 'User', _genderHint?: 'female' | 'male'): string {
  const hash = hashString(nameOrId);
  const palette = PALETTES[hash % PALETTES.length];
  const initials = getInitials(nameOrId);

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <defs>
    <linearGradient id="grad_${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.bgStart}"/>
      <stop offset="100%" stop-color="${palette.bgEnd}"/>
    </linearGradient>
    <linearGradient id="glow_${hash}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${palette.accent}" stop-opacity="0.2"/>
    </linearGradient>
  </defs>

  <!-- Background Base with Gradient -->
  <circle cx="50" cy="50" r="48" fill="url(#grad_${hash})" stroke="${palette.ringColor}" stroke-width="2" />

  <!-- Geometric Inner Accent Rings -->
  <circle cx="50" cy="50" r="42" fill="none" stroke="${palette.accent}" stroke-width="0.8" stroke-dasharray="3,3" opacity="0.3" />
  <circle cx="50" cy="50" r="36" fill="none" stroke="url(#glow_${hash})" stroke-width="1.2" opacity="0.4" />

  <!-- Clean Monogram Initials -->
  <text x="50" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif" font-size="28" font-weight="700" fill="${palette.textColor}" text-anchor="middle" letter-spacing="1">
    ${initials}
  </text>

  <!-- Modern Corner Accent Node -->
  <circle cx="75" cy="25" r="4" fill="${palette.accent}" opacity="0.7" />
</svg>
`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Pre-generated clean vector avatars for team members & leads
 */
export const PENCIL_AVATARS = {
  admin: getPencilSketchAvatar('Eleanor Vance'),
  manager: getPencilSketchAvatar('Marcus Sterling'),
  sales: getPencilSketchAvatar('Sarah Chen'),
  devon: getPencilSketchAvatar('Devon Miller'),
  sophia: getPencilSketchAvatar('Sophia Rodriguez'),
  austin: getPencilSketchAvatar('Austin Rivers'),
  rachel: getPencilSketchAvatar('Rachel Green'),
  liam: getPencilSketchAvatar('Liam Vance'),
  hannah: getPencilSketchAvatar('Hannah Abbott'),
  carlos: getPencilSketchAvatar('Carlos Mendez'),
  default: getPencilSketchAvatar('User Account'),
};
