import MobileMenu from "../islands/MobileMenu.tsx";
import ThemeToggle from "../islands/ThemeToggle.tsx";
import { trackEvent } from "../utils/track.ts";

interface NavLinkProps {
  href: string;
  children: string;
  external?: boolean;
}

function NavLink({ href, children, external = false }: NavLinkProps) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...(!external && { "data-internal": "true" })}
      data-nav-link="true"
      class="site-nav-link"
    >
      {children}
    </a>
  );
}

export default function Header() {
  const handleMenuClick = () => {
    trackEvent({
      type: "click",
      clickType: "menu",
      target: "home",
    });
  };

  return (
    <header class="site-header">
      <nav class="site-nav-shell flex items-center justify-between">
        <a
          href="/"
          class="site-brand"
          data-internal="true"
          onClick={handleMenuClick}
        >
          <span>
            hrvoje.pavlinovic
          </span>
        </a>

        {/* Desktop Navigation */}
        <div class="hidden items-center gap-1 md:flex">
          <div class="flex items-center gap-1">
            <NavLink href="/about">about</NavLink>
            <NavLink href="/cv">cv</NavLink>
            <NavLink href="/projects">projects</NavLink>
            <NavLink href="/blog">blog</NavLink>
          </div>

          {/* Theme toggle */}
          <div class="ml-1 flex items-center pl-1">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div class="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
