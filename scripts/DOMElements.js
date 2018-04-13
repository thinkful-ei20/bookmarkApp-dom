'use strict';
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

  const createDOMBookmarkElements = bookmarks => {
    const liElements = bookmarks.map(bookmark => DOMElements.createDOMResult(bookmark));
    return liElements.join('');
  };

  return {
    createDOMResult, createDOMExpand, 
    createDOMBookmarkElements
  };
})();