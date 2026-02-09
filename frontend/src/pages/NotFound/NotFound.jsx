import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { spacing } from '../../design-system/tokens/spacing';
import { typography } from '../../design-system/tokens/typography';
import Button from '../../components/Button/Button';

/**
 * 404 Not Found Page
 * 
 * Helpful error page with navigation back to home
 */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: ${spacing[8]};
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: ${typography.fontSize['7xl']};
  font-weight: ${typography.fontWeight.bold};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primaryHover}, ${({ theme }) => theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${spacing[4]};
  line-height: 1;
`;

const Title = styled.h2`
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${spacing[4]};
`;

const Description = styled.p`
  font-size: ${typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 500px;
  margin-bottom: ${spacing[8]};
  line-height: ${typography.lineHeight.relaxed};
`;

const Actions = styled.div`
  display: flex;
  gap: ${spacing[4]};
  flex-wrap: wrap;
  justify-content: center;
`;

const NotFound = () => {
    return (
        <Container>
            <ErrorCode>404</ErrorCode>
            <Title>Page Not Found</Title>
            <Description>
                The page you're looking for doesn't exist or has been moved.
                Let's get you back on track.
            </Description>
            <Actions>
                <Link to="/">
                    <Button variant="primary" size="large">
                        Go to Homepage
                    </Button>
                </Link>
                <Link to="/contact">
                    <Button variant="outline" size="large">
                        Contact Us
                    </Button>
                </Link>
            </Actions>
        </Container>
    );
};

export default NotFound;
