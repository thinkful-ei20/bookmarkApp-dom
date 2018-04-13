'use strict';
/* global API, Saved */
const DOMElements = (() => {
  const createDOMResult = bookmark => {
    return `
    <li class="titleBox">
      <button class="js-reveal-btn">=></button>
      <span class="js-result">${bookmark.title} : ${bookmark.rating} stars</span>
    </li>
    `;
  };
  const createDOMExpand = bookmark => {
    return `
    <div class="js-descript">
      <p>Description: ${bookmark.desc}</p>
      <a href="${bookmark.url}">Find it again!</a>
    </div>
    `;
  };

  const createDOMBookmarks = bookmarks => {
    const liElements = bookmarks.map(bookmark => DOMElements.createDOMResult(bookmark));
    return liElements.join('');
  };

  const render = (result) => {
    $('.js-titles').html(result);
  };

  const handleBookmarkFormModal = () => {
    $('.opt-left').on('click', '#add-btn', () => {
      $('.modal').toggleClass('hidden');
    });
    $('.modal-content').on('click', '#home-btn', () => {
      $('.modal').toggleClass('hidden');
    });
  };

  const handleBookmarkFormCompletion = () => {
    $('fieldset').on('click', '#findit-btn', (event) => {      
      console.log('button works');
      const newBookmark = {
        newTitle: $('#title').val(),
        newUrl: $('#url-link').val(),
        newDesc: $('#desc').val(),
        newRating: $('#rating').val().slice(0,1)
      };
      API.createAPIData(newBookmark, () => {
        Saved.addBookmark(newBookmark);
        $('.modal').toggleClass('hidden');
        DOMElements.render(DOMElements.createDOMBookmarks(Saved.bookmarks));
      });
      //console.log(newBookmark);
    });
  };

  return {
    createDOMResult, createDOMExpand, 
    createDOMBookmarks, render, handleBookmarkFormModal,
    handleBookmarkFormCompletion
  };
})();