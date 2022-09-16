import _ from '../../lodash';
import { ordinalNumber } from './ordinalNumber'
import { matchAttrTitleMap } from '../../data/static'
 
const buildTypeFn = (arrTypes, match) => arrTypes.filter(type => match[type] > 0).map((type) => {
    return `<span class="text-warning">${match[type]} ${matchAttrTitleMap[type] || type}</span>`
}).join(', ');

function ordinalList(list) {
    return list.map(o => ordinalNumber(o)).join(', ')
}

export function goalContributionDetail(match) {
    const { goals, assists, assistsOrder, assistsCompOrder, goalsOrder, goalsCompOrder, xg, competition } = match;


    const lines = [];
    if (goals > 0) {
        const xGPostfix = xg ? `/ xG:${xg}` : '';
        const goalLine = `${_.repeat('⚽', goals)} (${ordinalList(goalsOrder)} / total & ${ordinalList(goalsCompOrder)} / ${competition}) ${xGPostfix}`;
        lines.push(goalLine)

        const typeDetail = buildTypeFn(['freeKicks', 'insideBox', 'outsideBox', 'pens'], match)
        lines.push(typeDetail)
        const bodyDetai = buildTypeFn(['left', 'right', 'head', 'other'], match)
        lines.push(bodyDetai)
    }

    if (assists > 0) {
        const assistLine = `${_.repeat('️🅰️️', assists)} (${ordinalList(assistsOrder)} / total & ${ordinalList(assistsCompOrder)} / ${competition})`;
        lines.push(assistLine)
    }

    return lines.join('<br />');
}