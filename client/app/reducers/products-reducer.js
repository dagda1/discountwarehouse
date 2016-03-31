import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  CHANGE_SORT
} from '../constants';

const initialState = {
  products: [],
  isFetching: false,
  page: 1,
  pageSize: 20,
  sort: 'id'
};

export default function page(state = initialState, action = {}) {
  switch(action.type) {
  case REQUEST_PRODUCTS:
    return Object.assign({}, state, {
      isFetching: true
    });

  case RECEIVE_PRODUCTS:
    return Object.assign({}, state, {
      isFetching: false,
      products: action.products
    });

  case CHANGE_SORT: {
    return Object.assign({}, state, {
      sort: action.sort,
      page: 1,
      products: []
    });
  }

  default:
    return state;
  };
};
