import { repeat } from "lodash";
import { isDraw, isWin } from "./match-helpers";
import { matchScripts } from "../scripts/match-script.js";
import { EnrichedMatch } from "./types";

export function matchResultIcon(match: EnrichedMatch) : string {
    return isWin(match)  ? `✅` : isDraw(match) ? `🤝` : '❌' 
}

export function roundTitle(match) : string {
    if(!match.round) {
        return ''
    }

    const map = {
        F: 'Final', // 2 teams
        SF: 'Semi-final', // 4 teams
        QF: 'Quater-final', // 8 teams
        R16: 'Round 16', 
    }

    return `*${map[match.round] || match.round}*`;
}


function goalsStat(match: EnrichedMatch) : string {
    const { goals } = match;
    if (goals <= 0) {
        return ``
    }

    const lines: string[] = [];
    lines.push(`Goal(s): ${repeat(`⚽`, goals)}`);

    const attrs = ['head', 'freeKicks', 'outsideBox', 'right', 'pens']
    attrs.forEach((attr) => {
        if (match[attr] > 0) {
            lines.push(`${attr}: ${match[attr]}`)
        }
    })

    return lines.filter(i => i).join("; ")
}

function playmakerStats(match: EnrichedMatch) : string {
    const lines: string[] = [];

    if (match.assists > 0) {
        lines.push(`Assist(s): ${repeat(`🅰️`, match.assists)}`);
    }

    const attrs = [
         'penWonAssist', 'ownGoalAssist', 'reboundGkAssist', 'reboundPostAssist', 'deflectedAssist', 
        'bigChancesCreated', 'keyPasses', 'throughballs', 
        'successfulDribbles', 
    ]
    attrs.forEach((attr) => {
        if (match[attr] > 0) {
            lines.push(`${attr}: ${match[attr]}`)
        }
    })

    return lines.filter(i => i).join("; ")
}


export function matchToMdContent(match: EnrichedMatch) : string {
    const { id, dateDB, competition, order, opponent, homeAway, minsPlayed, scoreTeam, scoreOpponent, benched } = match;
    const lines: string[] = [];
    
    const hasScript = !!matchScripts[id];

    // add title & subtitle
    const title = `## ${hasScript ? '👀': ''} ${matchResultIcon(match)} ${order}. vs ${opponent} (${homeAway}) ${scoreTeam} - ${scoreOpponent}`
    lines.push(title);
    lines.push(`${dateDB} - **${competition}** ${roundTitle(match)} *${id}*`)

    // build play status
    const minPlayedStr = minsPlayed != 90 ? `${minsPlayed} mins played` : '';
    const benchedStr = benched ? '**from bench**' : '';
    const playStatusStr = minPlayedStr &&  benchedStr ?  `${minPlayedStr} ${benchedStr}` : ''

    lines.push(playStatusStr);

    // more stats
    lines.push(goalsStat(match));
    lines.push(playmakerStats(match));

    // add script 
    if (hasScript) {
        lines.push("\n```\n" + matchScripts[id] + "\n```\n");
    }

    return lines.filter(i => i).join("\n")
}