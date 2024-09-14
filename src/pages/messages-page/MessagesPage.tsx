import React, { useEffect } from 'react'
import { StyledContentContainer } from '../home-page/components/contentContainer/StyledContentContainer'
import { StyledFeedContainer } from '../home-page/components/contentContainer/FeedContainer'
import { StyledMessagesContainer } from './MessagesContainer'
import UsersFeed from './components/UsersFeed'
import ChatMessages from './components/ChatMessages'
import { StyledUsersFeedContainer } from './components/StyledUsersFeedContainer'
import NoSelectedUserMessage from './components/NoSelectedUserMessage'
import io from 'socket.io-client'


const MessagesPage = () => {

    return (
            <StyledUsersFeedContainer>
                <h1 style={{
                    color: 'black',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>Messages</h1>
                <UsersFeed />
            </StyledUsersFeedContainer>
    )
}

/*

<StyledUsersFeedContainer>
                    {!selectedUser && <NoSelectedUserMessage/>}
                    {selectedUser && <ChatMessages userId={selectedUser} socket={socket} />}
            </StyledUsersFeedContainer>

*/ 

export default MessagesPage