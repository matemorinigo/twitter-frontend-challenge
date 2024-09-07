import styled from "styled-components";

interface StyledInputScratchProps{
  inputSize: Size;
}

export enum Size {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export const StyledSearchBarInputScratch = styled.input<StyledInputScratchProps>`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: ${(props) => {
    switch (props.inputSize) {
      case Size.SMALL:
        return '36px';
      case Size.MEDIUM:
        return '50px';
      case Size.LARGE:
        return '60px';
      default:
        return '50px'; 
    }
  }};;
  gap: 8px;
  box-sizing: border-box;
  border-radius: 30px;
  border: none;
  
  padding: ${(props) => {
    switch (props.inputSize) {
      case Size.SMALL:
        return '8px 8px 8px 8px';
      case Size.MEDIUM:
        return '16px 16px 16px 16px';
      case Size.LARGE:
        return '20px 20px 20px 20px';
      default:
        return '12px 16px 12px 16px'; 
    }
  }};

  font-family: ${(props) => props.theme.font.default};
  line-height: 110%;
  letter-spacing: -0.15px;

  font-size: ${(props) => {
    switch (props.inputSize) {
      case Size.SMALL:
        return '14px';
      case Size.MEDIUM:
        return '16px';
      case Size.LARGE:
        return '18px';
      default:
        return '16px';
    }
  }};
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.inactiveBackground};
  color: ${(props) => props.theme.colors.text};

  transition: 0.05s;

  &:focus {
    outline: 1px solid ${(props) => props.theme.colors.main};
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: '#657786';
  }
`;