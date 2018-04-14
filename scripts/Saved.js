'use strict';
const Saved = (() => {
  const bookmarks = [];
  const APIerror = null;
  const setError = e => {Saved.APIerror = e;};
  const assignState = bookmarks => {
    bookmarks.map(bookmark => {
      Object.assign(bookmark, {
        expanded: false,
      });
    });
  };
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
  const editBookmark = (id, updatedBookmark) => {
    Object.assign(getBookmarkFromId(id), updatedBookmark);
  };
  return {
    bookmarks, addBookmark, deleteBookmark, 
    getBookmarkFromId, APIerror,
    editBookmark, setError
  };
})();
