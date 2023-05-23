import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import css from 'components/Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component { 

   componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
      // console.log(this.props)
   };

   componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
   };

   handleKeyDown = e => {
      if (e.code === 'Escape') {
         this.props.onClose();
      };
   };
   
   handleBackdropClick = e => {
      if (e.currentTarget === e.target) {
         this.props.onClose();
      };
   };

   render() {
      return (
         createPortal(<div className={css.overlay} onClick={this.handleBackdropClick}>
            <div className={css.modal}>{ this.props.children}</div>
</div>, modalRoot)
         
      )
   }
}

Modal.propTypes = {    
   onClose: PropTypes.func.isRequired,
   children: PropTypes.node.isRequired,
}

