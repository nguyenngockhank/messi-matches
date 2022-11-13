import fs from "fs"
import { EnrichedMatch, Match, TeamEnum } from "./types";
import { orderBy } from "lodash";

function fetchMatches(matchPath: string) : Match[] {
    const content = fs.readFileSync(matchPath)
    return JSON.parse(content.toString())
}

function enrichMatch(matches: Match[]) : EnrichedMatch[] {
    return matches.map((item, index) => {
        const { date, year } = item;
        const [d, m] = date.split("-");
        const dateDB = `${year}-${m}-${d}`;
        const id = `m${year}${m}${d}`;
        return { 
            ...item, 
            dateDB, 
            id, 
            order: index+1,
            benched: item.started === 0,
        }
    })
}


const matchPath = `src/analytics/matches.json`;
const allMatches =  fetchMatches(matchPath);
const barcaMatches = enrichMatch(orderBy(allMatches.filter(m => m.team === TeamEnum.Barcelona), "id").reverse())

export { barcaMatches }



