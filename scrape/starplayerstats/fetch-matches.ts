import * as cheerio from 'cheerio';
import _ from 'lodash';
import { fetchAllMatches, getStoredMatchMap, MatchDetail, storeMatches } from "./common";

function extractMatchesOnPage(content: string) : MatchDetail[] {
    const $ = cheerio.load(content);
    const $table = $('.nextlevel');

    const matchList : MatchDetail[] = [];
    
    $table.find('tbody tr').each((index, el) => {
        const matchHref = el.attributes.find(attr => attr.name === 'data-href');
        if (!matchHref) {
            return;
        }

        const $row = cheerio.load(el);
        const textAppIndex = $row('td:first-child').text().trim();
        const textDate = $row('td:nth-child(2)').text().trim();
        const homeTeam = $row('td:nth-child(4)').text().trim();
        const awayTeam = $row('td:nth-child(6)').text().trim();
        const goals = $row('td:nth-child(9)').text().trim();
        const assists = $row('td:nth-child(10)').text().trim();

        const matchslug = textDate.split("-").reverse().join("-");

        matchList.push({
            href: matchHref.value,
            appIndex: parseInt(textAppIndex),
            matchslug,
            date: matchslug,
            homeTeam,
            awayTeam,
            goals: parseInt(goals),
            assists: parseInt(assists),
        })
    })

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
        storeMatches(storedMatchMap)
    }
});

