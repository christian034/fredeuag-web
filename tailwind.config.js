/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Colores como variables CSS: así TODA la app (que ya usa bg-base,
        // text-bone, etc. en todos lados) responde automáticamente al cambio
        // de tema oscuro/claro sin tener que tocar cada página una por una.
        // Los valores reales viven en styles.css (:root y .dark).
        base: "rgb(var(--color-base) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        surfaceAlt: "rgb(var(--color-surface-alt) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        bone: "rgb(var(--color-bone) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        accentDark: "rgb(var(--color-accent-dark) / <alpha-value>)",
      },
      fontFamily: {
        // FREDEUAG usa Poppins y Neo Sans STD. Neo Sans STD es una fuente
        // comercial con licencia (Monotype) — no se puede incrustar en la
        // web sin comprar esa licencia, así que usamos Poppins (que sí es
        // de uso libre) para todo el sitio.
        display: ["Poppins", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
      },
    },
  },
  plugins: [],
};
