import { combineReducers } from 'redux';

import products from './products-reducer';
import { router } from 'redux-ui-router';

const reducers = combineReducers({
  products,
  router
});

export default reducers;
