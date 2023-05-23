import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
   state = {
      showModal: false,
   }

    togleModal = () => {
      this.setState(state => ({
         showModal: !state.showModal}))
   }

   render() {
      const { webformatURL, tags, largeImageURL } = this.props;
      const { showModal } = this.state;
      return (
         <>
           <li className={css.imageGalleryItem}
      >
      <img className={css.imageGalleryItemImg} onClick={this.togleModal} src={webformatURL} alt={tags} />
            </li>
              {showModal && (<Modal onClose={this.togleModal}>
               <img src={largeImageURL} alt={tags} />
            </Modal >)}
         </>
       
      )
   }
}  
   
  ImageGalleryItem.propTypes = {
     webformatURL: PropTypes.string.isRequired,
     tags: PropTypes.string.isRequired,
     largeImageURL: PropTypes.string.isRequired,
}