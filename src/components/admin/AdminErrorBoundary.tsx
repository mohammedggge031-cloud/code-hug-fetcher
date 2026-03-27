import { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class AdminErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Admin section error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <AlertCircle className="h-12 w-12 text-destructive/60" />
          <h2 className="text-lg font-semibold text-foreground">
            {this.props.fallbackTitle || "Something went wrong"}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md">
            An error occurred while loading this section. Please try refreshing.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AdminErrorBoundary;
