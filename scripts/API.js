'use strict';
// eslint-disable-next-line no-unused-vars
const API = (() => {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mckoy';
  const getAPIData = callback => {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };
  const createAPIData = (formObj, win, loss) => {
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formObj),
      success: win,
      error: loss
    });
  };
  const updateAPIData = (formObj, win, loss) => {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${formObj.id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(formObj),
      success: win,
      error: loss
    });
  };
  const deleteAPIData = (id, win, loss) => {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success: win,
      error: loss
    });
  };
  return {
    getAPIData, createAPIData, deleteAPIData,
    updateAPIData
  };
})();