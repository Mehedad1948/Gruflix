import Link from "next/link";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null; // Store the error object in state
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null }; // Initialize error state
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }; // Update error state when an error occurs
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // You can use your own error logging service here
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render the error UI with the stored error message
      return (
        <div className="w-full h-full flex flex-col items-center justify-center frame">
          <h2 className="bg-clip-text text-transparent hero-text mb-4">
           Oops, There was an error!
          </h2>
          <h2 className="bg-clip-text text-xl text-transparent bg-gradient-to-r
          from-amber-800 to-rose-700 mb-4">
            {this.state.error?.message} {/* Display error message */}
          </h2>
          <img className="w-1/2 max-w-xs" src="/error.png" alt="" />
          <Link
            className="font-semibold mt-3 bg-clip-text text-transparent hero-text"
            href="/"
          >
            Go to Home Page
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
