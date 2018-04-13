'use strict';
/* global API */
$(API.getAPIData(titleArr => titleArr
  .map(titleObj => console.log(titleObj.title))));