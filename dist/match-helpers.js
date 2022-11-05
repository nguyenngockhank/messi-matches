"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWin = exports.isDraw = exports.isHome = void 0;
function isHome(match) {
    return ['H', 'N'].includes(match.homeAway);
}
exports.isHome = isHome;
function isDraw(match) {
    const { scoreTeam, scoreOpponent, penScore } = match;
    const equalScore = scoreTeam === scoreOpponent;
    return equalScore && !penScore;
}
exports.isDraw = isDraw;
function isWin(match) {
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
exports.isWin = isWin;
//# sourceMappingURL=match-helpers.js.map