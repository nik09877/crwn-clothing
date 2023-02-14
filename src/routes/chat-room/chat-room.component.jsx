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
  VoiceCallButton,
  VideoCallButton,
  EllipsisButton,
  MessageList,
  TypingIndicator,
  MessageSeparator,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import { UserContext } from '../../contexts/user.context';
import {
  getFriend,
  getFriends,
  getMessages,
  getUser,
  sendMessage,
} from '../../utils/firebase/firebase.utils';
import SideBarConversation from '../../components/chat-sidebar-conversation/chat-sidebar-conversation.component';
import { useParams } from 'react-router-dom';

const ChatRoom = () => {
  const [query, setQuery] = useState('');
  const [messageInputValue, setMessageInputValue] = useState('');
  const [friends, setFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUserDoc, setCurrentUserDoc] = useState(null);
  const { currentUser } = useContext(UserContext);
  const { roomId } = useParams();

  const handleQueryChange = (val) => {
    setQuery(val);
  };

  const handleSend = async () => {
    await sendMessage(currentUserDoc, roomId, messageInputValue);
    setMessageInputValue('');
    await getAllmsgs();
  };

  const getAllmsgs = async () => {
    setMessages(await getMessages(currentUser, roomId));
  };

  useEffect(() => {
    const getAllFriends = async () => {
      await getFriends(currentUser, setFriends);
    };
    getAllFriends();
  }, []);

  useEffect(() => {
    const getCurFriend = async () => {
      setCurrentFriend(await getFriend(currentUser, roomId));
    };
    getCurFriend();
  }, [roomId]);

  useEffect(() => {
    getAllmsgs();
  }, [roomId]);

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
            <ConversationHeader.Back />
            <Avatar
              src={currentFriend && currentFriend.friendProfilePic}
              name={currentFriend && currentFriend.friendName}
            />
            <ConversationHeader.Content
              userName={currentFriend && currentFriend.friendName}
              info='Active Now'
            />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <EllipsisButton orientation='vertical' />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList>
            {messages &&
              messages.map((msg) => (
                <Message
                  key={msg.id}
                  model={{
                    message: `${msg.message}`,
                    sentTime: '15 mins ago',
                    sender: 'Zoe',
                    direction: `${
                      msg.name === currentUserDoc.displayName
                        ? 'outgoing'
                        : 'incoming'
                    }`,
                    position: 'single',
                  }}
                >
                  <Avatar
                    src={
                      msg.name === currentUserDoc.displayName
                        ? currentUserDoc.profilePic
                        : currentFriend.friendProfilePic
                    }
                  />
                </Message>
              ))}
          </MessageList>
          <MessageInput
            placeholder='Type message here'
            value={messageInputValue}
            attachButton={false}
            onChange={(val) => setMessageInputValue(val)}
            onSend={handleSend}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatRoom;
