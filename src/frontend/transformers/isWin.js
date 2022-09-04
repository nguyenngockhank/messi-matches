import { isHome } from "./isHome";

export function isWin(match) {
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