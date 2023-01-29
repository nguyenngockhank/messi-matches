import _ from '../lodash';
import { isHome } from "./isHome";
import { teamShortNameMap } from "../data/teamShortNameMap";

window.missTeamName = {}

export function teamName(name, options) {
    if (!_.get(options, 'shortName')) {
        return name;
    }

    if (!teamShortNameMap[name] && !window.missTeamName[name]) {
        window.missTeamName[name] = name;
        console.warn('>>> not found short name for', "`" + name +"`")
    }

    return teamShortNameMap[name] || name;
}

function buildYearPrefix(match, options) {
    return _.get(options, 'prefixYear') ? ` [${match.year}] ` : '';
}

function homeTitle(match, options) {
    const { team, opponent, scoreteam, scoreopponent } = match;
    const prefix = buildYearPrefix(match, options);
    return `${prefix}${teamName(team, options)} ${scoreteam} - ${scoreopponent} ${teamName(opponent, options)}`
}

function awayTitle(match, options) {
    const { team, opponent, scoreteam, scoreopponent } = match;
    const prefix = buildYearPrefix(match, options);
    return `${prefix}${teamName(opponent, options)} ${scoreopponent} - ${scoreteam} ${teamName(team, options)}`
}

export function matchTitle(match, options) {
    return isHome(match) ? homeTitle(match, options) : awayTitle(match, options);
}
