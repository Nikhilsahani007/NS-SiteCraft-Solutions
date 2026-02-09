import styled from 'styled-components';
import { spacing } from '../../design-system/tokens/spacing';
import { duration, easing } from '../../design-system/tokens/animations';

/**
 * Card Component
 * 
 * Reusable card with:
 * - Layered elevation (depth-1, depth-2, depth-3)
 * - Hover elevation increase
 * - Smooth transitions
 * - Customizable padding
 */

const StyledCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-radius: 8px;
  overflow: hidden;
  transition: all ${duration.moderate} ${easing.smooth};

  /* Elevation variants */
  ${({ $depth, theme }) => {
        switch ($depth) {
            case 'depth-2':
                return `
          box-shadow: ${theme.shadows.md};
        `;
            case 'depth-3':
                return `
          box-shadow: ${theme.shadows.lg};
        `;
            default: // depth-1
                return `
          box-shadow: ${theme.shadows.sm};
        `;
        }
    }}

  /* Padding variants */
  ${({ $padding }) => {
        switch ($padding) {
            case 'small':
                return `padding: ${spacing[4]};`;
            case 'large':
                return `padding: ${spacing[8]};`;
            default: // medium
                return `padding: ${spacing[6]};`;
        }
    }}

  /* Hover effect */
  ${({ $hoverable, theme }) =>
        $hoverable &&
        `
      cursor: pointer;
      
      &:hover {
        background: ${theme.colors.surfaceHover};
        box-shadow: ${theme.shadows.md};
        transform: translateY(-2px);
        border-color: ${theme.colors.border.strong};
      }

      &:active {
        transform: translateY(0);
        box-shadow: ${theme.shadows.sm};
      }
    `}

  /* Full width */
  ${({ $fullWidth }) =>
        $fullWidth &&
        `
      width: 100%;
    `}
`;

const Card = ({
    children,
    depth = 'depth-1',
    padding = 'medium',
    hoverable = false,
    fullWidth = false,
    onClick,
    className = '',
    ...props
}) => {
    return (
        <StyledCard
            $depth={depth}
            $padding={padding}
            $hoverable={hoverable}
            $fullWidth={fullWidth}
            onClick={onClick}
            className={className}
            {...props}
        >
            {children}
        </StyledCard>
    );
};

export default Card;
