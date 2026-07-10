import { useEffect } from "preact/hooks";

export default function MotionEffects() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const currentPath = globalThis.location.pathname.replace(/\/$/, "") || "/";

    document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]").forEach(
      (link) => {
        const linkPath = new URL(link.href, globalThis.location.origin).pathname
          .replace(/\/$/, "") || "/";
        if (
          linkPath === currentPath ||
          (linkPath !== "/" && currentPath.startsWith(`${linkPath}/`))
        ) {
          link.setAttribute("aria-current", "page");
        }
      },
    );

    const reducedMotion = globalThis.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = globalThis.matchMedia("(pointer: fine)").matches;

    const revealTargets = document.querySelectorAll<HTMLElement>(
      "[data-reveal]",
    );
    if (!reducedMotion && "IntersectionObserver" in globalThis) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
          globalThis.setTimeout(() => {
            entry.target.classList.remove("reveal-pending");
          }, 800);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

      revealTargets.forEach((target) => {
        if (
          target.getBoundingClientRect().top > globalThis.innerHeight * 0.85
        ) {
          target.classList.add("reveal-pending");
          observer.observe(target);
        } else {
          target.classList.add("is-visible");
        }
      });
      cleanups.push(() => observer.disconnect());
    } else {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
    }

    if (!reducedMotion && finePointer) {
      document.querySelectorAll<HTMLElement>("[data-gravity]").forEach(
        (target) => {
          let frame = 0;
          const move = (event: PointerEvent) => {
            globalThis.cancelAnimationFrame(frame);
            frame = globalThis.requestAnimationFrame(() => {
              const rect = target.getBoundingClientRect();
              const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
              const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
              target.style.setProperty("--gravity-x", `${x.toFixed(2)}px`);
              target.style.setProperty("--gravity-y", `${y.toFixed(2)}px`);
              target.classList.add("is-gravity");
            });
          };
          const leave = () => {
            globalThis.cancelAnimationFrame(frame);
            target.classList.remove("is-gravity");
            target.style.removeProperty("--gravity-x");
            target.style.removeProperty("--gravity-y");
          };
          target.addEventListener("pointermove", move);
          target.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            globalThis.cancelAnimationFrame(frame);
            target.removeEventListener("pointermove", move);
            target.removeEventListener("pointerleave", leave);
          });
        },
      );

      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach(
        (target) => {
          let frame = 0;
          const move = (event: PointerEvent) => {
            globalThis.cancelAnimationFrame(frame);
            frame = globalThis.requestAnimationFrame(() => {
              const rect = target.getBoundingClientRect();
              const x = (event.clientX - rect.left) / rect.width - 0.5;
              const y = (event.clientY - rect.top) / rect.height - 0.5;
              target.style.setProperty(
                "--tilt-x",
                `${(-y * 1.4).toFixed(2)}deg`,
              );
              target.style.setProperty(
                "--tilt-y",
                `${(x * 1.8).toFixed(2)}deg`,
              );
              target.classList.add("is-tilting");
            });
          };
          const leave = () => {
            globalThis.cancelAnimationFrame(frame);
            target.classList.remove("is-tilting");
            target.style.removeProperty("--tilt-x");
            target.style.removeProperty("--tilt-y");
          };
          target.addEventListener("pointermove", move);
          target.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            globalThis.cancelAnimationFrame(frame);
            target.removeEventListener("pointermove", move);
            target.removeEventListener("pointerleave", leave);
          });
        },
      );
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return <span class="motion-runtime" aria-hidden="true" />;
}
