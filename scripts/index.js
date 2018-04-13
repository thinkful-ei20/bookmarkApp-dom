'use strict';
/* global API */
$(API.getArrayOfObjects(titleArr => titleArr
  .map(titleObj => console.log(titleObj.title))));