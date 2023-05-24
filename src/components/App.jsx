import { React, useState } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {

   const [searchRequest, setSearchRequest] = useState('');

   const handleFormSubmit = (searchRequest) => {
     setSearchRequest( searchRequest );
   };
   
         return (
            <>
            <Searchbar formSubmit={handleFormSubmit} />               
            <ImageGallery searchRequest={searchRequest} />               
            </>            
         )      
   };

