import React from 'react';
import PropTypes from 'prop-types';

const Burger = ({ handleOverlayMenu }) => {

  return (
    <div className="menu_btn" role="button" aria-label="menu" onClick={handleOverlayMenu} tabIndex="0" onKeyDown={handleOverlayMenu}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
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