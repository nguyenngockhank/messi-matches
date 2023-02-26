import _ from 'lodash';
import * as cheerio from 'cheerio';
import { storeMatches, fetchMatchDetail, getStoredMatchMap, } from "./common";
import { EnrichedMatchDetail } from "./types";
import { extractMatchExtraFields } from './extract-match-detail-helpers';


async function execute() {
    const storedMatchMap: Record<string, EnrichedMatchDetail> = getStoredMatchMap();

    for(const slug in storedMatchMap) {
        const match = storedMatchMap[slug];

        const shouldFetch = !match.location && !match.referee && !match.visitors;

        if (!shouldFetch) {
            console.log("> skip fetch", slug)
            continue;
        }
        
        const htmlContent = await fetchMatchDetail(match.href);
        const $ = cheerio.load(htmlContent);
        
        const extraFields = extractMatchExtraFields($);
        console.log("> extraFields", slug, extraFields)
        Object.assign(match, extraFields);
    }

    storeMatches(storedMatchMap);
    return storedMatchMap;
}

execute()