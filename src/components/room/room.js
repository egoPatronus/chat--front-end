/* eslint-disable no-unused-expressions, dot-notation */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import styles from './room.module.css';
import Message from '../message/message';

export default function Room({ room, socket }) {
  const [input, setInput] = useState('');
  const { username, _id: id } = room ?? '';
  const messagesContainer = useRef(null);

  useEffect(() => {
    const { current } = messagesContainer;
    if (current) {
      current.scroll({
        bottom: 0,
      });
    }
  }, [room]);

  function sendMessage(event) {
    event.preventDefault();

    try {
      socket.emit('new-message', {
        content: input,
        sender: id,
      }, (response) => {
        console.log(response);
      });
      setInput('');
    } catch (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  }

  const disableSubmitButton = input === '';

  const roomOrPlaceholder = room === null ? (<div className={styles['room__placeholder']} />)
    : (
      <main className={styles['room']}>
        <header className={styles['room__header']}>
          <img
            src="https://via.placeholder.com/150"
            alt=""
            className={styles['header__profile-picture']}
          />
          <h2 className={styles['header__username']}>
            {username}
          </h2>
        </header>
        <div className={styles['room__messages']} ref={messagesContainer}>
          <Message />
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
            onClick={sendMessage}
            disabled={disableSubmitButton}
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
    );

  return roomOrPlaceholder;
}

Room.propTypes = {
  room: PropTypes.oneOfType([PropTypes.symbol, PropTypes.shape({
    username: PropTypes.string,
  })]),
};
