import _ from '../../lodash';
import { ordinalNumber } from './ordinalNumber'
import { matchAttrTitleMap } from '../../data/static'
 
const buildTypeFn = (arrTypes, match) => arrTypes.filter(type => match[type] > 0).map((type) => {
    return `<span class="text-warning">${match[type]} ${matchAttrTitleMap[type] || type}</span>`
}).join(', ');

function ordinalList(list) {
    return list.map(o => ordinalNumber(o)).join(', ')
}

function goalTotalDetail(match) {
    const { goalsOrder } = match;
    return `${ordinalList(goalsOrder)} / total`;
}

function goalCompetitionDetail(match) {
    const { goalsCompOrder, competition } = match;
    return `${ordinalList(goalsCompOrder)} / ${competition})`;
}

function assistCompetitionDetail(match) {
    const { assistsCompOrder, competition } = match;
    return `${ordinalList(assistsCompOrder)} / ${competition})`;
}

export function goalContributionDetail(match, options) {
    const { goals, assists, assistsOrder,  xg,  } = match;

    const showDetail = !!_.get(options, "detail");

    const lines = [];
    if (goals > 0) {
        const goalLine = `${_.repeat('⚽', goals)}`;
        lines.push(goalLine)
        if (showDetail) {
            const xGPostfix = xg ? `/ xG:${xg}` : '';
            const goalDetail = `${goalTotalDetail(match)} & ${goalCompetitionDetail(match)} ${xGPostfix}`
            lines.push(goalDetail);
            const typeDetail = buildTypeFn(['freeKicks', 'insideBox', 'outsideBox', 'pens'], match)
            lines.push(typeDetail)
            const bodyDetai = buildTypeFn(['left', 'right', 'head', 'other'], match)
            lines.push(bodyDetai)
        }
    }

    if (assists > 0) {
        const assistLine = `${_.repeat('️🅰️️', assists)} (${ordinalList(assistsOrder)} / total)`;
        lines.push(assistLine)
    }

    return lines.join('<br />');
}