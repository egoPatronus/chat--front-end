/* eslint-disable react/require-default-props,
  dot-notation,
  react/default-props-match-prop-types,
  no-underscore-dangle,
*/
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import styles from './main-menu.module.css';

export default function MainMenu({ profile, createRoomCb }) {
  const [dropdown, setDropdown] = useState(false);
  const [slideInAnimation, setSlideInAnimation] = useState(false);
  const history = useHistory();
  const { username } = profile.user ?? '';
  const { contacts } = profile ?? [];
  /**
   * Sets the dropdown between expanded and/or collapsed
   */
  const toggle = () => setDropdown(!dropdown);

  function logout() {
    sessionStorage.clear();
    history.push('/login');
  }

  return (
    <section className={styles['main-menu__container']}>
      <header className={styles['main-menu__header']}>
        <h1 className={styles['header__username']}>
          {username}
        </h1>
        <div>
          <button
            type="button"
            className={styles['contacts__expand-button']}
            onClick={() => setSlideInAnimation(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="#919191"
                d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
              />
            </svg>
          </button>
          <ButtonDropdown isOpen={dropdown} toggle={toggle} className={styles['header__dropdown']}>
            <DropdownToggle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#919191"
                className="bi bi-three-dots-vertical"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              </svg>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={logout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </header>
      <div className={styles['animation__container']}>
        <CSSTransition
          in={slideInAnimation}
          timeout={200}
          unmountOnExit
          classNames="transition__slide-in-animation"
        >
          <div className={styles['contacts__list-wrapper']}>
            <header className={styles['contacts__header']}>
              <button
                type="button"
                className={styles['contacts__collapse-button']}
                onClick={() => setSlideInAnimation(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="#fafafa" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z" />
                </svg>
                <span>New chat</span>
              </button>
            </header>
            <ul className={styles['list']}>
              {contacts.map((contact) => (
                <li key={contact._id} className={styles['list__item']}>
                  <button
                    type="button"
                    className={styles['list-item__button']}
                    onClick={() => {
                      setSlideInAnimation(false);
                      createRoomCb(contact);
                    }}
                  >
                    <img
                      src="https://via.placeholder.com/150"
                      alt=""
                      className={styles['button__profile-picture']}
                    />
                    <div className={styles['button__content']}>
                      <span className={styles['content__username']}>
                        {contact.username}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </CSSTransition>
      </div>
    </section>
  );
}

MainMenu.propTypes = {
  profile: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    contacts: PropTypes.arrayOf(PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })),
  }).isRequired,
  createRoomCb: PropTypes.func.isRequired,
};

MainMenu.defaultProps = {
  profile: {
    user: {
      username: '',
      email: '',
    },
    contacts: [],
  },
  createRoomCb: () => null,
};
