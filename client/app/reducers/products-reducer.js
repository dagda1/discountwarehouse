import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  CHANGE_SORT,
  ADD_TO_BUFFER,
  TAKE_FROM_BUFFER
} from '../constants';

import advertInserter from '../utils/advert-inserter';

export const INITIAL_STATE = {
  products: [],
  buffer: [],
  isFetching: false,
  page: 0,
  pageSize: 20,
  sort: 'id',
  endOfCatalogue: false
};

export default function page(state = INITIAL_STATE, action = {}) {
  switch(action.type) {
  case REQUEST_PRODUCTS:{
    return Object.assign({}, state, {
      page: state.page + 1,
      isFetching: true
    });
  }

  case RECEIVE_PRODUCTS: {
    let advertsAndProducts  = advertInserter(state.products.slice(0), action.products);

    let products = state.products.slice(0);

    products.push(...advertsAndProducts);

    return Object.assign({}, state, {
      isFetching: false,
      products: products,
      endOfCatalogue: !products.length
    });
  }

  case CHANGE_SORT: {
    return Object.assign({}, state, {
      sort: action.sort,
      page: 0,
      products: [],
      buffer: []
    });
  }

  case ADD_TO_BUFFER: {
    let buffer = state.buffer.slice(0);

    buffer.push(...action.products);

    return Object.assign({}, state, {
      isFetching: false,
      buffer
    });
  }

  case TAKE_FROM_BUFFER: {
    let buffer = state.buffer.slice(0);
    let products = state.products.slice(0);

    let advertsAndProducts  = advertInserter(state.products.slice(0), buffer.splice(0, state.pageSize));

    products.push(...advertsAndProducts);

    return Object.assign({}, state, {
      buffer,
      products
    });
  }

  default:
    return state;
  };
};
