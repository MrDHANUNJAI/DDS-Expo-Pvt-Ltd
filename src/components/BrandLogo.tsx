import React, { useState } from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light' | 'white';
  height?: number | string;
  className?: string;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  height = 38,
  className = '',
  showText = true,
}) => {
  const [imgError, setImgError] = useState(false);

  // If image loads fine, show the official logo2.png
  if (!imgError) {
    return (
      <div className={`d-inline-flex align-items-center ${className}`}>
        <img
          src="/assets/img/logo2.png"
          alt="DDS Expo"
          style={{ maxHeight: typeof height === 'number' ? `${height}px` : height, width: 'auto' }}
          className={`img-fluid ${variant === 'white' ? 'brightness-200 invert' : ''}`}
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Graceful high-fidelity SVG fallback
  const isLightOrWhite = variant === 'light' || variant === 'white';
  const textColor = isLightOrWhite ? '#ffffff' : '#012970';
  const subtextColor = isLightOrWhite ? '#94a3b8' : '#5f6d7e';

  return (
    <div className={`d-inline-flex align-items-center gap-2 ${className}`}>
      {/* Icon */}
      <div
        className="d-flex align-items-center justify-content-center rounded-3 shadow-sm text-white"
        style={{
          width: typeof height === 'number' ? `${Math.round(height * 0.9)}px` : '34px',
          height: typeof height === 'number' ? `${Math.round(height * 0.9)}px` : '34px',
          background: 'linear-gradient(135deg, #4154f1 0%, #2a75d3 50%, #7928ca 100%)',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: '60%', height: '60%' }}
        >
          <path d="M4 4h7a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5H4z" />
          <path d="M4 14h8a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5H4z" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="d-flex flex-column leading-none text-start">
          <span
            style={{
              fontSize: typeof height === 'number' ? `${Math.max(16, Math.round(height * 0.52))}px` : '20px',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              color: textColor,
              lineHeight: 1.1,
            }}
          >
            DDS <span style={{ color: '#4154f1' }}>EXPO</span>
          </span>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '1.8px',
              textTransform: 'uppercase',
              color: subtextColor,
            }}
          >
            Digital Agency
          </span>
        </div>
      )}
    </div>
  );
};
