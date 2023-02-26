"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrape_1 = require("./scrape");
async function scrapePlayerEvents(playerId) {
    const allEvents = {
        events: [],
        hasNextPage: false,
        playedForTeamMap: {},
        statisticsMap: {},
        incidentsMap: {},
        onBenchMap: {},
    };
    for (let index = 0, hasNextPage = true; hasNextPage; index++) {
        const eventsPage = await (0, scrape_1.fetchPlayerEvents)(playerId, index);
        hasNextPage = eventsPage.hasNextPage;
        allEvents.events.push(...eventsPage.events); // faster than push
        Object.assign(allEvents.playedForTeamMap, eventsPage.playedForTeamMap);
        Object.assign(allEvents.statisticsMap, eventsPage.statisticsMap);
        Object.assign(allEvents.incidentsMap, eventsPage.incidentsMap);
        Object.assign(allEvents.onBenchMap, eventsPage.onBenchMap);
    }
    return allEvents;
}
const playerMessiId = 12994;
scrapePlayerEvents(playerMessiId).then((allEvents) => {
    (0, scrape_1.writeJson)(allEvents, scrape_1.eventsDist);
});
//# sourceMappingURL=fetch-events.js.map