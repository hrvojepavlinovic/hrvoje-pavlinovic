import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { ComponentType } from "preact";
import HomePage from "./HomePage.tsx";
import AboutPage from "./AboutPage.tsx";
import CVPage from "./CVPage.tsx";
import ContactPage from "./ContactPage.tsx";
import ProjectsPage from "./ProjectsPage.tsx";
import StatsPage from "./StatsPage.tsx";
import WebStatsPage from "./WebStats.tsx";

// Helper function to update meta tags
function updateMetaTags(title: string) {
  if (typeof globalThis !== "undefined" && globalThis.document) {
    globalThis.document.title = title;
  }
}

interface RouteConfig {
  component: ComponentType;
  title: string;
}

type Routes = {
  [key: string]: RouteConfig;
}

const ROUTES: Routes = {
  "/": {
    component: HomePage,
    title: "Hrvoje Pavlinovic"
  },
  "/about": {
    component: AboutPage,
    title: "About Hrvoje Pavlinovic | Blockchain Developer & Tech Lead"
  },
  "/cv": {
    component: CVPage,
    title: "CV | Hrvoje Pavlinovic"
  },
  "/projects": {
    component: ProjectsPage,
    title: "Projects | Hrvoje Pavlinovic"
  },
  "/contact": {
    component: ContactPage,
    title: "Contact | Hrvoje Pavlinovic"
  },
  "/stats": {
    component: StatsPage,
    title: "Stats | Hrvoje Pavlinovic"
  },
  "/webstats": {
    component: WebStatsPage,
    title: "Web Stats | Hrvoje Pavlinovic"
  }
};

export default function Router() {
  // Initialize with current path, safely checking for globalThis.location
  const currentPath = useSignal(
    typeof globalThis !== "undefined" && globalThis.location
      ? globalThis.location.pathname
      : "/"
  );

  useEffect(() => {
    // Only run on client side
    if (typeof globalThis === "undefined") return;

    const handlePopState = () => {
      if (globalThis.location) {
        currentPath.value = globalThis.location.pathname;
        const route = ROUTES[currentPath.value];
        if (route) {
          updateMetaTags(route.title);
        }
      }
    };

    globalThis.addEventListener("popstate", handlePopState);
    return () => globalThis.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof globalThis === "undefined") return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (
        anchor &&
        globalThis.location &&
        anchor.href.startsWith(globalThis.location.origin) &&
        !anchor.hasAttribute("download") &&
        anchor.target !== "_blank"
      ) {
        const url = new URL(anchor.href);
        const newPath = url.pathname;
        
        // Let server handle blog routes
        if (newPath === "/blog" || newPath.startsWith("/blog/")) {
          return;
        }
        
        if (newPath !== currentPath.value) {
          e.preventDefault();
          if (globalThis.history) {
            globalThis.history.pushState({}, "", newPath);
          }
          currentPath.value = newPath;
          
          // Update meta tags when route changes
          const route = ROUTES[newPath];
          if (route) {
            updateMetaTags(route.title);
          }
        }
      }
    };

    globalThis.addEventListener("click", handleClick);
    return () => globalThis.removeEventListener("click", handleClick);
  }, []);

  const route = ROUTES[currentPath.value];
  const Component = route ? route.component : HomePage;

  return <Component />;
} 