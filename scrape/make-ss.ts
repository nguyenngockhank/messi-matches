import fs from "fs"
import showdown from "showdown"
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

function getSeasonMdContent(season: string, matches: EnrichedMatch[]) : string {
    const title = `# S${season}\n`;
    const contents = matches.map(m => matchToMdContent(m)) ;
    return title + contents.join("\n\n")
}

const converter = new showdown.Converter();
type SeasonHtmlOptions = string | { season: string; matches: EnrichedMatch[] };
function getSeasonHtmlContent(options: SeasonHtmlOptions) : string {
    const mdContent = typeof options === "string" 
        ? options 
        : getSeasonMdContent(options.season, options.matches);
    return converter.makeHtml(mdContent);
}


const matchPath = `src/analytics/matches.json`;
const allMatches =  fetchMatches(matchPath);

const barcaMatches = enrichMatch(orderBy(allMatches.filter(m => m.team === TeamEnum.Barcelona), "id").reverse())
const seasonMatchGroups = groupBy(barcaMatches, "season");

map(seasonMatchGroups, (matches, season) => {
    const mdFile = `docs/S${season}.md`;
    fs.writeFileSync(mdFile, getSeasonMdContent(season, matches))

    const htmlFile = `frontend/s${season}.html`
    fs.writeFileSync(htmlFile, getSeasonHtmlContent({ season, matches }))
})

