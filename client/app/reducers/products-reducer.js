import { REQUEST_PRODUCTS, RECEIVE_PRODUCTS } from "../constants";

const initialState = {
  products: '[]',
  isFetching: false,
  limit: 30,
  skip: 0,
  sort: 'id'
};

export default function products(state = initialState, action = {}) {
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

  default:
    return state;
  };
};
