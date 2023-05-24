import React from "react";
import PropTypes from 'prop-types';
import css from 'components/Button/Button.module.css';

export const Button = ({ onClick }) => (
   <button         
      className={css.button}      
      type="button"
      onClick={onClick}
   >
      Load more         
   </button>
)

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};