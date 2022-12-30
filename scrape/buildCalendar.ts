import fs from "fs"
import { createEvents, EventAttributes } from "ics";
import { allMatches } from "./getMatches";
import { matchTitle, roundTitle } from "./match-md-transfomers";


const events = allMatches.map((match): EventAttributes => {
    const [year, month, date] = match.dateDB.split("-");
    return {
        start: [parseInt(year), parseInt(month), parseInt(date), 0, 0],
        duration: { minutes: match.minsPlayed },
        title: matchTitle(match),
        status: 'CONFIRMED',
        description: `${match.competition}\n${roundTitle(match)}`,
        categories: [match.competition, match.team]
    }
})

const result = createEvents(events)
fs.writeFileSync(`docs/MessiMatches.ics`, result.value || "")

