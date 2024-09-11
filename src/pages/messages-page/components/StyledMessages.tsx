import styled from 'styled-components';


export const SentMessage = styled.div`
  background-color: ${props => props.theme.colors.dark}; 
  padding: 10px;
  border-radius: 15px;
  margin-right: 18px;
  max-width: 80%;  
  align-self: flex-end;  
  text-align: right;    
  word-wrap: break-word; 
  @media (max-width: 600px) {
    max-width: 60%; 
  }
`;

export const ReceivedMessage = styled.div`
  background-color: ${props => props.theme.colors.light}; 
  padding: 10px;
  border-radius: 15px;
  margin-left: 5px;
  max-width: 80%;  
  align-self: flex-start;  
  text-align: left;    
  word-wrap: break-word; 
  @media (max-width: 600px) {
    max-width: 60%; 
  }
`;


export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  height: 100%;
  padding: 10px;
  gap: 5px;
  justify-content: flex-end;
  overflow-y: scroll;
`;
