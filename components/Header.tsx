import MobileMenu from "../islands/MobileMenu.tsx";
import ThemeToggle from "../islands/ThemeToggle.tsx";
import { trackEvent } from "../utils/track.ts";

interface NavLinkProps {
  href: string;
  children: string;
  external?: boolean;
}

function NavLink({ href, children, external }: NavLinkProps) {
  const handleClick = () => {
    trackEvent({
      type: "click",
      clickType: "menu",
      target: href,
    });
  };

  const isInternal = !external && !href.startsWith("/blog");

  return (
    <a
      href={href}
      class="dark:text-white/60 dark:hover:text-white text-black/60 hover:text-black text-base px-4 py-7 inline-block"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(isInternal ? { "data-internal": "true" } : {})}
      onClick={handleClick}
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
      class="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundImage: 'linear-gradient(to bottom, var(--theme-background-opaque) 40%, transparent 100%)' }}
    >
      <nav class="max-w-screen-xl mx-auto flex justify-between items-stretch">
        <a 
          href="/" 
          class="dark:text-white/80 dark:hover:text-white text-black/80 hover:text-black text-lg px-5 py-7 inline-block relative z-50"
          data-internal="true"
          onClick={handleMenuClick}
        >
          hrvoje<span class="text-btc-orange">.</span>pavlinovic
        </a>
        
        <div class="hidden md:flex items-center">
          <NavLink href="/about">about</NavLink>
          <NavLink href="/cv">cv</NavLink>
          <NavLink href="/blog">blog</NavLink>
          <NavLink href="/stats">stats</NavLink>
          <NavLink href="/contact">contact</NavLink>
          <ThemeToggle />
        </div>

        <MobileMenu />
      </nav>
    </header>
  );
} 