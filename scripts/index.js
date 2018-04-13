'use strict';
/* global API, Saved, DOMElements */
$(
  API.getAPIData( bookmarks => {
    bookmarks.map(bookmark => Saved.addBookmark(bookmark));
    console.log(DOMElements.createDOMBookmarkElements(Saved.bookmarks));
  })
);