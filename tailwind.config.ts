import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        /* The single most important line in this file.

           The site was built dark-only, so ~350 class usages spell their
           foreground and their hairline washes as literal `white`
           (`text-white`, `text-white/70`, `bg-white/5`, `border-white/10`,
           `from-white/10`...). Pointing Tailwind's `white` at a token
           instead of #fff makes every one of them theme-aware for free:
           in dark it still resolves to pure white, and in light it becomes
           near-black ink — so a `bg-white/5` overlay inverts into a soft
           ink wash rather than disappearing into the page.

           `<alpha-value>` is what preserves the `/70` opacity modifiers. */
        white: "hsl(var(--fg) / <alpha-value>)",

        /* Modal + lightbox scrim. Deliberately NOT part of the ink ramp:
           a scrim stays dark in both themes so the dialog above it reads. */
        scrim: "hsl(var(--scrim) / <alpha-value>)",

        /* Brand surface ramp */
        ink: {
          900: "hsl(var(--ink-900))",
          800: "hsl(var(--ink-800))",
          700: "hsl(var(--ink-700))",
          600: "hsl(var(--ink-600))",
        },
        brand: "hsl(var(--brand))",
        azure: "hsl(var(--azure))",
        gold: "hsl(var(--gold))",

        /* shadcn bridge */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },

      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        mono: ["var(--font-nunito)", "system-ui", "sans-serif"],
        display: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },

      /* Fluid type scale — headings track the viewport instead of
         jumping between two fixed breakpoint sizes. */
      fontSize: {
        "fluid-sm": "clamp(0.875rem, 0.84rem + 0.18vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)",
        "fluid-xl": "clamp(1.375rem, 1.2rem + 0.8vw, 1.875rem)",
        "fluid-2xl": "clamp(1.75rem, 1.4rem + 1.6vw, 2.75rem)",
        "fluid-3xl": "clamp(2.25rem, 1.6rem + 2.9vw, 4rem)",
        "fluid-4xl": "clamp(2.75rem, 1.7rem + 4.6vw, 5.5rem)",
      },

      letterSpacing: {
        tightest: "-0.045em",
        eyebrow: "0.22em",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      boxShadow: {
        /* Layered elevation reads far better than a single blurred drop.
           card/lift live in CSS so each theme can set its own: the
           near-black drops that work on ink would be soot on white. */
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
        glow: "0 0 0 1px hsl(var(--azure) / 0.25), 0 12px 40px -8px hsl(var(--azure) / 0.35)",
        gold: "0 8px 30px -6px hsl(var(--gold) / 0.45)",
      },

      backgroundImage: {
        "brand-sheen":
          "linear-gradient(135deg, hsl(var(--brand)) 0%, hsl(var(--ink-800)) 60%, hsl(var(--ink-900)) 100%)",
      },

      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translate3d(0, 24px, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
