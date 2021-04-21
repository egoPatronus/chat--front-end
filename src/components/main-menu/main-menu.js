/* eslint-disable dot-notation */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import styles from './main-menu.module.css';

export default function MainMenu({ profile }) {
  const [dropdown, setDropdown] = useState(false);
  const { username } = profile ?? '';

  const toggle = () => setDropdown(!dropdown);

  return (
    <section className={styles['main-menu__container']}>
      <header className={styles['main-menu__header']}>
        <h1 className={styles['header__username']}>
          {username}
        </h1>
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
            <DropdownItem>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </header>
    </section>
  );
}

MainMenu.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};
