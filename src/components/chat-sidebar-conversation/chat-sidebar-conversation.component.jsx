import {
  ArrowButton,
  Avatar,
  Conversation,
} from '@chatscope/chat-ui-kit-react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { getUser } from '../../utils/firebase/firebase.utils';

const SideBarConversation = ({ friend }) => {
  const { id, friendName, friendProfilePic } = friend;
  const [currentUserDoc, setCurrentUserDoc] = useState(null);
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/chat/${id}`, { state: { currentUserDoc: currentUserDoc } });
  };

  useEffect(() => {
    const getUserInfo = async () => {
      setCurrentUserDoc(await getUser(currentUser));
    };
    getUserInfo();
  }, []);
  return (
    <Conversation
      name={friendName}
      info='Start Chatting...'
      onClick={handleClick}
    >
      <Avatar src={friendProfilePic} name={friendName} />
      <Conversation.Operations>
        <ArrowButton direction='right' />
      </Conversation.Operations>
    </Conversation>
  );
};

export default SideBarConversation;
