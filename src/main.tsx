import { createRoot } from "react-dom/client";
import { Component, ErrorInfo, ReactNode } from "react";
import "./index.css";
import "./styles/typography.css";
import "./styles/floating-actions.css";
import App from "./App";
import { startImagePreload } from "./lib/imagePreload";

// --- PWA Service Worker guard ---
const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();

const isPreviewHost =
  window.location.hostname.includes("id-preview--") ||
  window.location.hostname.includes("lovableproject.com");

if (isPreviewHost || isInIframe) {
  navigator.serviceWorker?.getRegistrations().then((registrations) => {
    registrations.forEach((r) => r.unregister());
  });
}
// --- End PWA guard ---

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root container not found");
}

class RootErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Root render error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-center space-y-3">
            <h1 className="text-lg font-semibold text-card-foreground">Unable to load the full app</h1>
            <p className="text-sm text-muted-foreground">Please refresh the page to continue.</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const root = createRoot(rootElement);

root.render(
  <RootErrorBoundary>
    <div id="app-root"><App /></div>
  </RootErrorBoundary>,
);

// Start background image preloading after render
startImagePreload();
