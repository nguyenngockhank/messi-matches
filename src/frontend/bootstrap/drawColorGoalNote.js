import { gaColorMap } from '../data/static';
import { getGaFilter } from './gaFilter';

const activeClass = 'border-info border';

export function drawColorGoalNote() {
  for (const count in gaColorMap) {
    $('.note').append(`<span class="ga-selector" style="background-color: ${gaColorMap[count]}">${count}</span>`);
  }

  $('.note .ga-selector').click(function(){
    const $el = $(this);
    const counter = $el.html();
    $el.toggleClass(activeClass);
    const active = $el.hasClass(activeClass);

    const gaFilter = getGaFilter();
    gaFilter[counter] = active;
  })
}
