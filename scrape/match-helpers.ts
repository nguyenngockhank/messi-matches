import { Match } from "./types";

export function isHome(match: Match) : boolean {
    return ['H', 'N'].includes(match.homeAway);
}

export function isDraw(match: Match) {
    const { scoreTeam, scoreOpponent, penScore } = match;
    const equalScore = scoreTeam === scoreOpponent
    return equalScore  && !penScore;
}

export function isWin(match: Match) : boolean {
    const { scoreTeam, scoreOpponent, penScore } = match;
    if (scoreTeam > scoreOpponent) {
        return true;
    }

    if (penScore) {
        const [first, secord] = penScore.split('-');
        return isHome(match) ? first > secord : secord > first;
    }

    return false;
}