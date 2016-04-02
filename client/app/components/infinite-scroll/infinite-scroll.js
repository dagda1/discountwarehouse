import angular from 'angular';
import template from './infinite-scroll.html';
import { throttle } from 'lodash';

import { windowScrollTop, elementTop } from '../../utils/dom';

const controller = class InfiniteController {
  constructor() {
    this.scroller = throttle(this.scroll, 500).bind(this);
  }

  $onInit() {
    this.attachScrollListener();
  }

  $onChanges(changes) {
    if(changes.isFetching.currentValue) {
      return;
    }

    this.attachScrollListener();
  }

  scroll(e) {
    if(this.isFetching) {
      return;
    }

    const scrollTop = windowScrollTop();
    const el = document.querySelector('infinite-scroller');
    const elTotalHeight = elementTop(el);
    const currentBottomPosition = elTotalHeight - scrollTop - window.innerHeight;

    if(currentBottomPosition < 100) {
      this.loadMore();
      this.detachScrollListener();
    }
  }

  attachScrollListener() {
    window.addEventListener('scroll', this.scroller, true);
  }

  detachScrollListener() {
    window.removeEventListener('scroll', this.scroller, true);
  }

  $onDestroy() {
    this.detachScrollListener();
  }
};

const infiniteScrollComponent = {
  controller,
  template,
  controllerAs: 'vm',
  bindings: {
    isFetching: '<',
    loadMore: '&'
  }
};

export default angular.module('infinite-scroll', [])
.component('infiniteScroller', infiniteScrollComponent);
