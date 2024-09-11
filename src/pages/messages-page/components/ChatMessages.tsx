import React from 'react'
import { Message } from '../../../service'
import { useGetChatHistory } from '../../../hooks/useGetChatHistory'
import { ChatContainer, ReceivedMessage, SentMessage } from './StyledMessages'
import { Formik } from 'formik'
import ChatForm from './ChatForm'

interface ChatMessagesProps {
    userId: string
}

const ChatMessages = ({userId}: ChatMessagesProps) => {
  const {messages, loading, error} = useGetChatHistory(userId)

  return (
    <ChatContainer>
      {messages.map((message, index) => {
        if(message.senderId === userId) {
          return <SentMessage key={index}>{message.content}</SentMessage>
        } else {
          return <ReceivedMessage key={index}>{message.content}</ReceivedMessage>
        }
      })}
      <ChatForm/>
    </ChatContainer>
  )
}

export default ChatMessages