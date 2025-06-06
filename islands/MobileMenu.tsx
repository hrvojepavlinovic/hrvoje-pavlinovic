import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface NavLinkProps {
  href: string;
  children: string;
  onClick?: () => void;
  external?: boolean;
}

function NavLink({ href, children, onClick, external = false }: NavLinkProps) {
  return (
    <a 
      href={href}
      class="flex items-center justify-center px-6 py-4 rounded-lg text-lg font-medium transition-colors dark:text-white/80 text-black/80 dark:hover:bg-white/5 hover:bg-black/5 dark:hover:text-white hover:text-black border dark:border-white/5 border-black/5 hover:border-btc-orange/20"
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export default function MobileMenu() {
  const isOpen = useSignal(false);

  // Close menu when pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") isOpen.value = false;
    };
    globalThis.addEventListener("keydown", handleEscape);
    return () => globalThis.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen.value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen.value]);

  const toggleMenu = () => isOpen.value = !isOpen.value;

  return (
    <>
      {/* Menu toggle button */}
      <button
        type="button"
        onClick={toggleMenu}
        class="inline-flex items-center justify-center rounded-md w-9 h-9 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-white/10 border-black/10 dark:bg-black/50 bg-white/50 dark:hover:bg-white/5 hover:bg-black/5 backdrop-blur-sm shadow-sm dark:shadow-white/5 shadow-black/5 relative z-50"
        aria-label="Toggle menu"
      >
        {isOpen.value ? (
          <svg class="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="m18 6-12 12" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg class="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        )}
      </button>

      {/* Mobile menu overlay */}
      <div 
        class={`fixed inset-0 dark:bg-black/95 bg-white/95 backdrop-blur-md z-40 md:hidden transition-opacity duration-200 ${
          isOpen.value ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div class="flex flex-col items-center justify-center h-full p-6 space-y-4 max-w-sm mx-auto">
          <NavLink href="/about" onClick={toggleMenu}>about</NavLink>
          <NavLink href="/cv" onClick={toggleMenu}>cv</NavLink>
          <NavLink href="/projects" onClick={toggleMenu}>projects</NavLink>
          <NavLink href="/blog" onClick={toggleMenu}>blog</NavLink>
          <NavLink href="/stats" onClick={toggleMenu}>stats</NavLink>
          <NavLink href="/contact" onClick={toggleMenu}>contact</NavLink>
        </div>
      </div>
    </>
  );
} 