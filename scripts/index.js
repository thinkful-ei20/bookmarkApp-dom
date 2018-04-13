'use strict';
/* global API, Saved */
$(
  API.getAPIData( bookmarks => {
    bookmarks.map(bookmark => Saved.addBookmark(bookmark));
  }),
  console.log(Saved.bookmarks)
);