import React from 'react';

/**
 * ErrorBoundary — Plain CSS version
 * Catches JS errors in child components and shows a fallback UI.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }
    this.setState({ error, errorInfo });
  }

  handleReload = () => window.location.reload();

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
            background: '#08080c',
            color: '#f8fafc',
          }}
        >
          <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
            Something went wrong
          </h1>
          <p style={{ color: 'rgba(248,250,252,0.45)', marginBottom: '2rem', fontFamily: 'Inter, sans-serif', maxWidth: '480px', lineHeight: 1.7 }}>
            An unexpected error occurred. Please reload the page.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#08080c',
              background: '#f8fafc',
              border: 'none',
              padding: '0.875rem 2.25rem',
              cursor: 'pointer',
            }}
          >
            Reload Page
          </button>
          {import.meta.env.DEV && this.state.error && (
            <details style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '640px' }}>
              <summary style={{ cursor: 'pointer', color: 'rgba(248,250,252,0.4)', fontSize: '0.875rem' }}>
                Error details (dev only)
              </summary>
              <pre style={{ fontSize: '0.75rem', color: 'rgba(248,250,252,0.35)', overflow: 'auto', marginTop: '0.5rem', lineHeight: 1.5 }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
