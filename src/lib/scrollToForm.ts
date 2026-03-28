/** Scroll to the contact form and auto-focus the name input so the keyboard appears on mobile */
export function scrollToContactForm() {
  const section = document.getElementById("contact");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    // Wait for scroll to finish, then focus the name input
    setTimeout(() => {
      const nameInput = document.getElementById("fullName") as HTMLInputElement | null;
      if (nameInput) {
        nameInput.focus({ preventScroll: true });
      }
    }, 600);
  }
}
