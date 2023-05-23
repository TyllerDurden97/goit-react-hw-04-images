function fetchPixabay(name, page) {

   return  fetch(`
         https://pixabay.com/api/?key=29462445-ad519f5c94a1ccd9fe6c99f35&q=${name}
         &image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`)
               .then(resp => {
                  if (resp.ok) {
                     return resp.json();
                  }                
                  return Promise.reject(
                     new Error(`No images for ${name}`.toUpperCase())
                  );
               })
}
export const fetchAPI = {
   fetchPixabay
}


   // getFotos = (searchRequest) => {
   //    const API_KEY = '29462445-ad519f5c94a1ccd9fe6c99f355';
   //    const BASE_URL = 'https://pixabay.com/api/';
   //    let currentPage = 1;
   //    const searchParams = new URLSearchParams({
   //       key: API_KEY,
   //       q: searchRequest,
   //       image_type: 'photo',
   //       orientation: 'horizontal',
   //       safesearch: 'true',
   //       per_page: 12,
   //       page: [currentPage],
   //    });
   //    try {
   //       return axios
   //          .get(`${BASE_URL}?${searchParams}`);
   //    } catch (error) {
   //       throw new Error(error.massege);
   //    }
   //    // console.log()
   // };