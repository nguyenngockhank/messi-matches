import * as cheerio from 'cheerio';
import _ from 'lodash';
import { extractRowData, fetchAllMatches, getStoredMatchMap, storeMatches, traverseRows } from "./common";
import { MatchDetail } from "./types";



function extractMatchesOnPage(content: string) : MatchDetail[] {
    const $ = cheerio.load(content);
    const $table = $('.nextlevel');

    const matchList : MatchDetail[] = [];

    traverseRows($table, ($row) => {
        const matchHref  = $row('tr').attr("data-href")
        if (!matchHref) {
            return;
        }
        const [
            appIndex,
            textDate,
            competition,
            homeTeam,
            result,
            awayTeam,
            starter,
            minutesPlayed,
            goals,
            assists,
            cards,
        ] = extractRowData($row, 10);

        const matchslug = textDate.split("-").reverse().join("-");

        matchList.push({
            href: matchHref,
            appIndex: parseInt(appIndex),
            matchslug,
            date: matchslug,
            homeTeam,
            awayTeam,
            goals: parseInt(goals),
            assists: parseInt(assists),
        });
    });

    return matchList;
}

fetchAllMatches().then(content => {
    const storedMatchMap = getStoredMatchMap();
    
    const pageMatches : MatchDetail[] = extractMatchesOnPage(content);

    // enrich old s
    let hasChanged = false;
    pageMatches.forEach(match => {
        if (!storedMatchMap[match.matchslug]) {
            hasChanged = true;
            return storedMatchMap[match.matchslug] = match;
        }
    });

    if (hasChanged) {
        console.log("storing matches changed")
        storeMatches(storedMatchMap)
    }
});

