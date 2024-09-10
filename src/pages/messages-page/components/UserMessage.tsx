import React from 'react'
import AuthorData from '../../../components/tweet/user-post-data/AuthorData'
import { useGetChatHistory } from '../../../hooks/useGetChatHistory'
import { StyledUserMessageContainer } from './StyledUserMessageContainer'

interface UserMessageProps {
  id: string,
  name: string,
  username: string,
  createdAt: Date,
  profilePic: string | null,
  onClick: () => void

}

const UserMessage = ({id, name, username, createdAt, profilePic, onClick}: UserMessageProps) => {
  const {messages, loading, error} = useGetChatHistory(id)

  return (
    <StyledUserMessageContainer onClick={onClick}>
      <AuthorData id={id} name={name} username={username} createdAt={messages[messages.length-1] ? messages[messages.length-1].createdAt : null } profilePicture={profilePic}  />
      {messages[messages.length-1] && <p>{messages[messages.length-1].content}</p>}
    </StyledUserMessageContainer>
  )
}

export default UserMessage