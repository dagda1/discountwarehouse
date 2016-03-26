class ProductsService {
  constructor($http) {
    this.$http = $http;
  }

  getProducts(options ={}) {
    return this.$http.get('/api/products',
                     {
                       transformResponse: (data) => {
                         var products =  data.split('\n').map((row) => {
                           return row.length ? JSON.parse(row) : null;
                         }).filter(product => !!product);

                         return products;
                       }
                     });
  }
};

export default ProductsService;
