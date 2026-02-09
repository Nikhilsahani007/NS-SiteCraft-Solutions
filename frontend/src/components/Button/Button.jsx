import styled, { keyframes, css } from 'styled-components';
import { useState } from 'react';
import { spacing } from '../../design-system/tokens/spacing';
import { typography } from '../../design-system/tokens/typography';
import { duration, easing } from '../../design-system/tokens/animations';

/**
 * Enhanced Button Component
 * 
 * Production-grade button with:
 * - Micro-interactions (hover lift, active press)
 * - Ripple effect on click
 * - Loading states with spinner
 * - Icon support
 * - Disabled state styling
 * - Focus ring for accessibility
 */

// Ripple animation
const rippleAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

// Spinner animation
const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled button
const StyledButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  font-family: ${typography.fontFamily.sans};
  font-weight: ${typography.fontWeight.medium};
  line-height: 1;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  transition: all ${duration.normal} ${easing.smooth};
  border: none;
  outline: none;
  user-select: none;

  /* Size variants */
  ${({ $size }) => {
        switch ($size) {
            case 'small':
                return css`
          padding: ${spacing[1.5]} ${spacing[3]};
          font-size: ${typography.fontSize.sm};
          min-height: 32px;
        `;
            case 'large':
                return css`
          padding: ${spacing[3]} ${spacing[6]};
          font-size: ${typography.fontSize.lg};
          min-height: 48px;
        `;
            default: // medium
                return css`
          padding: ${spacing[2]} ${spacing[4]};
          font-size: ${typography.fontSize.base};
          min-height: 40px;
        `;
        }
    }}

  /* Variant styles */
  ${({ $variant, theme }) => {
        switch ($variant) {
            case 'secondary':
                return css`
          background: transparent;
          color: ${theme.colors.text.primary};
          border: 1px solid ${theme.colors.border.strong};

          &:hover:not(:disabled) {
            background: ${theme.colors.surfaceHover};
            border-color: ${theme.colors.primary};
          }

          &:active:not(:disabled) {
            background: ${theme.colors.surface};
          }
        `;
            case 'outline':
                return css`
          background: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};

          &:hover:not(:disabled) {
            background: ${theme.colors.primarySubtle};
            border-color: ${theme.colors.primaryHover};
            color: ${theme.colors.primaryHover};
          }

          &:active:not(:disabled) {
            background: ${theme.colors.primarySubtle};
          }
        `;
            case 'ghost':
                return css`
          background: transparent;
          color: ${theme.colors.text.secondary};
          border: none;

          &:hover:not(:disabled) {
            background: ${theme.colors.surfaceHover};
            color: ${theme.colors.text.primary};
          }

          &:active:not(:disabled) {
            background: ${theme.colors.surface};
          }
        `;
            default: // primary
                return css`
          background: ${theme.colors.primary};
          color: ${theme.colors.text.inverse};
          border: none;

          &:hover:not(:disabled) {
            background: ${theme.colors.primaryHover};
            box-shadow: ${theme.shadows.sm};
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            background: ${theme.colors.primaryPressed};
            transform: translateY(0);
            box-shadow: none;
          }
        `;
        }
    }}

  /* Full width */
  ${({ $fullWidth }) =>
        $fullWidth &&
        css`
      width: 100%;
    `}

  /* Disabled state */
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Focus ring */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Loading state */
  ${({ $loading }) =>
        $loading &&
        css`
      cursor: wait;
      pointer-events: none;
    `}
`;

const ButtonContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  opacity: ${({ $loading }) => ($loading ? 0 : 1)};
  transition: opacity ${duration.fast} ${easing.smooth};
`;

const Spinner = styled.span`
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spinAnimation} 800ms linear infinite;
`;

const Ripple = styled.span`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  pointer-events: none;
  animation: ${rippleAnimation} 600ms ease-out;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    type = 'button',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    className = '',
    ...props
}) => {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
        if (disabled || loading) return;

        // Create ripple effect
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const newRipple = {
            x,
            y,
            size,
            id: Date.now(),
        };

        setRipples((prev) => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);

        // Call user's onClick handler
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <StyledButton
            type={type}
            onClick={handleClick}
            disabled={disabled || loading}
            $variant={variant}
            $size={size}
            $fullWidth={fullWidth}
            $loading={loading}
            className={className}
            {...props}
        >
            {/* Ripple effects */}
            {ripples.map((ripple) => (
                <Ripple
                    key={ripple.id}
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                    }}
                />
            ))}

            {/* Loading spinner */}
            {loading && <Spinner />}

            {/* Button content */}
            <ButtonContent $loading={loading}>
                {icon && iconPosition === 'left' && <IconWrapper>{icon}</IconWrapper>}
                {children}
                {icon && iconPosition === 'right' && <IconWrapper>{icon}</IconWrapper>}
            </ButtonContent>
        </StyledButton>
    );
};

export default Button;
