import { eventsDist, fetchEventIncidents, incidentDist } from "./scrape";
import { readJsonFromFile, writeJson } from "../fileHelpers";
import { PlayerEvents } from "./types";

async function scrapeEventIncidents() {
    const allEvents : PlayerEvents = readJsonFromFile(eventsDist) 

    const allIncidents = {}
    for(const event of allEvents.events) {
        try {
            const incident =  await fetchEventIncidents(event.id)
            allIncidents[event.id] = incident;
        } catch (err) {
            console.log("error when fetching", event.id)
        }
    }
    return allIncidents
}

scrapeEventIncidents().then((allIncidents) => {
    writeJson(allIncidents, incidentDist)
})