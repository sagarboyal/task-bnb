import React from "react";

/**
 * Production-grade Fleet SVG Illustration Component
 * @param {string} className - Additional Tailwind utility classes for scaling/animation
 * @param {string} primaryColor - Theme color class applied to the main trailer body
 */
export const FleetIllustration = ({
  className = "",
  primaryColor = "text-white",
}) => {
  return (
    <svg
      viewBox="0 0 200 120"
      className={`h-full w-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] ${className || ""}`}
      fill="none"
      xmlns="http://w3.org"
    >
      <style>{`
        /* Drive across the canvas */
        @keyframes driveTranslation {
          0% { transform: translate(-120px, 30px); }
          100% { transform: translate(210px, 30px); }
        }
        
        /* Motor suspension jitter */
        @keyframes engineJitter {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-0.8px); }
        }

        /* Continuous rotation for wheels */
        @keyframes tireRotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .react-moving-truck-container {
          animation: driveTranslation 7s linear infinite;
        }

        .react-truck-body {
          animation: engineJitter 0.15s ease-in-out infinite;
        }

        .react-spinning-wheel {
          animation: tireRotation 0.6s linear infinite;
        }
        
        /* Explicit coordinate anchors for rotation pivots */
        .react-wheel-1 { transform-origin: 20px 57px; }
        .react-wheel-2 { transform-origin: 72px 57px; }
        .react-wheel-3 { transform-origin: 96px 57px; }
      `}</style>

      {/* Connection Route Path */}
      <path
        d="M20 90C60 90 80 50 120 50C160 50 170 80 185 80"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {/* Cargo Truck Graphic Container */}
      <g className="react-moving-truck-container">
        {/* Inner Body Group with micro-bounce animation */}
        <g className="react-truck-body">
          {/* Main Trailer Chassis */}
          <rect
            x="0"
            y="15"
            width="85"
            height="42"
            rx="4"
            fill="currentColor"
            className={primaryColor}
          />
          {/* Driver Cab */}
          <path
            d="M86 28H104C107.5 28 110 31 110 34.5V57H86V28Z"
            fill="currentColor"
            className="text-cyan-100"
          />
          {/* Windshield */}
          <path
            d="M96 33H103L106 42H96V33Z"
            fill="currentColor"
            className="text-blue-600/80"
          />
          {/* Wheel Wells & Guards */}
          <circle cx="20" cy="57" r="10" fill="#3B82F6" />
          <circle cx="72" cy="57" r="10" fill="#3B82F6" />
          <circle cx="96" cy="57" r="10" fill="#3B82F6" />

          {/* Detailed Tires - Wheel 1 */}
          <g className="react-spinning-wheel react-wheel-1">
            <circle
              cx="20"
              cy="57"
              r="7"
              fill="currentColor"
              className="text-blue-900"
            />
            <circle
              cx="20"
              cy="54"
              r="1.5"
              fill="currentColor"
              className="text-white"
            />
          </g>

          {/* Detailed Tires - Wheel 2 */}
          <g className="react-spinning-wheel react-wheel-2">
            <circle
              cx="72"
              cy="57"
              r="7"
              fill="currentColor"
              className="text-blue-900"
            />
            <circle
              cx="72"
              cy="54"
              r="1.5"
              fill="currentColor"
              className="text-white"
            />
          </g>

          {/* Detailed Tires - Wheel 3 */}
          <g className="react-spinning-wheel react-wheel-3">
            <circle
              cx="96"
              cy="57"
              r="7"
              fill="currentColor"
              className="text-blue-900"
            />
            <circle
              cx="96"
              cy="54"
              r="1.5"
              fill="currentColor"
              className="text-white"
            />
          </g>
        </g>
      </g>

      {/* Pulsing Floating Location Anchor Pin */}
      <g transform="translate(136, 12)">
        <circle
          cx="15"
          cy="15"
          r="14"
          fill="#22D3EE"
          fillOpacity="0.25"
          className="animate-ping [animation-duration:2.5s]"
        />
        <circle cx="15" cy="15" r="9" fill="#22D3EE" fillOpacity="0.4" />
        <circle cx="15" cy="15" r="5" fill="#22D3EE" />
      </g>
    </svg>
  );
};
