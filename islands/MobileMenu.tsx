import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";

export default function MobileMenu({ pathname }: { pathname: string }) {
  const isOpen = useSignal(false);
  const ready = useSignal(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    ready.value = true;
    const desktop = globalThis.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) dialog.current?.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isOpen.value) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen.value]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        disabled={!ready.value}
        class="chrome-button"
        aria-label="Open navigation"
        aria-haspopup="dialog"
        aria-expanded={isOpen.value}
        aria-controls="mobile-navigation"
        onClick={() => {
          dialog.current?.showModal();
          isOpen.value = true;
        }}
      >
        <svg
          aria-hidden="true"
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        class="mobile-menu-panel"
        aria-labelledby="mobile-navigation-title"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = dialog.current?.querySelectorAll<HTMLElement>(
            "button:not(:disabled), a[href]",
          );
          if (!controls?.length) return;
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
        onClose={() => {
          isOpen.value = false;
          if (!globalThis.matchMedia("(min-width: 768px)").matches) {
            trigger.current?.focus();
          }
        }}
      >
        <div class="mobile-menu-content">
          <div class="mobile-menu-heading">
            <h2 id="mobile-navigation-title">Navigation</h2>
            <button
              type="button"
              autoFocus
              class="chrome-button"
              aria-label="Close navigation"
              onClick={() => dialog.current?.close()}
            >
              <svg
                aria-hidden="true"
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav aria-label="Main navigation" class="mobile-menu-links">
            {["about", "cv", "projects", "blog"].map((name) => {
              const href = `/${name}`;
              return (
                <a
                  key={href}
                  href={href}
                  class="mobile-nav-link"
                  data-internal="true"
                  aria-current={pathname === href ||
                      pathname.startsWith(`${href}/`)
                    ? "page"
                    : undefined}
                  onClick={() => dialog.current?.close()}
                >
                  {name}
                </a>
              );
            })}
          </nav>
        </div>
      </dialog>
    </>
  );
}
