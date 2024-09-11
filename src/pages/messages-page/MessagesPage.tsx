import React, { useEffect } from 'react'
import { StyledContentContainer } from '../home-page/components/contentContainer/StyledContentContainer'
import { StyledFeedContainer } from '../home-page/components/contentContainer/FeedContainer'
import { StyledMessagesContainer } from './MessagesContainer'
import UsersFeed from './components/UsersFeed'
import ChatMessages from './components/ChatMessages'
import { StyledUsersFeedContainer } from './components/StyledUsersFeedContainer'
import NoSelectedUserMessage from './components/NoSelectedUserMessage'

const MessagesPage = () => {
    const [selectedUser, setSelectedUser] = React.useState<string | null>(null)

    useEffect(() => {
        console.log(selectedUser)
    }, [selectedUser])

    return (
        <StyledMessagesContainer>
            <StyledUsersFeedContainer>
                <h1 style={{
                    color: 'black',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>Messages</h1>
                <UsersFeed setUserSelected={setSelectedUser} />
            </StyledUsersFeedContainer>
            <StyledUsersFeedContainer>
                    {!selectedUser && <NoSelectedUserMessage/>}
                    {selectedUser && <ChatMessages userId={selectedUser} />}
            </StyledUsersFeedContainer>
        </StyledMessagesContainer>
    )
}

export default MessagesPage