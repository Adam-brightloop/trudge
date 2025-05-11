"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Return children directly during server rendering/initial client render
  // This prevents theme attributes from being applied until after hydration
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}