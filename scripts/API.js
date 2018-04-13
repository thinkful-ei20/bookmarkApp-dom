'use strict';
// eslint-disable-next-line no-unused-vars
const API = (() => {
  
  // API EndPoint for Bookmark App
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mckoy';
  
  // Returns an response from the API server using GET
  const getAPIData = callback => {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createAPIData = (formObj, win, loss) => {
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formObj),
      success: win,
      error: loss
    });
  };

  return {
    getAPIData, createAPIData
  };
})();