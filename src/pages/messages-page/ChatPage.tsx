import React from 'react'
import { StyledUsersFeedContainer } from './components/StyledUsersFeedContainer'
import ChatMessages from './components/ChatMessages'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'

const socket = io('localhost:8080', {
    auth: {
        token: localStorage.getItem('token')
    }
})

const ChatPage = () => {
    const { id } = useParams();

    return (
        <StyledUsersFeedContainer>
            <ChatMessages userId={id ? id : ''} socket={socket} />
        </StyledUsersFeedContainer>
    )
}

export default ChatPage