/* eslint-disable dot-notation */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './message.module.css';

export default function Message({ isSenderMessage, time, content }) {
  const timestampOptions = { hour12: true, hour: 'numeric', minute: 'numeric' };
  const timestamp = new Date(time).toLocaleString('en-US', timestampOptions);

  // TODO: add the Classnames library would be great
  return (
    <div className={styles['message__container']} data-sender-message={isSenderMessage}>
      <div className={`${styles['message']} ${isSenderMessage ? styles['message--right-aligned'] : ''}`}>
        <div className={`${styles['message__body']} ${isSenderMessage ? styles['message--from-sender'] : ''}`}>
          <p className={styles['message__content-type--text']}>
            {content}
          </p>
          <small className={styles['message__timestamp']}>
            <time>
              {timestamp}
            </time>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 15"
              width="16"
              height="15"
            >
              <path fill="currentColor" d="M9.75 7.713H8.244V5.359a.5.5 0 0 0-.5-.5H7.65a.5.5 0 0 0-.5.5v2.947a.5.5 0 0 0 .5.5h.094l.003-.001.003.002h2a.5.5 0 0 0 .5-.5v-.094a.5.5 0 0 0-.5-.5zm0-5.263h-3.5c-1.82 0-3.3 1.48-3.3 3.3v3.5c0 1.82 1.48 3.3 3.3 3.3h3.5c1.82 0 3.3-1.48 3.3-3.3v-3.5c0-1.82-1.48-3.3-3.3-3.3zm2 6.8a2 2 0 0 1-2 2h-3.5a2 2 0 0 1-2-2v-3.5a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v3.5z" />
            </svg>
          </small>
        </div>
      </div>
    </div>
  );
}

Message.propTypes = {
  isSenderMessage: PropTypes.bool,
  time: PropTypes.string,
  content: PropTypes.string,
};

Message.defaultProps = {
  isSenderMessage: false,
  time: Date.now(),
  content: null,
};
