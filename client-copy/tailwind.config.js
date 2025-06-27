/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(217.2 32.6% 17.5%)",
        input: "hsl(217.2 32.6% 17.5%)",
        ring: "hsl(224.3 76.3% 94.1%)",
        background: "hsl(222.2 84% 4.9%)",
        foreground: "hsl(210 40% 98%)",
        primary: {
          DEFAULT: "hsl(217.2 91.2% 59.8%)",
          foreground: "hsl(222.2 84% 4.9%)",
        },
        secondary: {
          DEFAULT: "hsl(217.2 32.6% 17.5%)",
          foreground: "hsl(210 40% 98%)",
        },
        destructive: {
          DEFAULT: "hsl(0 62.8% 30.6%)",
          foreground: "hsl(210 40% 98%)",
        },
        muted: {
          DEFAULT: "hsl(217.2 32.6% 17.5%)",
          foreground: "hsl(215 20.2% 65.1%)",
        },
        accent: {
          DEFAULT: "hsl(217.2 32.6% 17.5%)",
          foreground: "hsl(210 40% 98%)",
        },
        popover: {
          DEFAULT: "hsl(222.2 84% 4.9%)",
          foreground: "hsl(210 40% 98%)",
        },
        card: {
          DEFAULT: "hsl(222.2 84% 4.9%)",
          foreground: "hsl(210 40% 98%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'moving-border-top-right': 'movingBorderTopRight 3s ease-in-out infinite',
        'moving-border-bottom-left': 'movingBorderBottomLeft 3s ease-in-out infinite reverse',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        movingBorderTopRight: {
          '0%': {
            'clip-path': 'polygon(80% 0%, 100% 0%, 100% 80%)',
            opacity: '0.8',
          },
          '50%': {
            'clip-path': 'polygon(60% 0%, 100% 0%, 100% 60%)',
            opacity: '1',
          },
          '100%': {
            'clip-path': 'polygon(80% 0%, 100% 0%, 100% 80%)',
            opacity: '0.8',
          },
        },
        movingBorderBottomLeft: {
          '0%': {
            'clip-path': 'polygon(0% 20%, 20% 100%, 0% 100%)',
            opacity: '0.8',
          },
          '50%': {
            'clip-path': 'polygon(0% 40%, 40% 100%, 0% 100%)',
            opacity: '1',
          },
          '100%': {
            'clip-path': 'polygon(0% 20%, 20% 100%, 0% 100%)',
            opacity: '0.8',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(139, 92, 246, 0.3)',
          },
          '50%': {
            'box-shadow': '0 0 30px rgba(139, 92, 246, 0.6)',
          },
        },
      },
    },
  },
  plugins: [],
}