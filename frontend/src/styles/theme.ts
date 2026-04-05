import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#007AFF',
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#E5E5EA',
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
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
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