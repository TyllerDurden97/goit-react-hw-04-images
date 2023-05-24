import { React, useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {

   const [showModal, setShowModal] = useState(false);

      const togleModal = () => {
      setShowModal(prev => (!showModal));
   };

   return (
      <>
         <li className={css.imageGalleryItem}
         >
            <img className={css.imageGalleryItemImg} onClick={togleModal} src={webformatURL} alt={tags} />
         </li>
         {showModal && (<Modal onClose={togleModal}>
            <img src={largeImageURL} alt={tags} />
         </Modal >)}
      </>       
   )   
};  
   
ImageGalleryItem.propTypes = {
   webformatURL: PropTypes.string.isRequired,
   tags: PropTypes.string.isRequired,
   largeImageURL: PropTypes.string.isRequired,
};