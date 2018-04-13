'use strict';
/* global API */
const Saved = (() => {
  // Where we store our list of objects from API call
  const bookmarks = [];
  const addBookmark = bookmark => { 
    Saved.bookmarks.push(bookmark);
    assignState(Saved.bookmarks);
  };

  const assignState = bookmarks => {
    bookmarks.map(bookmark => {
      Object.assign(bookmark, {
        expanded: false,
        addingBookmark: false,
      });
    });
  };
  return {
    bookmarks, addBookmark, assignState
  };
})();