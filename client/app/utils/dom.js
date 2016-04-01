export function windowScrollTop() {
  return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
};

export function elementTop(el) {
  return topPosition(el) + el.offsetHeight;
};

function topPosition(el) {
  if (!el) {
    return 0;
  }
  return el.offsetTop + topPosition(el.offsetParent);
}
