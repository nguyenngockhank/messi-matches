import * as cheerio from 'cheerio';
import { Incident } from '../sofa/types';
import { extractRowData, removeDoubleSpace, traverseRows } from './common';
import { GoalExtra } from './types';

export function extractMatchExtraFields($: cheerio.CheerioAPI )  {
    const location = $('.misc span:first-child').first().text().trim();
    const visitors = $('.misc .visitors').text().trim();
    const referee = $('.misc .referee').text().trim();

    return {
        location: removeDoubleSpace(location),
        visitors: parseInt(visitors) || undefined,
        referee: removeDoubleSpace(referee)
    }
}

 function extractMatchIncidents($: cheerio.CheerioAPI)  {
    const $rows = $('#goals-cards tbody tr');
    const result : Incident[] = [];

    $rows.each((index, el) => {
        const $row = cheerio.load(el);
        const [scoredPlayer, scoreText, timeText, , cardedPlayer] = extractRowData($row, 5);
        const [time, addedTime] = timeText.split("+");

      
        const isCard = !scoreText;
        const classifyIncidentFn = () => {
            const isYellow = $row("td:nth-child(4)").hasClass('yellow');
            if (isCard) {
                return isYellow ? "yellow" : "red";
            }

            // type of goals
            return "";
        }

        const scoreAttrsFn = () => {
            if (isCard) {
                return {}
            }
            const [homeScore, awayScore] = scoreText.split("-");
            return { 
                homeScore: parseInt(homeScore),
                awayScore: parseInt(awayScore),
            }
        }

        result.push({
            incidentType: isCard ? "card" : "goal",
            incidentClass: classifyIncidentFn(),
            ...scoreAttrsFn(),
            time: parseInt(time),
            addedTime: addedTime? parseInt(addedTime) : undefined,
            playerName: scoredPlayer || cardedPlayer,
        })
    });

    return result
}

export function extractGoalsDetail($: cheerio.CheerioAPI) : GoalExtra[] {
    const lastTableHasId = $('table').last().attr("id")
    if (lastTableHasId) {
        return [];
    }

    const $table = $('table').last();
    const result: GoalExtra[] = [];
    traverseRows($table, ($row) => {
        const [
            score, time, player, assistedBy,
            what, type, from, how, where
        ] = extractRowData($row, 9);

        result.push({
            time,
            assistedBy,
            from,
            where, 
            type,
        })
    });
    return result;
}
