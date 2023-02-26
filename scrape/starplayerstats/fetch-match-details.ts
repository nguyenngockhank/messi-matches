import * as cheerio from 'cheerio';
import { readJsonFromFile, writeJson } from "../fileHelpers";
import { MatchDetail, starplayerstatsDist, fetchMatchDetail, EnrichedMatchDetail } from "./common";

function removeDoubleSpace(text: string) {
    return text.replace(/\s+/g, ' ').trim()
}


function getMatchExtraFields(htmlContent: string)  {
    const $ = cheerio.load(htmlContent);
    const location = $('.misc span:first-child').first().text().trim()
    const visitors = $('.misc .visitors').text().trim()
    const referee = $('.misc .referee').text().trim()

    return {
        location: removeDoubleSpace(location),
        visitors: parseInt(visitors) || undefined,
        referee: removeDoubleSpace(referee)
    }
}



async function execute() {
    const allMatches: EnrichedMatchDetail[] = readJsonFromFile(starplayerstatsDist);
    let index = 0;
    for(const match of allMatches) {
        const html = await fetchMatchDetail(match.href);
        const extraFields = getMatchExtraFields(html);
        console.log(++index)
        Object.assign(match, extraFields);
    }

    writeJson(allMatches, starplayerstatsDist);

    return allMatches;
}

execute()