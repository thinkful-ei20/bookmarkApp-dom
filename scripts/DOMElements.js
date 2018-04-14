'use strict';
/* global Saved, API */
const DOMElements = (() => {
  const showModal = () => {
    return `
    <div id="add-form" class="modal">
      <div class="modal-content">
        <div class="container">
          <button class="btn" id="home-btn">go back</button>
          <div class="error-container"></div>
          <form id="js-addBookmarkForm">
            <fieldset>
                <legend>Add your bookmark here</legend>
                <label for="title" class="label">title</label>
                <input type="text" name="title" id="title" class="inputBox" placeholder="type your title here">
                <label for="title">site address</label>
                <input type="text" name="url-link" id="url-link" class="inputBox" placeholder="paste your url link here">
                <label for="title">description</label>
                <input type="text" name="description" id="desc" class="inputBox" placeholder="describe your bookmark">
                <label for="rating">pick a rating</label>
                <select name="rating" id="rating" class="inputBox">
                  <option value="5 stars" class="opt">5 stars</option>
                  <option value="4 stars" class="opt">4 stars</option>
                  <option value="3 stars" class="opt">3 stars</option>
                  <option value="2 stars" class="opt">2 stars</option>
                  <option value="1 star" class="opt">1 star</option>
                </select>
                <button name="findit-btn" id="findit-btn">Find It Again</button>
            </fieldset>
          </form>
        </div>
      </div> 
    </div>
    `;
  };
  const showInfoModal = () => {
    return `
    <div id="add-form" class="modal">
      <div class="modal-content">
        <div class="container">
          <button class="btn" id="home-btn">go back</button>
        </div>
      </div> 
    </div>
    `;
  };
  const createDOMResult = bookmark => {
    return `
    <li class="js-titleBox" data-id="${bookmark.id}">
      <button class="js-show-btn">=></button>
      <span class="js-result">${bookmark.title} : ${bookmark.rating} stars</span>
    </li>
    `;
  };
  const createDOMBookmarkList = bookmarks => {
    const liElements = bookmarks.map(bookmark => DOMElements.createDOMResult(bookmark));
    return liElements.join('');
  };
  const createDOMExpand = bookmark => {
    return `
    <div class="js-desc">
      <p>Description: ${bookmark.desc}</p>
      <a href="${bookmark.url}">Find it again!</a>
      <div id="js-btns">
        <button class="js-edit-btn">edit bookmark</button>
        <button class="js-delete-btn">delete bookmark</button>
      </div>
    </div>
    `;
  };
  const showErrorBox = () => {
    return `
    <div id="error-message">
      <p id="error-content">${Saved.APIerror}</p>
    </div>
    `;
  };
  const render = (result) => {
    console.log('render called');
    if(Saved.APIerror) {
      console.log('error should render');
      console.log(Saved.APIerror);
      $('.error-container').html(showErrorBox());
    } else {
      $('.error-container').remove();
    }
    $('.js-titles').html(result);
  }; 
  const clickButton = (btnLoc, type, fn) => {
    if (type==='#fil-opt') {
      $(btnLoc).on('change', type, fn);
    }
    $(btnLoc).on('click', type, fn);
  };
  const handleInfoBox = () => {
    clickButton('.opt-right','#info-btn', () => {
      $('section').append(showInfoModal());
      clickButton('.modal-content', '#home-btn', () => {
        $('.modal').remove();
      });
    });
  };
  const handleFilteredView = () => {
    clickButton('.opt-left', '#fil-opt', () => {
      switch($('#fil-opt').val()) {
      case '5 stars only':
        DOMElements.render(DOMElements.createDOMBookmarkList(Saved.bookmarks.filter(bookmark => bookmark.rating === 5)));
        break;
      case 'above 3 stars':
        DOMElements.render(DOMElements.createDOMBookmarkList(Saved.bookmarks.filter(bookmark => bookmark.rating > 3)));
        break;
      case 'above 2 stars':
        DOMElements.render(DOMElements.createDOMBookmarkList(Saved.bookmarks.filter(bookmark => bookmark.rating > 2)));
        break;
      case 'above 1 stars':
        DOMElements.render(DOMElements.createDOMBookmarkList(Saved.bookmarks.filter(bookmark => bookmark.rating > 1)));
        break;
      default:
        DOMElements.render(DOMElements.createDOMBookmarkList(Saved.bookmarks));
      }
    });
  };
  const handleAddFormModal = () => {
    clickButton('.opt-left', '#add-btn',  () => {
      $('section').append(showModal());
      clickButton('.modal-content', '#home-btn', () => {
        $('.modal').remove();
      });
      clickButton('fieldset', '#findit-btn', event => {      
        event.preventDefault();
        const newBookmark = {
          title: $('#title').val(),
          url: $('#url-link').val(),
          desc: $('#desc').val(),
          rating: $('#rating').val().slice(0,1)
        };
        $('#title').val(''); $('#url-link').val(''); $('#desc').val(''); $('#rating').val('');
        API.createAPIData(newBookmark, bookmark => {
          Saved.APIerror = null;
          Saved.addBookmark(bookmark);
          DOMElements.render(DOMElements.createDOMBookmarkList(Saved.bookmarks));
        }, e => {
          Saved.APIerror = e.responseJSON.message;
          render(DOMElements.createDOMBookmarkList(Saved.bookmarks));
        });
      });
    });
  };
  const handleExpandedView = () => {
    $('.js-titles').on('click', '.js-show-btn', (event) => {
      const bookmark = Saved.getBookmarkFromId($(event.target).closest('li').data('id'));
      if(bookmark.expanded===false) {
        $(event.target).closest('.js-titleBox').find('.js-result').append(createDOMExpand(bookmark));
        bookmark.expanded = true;
        $('#js-btns').on('click', '.js-delete-btn', (event) => {
          console.log('delete btn works');
          const bookmarkId = $(event.target).closest('li').data('id');
          API.deleteAPIData(bookmarkId, () => {
            Saved.deleteBookmark(bookmarkId);
            DOMElements.render(DOMElements.createDOMBookmarkList(Saved.bookmarks));
          }, e => {
            Saved.APIerror = e.responseJSON.message;
            render(DOMElements.createDOMBookmarkList(Saved.bookmarks));
          });
        });
        $('#js-btns').on('click', '.js-edit-btn', (event) => {
          console.log('edit btn works');
        });
      } else if (bookmark.expanded===true){
        bookmark.expanded = false;
        $(event.target).closest('.js-titleBox').find('.js-desc').remove();
      }
    });
  };
  const bindListeners = () => {
    handleFilteredView(); handleInfoBox(); handleAddFormModal();
    handleExpandedView();
  };
  return {
    bindListeners, render, createDOMResult,
    createDOMExpand, createDOMBookmarkList
  };
})();