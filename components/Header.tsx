import MobileMenu from "../islands/MobileMenu.tsx";
import ThemeToggle from "../islands/ThemeToggle.tsx";
import { trackEvent } from "../utils/track.ts";

interface NavLinkProps {
  href: string;
  children: string;
  external?: boolean;
  pathname: string;
}

function NavLink({ href, children, external = false, pathname }: NavLinkProps) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...(!external && { "data-internal": "true" })}
      aria-current={pathname === href || pathname.startsWith(`${href}/`)
        ? "page"
        : undefined}
      data-nav-link="true"
      class="site-nav-link"
    >
      {children}
    </a>
  );
}

export default function Header({ pathname }: { pathname: string }) {
  const handleMenuClick = () => {
    trackEvent({
      type: "click",
      clickType: "menu",
      target: "home",
    });
  };

  return (
    <header class="site-header">
      <div class="site-nav-shell flex items-center justify-between">
        <a
          href="/"
          class="site-brand"
          data-internal="true"
          onClick={handleMenuClick}
        >
          <span>
            hrvoje.<wbr />pavlinovic
          </span>
        </a>

        {/* Desktop Navigation */}
        <div class="hidden items-center gap-1 md:flex">
          <nav aria-label="Main navigation" class="flex items-center gap-1">
            <NavLink pathname={pathname} href="/about">about</NavLink>
            <NavLink pathname={pathname} href="/cv">cv</NavLink>
            <NavLink pathname={pathname} href="/projects">projects</NavLink>
            <NavLink pathname={pathname} href="/blog">blog</NavLink>
          </nav>

          {/* Theme toggle */}
          <div class="ml-1 flex items-center pl-1">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div class="js-nav-controls flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenu pathname={pathname} />
        </div>
      </div>
      <noscript>
        <style>{`.js-nav-controls, .theme-toggle { display: none; }`}</style>
        <nav aria-label="Main navigation" class="no-script-navigation">
          {["about", "cv", "projects", "blog"].map((name) => (
            <a
              href={`/${name}`}
              aria-current={pathname === `/${name}` ? "page" : undefined}
            >
              {name}
            </a>
          ))}
        </nav>
      </noscript>
    </header>
  );
}
