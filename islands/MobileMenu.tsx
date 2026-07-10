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
      class="mobile-nav-link inline-block w-full py-6 text-center text-2xl"
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...(!external && { "data-internal": "true" })}
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
        class="chrome-button relative z-50"
        aria-label="Toggle menu"
      >
        {isOpen.value
          ? (
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="m18 6-12 12" />
              <path d="m6 6 12 12" />
            </svg>
          )
          : (
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
      </button>

      {/* Mobile menu overlay */}
      <div
        class={`mobile-menu-panel fixed inset-0 z-40 backdrop-blur-md transition-opacity duration-200 md:hidden ${
          isOpen.value ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div class="mx-auto flex h-full max-w-sm flex-col items-center justify-center space-y-4 p-6">
          <NavLink href="/about" onClick={toggleMenu}>about</NavLink>
          <NavLink href="/cv" onClick={toggleMenu}>cv</NavLink>
          <NavLink href="/projects" onClick={toggleMenu}>projects</NavLink>
          <NavLink href="/blog" onClick={toggleMenu}>blog</NavLink>
        </div>
      </div>
    </>
  );
}
