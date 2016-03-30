import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS
} from '../constants';

function requestProducts() {
  return {
    type: REQUEST_PRODUCTS
  };
}

function receiveProducts(products) {
  return {
    type: RECEIVE_PRODUCTS,
    products: products
  };
}

export default function productsActions(productsService) {
  function fetchProducts(state) {
    return dispatch => {
      dispatch(requestProducts());
      return productsService.getProducts(state)
        .then(result => result.data)
        .then(products => dispatch(receiveProducts(products)));
    };
  }

  function fetchNewPageIfNeeded() {
    return (dispatch, getState) => {
      const page = getState().page;
      if(shouldFetchProducts(page)) {
        return dispatch(fetchProducts(page));
      }
    };
  }

  function shouldFetchProducts(state) {
    const products = state.page;

    if (!products.length) {
      return true;
    }

    if (products.isFetching) {
      return false;
    }

    return products.didInvalidate;
  }

  return {
    fetchNewPageIfNeeded
  };
};
