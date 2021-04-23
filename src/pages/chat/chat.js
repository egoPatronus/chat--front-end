/* eslint-disable dot-notation */
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

import MainMenu from '../../components/main-menu/main-menu';
import Room from '../../components/room/room';
import styles from './chat.module.css';

export default function Chat() {
  const [room, setRoom] = useState(null);
  const [socketInstance, setSocketInstance] = useState(null);
  const [profile, setProfile] = useState({
    user: '',
    contacts: [],
  });

  useEffect(() => {
    const token = sessionStorage.getItem('s_id') ?? '';
    const socket = io('http://localhost:8000', { auth: { token } });
    setSocketInstance(socket);

    function initializeWebSockets() {
      socket.on('connect', () => {
        socket.on('user:get-profile', (profileData) => setProfile(profileData));
      });
      socket.on('connect_error', (error) => {
        toast.error(error, {
          position: 'top-right',
          autoClose: 5000,
        });
      });
      socket.on('generic_error', (error) => {
        toast.error(error, {
          position: 'top-right',
          autoClose: 5000,
        });
      });
    }

    initializeWebSockets();

    return () => socket.close();
  }, []);

  function createRoomIfItDoesNotExist(roomData) {
    setRoom(roomData);
  }

  return (
    <div className={styles['page__body']}>
      <section className={styles['chat__container']}>
        <MainMenu
          profile={profile}
          createRoomCb={createRoomIfItDoesNotExist}
        />
        <Room
          room={room}
          socket={socketInstance}
        />
      </section>
    </div>
  );
}
