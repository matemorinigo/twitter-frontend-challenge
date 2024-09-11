import styled from "styled-components";

export const StyledChatFormContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;
    gap: 1rem;
    padding: 1rem;
    border-top: 1px solid ${props => props.theme.colors.containerLine};
`