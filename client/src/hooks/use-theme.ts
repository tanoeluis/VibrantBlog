import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize from localStorage or system preference
    if (typeof window !== "undefined") {
      if (localStorage.theme === "dark" || 
         (!("theme" in localStorage) && 
          window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        return "dark";
      }
      return "light";
    }
    return "light"; // Default to light for SSR
  });

  useEffect(() => {
    // Apply theme class to document
    const root = window.document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return { theme, toggleTheme };
}
