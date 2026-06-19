import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In a production environment, you would log this to an error tracking service
    console.error("Performance/Runtime Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center bg-background text-center px-4 p-8 rounded-xl border border-destructive/20 m-4">
          <AlertCircle className="h-16 w-16 text-destructive mb-6" />
          <h2 className="text-3xl font-black uppercase text-foreground mb-4">Rendering Error</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            We encountered an unexpected issue while rendering this component. Our team has been notified.
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="uppercase font-bold tracking-widest min-h-[44px]"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Reload Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;