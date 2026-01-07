import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * - Listens for route changes and scrolls to the top of the app.
 * - Tries to scroll the element with `data-scroll-container` (used by loco/lenis)
 *   and falls back to window.scrollTo.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    requestAnimationFrame(() => {
      const loco = (window as any).locoScroll;
      if (loco && typeof loco.scrollTo === "function") {
        try {
          loco.scrollTo(0);
          return;
        } catch (e) {
        }
      }
      const scroller = document.querySelector<HTMLElement>("[data-scroll-container]");
      if (scroller) {
        try {
          scroller.scrollTo({ top: 0, left: 0, behavior: "auto" });
        } catch (e) {
          scroller.scrollTop = 0;
        }
      } else {
        try {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        } catch (e) {
        }
      }
    });
  }, [pathname]);

  return null;
}
