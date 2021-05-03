/* eslint-disable no-underscore-dangle */
/* eslint-disable dot-notation */
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

import MainMenu from '../../components/main-menu/main-menu';
import Message from '../../components/message/message';
import styles from './room.module.css';

export default function Room() {
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);
  const [input, setInput] = useState('');
  const [profile, setProfile] = useState({
    user: {
      _id: '',
      email: '',
      username: '',
    },
    contacts: [],
    rooms: [],
  });
  const { username: recipientUsername } = room?.users ?? '';

  useEffect(() => {
    const token = sessionStorage.getItem('auth_token') ?? '';
    const socketInstance = io('http://localhost:8000', { auth: { token } });
    setSocket(socketInstance);

    function teste() {
      return null;
    }

    function initializeWebSockets() {
      socketInstance.on('connect', () => {
        socketInstance.on('user:get-profile', (profileData) => setProfile(profileData));
        socketInstance.on('room:receive-message', teste);
      });
      socketInstance.on('connect_error', (error) => {
        toast.error(error, {
          position: 'top-right',
          autoClose: 5000,
        });
      });
      socketInstance.on('generic_error', (error) => {
        toast.error(error, {
          position: 'top-right',
          autoClose: 5000,
        });
      });
    }

    initializeWebSockets();

    return () => socketInstance.close();
  }, []);

  function openRoom(recipient = '') {
    const { _id: sender } = profile?.user ?? '';
    const users = [recipient, sender];
    socket.emit('room:find-room', users, (roomData) => setRoom(roomData));
  }

  function sendMessage(event) {
    event.preventDefault();

    const { _id: roomId } = room;
    const { email: recipient } = room?.users ?? '';

    socket.emit('room:new-message', {
      content: input,
      roomId,
      recipient,
    }, (newMessage) => setRoom((prevState) => {
      const { history } = prevState ?? [];
      const updatedHistory = history.concat(newMessage);
      return { ...prevState, history: updatedHistory };
    }));
    setInput('');
  }

  const disableSubmitButton = input === '';
  const { history } = room ?? [];

  return (
    <div className={styles['page__body']}>
      <section className={styles['chat__container']}>
        <MainMenu profile={profile} openRoomCb={openRoom} />
        {room ? (
          <main className={styles['room']}>
            <header className={styles['room__header']}>
              <img
                src="https://via.placeholder.com/150"
                alt=""
                className={styles['header__profile-picture']}
              />
              <h2 className={styles['header__recipient-username']}>
                {recipientUsername}
              </h2>
            </header>
            <div className={styles['room__messages']}>
              {history?.map((message) => {
                const { _id, content, updatedAt } = message ?? '';
                const { email } = message.sender ?? '';
                const { email: myEmail } = profile.user ?? '';

                const isSenderMessage = email === myEmail;
                return (
                  <Message
                    key={_id}
                    content={content}
                    time={updatedAt}
                    isSenderMessage={isSenderMessage}
                  />
                );
              })}
            </div>
            <form className={styles['user__input-container']}>
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className={styles['user__input']}
                placeholder="Type a message"
              />
              <button
                type="submit"
                className={styles['submit__button']}
                disabled={disableSubmitButton}
                onClick={sendMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="#fafafa"
                    d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
                  />
                </svg>
              </button>
            </form>
          </main>
        )
          : (<div className={styles['room__placeholder']} />)}
      </section>
    </div>
  );
}
