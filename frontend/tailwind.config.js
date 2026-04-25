import formsPlugin from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-surface-variant": "#bac9cc",
        "surface-container-high": "#23293c",
        "on-secondary-fixed": "#001f25",
        "surface-container": "#191f31",
        "on-tertiary-fixed-variant": "#594400",
        "surface-dim": "#0c1324",
        "on-primary-fixed-variant": "#004f58",
        "surface-container-lowest": "#070d1f",
        "surface-container-highest": "#2e3447",
        "surface-tint": "#00daf3",
        "inverse-on-surface": "#2a3043",
        "on-secondary-container": "#00515d",
        "background": "#0c1324",
        "surface": "#0c1324",
        "primary-container": "#00e5ff",
        "on-background": "#dce1fb",
        "on-error-container": "#ffdad6",
        "on-surface": "#dce1fb",
        "tertiary-container": "#fec931",
        "on-tertiary-container": "#6f5500",
        "on-primary-container": "#00626e",
        "secondary-container": "#00cbe6",
        "on-primary-fixed": "#001f24",
        "error": "#ffb4ab",
        "primary-fixed": "#9cf0ff",
        "primary": "#c3f5ff",
        "outline": "#849396",
        "surface-container-low": "#151b2d",
        "outline-variant": "#3b494c",
        "tertiary": "#ffeac0",
        "secondary": "#5de6ff",
        "tertiary-fixed": "#ffdf96",
        "surface-bright": "#33394c",
        "inverse-surface": "#dce1fb",
        "inverse-primary": "#006875",
        "secondary-fixed": "#a2eeff",
        "on-tertiary": "#3e2e00",
        "on-error": "#690005",
        "on-primary": "#00363d",
        "tertiary-fixed-dim": "#f3bf26",
        "on-secondary-fixed-variant": "#004e5a",
        "secondary-fixed-dim": "#2fd9f4",
        "surface-variant": "#2e3447",
        "error-container": "#93000a",
        "on-tertiary-fixed": "#251a00",
        "primary-fixed-dim": "#00daf3",
        "on-secondary": "#00363e"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["Space Grotesk", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [
    formsPlugin,
  ],
}
