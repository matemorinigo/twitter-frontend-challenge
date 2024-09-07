import { MouseEventHandler } from "react";
import { ButtonScratchType, StyledButtonScratch } from "./StyledButtonScratch";



interface ButtonScratchProps {
    text: string;
    size:'SMALL' | 'MEDIUM' | 'LARGE';
    buttonType: ButtonScratchType;
    onClick?: MouseEventHandler;
  }
  const ButtonScratch = ({ text, size, buttonType, onClick }: ButtonScratchProps) => {
    return (
      <StyledButtonScratch
        size={size}
        buttonType={buttonType}
        onClick={onClick}
      >
        {text}
      </StyledButtonScratch>
    );
  };
  
  export default ButtonScratch;