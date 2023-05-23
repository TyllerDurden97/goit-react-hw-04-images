import { Component } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import { fetchAPI } from '../../services/fetchAPI';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem'
import css from 'components/ImageGallery/ImageGallery.module.css';

export class ImageGallery extends Component {
   state = {
      receivedData: [],
      error: null,
      status: 'idle',
      page: 1,

   }

   componentDidUpdate(prevProps, prevState) {
      const prevSearchRequest = prevProps.searchRequest;
      const nextSearchRequest = this.props.searchRequest;
      const { page } = this.state;

      if (nextSearchRequest !== prevSearchRequest || prevState.page !== page) {
         this.setState({ status: 'pending' });
         fetchAPI.fetchPixabay(nextSearchRequest, page)
            .then(resp => {
               if (resp.total === 0) {
                   this.setState({status: 'idle' });
                   Notiflix.Notify.info(`No images for ${nextSearchRequest}`.toUpperCase());
               } else {this.setState((prevState) => ({
                  receivedData: [...prevState.receivedData, ...resp.hits],
                  status: 'resolved'
               }))
               };
               })
               .catch(error => this.setState({ error, status: 'rejected' }))
      }
      if (nextSearchRequest !== prevSearchRequest) {
          this.setState({ receivedData: [], page: 1 });
      }
     }

    hadleBtnLoadMore = (event) => {
       this.setState(prevState => ({ page: prevState.page + 1 }));
   }  

   render() {
      const { receivedData, error, status } = this.state;

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
            {receivedData.length >= 12 && <Button onClick={this.hadleBtnLoadMore} />}
             </>
         }
      </>
      );  
   };
};


ImageGallery.propTypes = {
       searchRequest: PropTypes.string.isRequired,
}