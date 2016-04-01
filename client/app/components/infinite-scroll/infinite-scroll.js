import angular from 'angular';
import { throttle } from 'lodash';

import { windowScrollTop, elementTop } from '../../utils/dom';

const controller = class InfiniteController {
  constructor() {
    this.scroller = throttle(this.scroll, 1000).bind(this);
  }

  $onInit() {
    this.attachScrollListener();
  }

  $onChanges() {
    if(!this.isFetching) {
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

    if(currentBottomPosition < 0) {
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
  controllerAs: 'vm',
  bindings: {
    isFetching: '<',
    loadMore: '&'
  }
};

export default angular.module('infinite-scroll', [])
.component('infiniteScroller', infiniteScrollComponent);
