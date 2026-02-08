import React from 'react';

export const BackgroundPattern: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="fish-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
             <path d="M10 20 Q 25 10, 40 20 T 70 20" stroke="#002855" fill="none" strokeWidth="1" />
             <path d="M60 60 Q 75 50, 90 60 T 120 60" stroke="#002855" fill="none" strokeWidth="1" />
             <path d="M-10 80 Q 5 70, 20 80 T 50 80" stroke="#002855" fill="none" strokeWidth="1" />
             
             {/* Simple stylized fish shape */}
             <path d="M30 40 Q 35 35, 45 40 Q 35 45, 30 40 M 45 40 L 50 35 M 45 40 L 50 45" stroke="#002855" fill="none" strokeWidth="0.5" transform="translate(10, 10) scale(0.8)" />
             <path d="M80 80 Q 85 75, 95 80 Q 85 85, 80 80 M 95 80 L 100 75 M 95 80 L 100 85" stroke="#002855" fill="none" strokeWidth="0.5" transform="translate(-10, 10) scale(1)" />

          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fish-pattern)" />
      </svg>
    </div>
  );
};