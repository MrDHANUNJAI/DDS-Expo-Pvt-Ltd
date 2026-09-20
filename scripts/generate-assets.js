import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUT_DIR = path.resolve('public/assets/img');
fs.mkdirSync(path.join(OUT_DIR, 'logo'), { recursive: true });
fs.mkdirSync(path.join(OUT_DIR, 'team'), { recursive: true });

// 1. Logo SVG (Crisp modern corporate monogram + bold typography)
const logoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 120" width="540" height="120">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4154f1" />
      <stop offset="50%" stop-color="#2a75d3" />
      <stop offset="100%" stop-color="#7928ca" />
    </linearGradient>
    <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00d2ff" />
      <stop offset="100%" stop-color="#0070f3" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#4154f1" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Logo Mark -->
  <g transform="translate(20, 10)">
    <!-- Outer rounded hexagon/shield -->
    <rect x="5" y="5" width="90" height="90" rx="22" fill="url(#grad1)" filter="url(#shadow)" />
    <!-- Dynamic geometric facet -->
    <path d="M 20 20 L 75 20 C 83 20, 88 25, 88 35 L 88 75 C 88 83, 83 88, 75 88 Z" fill="url(#grad2)" opacity="0.35" />
    <!-- White DDS Emblem / Falcon Rocket Motif -->
    <path d="M 32 30 L 52 30 C 66 30, 75 38, 75 50 C 75 62, 66 70, 52 70 L 32 70 Z M 44 42 L 44 58 L 51 58 C 58 58, 62 55, 62 50 C 62 45, 58 42, 51 42 Z" fill="#ffffff" />
    <!-- Sparkle accent -->
    <circle cx="75" cy="25" r="4" fill="#ffffff" />
    <polygon points="75,15 77,23 85,25 77,27 75,35 73,27 65,25 73,23" fill="#00ffff" />
  </g>

  <!-- Wordmark -->
  <text x="135" y="66" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="44" font-weight="900" letter-spacing="-1.5" fill="#012970">
    DDS <tspan fill="#4154f1">EXPO</tspan>
  </text>
  <text x="138" y="89" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="4.5" fill="#5f6d7e">
    DIGITAL SOLUTIONS &amp; AI
  </text>
  <circle cx="510" cy="85" r="3.5" fill="#4154f1" />
</svg>
`;

// 2. Hero Illustration SVG
const heroSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 650" width="800" height="650">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#eff6ff" />
      <stop offset="100%" stop-color="#e0e7ff" />
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4154f1" />
      <stop offset="100%" stop-color="#2a3eb1" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00d2ff" />
      <stop offset="100%" stop-color="#0070f3" />
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ec4899" />
      <stop offset="100%" stop-color="#8b5cf6" />
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#0f172a" flood-opacity="0.12" />
    </filter>
  </defs>

  <!-- Ambient Backdrop -->
  <circle cx="400" cy="325" r="280" fill="url(#bgGrad)" opacity="0.7" />
  <circle cx="650" cy="180" r="90" fill="#c7d2fe" opacity="0.4" />
  <circle cx="150" cy="450" r="110" fill="#bae6fd" opacity="0.4" />

  <!-- Main Central Analytics Platform Card -->
  <g filter="url(#cardShadow)">
    <rect x="140" y="120" width="520" height="380" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
    <!-- Header Bar -->
    <rect x="140" y="120" width="520" height="50" rx="24" fill="#f8fafc" />
    <rect x="140" y="155" width="520" height="15" fill="#f8fafc" />
    <line x1="140" y1="170" x2="660" y2="170" stroke="#e2e8f0" stroke-width="1.5" />
    <circle cx="170" cy="145" r="6" fill="#ef4444" />
    <circle cx="190" cy="145" r="6" fill="#f59e0b" />
    <circle cx="210" cy="145" r="6" fill="#10b981" />
    <rect x="250" y="137" width="180" height="16" rx="8" fill="#e2e8f0" />

    <!-- Chart Bars -->
    <g transform="translate(180, 220)">
      <rect x="20" y="160" width="36" height="60" rx="6" fill="#c7d2fe" />
      <rect x="80" y="110" width="36" height="110" rx="6" fill="#818cf8" />
      <rect x="140" y="70" width="36" height="150" rx="6" fill="#6366f1" />
      <rect x="200" y="130" width="36" height="90" rx="6" fill="#818cf8" />
      <rect x="260" y="40" width="36" height="180" rx="6" fill="url(#primaryGrad)" />
      <rect x="320" y="15" width="36" height="205" rx="6" fill="url(#accentGrad)" />
      <!-- Baseline -->
      <line x1="0" y1="220" x2="380" y2="220" stroke="#cbd5e1" stroke-width="2" />
      <!-- Growth Curve Line -->
      <path d="M 38 150 Q 98 100, 158 60 T 278 30 T 338 10" fill="none" stroke="#4154f1" stroke-width="4" stroke-linecap="round" />
      <circle cx="338" cy="10" r="7" fill="#ffffff" stroke="#4154f1" stroke-width="4" />
    </g>
  </g>

  <!-- Floating Metric Widget 1 (ROAS 4.8x) -->
  <g filter="url(#cardShadow)" transform="translate(70, 240)">
    <rect x="0" y="0" width="190" height="110" rx="18" fill="#ffffff" stroke="#e0e7ff" stroke-width="2" />
    <circle cx="35" cy="35" r="18" fill="#dbeafe" />
    <path d="M 28 35 L 33 40 L 43 30" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <text x="62" y="34" font-family="sans-serif" font-size="12" font-weight="600" fill="#64748b">Verified ROAS</text>
    <text x="62" y="52" font-family="sans-serif" font-size="20" font-weight="800" fill="#0f172a">+380%</text>
    <rect x="20" y="75" width="150" height="8" rx="4" fill="#eff6ff" />
    <rect x="20" y="75" width="120" height="8" rx="4" fill="#2563eb" />
  </g>

  <!-- Floating Metric Widget 2 (AI Auto-Pilot) -->
  <g filter="url(#cardShadow)" transform="translate(560, 310)">
    <rect x="0" y="0" width="200" height="120" rx="18" fill="#ffffff" stroke="#fce7f3" stroke-width="2" />
    <circle cx="35" cy="35" r="18" fill="url(#purpleGrad)" />
    <!-- Lightning bolt -->
    <path d="M 35 24 L 29 36 L 35 36 L 33 46 L 41 33 L 35 33 Z" fill="#ffffff" />
    <text x="62" y="34" font-family="sans-serif" font-size="12" font-weight="700" fill="#64748b">AI Engine</text>
    <text x="62" y="52" font-family="sans-serif" font-size="18" font-weight="800" fill="#831843">Real-time Bidding</text>
    <text x="20" y="85" font-family="sans-serif" font-size="11" font-weight="600" fill="#10b981">● 99.98% Model Uptime</text>
  </g>

  <!-- Floating Star Badge -->
  <g filter="url(#cardShadow)" transform="translate(480, 70)">
    <rect x="0" y="0" width="170" height="60" rx="30" fill="#1e293b" />
    <circle cx="30" cy="30" r="16" fill="#f59e0b" />
    <text x="25" y="36" font-family="sans-serif" font-size="16" fill="#ffffff">★</text>
    <text x="56" y="28" font-family="sans-serif" font-size="12" font-weight="600" fill="#94a3b8">Top Rated</text>
    <text x="56" y="46" font-family="sans-serif" font-size="14" font-weight="800" fill="#ffffff">500+ Clients</text>
  </g>
</svg>
`;

// 3. Features Illustration SVG
const featuresSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 550" width="700" height="550">
  <defs>
    <linearGradient id="featGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4154f1" />
      <stop offset="100%" stop-color="#7928ca" />
    </linearGradient>
    <filter id="featShadow">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#4154f1" flood-opacity="0.15" />
    </filter>
  </defs>

  <rect x="50" y="40" width="600" height="470" rx="28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" filter="url(#featShadow)" />

  <!-- Node network -->
  <circle cx="350" cy="200" r="50" fill="url(#featGrad)" />
  <text x="330" y="208" font-family="sans-serif" font-size="24" font-weight="bold" fill="#ffffff">AI</text>

  <!-- Branch Nodes -->
  <g transform="translate(140, 100)">
    <rect width="130" height="70" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="15" y="32" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Video Synthesis</text>
    <text x="15" y="52" font-family="sans-serif" font-size="10" fill="#64748b">3-Sec Hook Engine</text>
    <line x1="130" y1="35" x2="170" y2="75" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="2" />
  </g>

  <g transform="translate(430, 100)">
    <rect width="130" height="70" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="15" y="32" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Ad Optimization</text>
    <text x="15" y="52" font-family="sans-serif" font-size="10" fill="#64748b">Auto Keyword Bid</text>
    <line x1="0" y1="35" x2="-30" y2="75" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="2" />
  </g>

  <g transform="translate(140, 310)">
    <rect width="130" height="70" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="15" y="32" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Headless Web</text>
    <text x="15" y="52" font-family="sans-serif" font-size="10" fill="#64748b">0.4s Cloud Ingress</text>
    <line x1="130" y1="35" x2="170" y2="-35" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="2" />
  </g>

  <g transform="translate(430, 310)">
    <rect width="130" height="70" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="15" y="32" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a">ERP &amp; CRM</text>
    <text x="15" y="52" font-family="sans-serif" font-size="10" fill="#64748b">Automated Ledgers</text>
    <line x1="0" y1="35" x2="-30" y2="-35" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="2" />
  </g>

  <!-- Bottom Metric Strip -->
  <rect x="90" y="420" width="520" height="60" rx="16" fill="#1e293b" />
  <text x="120" y="456" font-family="sans-serif" font-size="15" font-weight="bold" fill="#38bdf8">99.98% Availability</text>
  <text x="320" y="456" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4ade80">Zero Data Leakage</text>
  <text x="500" y="456" font-family="sans-serif" font-size="15" font-weight="bold" fill="#facc15">Instant Sync</text>
</svg>
`;

// 4. Values SVGs (Values 1, 2, 3)
const createValueSvg = (title, subtitle, color1, color2, iconPath) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" width="400" height="320">
  <defs>
    <linearGradient id="vGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
  </defs>
  <rect width="400" height="320" rx="24" fill="#f8fafc" />
  <circle cx="200" cy="120" r="60" fill="url(#vGrad)" />
  <g transform="translate(170, 90)">
    ${iconPath}
  </g>
  <text x="200" y="225" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="800" fill="#0f172a">${title}</text>
  <text x="200" y="255" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="500" fill="#64748b">${subtitle}</text>
</svg>
`;

const value1Svg = createValueSvg(
  'Design &amp; Creative Depth',
  'Generative visual impact with pinpoint craft',
  '#4154f1', '#7928ca',
  `<path d="M 10 50 L 50 10 L 40 0 L 0 40 Z M 20 40 L 40 20" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" />
   <circle cx="48" cy="12" r="5" fill="#facc15" />`
);

const value2Svg = createValueSvg(
  'Algorithmic Growth',
  'Real-time automated ad bidding &amp; ROAS optimization',
  '#0284c7', '#06b6d4',
  `<path d="M 10 50 L 25 35 L 38 42 L 55 15" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
   <polyline points="45,15 55,15 55,25" stroke="#ffffff" stroke-width="5" stroke-linecap="round" fill="none" />`
);

const value3Svg = createValueSvg(
  'Enterprise Reliability',
  'Strict SLAs, 100% code ownership, and GST compliance',
  '#10b981', '#047857',
  `<path d="M 30 10 L 50 20 L 50 42 C 50 55, 30 65, 30 65 C 30 65, 10 55, 10 42 L 10 20 Z" stroke="#ffffff" stroke-width="4" fill="none" />
   <polyline points="22,38 28,44 40,28" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" />`
);

// 5. Team Avatars (1, 2, 3, 4)
const createTeamSvg = (initials, name, role, color1, color2) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 380" width="320" height="380">
  <defs>
    <linearGradient id="tGrad_${initials}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
  </defs>
  <rect width="320" height="380" rx="24" fill="#f1f5f9" />
  <circle cx="160" cy="150" r="85" fill="url(#tGrad_${initials})" />
  <circle cx="160" cy="130" r="42" fill="#ffffff" opacity="0.95" />
  <path d="M 105 230 C 105 190, 215 190, 215 230 Z" fill="#ffffff" opacity="0.9" />
  <text x="160" y="142" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="900" fill="${color1}">${initials}</text>
  <text x="160" y="295" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="800" fill="#0f172a">${name}</text>
  <text x="160" y="325" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="600" fill="#64748b">${role}</text>
  <rect x="135" y="345" width="50" height="4" rx="2" fill="${color1}" />
</svg>
`;

const team1Svg = createTeamSvg('DP', 'Dhanunjay Potini', 'Founder &amp; Chief Executive Officer', '#4154f1', '#2a3eb1');
const team2Svg = createTeamSvg('RD', 'Rama Devi Gollavilli', 'Co-Founder &amp; Director of Operations', '#ec4899', '#8b5cf6');
const team3Svg = createTeamSvg('SP', 'Srikanth Potini', 'Chief Technical Advisor', '#0284c7', '#0d9488');
const team4Svg = createTeamSvg('SK', 'Sanjay Kumar', 'Head of Business Development', '#10b981', '#047857');

async function buildAllAssets() {
  console.log('Generating image assets with sharp...');

  const tasks = [
    // Logos
    { svg: logoSvg, out: 'logo2.png', width: 540, height: 120 },
    { svg: logoSvg, out: 'logo/logo-1.png', width: 540, height: 120 },
    // Illustrations
    { svg: heroSvg, out: 'hero-img.png', width: 800, height: 650 },
    { svg: featuresSvg, out: 'features.png', width: 700, height: 550 },
    // Values
    { svg: value1Svg, out: 'values-1.png', width: 400, height: 320 },
    { svg: value2Svg, out: 'values-2.png', width: 400, height: 320 },
    { svg: value3Svg, out: 'values-3.png', width: 400, height: 320 },
    // Team
    { svg: team1Svg, out: 'team/team-1.png', width: 320, height: 380 },
    { svg: team2Svg, out: 'team/team-2.png', width: 320, height: 380 },
    { svg: team3Svg, out: 'team/team-3.png', width: 320, height: 380 },
    { svg: team4Svg, out: 'team/team-4.png', width: 320, height: 380 },
  ];

  for (const t of tasks) {
    const dest = path.join(OUT_DIR, t.out);
    await sharp(Buffer.from(t.svg))
      .resize(t.width, t.height)
      .png({ quality: 95 })
      .toFile(dest);
    console.log(`✓ Created ${t.out}`);

    // Also write .svg counterpart if applicable
    const svgDest = dest.replace(/\.png$/, '.svg');
    fs.writeFileSync(svgDest, t.svg.trim());
  }

  console.log('All image assets created successfully!');
}

buildAllAssets().catch(err => {
  console.error('Error creating assets:', err);
  process.exit(1);
});
