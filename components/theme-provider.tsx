"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * next-themes has to run on the client, but the root layout is a Server
 * Component — so the provider is isolated here and the layout stays static.
 *
 * It injects a blocking inline script into <head> that sets the `.light` /
 * `.dark` class on <html> while the HTML is still parsing, which is why the
 * prerendered pages never flash the wrong theme before hydration.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
