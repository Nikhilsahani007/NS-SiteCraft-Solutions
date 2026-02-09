import styled, { keyframes } from 'styled-components';

/**
 * Spinner Component
 * 
 * Loading spinner for button loading states and async operations
 */

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.span`
  display: inline-block;
  width: ${({ $size }) => $size || '16px'};
  height: ${({ $size }) => $size || '16px'};
  border: 2px solid ${({ $color, theme }) => $color || theme.colors.primary};
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spin} 800ms linear infinite;
`;

const Spinner = ({ size, color, className = '' }) => {
    return <StyledSpinner $size={size} $color={color} className={className} />;
};

export default Spinner;
