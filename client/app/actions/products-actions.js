import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS
} from '../constants';

function requestProducts(sort) {
  return {
    type: REQUEST_PRODUCTS,
    sort
  };
}

function receiveProducts(sort, products) {
  return {
    type: RECEIVE_PRODUCTS,
    products: products
  };
}

export default function productsActions(productsService) {
  function fetchProducts(sort) {
    return dispatch => {
      dispatch(requestProducts(sort));
      return productsService.getProducts({sort})
        .then(result => result.data)
        .then(products => dispatch(receiveProducts(sort, products)));
    };
  }

  function fetchNewSortQueryIfNeeded(sort) {
    return (dispatch, getState) => {
      if(shouldFetchProducts(getState())) {
        return dispatch(fetchProducts(sort));
      }
    };
  }

  function shouldFetchProducts(state) {
    const products = state.products;

    if (!products.length) {
      return true;
    }

    if (products.isFetching) {
      return false;
    }

    return products.didInvalidate;
  }

  return {
    fetchNewSortQueryIfNeeded
  };
};
