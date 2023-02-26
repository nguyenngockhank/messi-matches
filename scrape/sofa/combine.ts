// combine

import { combinedDist, eventsDist, incidentDist } from "./scrape";
import { readJsonFromFile, writeJson } from "../fileHelpers";
import { MatchIncidents, PlayerEvents } from "./types";

type EnrichEvent = Event & {
    matchslug: string,
}

export function dateSlug(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1 + "";
    const day = date.getUTCDate() + "";

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}


const allEvents : PlayerEvents = readJsonFromFile(eventsDist) 
allEvents.events.forEach(event => {
    const matchDate = new Date(event.startTimestamp * 1000);
    (event as unknown as EnrichEvent).matchslug = dateSlug(matchDate);
})
const eventIncidentsMap: Record<string, MatchIncidents>  = readJsonFromFile(incidentDist);

(allEvents as any).eventIncidentsMap = eventIncidentsMap;
writeJson(allEvents, combinedDist)

