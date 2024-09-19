import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Background = styled.div`
  position: absolute;
  inset: 0;
  background-color: #fff; 
`

const BackgroundEffect = styled.div`
  position: absolute;
  inset: 0;
  background-color: #fff; 
  background-size: 20px 20px;
  opacity: 0.2;
  filter: blur(100px);
`

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 1rem;
  gap: 1rem;
`

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  
  @media (min-width: 1024px) {
    margin-top: 2.5rem;
  }
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: white;
  text-align: center;
  letter-spacing: 0.05em;

  @media (min-width: 640px) {
    font-size: 3.75rem;
  }

  @media (min-width: 1024px) {
    font-size: 4.5rem;
  }

  span {
    background: linear-gradient(to right, #A5CCF4, #428AD2);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2.5rem 0;
`

const Button = styled.button`
  background: linear-gradient(to right, #A5CCF4, #428AD2);
  padding: 0.75rem 1rem;
  margin: 0 0.75rem;
  border-radius: 0.375rem;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`

const NotFoundPage = () => (
  <Wrapper>
    <Background>
      <BackgroundEffect />
    </Background>

    <Content>
      <HeadingContainer>
        <Title>
         <span>404 Page Not Found</span> 
        </Title>
        <ButtonWrapper>
          <Link to="/">
            <Button>Go back to home page</Button>
          </Link>
        </ButtonWrapper>
      </HeadingContainer>
    </Content>
  </Wrapper>
);

export default NotFoundPage


