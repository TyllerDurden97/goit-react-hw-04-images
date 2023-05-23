import React, { Component } from "react";
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import { GoSearch } from "react-icons/go";
import css from 'components/Searchbar/Searchbar.module.css'


export class Searchbar extends Component {
   state = {
   searchRequest:'',
};

   handleInputChange = event => {
      this.setState({ searchRequest: event.currentTarget.value.toLowerCase() });
   };
   
   handleSubmitSearch = event => {
      event.preventDefault();
      if (this.state.searchRequest.trim() === '') {
         Notiflix.Notify.info("Please type search request".toUpperCase());
         return;
      };
      this.setState({ searchRequest:''});
      this.props.formSubmit(this.state.searchRequest);
      event.target.elements.input.value = '';

}
   
   render() {
      return (
   <header className={css.searchbar}>
      <form
         className={css.searchForm}
         onSubmit={this.handleSubmitSearch}       
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
            onChange={this.handleInputChange}            
         />
      </form>
   </header>   
      )
   };     
};

 Searchbar.propTypes = {
     formSubmit: PropTypes.func.isRequired,    
}