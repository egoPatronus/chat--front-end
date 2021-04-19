/* eslint-disable dot-notation */
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

import MainMenu from '../../components/main-menu/main-menu';
import styles from './chat.module.css';

export default function Chat() {
  useEffect(() => {
    function initializeWebSockets() {
      const token = sessionStorage.getItem('s_id') ?? '';
      const socket = io('http://localhost:8000', { auth: { token } });
      socket.on('connect', () => {
        console.log(socket);
      });
      socket.on('connect_error', (err) => {
        console.log(err);
      });
    }

    initializeWebSockets();
  }, []);

  return (
    <div className={styles['page__body']}>
      <section className={styles['chat__container']}>
        <MainMenu />
      </section>
    </div>
  );
}
