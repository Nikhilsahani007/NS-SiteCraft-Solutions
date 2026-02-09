import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import { duration, easing } from '../../design-system/tokens/animations';

/**
 * Optimized Image Component
 * 
 * Features:
 * - Lazy loading (below-the-fold images)
 * - Responsive srcSet (0.5x, 1x, 2x)
 * - Skeleton loading state
 * - WebP format support
 * - Fade-in on load
 * - Priority prop for above-the-fold images
 */

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
  height: ${({ $height }) => ($height ? `${$height}px` : 'auto')};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ $rounded }) => ($rounded ? '8px' : '0')};
`;

const SkeletonBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.surfaceElevated} 50%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: ${({ $objectFit }) => $objectFit || 'cover'};
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity ${duration.moderate} ${easing.smooth};
`;

const OptimizedImage = ({
    src,
    alt,
    width,
    height,
    priority = false,
    objectFit = 'cover',
    rounded = false,
    className = '',
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Generate srcSet for responsive images
    const generateSrcSet = (baseSrc) => {
        if (!baseSrc) return '';

        // Check if URL already has query params
        const separator = baseSrc.includes('?') ? '&' : '?';

        return `
      ${baseSrc}${separator}w=${Math.floor(width / 2)}&q=80&format=webp 0.5x,
      ${baseSrc}${separator}w=${width}&q=80&format=webp 1x,
      ${baseSrc}${separator}w=${width * 2}&q=80&format=webp 2x
    `.trim();
    };

    return (
        <ImageContainer
            $width={width}
            $height={height}
            $rounded={rounded}
            className={className}
        >
            {!isLoaded && <SkeletonBox />}
            <StyledImage
                src={src}
                srcSet={width ? generateSrcSet(src) : undefined}
                alt={alt}
                width={width}
                height={height}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                $loaded={isLoaded}
                $objectFit={objectFit}
                {...props}
            />
        </ImageContainer>
    );
};

export default OptimizedImage;
