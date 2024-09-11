import React, { useEffect, useState } from 'react'
import { useGetChatHistory } from '../../../hooks/useGetChatHistory'
import { ChatContainer, ReceivedMessage, SentMessage } from './StyledMessages'
import ChatForm from './ChatForm'
import { Socket } from 'socket.io-client'
import { User } from '../../../service'
import { useQuery } from '@tanstack/react-query'
import { useHttpRequestService } from '../../../service/HttpRequestService'


interface ChatMessagesProps {
    userId: string
    socket: Socket
}

const ChatMessages = ({userId, socket}: ChatMessagesProps) => {
  const {messages, loading, error} = useGetChatHistory(userId)

  return (
    <ChatContainer>
      {messages.map((message, index) => {
        if(message.senderId !== userId) {
          return <SentMessage key={index}>{message.content}</SentMessage>
        } else {
          return <ReceivedMessage key={index}>{message.content}</ReceivedMessage>
        }
      })}
      <ChatForm receiverId={userId} socket={socket} />
    </ChatContainer>
  )
}

export default ChatMessages