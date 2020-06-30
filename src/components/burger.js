import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/modules/header.module.scss';

const Burger = ({ handleOverlayMenu }) => {

  return (
    <div  className={styles.hamburger} role="button" aria-label="menu" onClick={handleOverlayMenu} tabIndex="0" onKeyDown={handleOverlayMenu}>
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z" fill="#1F5C9D"/>
        </svg>
        Menu
    </div>
  )
  
};

Burger.propTypes = {
    handleOverlayMenu: PropTypes.func,
  };

export default Burger 