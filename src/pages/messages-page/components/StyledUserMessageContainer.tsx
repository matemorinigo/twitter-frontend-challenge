import styled from "styled-components";

export const StyledUserMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    border-top: 1px solid ${props => props.theme.colors.containerLine};
    border-bottom: 1px solid grey;
    width: 100%;
    max-width: 100%; /* Asegura que no se expanda más allá del contenedor padre */
    cursor: pointer;
    overflow: hidden; /* Evita el overflow del contenido */
    box-sizing: border-box; /* Asegura que padding y border no afecten el tamaño total */
`;
