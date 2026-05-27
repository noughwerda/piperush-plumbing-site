import { useEffect } from "react";

/**
 * Observes any element with a class starting with `reveal` and adds `reveal-in`
 * when it enters the viewport. Supports: reveal, reveal-left, reveal-right,
 * reveal-zoom, reveal-blur.
 */
export function useReveal() {
  useEffect(() => {
    const selector = ".reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-blur, .reveal-rotate, .reveal-flip, .reveal-rise";
    const els = document.querySelectorAll<HTMLElement>(selector);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Parallax — elements with [data-parallax="0.2"] move with scroll
    const parallaxEls = document.querySelectorAll<HTMLElement>("[data-parallax]");
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.2");
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + y - window.innerHeight) * speed;
        el.style.setProperty("--p", `${-offset * 0.15}px`);
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
