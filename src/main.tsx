import { createRoot } from "react-dom/client";
import { Component, ErrorInfo, ReactNode } from "react";
import * as Sentry from "@sentry/react";
import "./index.css";
import "./styles/typography.css";
import "./styles/floating-actions.css";
import App from "./App";
import { persistUtmFromUrl } from "@/lib/leadCapture";

// Initialize Sentry only in production to avoid noise during development.
if (import.meta.env.PROD) {
  Sentry.init({
    dsn: "https://3b18255ba38288a66354d56fc3792a77@o4511242959650816.ingest.de.sentry.io/4511242967056464",
    sendDefaultPii: true,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    environment: "production",
  });
}

// Capture UTM parameters on first page load so they survive navigation until
// the user submits a form (powers the dashboard Source Report).
persistUtmFromUrl();

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
    if (import.meta.env.PROD) {
      Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
    }
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
