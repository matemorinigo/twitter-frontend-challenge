import React, { ChangeEvent, FocusEventHandler, useRef, useState } from "react";
import { StyledInputContainer } from "./InputContainer";
import { StyledInputTitle } from "./InputTitle";
import { StyledInputElement } from "./StyledInputElement";
import { StyledErrorMessageElement } from "./ErrorMessageElement";


interface InputWithLabelProps {
  type?: "password" | "text";
  title: string;
  placeholder: string;
  required: boolean;
  error?: boolean;
  errorMessage?: string;
  name?: string;
  value?: string;
  touched?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler;
}

const LabeledInput = ({
  title,
  placeholder,
  required,
  error,
  onChange,
  type = "text",
  errorMessage,
  value,
  touched,
  onBlur,
  name,
}: InputWithLabelProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false); // Marca el estado de focus en false
    if (onBlur) onBlur(event); // Llama al onBlur de Formik para que lo maneje también
  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };



  return (
    <>
      <StyledInputContainer
        className={`${(error && touched) ? "error" : ""}`}
        onClick={handleClick}
      >
        <StyledInputTitle
          className={`${focus ? "active-label" : ""} ${(error && touched) ? "error" : ""}`}
        >
          {title}
        </StyledInputTitle>
        <StyledInputElement
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          className={error ? "error" : ""}
          ref={inputRef}
          value={value}
        />



      </StyledInputContainer>
      {touched === true && error && errorMessage && errorMessage !== " " && <StyledErrorMessageElement>{errorMessage}</StyledErrorMessageElement>}
    </>


  );
};

export default LabeledInput;
