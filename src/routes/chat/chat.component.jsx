import { useContext, useEffect, useState } from 'react';

import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import {
  MainContainer,
  ChatContainer,
  Sidebar,
  Search,
  ConversationList,
  Avatar,
  ConversationHeader,
} from '@chatscope/chat-ui-kit-react';
import { UserContext } from '../../contexts/user.context';
import { getFriends, getUser } from '../../utils/firebase/firebase.utils';
import SideBarConversation from '../../components/chat-sidebar-conversation/chat-sidebar-conversation.component';

const Chat = () => {
  const [query, setQuery] = useState('');
  const [friends, setFriends] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [currentUserDoc, setCurrentUserDoc] = useState(null);

  const handleQueryChange = (val) => {
    setQuery(val);
  };

  useEffect(() => {
    const getAllFriends = async () => {
      await getFriends(currentUser, setFriends);
    };
    getAllFriends();
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      setCurrentUserDoc(await getUser(currentUser));
    };
    getUserInfo();
  }, []);

  const filteredfriends = friends.filter((friend) =>
    friend.friendName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className='chat-container'
      style={{
        height: '80vh',
        position: 'relative',
        margin: '0 auto',
      }}
    >
      <MainContainer responsive>
        <Sidebar position='left' scrollable={false}>
          <Search
            placeholder='Search Friend...'
            style={{
              fontSize: '18px',
            }}
            onChange={handleQueryChange}
            onClearClick={() => setQuery('')}
          />
          <ConversationList>
            {filteredfriends &&
              filteredfriends.map((friend) => (
                <SideBarConversation key={friend.id} friend={friend} />
              ))}
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <Avatar src={currentUserDoc && currentUserDoc.profilePic} />
            <ConversationHeader.Content>
              <span
                style={{
                  alignSelf: 'flex-center',
                }}
              >
                Click On Any User To Start a Conversation...
              </span>
            </ConversationHeader.Content>
          </ConversationHeader>
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;
