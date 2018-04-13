'use strict';
const API = (() => {
  
  // API EndPoint for Bookmark App
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mckoy';
  
  // Returns an response from the API server using GET
  const getAPIData = callback => {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };
  return {
    getAPIData
  };
})();