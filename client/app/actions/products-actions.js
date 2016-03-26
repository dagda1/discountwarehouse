import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS
} from '../constants';

function requestProducts(reddit) {
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
  function fetchProducts() {
    return dispatch => {
      dispatch(requestProducts());
      return productsService.getProducts()
        .then(result => result.data)
        .then(products => dispatch(receiveProducts(products)));
    };
  }

  function fetchProductsIfNeeded() {
    return (dispatch, getState) => {
      if(shouldFetchProducts(getState())) {
        return dispatch(fetchProducts());
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
    fetchProductsIfNeeded
  };
};
