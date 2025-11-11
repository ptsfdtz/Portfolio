"use client";

export default function Atom() {
  return (
    <svg
      viewBox="0 0 260 260"
      width="400"
      height="300"
      aria-hidden={false}
      role="img"
    >
      <defs>
        {/* 原子核渐变 */}
        <radialGradient id="coreGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#6ee7ff" />
          <stop offset="100%" stopColor="#34d399" />
        </radialGradient>

        {/* 大椭圆轨道路径 */}
        <path
          id="orbitPath1"
          d="M 10 130
             A 120 40 0 1 0 250 130
             A 120 40 0 1 0 10 130"
          fill="none"
        />

        {/* 小椭圆轨道路径（未旋转） */}
        <path
          id="orbitPath2"
          d="M 10 130
             A 120 40 0 1 0 250 130
             A 120 40 0 1 0 10 130"
          fill="none"
        />
      </defs>

      {/* 原子核 */}
      <circle
        cx="130"
        cy="130"
        r="24"
        fill="url(#coreGrad)"
        stroke="#2b2b2b"
        strokeWidth="6"
      />

      <ellipse
        cx="130"
        cy="130"
        rx="120"
        ry="40"
        fill="none"
        stroke="#61DAFB"
        strokeWidth="3"
        opacity="0.5"
      />
      <ellipse
        cx="130"
        cy="130"
        rx="120"
        ry="40"
        fill="none"
        stroke="#61DAFB"
        strokeWidth="3"
        opacity="0.5"
        transform="rotate(60 130 130)"
      />
      <ellipse
        cx="130"
        cy="130"
        rx="120"
        ry="40"
        fill="none"
        stroke="#61DAFB"
        strokeWidth="3"
        opacity="0.5"
        transform="rotate(-60 130 130)"
      />
      {/* 大轨道电子 */}
      <circle r="8" fill="#fca5a5" stroke="#3b2b2b" strokeWidth="2">
        <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
          <mpath href="#orbitPath1" />
        </animateMotion>
      </circle>

      {/* 倾斜轨道电子 */}
      <g transform="rotate(60 130 130)">
        <circle r="8" fill="#fde68a" stroke="#3b2b2b" strokeWidth="2">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#orbitPath2" />
          </animateMotion>
        </circle>
      </g>
    </svg>
  );
}
