import * as cheerio from 'cheerio';
import { extractRowData, fetchAllGoals, fetchMatchDetail, removeDoubleSpace, storeAssists, storeGoals, traverseRows } from "./common";
import _ from "lodash";
import { Assist, GoalDetail } from './types';
import { extractGoalsDetail } from './extract-match-detail-helpers';


function extractAssistsMatchMap(content: string) : Record<string, Assist[]> {
    const $table = cheerio.load(content)('table');
    const goalList : Assist[] = [];
    
    traverseRows($table, ($row) => {
        const matchHref  = $row('tr').attr("data-href")
        if (!matchHref) {
            return;
        }
       
        const [
            assistOrder, textDate, competition,
            homeTeam, result, awayTeam, 
            time, assistOn, score
        ] = extractRowData($row, 9);
        
        const [,,,matchId] = matchHref.split('/');
        const matchslug = textDate.split("-").reverse().join("-");

        goalList.push({
            href: matchHref,
            matchId,
            order: parseInt(assistOrder),
            result,
            matchslug,
            homeTeam,
            awayTeam,
            time,
            assistOn,
            competition: removeDoubleSpace(competition),
            score,
        })
    });

    return _.groupBy(goalList, "matchslug");
}

async function scrapeAllAssists() : Promise<Record<string, Assist[]>> {
    const goalsContent = await fetchAllGoals();
    const assistsMatchMap = extractAssistsMatchMap(goalsContent);
    
    for(const slug in assistsMatchMap) {
        const firstGoal = assistsMatchMap[slug][0];

        const htmlContent = await fetchMatchDetail(firstGoal.href);
        const $ = cheerio.load(htmlContent);

        const allHasExtra = assistsMatchMap[slug].every(goal => _.hasIn(goal, "from"))

        if  (allHasExtra) {
            continue;
        }

        const extraAttrList = extractGoalsDetail($)
        assistsMatchMap[slug].map(goal => {
            const extraAttrs = extraAttrList.find(item => item.time === goal.time);
            if (extraAttrs) {
                console.log("Found extra attrs", extraAttrs)
                Object.assign(goal, extraAttrs)
            }
        })
    }

    return assistsMatchMap;
}

scrapeAllAssists().then(assists => storeAssists(assists))