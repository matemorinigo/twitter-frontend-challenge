import { StyledUserFeedContainer } from './StyledUserFeedContainer'
import { useGetMutuals } from '../../../hooks/useGetMutuals'
import UserMessage from './UserMessage';

interface UsersFeedProps {
  setUserSelected: React.Dispatch<React.SetStateAction<string | null>>
}

const UsersFeed = ({setUserSelected}: UsersFeedProps) => {
  const { mutuals, loading, error } = useGetMutuals();

  return (
    <>
      {loading && <p>Loading...</p>}
      <StyledUserFeedContainer>
        {mutuals.map((user) => {
          return (<UserMessage id={user.id} name={user.name ? user.name : ''} username={user.username} createdAt={user.createdAt} profilePic={user.profilePicture ? user.profilePicture : null} onClick={()=>setUserSelected(prev => {if(prev === user.id){ return null } else {return user.id}})} />)
        })}
      </StyledUserFeedContainer>
    </>
  )
}

export default UsersFeed