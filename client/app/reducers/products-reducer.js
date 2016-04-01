import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  CHANGE_SORT
} from '../constants';

const initialState = {
  products: [],
  isFetching: false,
  page: 0,
  pageSize: 20,
  sort: 'id'
};

export default function page(state = initialState, action = {}) {
  switch(action.type) {
  case REQUEST_PRODUCTS:
    return Object.assign({}, state, {
      page: state.page + 1,
      isFetching: true
    });

  case RECEIVE_PRODUCTS:
    const products = state.products.slice(0);

    products.push(...action.products);

    return Object.assign({}, state, {
      isFetching: false,
      products: products
    });

  case CHANGE_SORT: {
    return Object.assign({}, state, {
      sort: action.sort,
      page: 0,
      products: []
    });
  }

  default:
    return state;
  };
};
