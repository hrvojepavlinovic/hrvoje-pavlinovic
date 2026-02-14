import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { ComponentType } from "preact";
import { trackEvent } from "../utils/track.ts";
import homeDataJson from "../data/home.json" with { type: "json" };
import aboutDataJson from "../data/about.json" with { type: "json" };
import { HomeData } from "../types/home.ts";
import { AboutData } from "../types/about.ts";
import HomePage, { HomePageProps } from "./HomePage.tsx";
import AboutPage from "./AboutPage.tsx";
import CVPage from "./CVPage.tsx";
import WebStatsPage from "./WebStats.tsx";

const homeData = homeDataJson as HomeData;
const aboutData = aboutDataJson as AboutData;

// Helper function to update meta tags
function updateMetaTags(title: string) {
  if (typeof globalThis !== "undefined" && globalThis.document) {
    globalThis.document.title = title;
  }
}

type HomeRouteConfig = {
  kind: "home";
  component: ComponentType<HomePageProps>;
  title: string;
  props: HomePageProps;
};

type AboutRouteConfig = {
  kind: "about";
  component: ComponentType<{ data: AboutData }>;
  title: string;
  props: {
    data: AboutData;
  };
};

type GenericRouteConfig = {
  kind: "generic";
  component: ComponentType<Record<string, unknown>>;
  title: string;
  props?: Record<string, unknown>;
};

type RouteConfig = HomeRouteConfig | AboutRouteConfig | GenericRouteConfig;

type Routes = {
  [key: string]: RouteConfig;
};

const ROUTES: Routes = {
  "/": {
    kind: "home",
    component: HomePage,
    title: "Hrvoje Pavlinovic",
    props: {
      data: homeData,
    },
  },
  "/about": {
    kind: "about",
    component: AboutPage,
    title: "About Hrvoje Pavlinovic | Systems Partner",
    props: {
      data: aboutData,
    },
  },
  "/cv": {
    kind: "generic",
    component: CVPage,
    title: "CV | Hrvoje Pavlinovic",
  },
  "/webstats": {
    kind: "generic",
    component: WebStatsPage,
    title: "Web Stats | Hrvoje Pavlinovic",
  },
};

export default function Router() {
  // Initialize with current path, safely checking for globalThis.location
  const currentPath = useSignal(
    typeof globalThis !== "undefined" && globalThis.location
      ? globalThis.location.pathname
      : "/",
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
          // Track page view for client-side navigation
          trackEvent({
            type: "pageview",
            page: currentPath.value,
            userAgent: globalThis.navigator?.userAgent,
          });
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

        // Let server handle blog routes and projects routes
        if (
          newPath === "/blog" || newPath.startsWith("/blog/") ||
          newPath === "/projects" || newPath.startsWith("/projects/")
        ) {
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
            // Track page view for client-side navigation
            trackEvent({
              type: "pageview",
              page: newPath,
              userAgent: globalThis.navigator?.userAgent,
            });
          }
        }
      }
    };

    globalThis.addEventListener("click", handleClick);
    return () => globalThis.removeEventListener("click", handleClick);
  }, []);

  const route = ROUTES[currentPath.value] ?? ROUTES["/"];

  if (route.kind === "home") {
    const RouteComponent = route.component;
    return <RouteComponent {...route.props} />;
  }

  if (route.kind === "about") {
    const RouteComponent = route.component;
    return <RouteComponent {...route.props} />;
  }

  const RouteComponent = route.component;
  return <RouteComponent {...(route.props ?? {})} />;
}
