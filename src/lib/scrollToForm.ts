import { getSafeScrollBehavior, isTouchScrollDevice } from "@/lib/scrollBehavior";

/** Scroll to the contact form and auto-focus the name input so the keyboard appears on mobile */
export function scrollToContactForm() {
  const section = document.getElementById("contact");
  if (section) {
    const headerOffset = 96;
    const top = section.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(top, 0), behavior: getSafeScrollBehavior() });
    // Wait for scroll to finish, then focus the name input
    setTimeout(() => {
      const nameInput = document.getElementById("fullName") as HTMLInputElement | null;
      if (nameInput) {
        nameInput.focus({ preventScroll: true });
      }
    }, isTouchScrollDevice() ? 140 : 600);
  }
}
