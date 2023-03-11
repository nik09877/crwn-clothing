import React, { useState, useCallback, useMemo, Fragment } from 'react';
import {
  useParticipantIds,
  useScreenShare,
  useLocalParticipant,
  useDailyEvent,
  DailyAudio,
} from '@daily-co/daily-react';

import './Call.scss';
import Tile from '../video-call-Tile/Tile';
import UserMediaError from '../video-call-UserMediaError/UserMediaError';
import VideoCallInviteModal from '../video-call-invite-modal/video-call-invite-modal.component';

export default function Call() {
  /* If a participant runs into a getUserMedia() error, we need to warn them. */
  const [getUserMediaError, setGetUserMediaError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const roomUrl = window.location.href;

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  /* We can use the useDailyEvent() hook to listen for daily-js events. Here's a full list
   * of all events: https://docs.daily.co/reference/daily-js/events */
  useDailyEvent(
    'camera-error',
    useCallback(() => {
      setGetUserMediaError(true);
    }, [])
  );

  /* This is for displaying remote participants: this includes other humans, but also screen shares. */
  const { screens } = useScreenShare();
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });

  /* This is for displaying our self-view. */
  const localParticipant = useLocalParticipant();
  const isAlone = useMemo(
    () => remoteParticipantIds?.length < 1 || screens?.length < 1,
    [remoteParticipantIds, screens]
  );

  const renderCallScreen = () => (
    <div className={`${screens.length > 0 ? 'is-screenshare' : 'call'}`}>
      {/* Your self view */}
      {localParticipant && (
        <Tile id={localParticipant.session_id} isLocal isAlone={isAlone} />
      )}
      {/* Videos of remote participants and screen shares */}
      {remoteParticipantIds?.length > 0 || screens?.length > 0 ? (
        <Fragment>
          {remoteParticipantIds.map((id) => (
            <Tile key={id} id={id} />
          ))}
          {screens.map((screen) => (
            <Tile key={screen.screenId} id={screen.session_id} isScreenShare />
          ))}
          <DailyAudio />
        </Fragment>
      ) : (
        // When there are no remote participants or screen shares
        <div className='info-box'>
          <h1>Waiting for others...</h1>
          <p>Invite Friends by sharing this link:</p>
          <span className='room-url'>{roomUrl}</span>
          <button onClick={handleShowModal} style={{ margin: '80px 0 0' }}>
            Invite Friends
          </button>
          <VideoCallInviteModal
            showModal={showModal}
            handleShowModal={handleShowModal}
            roomUrl={roomUrl}
          />
        </div>
      )}
    </div>
  );

  return getUserMediaError ? <UserMediaError /> : renderCallScreen();
}
