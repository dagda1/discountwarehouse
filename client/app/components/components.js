import angular from 'angular';
import Navbar from './navbar/navbar';
import Home from './home/home';
import ProductsList from './products/products-list.js';
import Product from './product/product.js';
import Picker from './picker/picker.js';
import InfiniteScroller from './infinite-scroll/infinite-scroll';
import Advert from './advert/advert.js';
import EndOfCatalogue from './end-of-catalogue/end-of-catalogue.js';

const componentModule = angular.module('app.components', [
  Navbar.name,
  Home.name,
  ProductsList.name,
  Product.name,
  Picker.name,
  InfiniteScroller.name,
  Advert.name,
  EndOfCatalogue.name
]);

export default componentModule;
