"use strict";
// combine
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateSlug = void 0;
const scrape_1 = require("./scrape");
function dateSlug(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1 + "";
    const day = date.getUTCDate() + "";
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}
exports.dateSlug = dateSlug;
const allEvents = (0, scrape_1.readJsonFromFile)(scrape_1.eventsDist);
allEvents.events.forEach(event => {
    const matchDate = new Date(event.startTimestamp * 1000);
    event.matchslug = dateSlug(matchDate);
});
const eventIncidentsMap = (0, scrape_1.readJsonFromFile)(scrape_1.incidentDist);
allEvents.eventIncidentsMap = eventIncidentsMap;
(0, scrape_1.writeJson)(allEvents, scrape_1.combinedDist);
//# sourceMappingURL=combine.js.map