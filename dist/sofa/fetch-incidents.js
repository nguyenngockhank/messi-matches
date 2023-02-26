"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrape_1 = require("./scrape");
async function scrapeEventIncidents() {
    const allEvents = (0, scrape_1.readJsonFromFile)(scrape_1.eventsDist);
    const allIncidents = {};
    for (const event of allEvents.events) {
        try {
            const incident = await (0, scrape_1.fetchEventIncidents)(event.id);
            allIncidents[event.id] = incident;
        }
        catch (err) {
            console.log("error when fetching", event.id);
        }
    }
    return allIncidents;
}
scrapeEventIncidents().then((allIncidents) => {
    (0, scrape_1.writeJson)(allIncidents, scrape_1.incidentDist);
});
//# sourceMappingURL=fetch-incidents.js.map