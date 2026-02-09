import { createGlobalStyle } from 'styled-components';
import { typography } from '../tokens/typography';

/**
 * Global Styles
 * 
 * CSS reset and base styles using styled-components
 * Applied globally to the application
 */

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Root element */
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  /* Respect user's motion preferences */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Body */
  body {
    font-family: ${typography.fontFamily.sans};
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.regular};
    line-height: ${typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background};
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${typography.fontWeight.bold};
    line-height: ${typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.text.primary};
    letter-spacing: ${typography.letterSpacing.tight};
    margin: 0;
  }

  h1 {
    font-size: ${typography.fontSize['5xl']};
  }

  h2 {
    font-size: ${typography.fontSize['4xl']};
  }

  h3 {
    font-size: ${typography.fontSize['3xl']};
    font-weight: ${typography.fontWeight.semibold};
  }

  h4 {
    font-size: ${typography.fontSize['2xl']};
    font-weight: ${typography.fontWeight.semibold};
  }

  h5 {
    font-size: ${typography.fontSize.xl};
    font-weight: ${typography.fontWeight.semibold};
  }

  h6 {
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.medium};
  }

  /* Paragraphs */
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: ${typography.lineHeight.relaxed};
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Buttons */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }

  /* Form elements */
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }

  /* Remove default input styles */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  /* Lists */
  ul, ol {
    list-style: none;
  }

  /* Code */
  code, pre {
    font-family: ${typography.fontFamily.mono};
    font-size: ${typography.fontSize.sm};
  }

  /* Selection */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primarySubtle};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  /* Scrollbar styling (webkit browsers) */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.strong};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.text.disabled};
    }
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Responsive typography */
  @media (max-width: 768px) {
    h1 {
      font-size: ${typography.fontSize['4xl']};
    }

    h2 {
      font-size: ${typography.fontSize['3xl']};
    }

    h3 {
      font-size: ${typography.fontSize['2xl']};
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: ${typography.fontSize['3xl']};
    }

    h2 {
      font-size: ${typography.fontSize['2xl']};
    }

    h3 {
      font-size: ${typography.fontSize.xl};
    }
  }
`;

export default GlobalStyles;
