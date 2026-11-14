import React from 'react';

/**
 * MandiLogo - The official MandiConnect Brand Icon & Mark
 * 
 * Features:
 * - 'M' Monogram formed by twin harvest sprout leaves (Farmer & Wholesale Market)
 * - Central golden harvest sun & digital connection hub
 * - High-speed wholesale logistics arc linking producers with buyers
 * 
 * @param {('badge'|'mark'|'full')} variant - 'badge' (squircle container), 'mark' (transparent vector), 'full' (icon + typography)
 * @param {('xs'|'sm'|'md'|'lg'|'xl')} size - Predefined size presets
 * @param {boolean} showText - Whether to show the 'MandiConnect' text label
 * @param {boolean} textDark - True if text is placed on a light background, false if placed on dark
 * @param {string} className - Additional CSS classes
 */
export default function MandiLogo({
  variant = 'badge',
  size = 'md',
  showText = false,
  textDark = true,
  className = ''
}) {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-24 h-24'
  };

  const currentSize = sizeMap[size] || size;

  // The Pure SVG Vector Mark (Transparent background)
  const VectorMark = (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="ml-leaf-l" x1="0%" y1="100%" x2="80%" y2="0%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>

        <linearGradient id="ml-leaf-r" x1="20%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        <linearGradient id="ml-sun" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FDE047" />
        </linearGradient>

        <linearGradient id="ml-arc" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>

      {/* Connecting Wholesale Highway Arc */}
      <path
        d="M 148 368 C 205 408 307 408 364 368"
        fill="none"
        stroke="url(#ml-arc)"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Left Wing of 'M' (Sweeping Agricultural Leaf) */}
      <path
        d="M 148 365 C 130 295 125 210 168 152 C 192 120 226 138 238 172 C 252 210 250 262 254 300 C 224 286 194 256 182 218 C 166 262 168 316 182 355 C 170 360 158 363 148 365 Z"
        fill="url(#ml-leaf-l)"
      />

      {/* Right Wing of 'M' (Dynamic Wholesale Leaf) */}
      <path
        d="M 364 365 C 382 295 387 210 344 152 C 320 120 286 138 274 172 C 260 210 262 262 258 300 C 288 286 318 256 330 218 C 346 262 344 316 330 355 C 342 360 354 363 364 365 Z"
        fill="url(#ml-leaf-r)"
      />

      {/* Central Sprout Heart */}
      <path
        d="M 256 316 C 240 274 242 225 256 182 C 270 225 272 274 256 316 Z"
        fill="url(#ml-sun)"
      />

      {/* The Harvest Sun & Digital Connection Node */}
      <g transform="translate(256, 136)">
        <circle cx="0" cy="0" r="30" fill="none" stroke="#FDE047" strokeWidth="3.5" opacity="0.6" strokeDasharray="8 6" />
        <circle cx="0" cy="0" r="21" fill="url(#ml-sun)" />
        <circle cx="0" cy="0" r="9" fill="#FFFFFF" opacity="0.95" />
      </g>

      {/* Farmer Supply Node */}
      <g transform="translate(148, 365)">
        <circle cx="0" cy="0" r="12" fill="#10B981" stroke="#0D2818" strokeWidth="3" />
        <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
      </g>

      {/* Commercial Buyer Node */}
      <g transform="translate(364, 365)">
        <circle cx="0" cy="0" r="12" fill="#F59E0B" stroke="#0D2818" strokeWidth="3" />
        <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
      </g>

      {/* Central Base Node */}
      <g transform="translate(256, 396)">
        <circle cx="0" cy="0" r="9.5" fill="#FDE047" stroke="#0D2818" strokeWidth="3" />
      </g>
    </svg>
  );

  // Badge Container (Squircle with forest gradient)
  const IconElement = variant === 'badge' ? (
    <div
      className={`${currentSize} rounded-2xl bg-gradient-to-br from-[#082315] via-[#0E3A23] to-[#165B37] p-2 flex items-center justify-center shadow-md border border-emerald-500/20 shrink-0 ${className}`}
    >
      {VectorMark}
    </div>
  ) : (
    <div className={`${currentSize} flex items-center justify-center shrink-0 ${className}`}>
      {VectorMark}
    </div>
  );

  if (variant === 'full' || showText) {
    return (
      <div className="flex items-center gap-3 select-none">
        {IconElement}
        <div>
          <span
            className={`text-2xl font-black tracking-tight font-serif block leading-none ${
              textDark ? 'text-[#0D2818]' : 'text-white'
            }`}
          >
            Mandi<span className="text-[#E67E22]">Connect</span>
          </span>
          <span
            className={`text-[10px] font-bold tracking-widest uppercase block mt-0.5 ${
              textDark ? 'text-emerald-800' : 'text-emerald-300'
            }`}
          >
            Wholesale Produce Portal
          </span>
        </div>
      </div>
    );
  }

  return IconElement;
}

