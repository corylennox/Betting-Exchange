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
          buttonActionUnselected: "var(--color-button-action-unselected)",
          buttonActionSelected: "var(--color-button-action-selected)",
          buttonActionHover: "var(--color-button-action-hover)",
          sidebarDivider: "var(--color-divider)",
          selected: "var(--color-background-selected)",
        },
      },
      borderColor: {
        skin: {
          divider: "var(--color-divider)",
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
      gradientColorStops: {
        skin: {
          buttonMutedGradientStart: "var(--color-button-muted-gradient-start)",
          buttonMutedGradientEnd: "var(--color-button-muted-gradient-end)",
          buttonMutedPressed: "var(--color-button-muted-pressed)",
          buttonMutedDeactivated: "var(--color-button-muted-deactivated)",
          buttonAccentGradientStart: "var(--color-button-accent-gradient-start)",
          buttonAccentGradientEnd: "var(--color-button-accent-gradient-end)",
          buttonAccentPressed: "var(--color-button-accent-pressed)",
          buttonAccentDeactivated: "var(--color-button-accent-deactivated)",
        },
      }
    },
  },
  plugins: [],
};
