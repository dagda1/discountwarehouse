import productsReducer from '../app/reducers/products-reducer.js';
import { INITIAL_STATE } from '../app/reducers/products-reducer.js';

import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  CHANGE_SORT
} from '../app/constants';


describe('ProductsReducer', () => {
  it('should be created with an initial state', () => {
    const initialSate = productsReducer(undefined, 'initial action');

    expect(initialSate).toEqual(jasmine.objectContaining(INITIAL_STATE));
  });

  it('should set the isFetching flag to true when requesting products', () => {
    const initialSate = productsReducer(undefined, 'initial action');

    const action = {
      type: REQUEST_PRODUCTS
    };

    const nextState = productsReducer(initialSate, action);

    expect(nextState.isFetching).toBeTruthy();
    expect(nextState.page).toBe(1);
  });
});
