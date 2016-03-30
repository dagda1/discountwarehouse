class ProductsService {
  constructor($http) {
    this.$http = $http;
  }

  getProducts(options) {
    const url = this.getUrlFromOptions(options);

    return this.$http.get(url,
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

  getUrlFromOptions(options) {
    const limit = options.page * options.pageSize;
    const url = `/api/products?limit=${limit}&skip=${options.pageSize}&sort=${options.sort}`;

    return url;
  }
};

export default ProductsService;
