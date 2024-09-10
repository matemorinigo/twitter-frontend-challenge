import styled from 'styled-components';


export const SentMessage = styled.div`
  background-color: ${props => props.theme.colors.dark}; 
  padding: 10px;
  border-radius: 15px;
  margin-right: 15px;
  max-width: 60%;
  align-self: flex-end;  
  text-align: right;    
  word-wrap: break-word; 
`;


export const ReceivedMessage = styled.div`
  background-color: ${props => props.theme.colors.light}; 
  padding: 10px;
  border-radius: 15px;
  margin-left: 5px;
  max-width: 60%;
  align-self: flex-start;  
  text-align: left;    
  word-wrap: break-word; 
`;


export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
`;
