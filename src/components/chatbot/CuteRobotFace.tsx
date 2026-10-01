import React from 'react';

interface CuteRobotFaceProps {
  size?: number;
  className?: string;
  isAnimated?: boolean;
  mood?: 'happy' | 'winking' | 'excited';
}

export const CuteRobotFace: React.FC<CuteRobotFaceProps> = ({
  size = 36,
  className = '',
  isAnimated = true,
  mood = 'happy',
}) => {
  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none overflow-visible ${className}`}
      aria-label="Cute Robot Assistant"
    >
      <defs>
        {/* Antenna Orb Glow */}
        <radialGradient
          id={`antenna-glow-${uniqueId}`}
          cx="0.5"
          cy="0.5"
          r="0.5"
          fx="0.3"
          fy="0.3"
        >
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="70%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0891b2" />
        </radialGradient>

        {/* Outer Head Gradient */}
        <linearGradient
          id={`head-body-${uniqueId}`}
          x1="12"
          y1="14"
          x2="52"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        {/* Head Inner Visor Screen Gradient */}
        <linearGradient
          id={`visor-screen-${uniqueId}`}
          x1="18"
          y1="22"
          x2="46"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0b1736" />
          <stop offset="50%" stopColor="#0f1f4b" />
          <stop offset="100%" stopColor="#081026" />
        </linearGradient>

        {/* Eye Glow Gradient */}
        <linearGradient
          id={`eye-grad-${uniqueId}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        {/* Ear Muff Accent */}
        <linearGradient
          id={`ear-grad-${uniqueId}`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Cheek Blush Filter / Glow */}
        <radialGradient
          id={`blush-glow-${uniqueId}`}
          cx="0.5"
          cy="0.5"
          r="0.5"
        >
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#f43f5e" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ================= ANTENNA ================= */}
      <g className={isAnimated ? 'animate-pulse' : ''} style={{ transformOrigin: '32px 14px' }}>
        {/* Antenna Mast */}
        <line
          x1="32"
          y1="15"
          x2="32"
          y2="8"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Glowing Antenna Orb */}
        <circle
          cx="32"
          cy="6.5"
          r="4.5"
          fill={`url(#antenna-glow-${uniqueId})`}
          stroke="#ffffff"
          strokeWidth="1"
        />
        {/* Antenna Sparkle Reflection */}
        <circle cx="30.5" cy="5" r="1.2" fill="#ffffff" />
      </g>

      {/* ================= EAR MUFFS / HEADPHONES ================= */}
      {/* Left Ear */}
      <rect
        x="6.5"
        y="26"
        width="5"
        height="14"
        rx="2.5"
        fill={`url(#ear-grad-${uniqueId})`}
        stroke="#1e3a8a"
        strokeWidth="0.8"
      />
      <line x1="9" y1="28" x2="9" y2="38" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" opacity="0.8" />

      {/* Right Ear */}
      <rect
        x="52.5"
        y="26"
        width="5"
        height="14"
        rx="2.5"
        fill={`url(#ear-grad-${uniqueId})`}
        stroke="#1e3a8a"
        strokeWidth="0.8"
      />
      <line x1="55" y1="28" x2="55" y2="38" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" opacity="0.8" />

      {/* ================= HEAD BASE CHASSIS ================= */}
      {/* Head Outer Rim Drop Shadow */}
      <rect
        x="10.5"
        y="14"
        width="43"
        height="38"
        rx="13"
        fill={`url(#head-body-${uniqueId})`}
        stroke="#94a3b8"
        strokeWidth="1.2"
      />

      {/* Glossy Top Bevel Highlight on Head */}
      <path
        d="M 18 16 Q 32 14 46 16"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* ================= DARK INNER VISOR / SCREEN ================= */}
      <rect
        x="15"
        y="20"
        width="34"
        height="26"
        rx="8"
        fill={`url(#visor-screen-${uniqueId})`}
        stroke="#334155"
        strokeWidth="0.8"
      />

      {/* Curved Screen Glare / Reflection across top corner */}
      <path
        d="M 17 22 L 31 22 C 27 25 21 28 17 33 Z"
        fill="#ffffff"
        opacity="0.1"
      />

      {/* ================= CUTE ROSY BLUSH CHEEKS ================= */}
      <ellipse
        cx="19.5"
        cy="38.5"
        rx="3.5"
        ry="2.2"
        fill={`url(#blush-glow-${uniqueId})`}
      />
      <ellipse
        cx="44.5"
        cy="38.5"
        rx="3.5"
        ry="2.2"
        fill={`url(#blush-glow-${uniqueId})`}
      />

      {/* ================= EXPRESSIVE EYES ================= */}
      {/* Left Eye */}
      <g className={isAnimated ? 'cute-robot-eye' : ''}>
        <rect
          x="20.5"
          y="27"
          width="7"
          height="8.5"
          rx="3.5"
          fill={`url(#eye-grad-${uniqueId})`}
        />
        {/* Eye Specular Highlights (Sparkle) */}
        <circle cx="22.5" cy="29" r="1.6" fill="#ffffff" />
        <circle cx="25.5" cy="33" r="0.9" fill="#ffffff" />
      </g>

      {/* Right Eye */}
      {mood === 'winking' ? (
        // Playful Wink Arc
        <path
          d="M 36.5 32 Q 40 28 43.5 32"
          stroke={`url(#eye-grad-${uniqueId})`}
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <g className={isAnimated ? 'cute-robot-eye' : ''}>
          <rect
            x="36.5"
            y="27"
            width="7"
            height="8.5"
            rx="3.5"
            fill={`url(#eye-grad-${uniqueId})`}
          />
          {/* Eye Specular Highlights (Sparkle) */}
          <circle cx="38.5" cy="29" r="1.6" fill="#ffffff" />
          <circle cx="41.5" cy="33" r="0.9" fill="#ffffff" />
        </g>
      )}

      {/* ================= CUTE SMILE MOUTH ================= */}
      {mood === 'excited' ? (
        // Open Joyful Mouth
        <path
          d="M 28 37 Q 32 43 36 37 Z"
          fill="#38bdf8"
          stroke="#06b6d4"
          strokeWidth="0.8"
        />
      ) : (
        // Gentle Happy Curved Smile
        <path
          d="M 28 37.5 Q 32 41.8 36 37.5"
          stroke="#38bdf8"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* Little high-tech chin micro-accent */}
      <line
        x1="29.5"
        y1="49.5"
        x2="34.5"
        y2="49.5"
        stroke="#94a3b8"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
};
