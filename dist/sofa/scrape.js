"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEventIncidents = exports.fetchPlayerEvents = exports.sleep = exports.combinedDist = exports.incidentDist = exports.eventsDist = void 0;
const axios_1 = __importDefault(require("axios"));
exports.eventsDist = 'dist/data/sofa-messi-events.json';
exports.incidentDist = 'dist/data/sofa-messi-incidents.json';
exports.combinedDist = 'dist/data/sofa-messi.json';
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
async function fetchPlayerEvents(playerId, index) {
    await sleep(200);
    console.log("fetched ", playerId, index);
    // 12994
    const response = await axios_1.default.get(`https://api.sofascore.com/api/v1/player/${playerId}/events/last/${index}`);
    return response.data;
}
exports.fetchPlayerEvents = fetchPlayerEvents;
async function fetchEventIncidents(eventId) {
    await sleep(100);
    console.log("fetched event Incidents", eventId);
    // 12994
    const response = await axios_1.default.get(`https://api.sofascore.com/api/v1/event/${eventId}/incidents`);
    return response.data;
}
exports.fetchEventIncidents = fetchEventIncidents;
//# sourceMappingURL=scrape.js.map