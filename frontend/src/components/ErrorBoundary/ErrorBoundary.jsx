import React from 'react';
import styled from 'styled-components';
import { spacing } from '../../design-system/tokens/spacing';
import { typography } from '../../design-system/tokens/typography';

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors in child components
 * Displays fallback UI and logs errors
 */

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${spacing[8]};
  text-align: center;
`;

const ErrorTitle = styled.h2`
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${spacing[4]};
`;

const ErrorMessage = styled.p`
  font-size: ${typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${spacing[6]};
  max-width: 600px;
`;

const ReloadButton = styled.button`
  padding: ${spacing[3]} ${spacing[6]};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.inverse};
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Error caught by boundary:', error, errorInfo);
        }

        // In production, you would log to an error tracking service
        // logErrorToService(error, errorInfo);

        this.setState({
            error,
            errorInfo,
        });
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <ErrorContainer>
                    <ErrorTitle>Something went wrong</ErrorTitle>
                    <ErrorMessage>
                        We're sorry for the inconvenience. An unexpected error occurred.
                        Please try reloading the page.
                    </ErrorMessage>
                    <ReloadButton onClick={this.handleReload}>
                        Reload Page
                    </ReloadButton>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details style={{ marginTop: spacing[8], textAlign: 'left' }}>
                            <summary style={{ cursor: 'pointer', marginBottom: spacing[2] }}>
                                Error Details (Development Only)
                            </summary>
                            <pre style={{ fontSize: typography.fontSize.sm, overflow: 'auto' }}>
                                {this.state.error.toString()}
                                {this.state.errorInfo?.componentStack}
                            </pre>
                        </details>
                    )}
                </ErrorContainer>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
