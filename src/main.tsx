import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/typography.css";
import "./styles/floating-actions.css";

// Remove the pre-rendered skeleton before React mounts
const skeleton = document.querySelector('[data-skeleton]');
if (skeleton) skeleton.remove();

createRoot(document.getElementById("root")!).render(<App />);
