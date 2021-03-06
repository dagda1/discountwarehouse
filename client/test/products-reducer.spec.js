import productsReducer from '../app/reducers/products-reducer.js';
import { INITIAL_STATE } from '../app/reducers/products-reducer.js';
import { range } from 'lodash';

import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  CHANGE_SORT,
  ADD_TO_BUFFER,
  TAKE_FROM_BUFFER
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

  it('should set the isFetching flag to false after receiving products', () => {
    const initialSate = productsReducer(undefined, 'initial action');

    const action = {
      type: RECEIVE_PRODUCTS,
      products: [1, 2]
    };

    const nextState = productsReducer(initialSate, action);

    expect(nextState.isFetching).toBeFalsy();
    expect(nextState.products.length).toBe(2);
  });

  it('should change sort', () => {
    const initialSate = productsReducer(undefined, 'initial action');

    const action = {
      type: CHANGE_SORT,
      sort: 'foo'
    };

    const nextState = productsReducer(initialSate, action);

    expect(nextState.sort).toEqual('foo');
    expect(nextState.products.length).toBeFalsy();
    expect(nextState.buffer.length).toBeFalsy();
  });

  it('should add to and take from products buffer', () => {
    const initialSate = productsReducer(undefined, 'initial action');

    let action = {
      type: ADD_TO_BUFFER,
      products: [1, 2]
    };

    expect(initialSate.buffer.length).toBeFalsy('precon - buffer is in initial state.');

    let nextState = productsReducer(initialSate, action);

    expect(nextState.products.length).toBeFalsy('products where not appended to');

    expect(nextState.buffer.length).toEqual(2, 'buffer has been added to');

    action = {
      type: TAKE_FROM_BUFFER
    };

    nextState = productsReducer(nextState, action);

    expect(nextState.buffer.length).toBeFalsy('buffer has been taken from.');

    expect(nextState.products.length).toEqual(2, 'products have been added to');
  });

  it('should place advert every 20 products', () => {
    const initialSate = productsReducer(undefined, 'initial action');

    const action = {
      type: RECEIVE_PRODUCTS,
      products: range(20)
    };

    const nextState = productsReducer(initialSate, action);

    expect(nextState.products.length).toEqual(21, 'precon - we have 20 products and an advert');

    const nextAction = {
      type: RECEIVE_PRODUCTS,
      products: range(20, 40)
    };

    const firstAdvert = nextState.products[19];

    const nextStateWithAdvert = productsReducer(nextState, nextAction);

    const secondAdvert = nextStateWithAdvert.products[39];

    const lastAction = {
      type: RECEIVE_PRODUCTS,
      products: range(40, 60)
    };

    const lastState = productsReducer(nextStateWithAdvert, lastAction);

    const lastAdvert = lastState.products[59];

    [firstAdvert, secondAdvert, lastAdvert].forEach((advert) => {
      expect(advert.isAdvert).toBeTruthy();
    });
  });
});
