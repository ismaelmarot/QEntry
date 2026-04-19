import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ReactNode } from 'react';

export const theme = {
  colors: {
    primary: '#007AFF',
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
    background: 'var(--bg-primary)',
    surface: 'var(--bg-surface)',
    text: 'var(--text-primary)',
    textSecondary: 'var(--text-secondary)',
    border: 'var(--border-color)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
};

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg-primary: #FFFFFF;
    --bg-surface: #F2F2F7;
    --text-primary: #000000;
    --text-secondary: #8E8E93;
    --border-color: #E5E5EA;
  }

  [data-theme="dark"] {
    --bg-primary: #000000;
    --bg-surface: #1C1C1E;
    --text-primary: #FFFFFF;
    --text-secondary: #8E8E93;
    --border-color: #38383A;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /* Override hardcoded colors in styled-components */
  [data-theme="dark"] div, [data-theme="dark"] section, [data-theme="dark"] article {
    background-color: var(--bg-surface) !important;
  }

  [data-theme="dark"] span, [data-theme="dark"] p, [data-theme="dark"] h1, 
  [data-theme="dark"] h2, [data-theme="dark"] h3, [data-theme="dark"] h4 {
    color: var(--text-primary) !important;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input, select, textarea {
    font-family: inherit;
  }
`;

export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}