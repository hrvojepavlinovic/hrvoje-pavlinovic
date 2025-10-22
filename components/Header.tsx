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
      class="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground dark:text-white/70 text-black/70 dark:hover:bg-white/5 hover:bg-black/5 dark:hover:text-white hover:text-black"
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
    <header
      class="fixed top-0 left-0 right-0 z-50 border-transparent"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, var(--theme-background-opaque) 40%, transparent 100%)",
      }}
    >
      <nav class="max-w-screen-xl mx-auto flex justify-between items-center px-4">
        <a
          href="/"
          class="flex items-center space-x-2 text-lg font-semibold tracking-tight py-6 dark:text-white text-black hover:opacity-80 transition-opacity"
          data-internal="true"
          onClick={handleMenuClick}
        >
          <span>
            hrvoje<span class="text-btc-orange">.</span>pavlinovic
          </span>
        </a>

        {/* Desktop Navigation */}
        <div class="hidden md:flex items-center space-x-1">
          <nav class="flex items-center space-x-1">
            <NavLink href="/about">about</NavLink>
            <NavLink href="/cv">cv</NavLink>
            <NavLink href="/projects">projects</NavLink>
            <NavLink href="/blog">blog</NavLink>
            <NavLink href="/stats">stats</NavLink>
            <NavLink href="/contact">contact</NavLink>
          </nav>

          {/* Theme toggle */}
          <div class="flex items-center ml-2 pl-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div class="flex items-center md:hidden space-x-2">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
