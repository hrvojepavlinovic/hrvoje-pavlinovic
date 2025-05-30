import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import ThemeToggle from "./ThemeToggle.tsx";

interface NavLinkProps {
  href: string;
  children: string;
  onClick?: () => void;
  external?: boolean;
}

function NavLink({ href, children, onClick, external }: NavLinkProps) {
  const isInternal = !external && !href.startsWith("/blog");

  return (
    <a
      href={href}
      onClick={onClick}
      class="dark:text-white/60 dark:hover:text-white text-black/60 hover:text-black text-xl w-full text-center px-5 py-6"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(isInternal ? { "data-internal": "true" } : {})}
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
      <div class="flex items-center md:hidden">
        <button
          type="button"
          onClick={toggleMenu}
          class="dark:text-white/60 dark:hover:text-white text-black/60 hover:text-black text-base px-5 py-5 relative z-50"
        >
          {isOpen.value ? "close" : "menu"}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div 
        class={`fixed inset-0 dark:bg-black bg-white z-40 md:hidden ${
          isOpen.value ? "" : "hidden"
        }`}
      >
        <div class="flex flex-col items-stretch justify-center h-full">
          <NavLink href="/about" onClick={toggleMenu}>about</NavLink>
          <NavLink href="/cv" onClick={toggleMenu}>cv</NavLink>
          <NavLink href="/blog" onClick={toggleMenu}>blog</NavLink>
          <NavLink href="/stats" onClick={toggleMenu}>stats</NavLink>
          <NavLink href="/contact" onClick={toggleMenu}>contact</NavLink>
          <div class="flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
} 