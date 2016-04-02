import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  CHANGE_SORT,
  ADD_TO_BUFFER,
  TAKE_FROM_BUFFER
} from '../constants';

function requestProducts() {
  return {
    type: REQUEST_PRODUCTS
  };
}

function receiveProducts(products) {
  return {
    type: RECEIVE_PRODUCTS,
    products
  };
}

function changeSort(choice) {
  return {
    type: CHANGE_SORT,
    sort: choice
  };
}

function addToBuffer(products) {
  return {
    type: ADD_TO_BUFFER,
    products
  };
};

function takeFromBuffer() {
  return {
    type: TAKE_FROM_BUFFER
  };
};

export default function productsActions(productsService) {
  function fetchProducts(state, nextAction) {
    return (dispatch, getState) => {
      dispatch(requestProducts());
      return productsService.getProducts(state)
        .then(result => result.data)
        .then(products => dispatch(nextAction(products)));
    };
  }

  function fetchNewPageIfNeeded() {
    return (dispatch, getState) => {
      const page = getState().page;

      if(page.buffer.length) {
        dispatch(fetchProducts(page, addToBuffer));
        return dispatch(takeFromBuffer());
      }

      if(!shouldFetchProducts(page)) {
        return null;
      }

      const result = dispatch(fetchProducts(page, receiveProducts));

      dispatch(fetchProducts(getState().page, addToBuffer));

      return result;
    };
  }

  function shouldFetchProducts(state) {
    if (!state.products.length) {
      return true;
    }

    return !state.isFetching;
  }

  function sortChanged(choice) {
    return (dispatch, getState) => {
      if(choice === getState().page.sort) {
        return;
      }
      dispatch(changeSort(choice));
      dispatch(fetchNewPageIfNeeded());
    };
  }

  return {
    fetchNewPageIfNeeded,
    sortChanged
  };
};
