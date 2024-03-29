import * as cheerio from 'cheerio';
import { extractRowData, fetchAllGoals, fetchMatchDetail, removeDoubleSpace, storeGoals, traverseRows } from "./common";
import _ from "lodash";
import { Goal,  } from './types';
import { extractGoalsDetail } from './extract-match-detail-helpers';


function extractGoalsMatchMap(content: string) : Record<string, Goal[]> {
    const $table = cheerio.load(content)('table');
    const goalList : Goal[] = [];
    
    traverseRows($table, ($row) => {
        const matchHref  = $row('tr').attr("data-href")
        if (!matchHref) {
            return;
        }
       
        const [
            goalOrder, textDate, competition,
            homeTeam, result, awayTeam, 
            time, score, what, how, jersey,
        ] = extractRowData($row, 11);
        
        const [,,,matchId] = matchHref.split('/');
        const matchslug = textDate.split("-").reverse().join("-");

        goalList.push({
            href: matchHref,
            matchId,
            what, 
            how, 
            jersey: parseInt(jersey),
            order: parseInt(goalOrder),
            result,
            matchslug,
            homeTeam,
            awayTeam,
            time,
            competition: removeDoubleSpace(competition),
            score,
        })
    });

    return _.groupBy(goalList, "matchslug");
}

async function scrapeAllGoals() : Promise<Record<string, Goal[]>> {
    const goalsContent = await fetchAllGoals();
    const goalsMatchMap = extractGoalsMatchMap(goalsContent);
    
    for(const slug in goalsMatchMap) {
        const firstGoal = goalsMatchMap[slug][0];

        const htmlContent = await fetchMatchDetail(firstGoal.href);
        const $ = cheerio.load(htmlContent);

        const allHasExtra = goalsMatchMap[slug].every(goal => _.hasIn(goal, "from"))

        if  (allHasExtra) {
            continue;
        }

        const extraAttrList = extractGoalsDetail($)
        goalsMatchMap[slug].map(goal => {
            const extraAttrs = extraAttrList.find(item => item.time === goal.time);
            if (extraAttrs) {
                console.log("Found extra attrs", extraAttrs)
                Object.assign(goal, extraAttrs)
            }
        })
    }

    return goalsMatchMap;
}
