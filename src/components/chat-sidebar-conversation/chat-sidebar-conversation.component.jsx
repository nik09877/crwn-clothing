import {
  ArrowButton,
  Avatar,
  Conversation,
} from '@chatscope/chat-ui-kit-react';
import { useNavigate } from 'react-router-dom';

const SideBarConversation = ({ friend }) => {
  const { id, friendName, friendProfilePic } = friend;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/chat/${id}`);
  };
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
