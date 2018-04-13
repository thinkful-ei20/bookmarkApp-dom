'use strict';
/* global API */
const Saved = (() => {
  // Where we store our list of objects from API call
  const bookmarks = [];
  const currState = {
    expanded: false,
    addingBookmark: false,
  };
  const APIerror = null;
  const addBookmark = bookmark => { 
    Saved.bookmarks.push(bookmark);
    assignState(Saved.bookmarks);
  };
  const assignState = bookmarks => {
    bookmarks.map(bookmark => {
      Object.assign(bookmark, {
        expanded: false,
        editing: false,
      });
    });
  };
  const deleteBookmark = id => {
    Saved.bookmarks = Saved.bookmarks.filter(bookmark => id !== bookmark.id);
  };
  const getBookmarkFromId = id => {
    return Saved.bookmarks.find(bookmark => bookmark.id === id);
  };
  const editBookmark = (id, updatedBookmark) => {
    Object.assign(getBookmarkFromId(id), updatedBookmark);
  };
  return {
    bookmarks, addBookmark, currState,
    deleteBookmark, getBookmarkFromId, APIerror,
    editBookmark
  };
})();