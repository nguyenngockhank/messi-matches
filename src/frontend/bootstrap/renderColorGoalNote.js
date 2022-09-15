import { gaColorMap } from '../data/static';
import { getMatchFilter } from './matchFilter';

const activeClass = 'border-info border';


function appendItemToArray(currentVal, newVal) {
  if (!currentVal) {
    return [newVal]
  }
  if (currentVal.includes(newVal)) {
    return currentVal
  }
  return [...currentVal, newVal]
}

function removeItemFromArray(currentVal, newVal) {
  if (!currentVal) {
    return []
  }
  return currentVal.filter(v => v !== newVal);
}

export function renderColorGoalNote() {
  for (const count in gaColorMap) {
    if (count === '0') {
      continue;
    }
    $('#gaFilter').append(`<span class="ga-selector" style="background-color: ${gaColorMap[count]}">${count}</span>`);
  }

  $('#gaFilter .ga-selector').click(function(){
    const $el = $(this);
    const counter = Number($el.html().trim());
    $el.toggleClass(activeClass);
    const active = $el.hasClass(activeClass);

    const matchFilter = getMatchFilter();
    const currentFilter = matchFilter.gaOptions
    matchFilter.gaOptions = active 
                       ? appendItemToArray(currentFilter, counter) 
                       : removeItemFromArray(currentFilter, counter) ;
  })
}
