import { isHome } from "./isHome";

export const aliasTeamNameMap = {
    'Barcelona': 'Barca',
    'Paris Saint-Germain': 'PSG',
    'Manchester City': 'Man City',
}

export function teamName(name) {
    return aliasTeamNameMap[name] || name;
}

function homeTitle(match, options) {
    const { year, team, opponent, scoreTeam, scoreOpponent } = match;
    const prefix = _.get(options, 'prefixYear') ? `[${year}] ` : '';
    return `${prefix}${teamName(team)} ${scoreTeam} - ${scoreOpponent} ${teamName(opponent)}`
}

function awayTitle(match, options) {
    const { year, team, opponent, scoreTeam, scoreOpponent } = match;
    const prefix = _.get(options, 'prefixYear') ? `[${year}] ` : '';
    return `${prefix}${teamName(opponent)} ${scoreOpponent} - ${scoreTeam} ${teamName(team)}`
}

export function matchTitle(match, options) {
    return isHome(match) ? homeTitle(match, options) : awayTitle(match, options);
}