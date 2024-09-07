import styled from "styled-components"

interface StyledButtonScratchProps {
    size: 'SMALL' | 'MEDIUM' | 'LARGE';
    buttonType: ButtonScratchType;
}

export enum ButtonScratchType {
    OUTLINED = "OUTLINED",
    FULFILLED = "FULFILLED",
    GHOST = "GHOST",
    WHITE = "WHITE",
}

export const StyledButtonScratch = styled.button<StyledButtonScratchProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    gap: 8px;
    margin-bottom: 8px;
    width: ${(props) => props.size}; 
    height: 33px;

    background: ${(props) => {
        switch (props.buttonType) {
            case "OUTLINED":
                return props.theme.colors.white;
            case "FULFILLED":
                return props.theme.colors.main;
            case "GHOST":
                return "transparent"; 
            case "WHITE":
                return props.theme.colors.white;
            default:
                return props.theme.colors.main;
        }
    }};

    border: ${(props) =>{
        switch (props.buttonType) {
            case "OUTLINED":
                return `2px solid ${props.theme.colors.main}`;
            case "FULFILLED":
                return "none";
            case "GHOST":
                return "2px solid transparent";
            case "WHITE":
                return "1px solid #D9D9D9";
            default:
                return "none";
        }
    }};
    
    box-shadow: ${(props) => props.buttonType === "WHITE" ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none"};

    color: ${(props) => {
        switch (props.buttonType) {
            case "OUTLINED":
                return props.theme.colors.main;
            case "FULFILLED":
                return props.theme.colors.white;
            case "GHOST":
                return props.theme.colors.main;
            case "WHITE":
                return props.theme.colors.main;
            default:
                return props.theme.colors.white;
        }
    }};
    
    border-radius: 40px; 
    font-family: ${(props) => props.theme.font.default};
    font-style: normal;
    font-weight: 800;
    font-size: ${(props) => {
        switch (props.size) {
            case "SMALL":
                return "12px";
            case "MEDIUM":
                return "15px";
            case "LARGE":
                return "20px";
            default:
                return "15px";
        }
    }};
    line-height: 110%;
    cursor: pointer;
    
    &:hover {
        background: ${(props) => {
            switch (props.buttonType) {
                case "OUTLINED":
                    return props.theme.hover.outlined;
                case "FULFILLED":
                    return props.theme.hover.default;
                case "GHOST":
                    return props.theme.hover.outlined;
                case "WHITE":
                    return props.theme.hover.outlined;
                default:
                    return props.theme.hover.default;
            }
        }};
    }
`;
