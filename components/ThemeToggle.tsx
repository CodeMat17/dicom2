"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Two-state toggle: light and dark only, no "system".
 *
 * The usual next-themes toggle keeps a `mounted` flag and renders nothing on
 * the server, because the stored theme lives in localStorage. That isn't
 * needed here: both icons are always rendered and which one shows is decided
 * by the `dark:` variant — i.e. by the class next-themes has already written
 * onto <html> from its blocking inline script. No client state, no hydration
 * mismatch, no first-paint gap in the navbar.
 *
 * The label stays state-independent for the same reason: it describes the
 * control rather than the theme, so it is correct before the theme is known.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      className={cn(
        "relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors duration-300 hover:bg-white/10",
        className
      )}
    >
      {/* Cross-faded rather than swapped, so the change is a GPU-only
          opacity/rotate with nothing entering or leaving the layout. */}
      <Sun
        aria-hidden
        className="absolute h-5 w-5 -rotate-90 scale-50 opacity-0 transition-all duration-300 ease-out-quint dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
      <Moon
        aria-hidden
        className="absolute h-5 w-5 rotate-0 scale-100 opacity-100 transition-all duration-300 ease-out-quint dark:rotate-90 dark:scale-50 dark:opacity-0"
      />
    </button>
  );
}
