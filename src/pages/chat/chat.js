/* eslint-disable dot-notation */
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

import MainMenu from '../../components/main-menu/main-menu';
import styles from './chat.module.css';

export default function Chat() {
  const [profile, setProfile] = useState({
    username: '',
  });

  useEffect(() => {
    function initializeWebSockets() {
      const token = sessionStorage.getItem('s_id') ?? '';
      const socket = io('http://localhost:8000', { auth: { token } });
      socket.on('connect', () => {
        socket.on('user:get-profile', (profileData) => setProfile(profileData));
      });
      socket.on('connect_error', (error) => {
        toast.error(error, {
          position: 'top-right',
          autoClose: 5000,
        });
      });
    }

    initializeWebSockets();
  }, []);

  return (
    <div className={styles['page__body']}>
      <section className={styles['chat__container']}>
        <MainMenu profile={profile} />
      </section>
    </div>
  );
}
