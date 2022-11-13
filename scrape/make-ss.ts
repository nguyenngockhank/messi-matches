import fs from "fs"
import showdown from "showdown"
import { EnrichedMatch } from "./types";
import { groupBy, map } from "lodash";
import { matchToMdContent } from "./match-md-transfomers";
import { barcaMatches } from "./getMatches";


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



const seasonMatchGroups = groupBy(barcaMatches, "season");

map(seasonMatchGroups, (matches, season) => {
    const mdFile = `docs/S${season}.md`;
    fs.writeFileSync(mdFile, getSeasonMdContent(season, matches))

    const htmlFile = `frontend/s${season}.html`
    fs.writeFileSync(htmlFile, getSeasonHtmlContent({ season, matches }))
})

