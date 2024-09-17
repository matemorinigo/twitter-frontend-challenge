import React from 'react'
import { StyledUsersFeedContainer } from './components/StyledUsersFeedContainer'
import ChatMessages from './components/ChatMessages'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'

const socket = io(process.env.REACT_APP_SOCKET_IO_URL ? process.env.REACT_APP_SOCKET_IO_URL : '', {
    auth: {
        token: localStorage.getItem('token')
    },
    transports: ['websocket'],
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