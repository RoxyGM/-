import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            backgroundColor: '#090d16',
            color: '#f1f5f9',
            padding: '24px',
            textAlign: 'center',
            fontFamily: 'var(--font-body, sans-serif)',
          }}
        >
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '440px',
              width: '100%',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
            }}
          >
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>⚠️</span>
            <h3
              style={{
                fontSize: '17px',
                fontWeight: 600,
                color: '#f8fafc',
                margin: '0 0 8px 0',
              }}
            >
              {this.props.fallbackTitle || 'Картаны жүктеу кезінде қате орын алды'}
            </h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 16px 0', lineHeight: 1.5 }}>
              Карта қабатын көрсету барысында техникалық ақау шықты. Қайта қосып көріңіз.
            </p>
            <button
              onClick={this.handleRetry}
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#020617',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                touchAction: 'manipulation',
                minHeight: '44px',
              }}
            >
              Қайта жүктеу (Жаңарту)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
