import MobileMenu from "../islands/MobileMenu.tsx";
import ThemeToggle from "../islands/ThemeToggle.tsx";

interface NavLinkProps {
  href: string;
  children: string;
  external?: boolean;
}

function NavLink({ href, children, external }: NavLinkProps) {
  return (
    <a
      href={href}
      class="dark:text-white/60 dark:hover:text-white text-black/60 hover:text-black text-base px-4 py-5 inline-block transition-colors duration-1000"
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}

export default function Header() {
  return (
    <header class="fixed top-0 left-0 right-0 z-50">
      <nav class="max-w-screen-xl mx-auto flex justify-between items-stretch">
        <a href="/" class="dark:text-white/80 dark:hover:text-white text-black/80 hover:text-black text-lg px-5 py-5 inline-block relative z-50 transition-colors duration-1000">
          hrvoje<span class="text-[#F7931A]">.</span>pavlinovic
        </a>
        
        <div class="hidden md:flex items-center">
          <NavLink href="/about">about</NavLink>
          <NavLink href="/cv">cv</NavLink>
          <NavLink href="/blog">blog</NavLink>
          <NavLink href="/contact">contact</NavLink>
          <NavLink href="https://github.com/hrvojepavlinovic/hrvoje-pavlinovic" external>source</NavLink>
          <div class="hidden md:block">
            <ThemeToggle />
          </div>
        </div>

        <MobileMenu />
      </nav>
    </header>
  );
} 