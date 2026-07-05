import { useEffect, useState } from "react";

/**
 * Fixed slim progress bar that fills as the user scrolls through the article.
 * Positioned just under the sticky Navbar. Pure UI — no external state.
 */
const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const total = (doc.scrollHeight - doc.clientHeight) || 1;
      const scrolled = Math.min(Math.max(window.scrollY / total, 0), 1);
      setProgress(scrolled * 100);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-[64px] md:top-[80px] left-0 right-0 h-1 bg-transparent z-40 pointer-events-none"
    >
      <div
        className="h-full bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;
