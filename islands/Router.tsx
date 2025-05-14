import { signal } from "@preact/signals";
import { ComponentType } from "preact";
import { useEffect } from "preact/hooks";
import HomePage from "./HomePage.tsx";
import AboutPage from "./AboutPage.tsx";
import CVPage from "./CVPage.tsx";
import ContactPage from "./ContactPage.tsx";
import StatsPage from "./StatsPage.tsx";

// Map of routes to their components
const ROUTES: Record<string, ComponentType> = {
  "/": HomePage,
  "/about": AboutPage,
  "/cv": CVPage,
  "/stats": StatsPage,
  "/contact": ContactPage,
};

// Initialize with current path, safely checking for globalThis.location
const currentPath = signal(
  typeof globalThis !== "undefined" && globalThis.location ? 
  globalThis.location.pathname : "/"
);

export default function Router() {
  useEffect(() => {
    // Only run on client side
    if (typeof globalThis === "undefined" || !globalThis.location) return;

    // Handle popstate events
    const handlePopState = () => {
      currentPath.value = globalThis.location.pathname;
    };
    
    globalThis.addEventListener("popstate", handlePopState);
    return () => globalThis.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof globalThis === "undefined" || !globalThis.location || !globalThis.history) return;

    // Handle click events for internal navigation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[data-internal]');
      
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      
      e.preventDefault();
      const path = anchor.pathname || "/";
      
      // Update URL without reload
      globalThis.history.pushState({}, '', path);
      
      // Update current path signal
      currentPath.value = path;
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Get the component for the current path
  let Component = ROUTES[currentPath.value];
  
  // Default to home if no match
  if (!Component) {
    Component = ROUTES["/"];
  }

  return <Component />;
} 