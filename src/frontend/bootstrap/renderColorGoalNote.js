import { gaColorMap } from '../data/static';
import { getMatchFilter } from './matchFilter';

const activeClass = 'border-info border';

export function renderColorGoalNote() {
  for (const count in gaColorMap) {
    $('#gaFilter').append(`<span class="ga-selector" style="background-color: ${gaColorMap[count]}">${count}</span>`);
  }

  $('#gaFilter .ga-selector').click(function(){
    const $el = $(this);
    const counter = $el.html();
    $el.toggleClass(activeClass);
    const active = $el.hasClass(activeClass);

    const gaFilter = getMatchFilter();
    gaFilter[counter] = active;
  })
}
