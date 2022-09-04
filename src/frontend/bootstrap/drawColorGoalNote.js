import { gaColorMap } from '../data/static';


export function drawColorGoalNote() {
  for (const count in gaColorMap) {
    $('.note').append(`<span style="background-color: ${gaColorMap[count]}">${count}</span>`);
  }
}
