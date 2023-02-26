import _ from 'lodash';
import * as cheerio from 'cheerio';
import { storeMatches, fetchMatchDetail, EnrichedMatchDetail, getStoredMatchMap } from "./common";

function removeDoubleSpace(text: string) {
    return text.replace(/\s+/g, ' ').trim()
}


function extractMatchExtraFields(htmlContent: string)  {
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
    const storedMatchMap: Record<string, EnrichedMatchDetail> = getStoredMatchMap();

    for(const slug in storedMatchMap) {
        const match = storedMatchMap[slug];

        const shouldFetch = !match.location && !match.referee && !match.visitors;

        if (!shouldFetch) {
            console.log("> skip fetch", slug)
            continue;
        }

        const html = await fetchMatchDetail(match.href);
        const extraFields = extractMatchExtraFields(html);
        console.log("> extraFields", slug, extraFields)
        Object.assign(match, extraFields);
    }

    storeMatches(storedMatchMap);
    return storedMatchMap;
}

execute()