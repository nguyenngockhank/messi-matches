import fs from "fs"
import { EnrichedMatch, Match, TeamEnum } from "./types";
import { orderBy,  uniq, repeat, groupBy, map } from "lodash";
import { matchToMdContent } from "./match-md-transfomers";

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

function writeMatches(destFile: string, matches: EnrichedMatch[])  {
    const contents = matches.map(m => matchToMdContent(m)) ;
    fs.writeFileSync(destFile, contents.join("\n\n"))
}



const matchPath = `src/analytics/matches.json`;
const allMatches =  fetchMatches(matchPath);


const barcaMatches = enrichMatch(orderBy(allMatches.filter(m => m.team === TeamEnum.Barcelona), "id").reverse())
const seasonMatchGroups = groupBy(barcaMatches, "season");

map(seasonMatchGroups, (matches, season) => {
    const name = `S${season}.md`
    writeMatches(`docs/${name}`, matches);
})

// const matches2019 = barcaMatches.filter(m => m.season === '2018-2019')
// 
