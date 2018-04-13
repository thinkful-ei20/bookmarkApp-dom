'use strict';
/* global API, Saved */
const DOMElements = (() => {
  const createDOMResult = bookmark => {
    return `
    <li class="titleBox" data-id="${bookmark.id}">
      <button class="js-show-btn">=></button>
      <span class="js-result">${bookmark.title} : ${bookmark.rating} stars</span>
    </li>
    `;
  };
  const createDOMExpand = bookmark => {
    return `
    <div class="js-desc">
      <p>Description: ${bookmark.desc}</p>
      <a href="${bookmark.url}">Find it again!</a>
      <button class="js-edit-btn">edit bookmark</button>
      <button class="js-delete-btn">delete bookmark</button>
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

  const handleFilteredView = () => {
    $('.opt-left').on('change', '#fil-opt', () => {
      switch($('#fil-opt').val()) {
      case '5 stars only':
        DOMElements.render(DOMElements.createDOMBookmarks(Saved.bookmarks.filter(bookmark => bookmark.rating === 5)));
        break;
      case 'above 3 stars':
        DOMElements.render(DOMElements.createDOMBookmarks(Saved.bookmarks.filter(bookmark => bookmark.rating > 3)));
        break;
      case 'above 2 stars':
        DOMElements.render(DOMElements.createDOMBookmarks(Saved.bookmarks.filter(bookmark => bookmark.rating > 2)));
        break;
      case 'above 1 stars':
        DOMElements.render(DOMElements.createDOMBookmarks(Saved.bookmarks.filter(bookmark => bookmark.rating > 1)));
        break;
      default:
        DOMElements.render(DOMElements.createDOMBookmarks(Saved.bookmarks));
      }
    });
  };

  const handleInfoBox = () => {
    $('.opt-right').on('click', '#info-btn', () => {
      console.log('info button works');
    });
  };

  const handleExpandedView = () => {
    $('.titleBox').on('click', '.js-show-btn', (event) => {
      $(event.target).html('hide').removeClass('js-show-btn').addClass('js-hide-btn');
      const bookmark = Saved.getBookmarkFromId($(event.target).closest('li').data('id'));
      $(event.target).closest('.titleBox').append(createDOMExpand(bookmark));
    });
    $('.titleBox').on('click', '.js-hide-btn', () => {
      $(event.target).html('=>').removeClass('js-hide-btn').addClass('js-show-btn');
      $(event.target).closest('.titleBox').find('.js-desc').remove();
    });
  };

  const handleDeleteButton = () => {
    $('.titleBox').on('click', '.js-delete-btn', (event) => {
      const bookmarkId = $(event.target).closest('li').data('id');
      API.deleteAPIData(bookmarkId, () => {
        Saved.deleteBookmark(bookmarkId);
        DOMElements.render(DOMElements.createDOMBookmarks(Saved.bookmarks));
        DOMElements.handleExpandedView();
        DOMElements.handleDeleteButton();
        DOMElements.handleEditButton();
      });
    });
  };

  const handleEditButton = () => {
    $('.titleBox').on('click', '.js-edit-btn', event => {
      console.log('edit button works');
    });
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
      event.preventDefault();
      const newBookmark = {
        title: $('#title').val(),
        url: $('#url-link').val(),
        desc: $('#desc').val(),
        rating: $('#rating').val().slice(0,1)
      };
      $('#title').val(''); $('#url-link').val(''); $('#desc').val(''); $('#rating').val('');
      API.createAPIData(newBookmark, bookmark => {
        Saved.addBookmark(bookmark);
        DOMElements.render(DOMElements.createDOMBookmarks(Saved.bookmarks));
        DOMElements.handleExpandedView();
        DOMElements.handleDeleteButton();
        DOMElements.handleEditButton();
      });
      $('.modal').toggleClass('hidden');
    });
  };

  return {
    createDOMResult, createDOMExpand, 
    createDOMBookmarks, render, handleBookmarkFormModal,
    handleBookmarkFormCompletion, handleExpandedView,
    handleDeleteButton, handleEditButton, handleInfoBox,
    handleFilteredView
  };
})();