module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        twinkle: "twinkle 1s ease-in-out infinite",
        flicker: "flicker 1s linear infinite",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      colors: {
        fairyPastel: "#a8f5c0",
        witchPurple: "#6a0dad",
      },
    },
  },
  plugins: [],
};
