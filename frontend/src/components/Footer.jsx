import React from "react";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-black/80 text-white border-t border-white/20 py-4 text-center text-sm tracking-wide">
      <span className="opacity-90">
        © {new Date().getFullYear()} Excel Analytics Platform — Built with ❤️ by
        Team29
      </span>
    </footer>
  );
};

export default Footer;
