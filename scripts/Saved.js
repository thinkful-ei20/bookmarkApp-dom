'use strict';
/* global API */
const Saved = (() => {
  // Where we store our list of objects from API call
  const bookmarks = [];
  const error = null;
  const addBookmark = bookmark => { 
    Saved.bookmarks.push(bookmark);
    assignState(Saved.bookmarks);
  };
  const deleteBookmark = id => {
    Saved.bookmarks = Saved.bookmarks.filter(bookmark => id !== bookmark.id);
  };
  const getBookmarkFromId = id => {
    return Saved.bookmarks.find(bookmark => bookmark.id === id);
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
    bookmarks, addBookmark, assignState,
    deleteBookmark, getBookmarkFromId,
  };
})();