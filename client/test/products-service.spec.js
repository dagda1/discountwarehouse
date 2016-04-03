import ProductsService from '../app/services/products-service';
import { dateToString } from '../app/utils/date';

describe('ProductsService', () => {
  const mockState = `{"id":"19610-sdq66alqflayvi","size":31,"price":727,"face":"☜(⌒▽⌒)☞","date":"Thu Mar 24 2016 02:18:18 GMT+0000 (GMT)"}
{"id":"93147-m4j2n6xiqqbvgqfr","size":31,"price":486,"face":"☼.☼","date":"Thu Mar 31 2016 07:23:37 GMT+0000 (GMT)"}
`;

  describe('#transformResponse', () => {
    const productsService = new ProductsService();

    const products = productsService.transformResponse(mockState);

    it('should should transform delimitted json into product hashes', ()=> {
      expect(products.length).toEqual(2);
    });

    it('should format the price correctly', () => {
      const priceFields = products.map((product) => product.price);

      expect(priceFields[0]).toEqual(7.27);
      expect(priceFields[1]).toEqual(4.86);
    });

    it('should format the date field correctly', () => {
      const dateFields = products.map((product) => product.date);

      expect(dateFields[0]).toEqual(dateToString(new Date("Thu Mar 24 2016 02:18:18 GMT+0000 (GMT)")));

      expect(dateFields[0]).toEqual(dateToString(new Date("Thu Mar 31 2016 02:18:18 GMT+0000 (GMT)")));
    });
  });
});
