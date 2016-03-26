import { FETCH_PRODUCTS } from "../constants";

const initialState = {
  products: '[]',
  limit: 30,
  skip: 0,
  sort: 'id'
};

export default function update(state = initialState, action = {}) {
  switch(action.type) {
  case FETCH_PRODUCTS:
    return {
      products: [1]
    };

  default:
    return state;
  };
};
