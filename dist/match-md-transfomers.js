"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchToMdContent = exports.matchTitle = exports.roundTitle = exports.matchResultIcon = void 0;
const lodash_1 = require("lodash");
const match_helpers_1 = require("./match-helpers");
const match_script_js_1 = require("../scripts/match-script.js");
function matchResultIcon(match) {
    return (0, match_helpers_1.isWin)(match) ? `✅` : (0, match_helpers_1.isDraw)(match) ? `🤝` : '❌';
}
exports.matchResultIcon = matchResultIcon;
function roundTitle(match) {
    if (!match.round) {
        return '';
    }
    const map = {
        F: 'Final',
        SF: 'Semi-final',
        QF: 'Quater-final',
        R16: 'Round 16',
    };
    return `*${map[match.round] || match.round}*`;
}
exports.roundTitle = roundTitle;
function goalsStat(match) {
    const { goals } = match;
    if (goals <= 0) {
        return ``;
    }
    const lines = [];
    lines.push(`Goal(s): ${(0, lodash_1.repeat)(`⚽`, goals)}`);
    const attrs = ['head', 'freeKicks', 'outsideBox', 'right', 'pens'];
    attrs.forEach((attr) => {
        if (match[attr] > 0) {
            lines.push(`${attr}: ${match[attr]}`);
        }
    });
    return lines.filter(i => i).join("; ");
}
function playmakerStats(match) {
    const lines = [];
    if (match.assists > 0) {
        lines.push(`Assist(s): ${(0, lodash_1.repeat)(`🅰️`, match.assists)}`);
    }
    const attrs = [
        'penWonAssist', 'ownGoalAssist', 'reboundGkAssist', 'reboundPostAssist', 'deflectedAssist',
        'bigChancesCreated', 'keyPasses', 'throughballs',
        'successfulDribbles',
    ];
    attrs.forEach((attr) => {
        if (match[attr] > 0) {
            lines.push(`${attr}: ${match[attr]}`);
        }
    });
    return lines.filter(i => i).join("; ");
}
function matchTitle(match) {
    const { order, opponent, homeAway, scoreTeam, scoreOpponent, season } = match;
    return `${matchResultIcon(match)} ${order}. vs ${opponent} (${homeAway}) (${season}) (${scoreTeam} - ${scoreOpponent})`;
}
exports.matchTitle = matchTitle;
function matchToMdContent(match) {
    const { id, dateDB, competition, minsPlayed, benched } = match;
    const lines = [];
    const hasScript = !!match_script_js_1.matchScripts[id];
    // add title & subtitle
    const prefixTitle = `## ${hasScript ? '👀' : ''}`;
    const title = `${prefixTitle} ${matchTitle(match)}`;
    lines.push(title);
    lines.push(`${dateDB} - **${competition}** ${roundTitle(match)} *${id}*`);
    // build play status
    const minPlayedStr = minsPlayed != 90 ? `${minsPlayed} mins played` : '';
    const benchedStr = benched ? '**from bench**' : '';
    const playStatusStr = minPlayedStr && benchedStr ? `${minPlayedStr} ${benchedStr}` : '';
    lines.push(playStatusStr);
    // more stats
    lines.push(goalsStat(match));
    lines.push(playmakerStats(match));
    // add script 
    if (hasScript) {
        lines.push("\n```\n" + match_script_js_1.matchScripts[id] + "\n```\n");
    }
    return lines.filter(i => i).join("\n");
}
exports.matchToMdContent = matchToMdContent;
//# sourceMappingURL=match-md-transfomers.js.map