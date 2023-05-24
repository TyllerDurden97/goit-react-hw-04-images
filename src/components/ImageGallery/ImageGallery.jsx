import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import { fetchAPI } from '../../services/fetchAPI';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem'
import css from 'components/ImageGallery/ImageGallery.module.css';

export const ImageGallery = ({ searchRequest }) => {

   const [receivedData, setReceivedData] = useState([]);
   const [error, setError] = useState(null);
   const [status, setStatus] = useState('idle');
   const [page, setPage] = useState(1);

   useEffect(() => {
      if (searchRequest) {
         setStatus('pending');
         fetchAPI.fetchPixabay(searchRequest, page)
         .then(resp => {
            if (resp.total === 0) {
               setStatus('idle');
               Notiflix.Notify.info(`No images for ${searchRequest}`.toUpperCase());
            } else {
               setReceivedData(prev => 
                  [...prev, ...resp.hits]);
                  setStatus('resolved');              
            };
         })
         .catch(error => {
            setError(error);
            setStatus('rejected');
         })
      }
      }, [searchRequest, page]);
   
   useEffect(() => {
      setReceivedData([]);
      setPage(1);
   }, [searchRequest]);

   const hadleBtnLoadMore = () => {
            setPage(prev => (prev + 1 ));
   };  

   return (<>
         {status === 'idle' && <div className={css.imageGalleryIdle}>Please type search request</div> }
         {status === 'pending' && <Loader/> }
         {status === 'rejected' && console.log(error.message)}
         {status === 'resolved' && <>
            <ul
               className={css.imageGallery}>
               {receivedData.length > 0 && receivedData.map(({ id, webformatURL, largeImageURL, tags }) => (
                  <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} tags={tags} />
               ))}
            </ul>
            {receivedData.length >= 12 && <Button onClick={hadleBtnLoadMore} />}
             </>
         }
      </>
      );  
};


ImageGallery.propTypes = {
   searchRequest: PropTypes.string.isRequired,
};