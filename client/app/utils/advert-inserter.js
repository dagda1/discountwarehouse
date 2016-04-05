const INSERT_ADVERT_INDEX = 20;

import { nextRandomNumber } from './next-random-number';
import { findLastIndex, reduce, find } from 'lodash';

export default function advertInserter(stateList, actionList) {
  const stateListLength = stateList.length;
  const actionListLength = actionList.length;

  let startIndex;

  if(stateListLength === 0) {
    startIndex = -1;
  } else {
    const lastIndex = findLastIndex(stateList, i => i.isAdvert) + 1;

    const numberOfAdverts = reduce(stateList, (result, item) => {
      if(item.isAdvert) {
        return result + 1;
      }

      return result;
    }, 0);

    startIndex = (lastIndex % INSERT_ADVERT_INDEX) - numberOfAdverts - 1;
  }

  const totalNewProducts = actionListLength;
  const cycles = Math.floor(totalNewProducts / INSERT_ADVERT_INDEX);

  if(!cycles) {
    return actionList;
  }

  const combined = actionList.slice(0);

  let i = 0,
      insertIndex = startIndex,
      lastAdvertIndex,
      nextAdvertIndex;

  const lastAdvert = find(stateList, (item) => item.isAdvert);

  if(lastAdvert) {
    lastAdvertIndex = lastAdvert.index;
  }

  for(i; i < cycles; i ++) {
    insertIndex += INSERT_ADVERT_INDEX;

    nextAdvertIndex = nextRandomNumber(lastAdvertIndex);

    const advert = {
      isAdvert: true,
      index: nextAdvertIndex
    };

    combined.splice(insertIndex, 0, advert);
  }

  return combined;
};
