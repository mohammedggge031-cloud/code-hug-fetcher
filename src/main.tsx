import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/typography.css";
import "./styles/floating-actions.css";

const BOOTSTRAP_TIMEOUT_MS = 3200;
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root container not found");
}

const root = createRoot(rootElement);
let didRenderApp = false;

const renderBootstrapFallback = () => {
  if (didRenderApp) return;

  root.render(
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-center space-y-3">
        <h1 className="text-lg font-semibold text-card-foreground">Unable to load the full app</h1>
        <p className="text-sm text-muted-foreground">Fallback mode is active so the page never stays stuck on loading.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Retry
        </button>
      </div>
    </div>,
  );
};

const bootstrapTimer = window.setTimeout(renderBootstrapFallback, BOOTSTRAP_TIMEOUT_MS);

void import("./App.tsx")
  .then(({ default: App }) => {
    didRenderApp = true;
    window.clearTimeout(bootstrapTimer);
    root.render(<App />);
  })
  .catch(() => {
    window.clearTimeout(bootstrapTimer);
    renderBootstrapFallback();
  });
