'use strict';
/* global API, Saved, DOMElements */
$(
  API.getAPIData( bookmarks => {
    bookmarks.map(bookmark => Saved.addBookmark(bookmark));
    DOMElements.render(DOMElements.createDOMBookmarks(Saved.bookmarks));
    DOMElements.handleExpandedView();
    DOMElements.handleBookmarkFormCompletion();
    DOMElements.handleBookmarkFormModal();
    DOMElements.handleDeleteButton();
    DOMElements.handleEditButton();
    DOMElements.handleInfoBox();
    DOMElements.handleFilteredView();
  })
);