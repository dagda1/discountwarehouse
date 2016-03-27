class ProductsService {
  constructor($http) {
    this.$http = $http;
  }

  getProducts(options ={}) {
    return this.$http.get('/api/products',
                     {
                       transformResponse: (data) => {
                         const products =  data.split('\n').map((row) => {
                           const product = row.length ? JSON.parse(row) : null;

                           if(!(product)) {
                             return null;
                           }

                           return  Object.assign({}, product, {date: moment(new Date(product.date))});
                         }).filter(product => !!product);

                         return products;
                       }
                     });
  }
};

export default ProductsService;
