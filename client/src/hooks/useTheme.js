import { useEffect, useState } from "react"

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system"
  })

  const [systemTheme, setSystemTheme] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  )

  const resolvedTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    const root = document.documentElement

    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)

    localStorage.setItem("theme", theme)
  }, [theme, resolvedTheme])

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")

    const listener = (e) => {
      setSystemTheme(e.matches ? "dark" : "light")
    }

    media.addEventListener("change", listener)

    return () => media.removeEventListener("change", listener)
  }, [])

  return {
    theme,
    setTheme,
    resolvedTheme,
  }
}