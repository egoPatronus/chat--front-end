/* eslint-disable dot-notation */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './message.module.css';

export default function Message({ isSenderMessage }) {
  // TODO: add the Classnames library would be great
  return (
    <div className={styles['message__container']} data-sender-message={isSenderMessage}>
      <div className={`${styles['message']} ${isSenderMessage ? styles['message--right-aligned'] : ''}`}>
        <div className={`${styles['message__body']} ${isSenderMessage ? styles['message--from-sender'] : ''}`}>
          message body
          message body
          message body
          message body
          message body
          message body
          message body
          message body
          message body
        </div>
      </div>
    </div>
  );
}

Message.propTypes = {
  isSenderMessage: PropTypes.bool,
};

Message.defaultProps = {
  isSenderMessage: false,
};
