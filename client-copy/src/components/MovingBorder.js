// client/src/components/MovingBorder.js
import React from 'react';

const MovingBorder = ({ className = '', color = 'blue' }) => {
  const colorMap = {
    blue: 'from-blue-500 via-cyan-400 to-blue-500',
    green: 'from-green-500 via-emerald-400 to-green-500',
    purple: 'from-purple-500 via-pink-400 to-purple-500',
    orange: 'from-orange-500 via-yellow-400 to-orange-500',
    red: 'from-red-500 via-pink-400 to-red-500',
    pink: 'from-pink-500 via-rose-400 to-pink-500',
    default: 'from-blue-500 via-cyan-400 to-blue-500',
  };

  const gradientClass = colorMap[color] || colorMap.default;

  return (
    <>
      {/* Top Right Corner */}
      <div
        className={`absolute -top-0.5 -right-0.5 w-16 h-16 ${className}`}
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, var(--tw-gradient-stops) 270deg, var(--tw-gradient-stops) 360deg)`,
        }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradientClass} rounded-tr-2xl opacity-60 animate-pulse`}
          style={{
            clipPath: 'polygon(70% 0%, 100% 0%, 100% 70%, 85% 85%)',
            filter: 'blur(1px)',
          }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradientClass} rounded-tr-2xl opacity-80`}
          style={{
            clipPath: 'polygon(80% 0%, 100% 0%, 100% 80%)',
            animation: 'movingBorderTopRight 3s ease-in-out infinite',
          }}
        />
      </div>

      {/* Bottom Left Corner */}
      <div
        className={`absolute -bottom-0.5 -left-0.5 w-16 h-16 ${className}`}
        style={{
          background: `conic-gradient(from 180deg, transparent 0deg, transparent 270deg, var(--tw-gradient-stops) 270deg, var(--tw-gradient-stops) 360deg)`,
        }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradientClass} rounded-bl-2xl opacity-60 animate-pulse`}
          style={{
            clipPath: 'polygon(0% 30%, 15% 15%, 30% 100%, 0% 100%)',
            filter: 'blur(1px)',
          }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradientClass} rounded-bl-2xl opacity-80`}
          style={{
            clipPath: 'polygon(0% 20%, 20% 100%, 0% 100%)',
            animation: 'movingBorderBottomLeft 3s ease-in-out infinite reverse',
          }}
        />
      </div>
    </>
  );
};

export default MovingBorder;