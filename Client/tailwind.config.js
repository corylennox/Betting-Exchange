/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        skin: {
          header: "var(--color-text-header)",
          body: "var(--color-text-body)",
          overlay: "var(--color-text-overlay)",
          accent: "var(--color-text-accent)",
          actionUnselected: "var(--color-text-action-unselected)",
          actionSelected: "var(--color-text-action-selected)",
          actionHover: "var(--color-text-action-hover)",
          betslipHeader: "var(--color-text-betslip-header)",
        },
      },
      backgroundColor: {
        skin: {
          default: "var(--color-background-default)",
          defaultSelected: "var(--color-background-default-selected)",
          accent: "var(--color-background-accent)",
          overlay: "var(--color-background-overlay)",
          buttonMuted: "var(--color-button-muted)",
          buttonAccent: "var(--color-button-accent)",
          buttonActionUnselected: "var(--color-button-action-unselected)",
          buttonActionSelected: "var(--color-button-action-selected)",
          buttonActionHover: "var(--color-button-action-hover)",
          sidebarDivider: "var(--color-background-sidebar-divider)",
          selected: "var(--color-background-selected)",
        },
      },
      borderColor: {
        skin: {
          divider: "var(--color-border-divider)",
          input: "var(--color-text-accent)",
          buttonActionUnselected: "var(--color-border-action-unselected)",
          buttonActionSelected: "var(--color-border-action-selected)",
          body: "var(--color-text-body)",
          overlay: "var(--color-border-overlay)"
        },
      },
      fill: {
        skin: {
          unselected: "var(--color-text-header)",
          selected: "var(--color-text-action-unselected)",
        },
      },
    },
  },
  plugins: [],
};
