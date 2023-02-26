import { eventsDist, fetchPlayerEvents } from "./scrape";
import { writeJson } from "../fileHelpers";
import { PlayerEvents } from "./types";

async function scrapePlayerEvents(playerId: number) {
    const allEvents : PlayerEvents = {
        events: [],
        hasNextPage: false,
        playedForTeamMap: {},
        statisticsMap: {},
        incidentsMap:{},
        onBenchMap: {},
    }
    
    for(let index = 0, hasNextPage = true; hasNextPage; index++) {
        const eventsPage = await fetchPlayerEvents(playerId, index);
        hasNextPage = eventsPage.hasNextPage;

        allEvents.events.push(...eventsPage.events); // faster than push
        Object.assign(allEvents.playedForTeamMap, eventsPage.playedForTeamMap)
        Object.assign(allEvents.statisticsMap, eventsPage.statisticsMap)
        Object.assign(allEvents.incidentsMap, eventsPage.incidentsMap)
        Object.assign(allEvents.onBenchMap, eventsPage.onBenchMap)
    }

    return allEvents;
  
}



const playerMessiId = 12994;
scrapePlayerEvents(playerMessiId).then((allEvents) => {
    writeJson(allEvents, eventsDist)
})