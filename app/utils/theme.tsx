"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Use 'light' as the server default and enable system preference so
    // the client can pick 'dark' when the user prefers it.
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
}
