import  {React, useState } from "react";
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import { GoSearch } from "react-icons/go";
import css from 'components/Searchbar/Searchbar.module.css'


export const Searchbar = ({formSubmit}) => {

   const [searchRequest, setSearchRequest] = useState('');

   const handleInputChange = event => {
     setSearchRequest(event.currentTarget.value.toLowerCase());
   };
   
   const handleSubmitSearch = event => {
      event.preventDefault();
      if (searchRequest.trim() === '') {
         Notiflix.Notify.info("Please type search request".toUpperCase());
         return;
      };
      setSearchRequest('');
      formSubmit(searchRequest);
      event.target.elements.input.value = '';
   };
   
    return (
      <header className={css.searchbar}>
      <form
         className={css.searchForm}
         onSubmit={handleSubmitSearch}       
      >
         <button
            type="submit"
            className={css.searchFormButton}
               >
            <span
               className={css.searchFormButtonLabel}
            >
               <GoSearch size="30" className={css.svg} />
            </span>
         </button>

         <input
            className={css.searchFormInput}
            name="input"            
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInputChange}            
         />
      </form>
      </header>   
   )
};

 Searchbar.propTypes = {
     formSubmit: PropTypes.func.isRequired,    
}