'use strict';
const API = (() => {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mckoy';
  const getArrayOfObjects = callback => {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };
  return {
    getArrayOfObjects
  };
})();