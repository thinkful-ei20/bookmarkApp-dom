'use strict';
/* global API */
const Saved = (() => {
  // Where we store our list of objects from API call
  const bookmarks = [];
  const addBookmark = bookmark => { 
    Saved.bookmarks.push(bookmark); 
  };
  
  return {
    bookmarks, addBookmark
  };
})();