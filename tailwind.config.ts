/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // critical!
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sdf: "var(--sdf)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        omnibus:"teal-500",
         
      },
      spacing: {
        "7": "1.75rem",
        "18": "4.5rem",
        "128": "32rem",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["Roboto Mono", "ui-monospace", "SFMono-Regular"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        h1: ["2.5rem", { lineHeight: "3rem" }],
      },
      fontWeight: {
        extralight: "200",
        semibold: "600",
      },
      letterSpacing: {
        tightest: "-.075em",
        widest: ".25em",
      },
      lineHeight: {
        loose: "2",
        "extra-loose": "2.5",
      },
      outline: {
        "thick-blue": ["2px solid blue", "2px"],
      },
      screens: {
        xs: "480px",
        "3xl": "1920px",
        desktop: "1280px",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      boxShadow: {
        "inner-lg": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        custom: "3px 5px 10px rgba(0, 0, 0, 0.2)",
      },
      opacity: {
        "15": ".15",
        "85": ".85",
      },
    },
  },
  plugins: [],
};
