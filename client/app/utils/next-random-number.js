export function nextRandomNumber(lastNumber) {
  const next = Math.floor(Math.random()*1000);

  if(next === lastNumber) {
    return nextRandomNumber(lastNumber);
  }

  return next;
};