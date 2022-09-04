export function isDraw(match) {
    const { scoreTeam, scoreOpponent, penScore } = match;
    return scoreTeam === scoreOpponent && !penScore;
}