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

const UserMessage = ({ id, name, username, createdAt, profilePic, onClick }: UserMessageProps) => {
  const { messages, loading, error } = useGetChatHistory(id)

  return (
    <StyledUserMessageContainer onClick={onClick}>
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column' }}>
        <AuthorData id={id} name={name} username={username} createdAt={messages[messages.length - 1] ? messages[messages.length - 1].createdAt : null} profilePicture={profilePic} />
        {messages[messages.length - 1] && <p style={{
          marginLeft: '8px',
          padding: '4px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
          color: 'grey'
        }}>{messages[messages.length - 1].content}</p>}
      </div>

    </StyledUserMessageContainer>
  )
}

export default UserMessage