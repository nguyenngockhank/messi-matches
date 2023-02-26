 
// const getlisttourament = _.uniqBy(_.map(events.events, "tournament"), (t) => t.slug);

import { PlayerEvents } from "./types";

export function dateSlug(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1 + "";
    const day = date.getUTCDate() + "";

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function getMatchIndex(data, eventIncidentsMap, index: number ) {
    const match = data.events[index]
    const matchDate = new Date(match.startTimestamp * 1000)
    return {
        match: match,
        dateSlug: dateSlug(matchDate),
        incident: data.incidentsMap[match.id],
        onBench: !!data.onBenchMap[match.id],
        playedForTeamMap: data.playedForTeamMap[match.id],
        matchIncidents: eventIncidentsMap[match.id],
    } 
}