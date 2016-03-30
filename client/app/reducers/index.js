import { combineReducers } from 'redux';

import page from './products-reducer';
import { router } from 'redux-ui-router';

const reducers = combineReducers({
  page,
  router
});

export default reducers;
