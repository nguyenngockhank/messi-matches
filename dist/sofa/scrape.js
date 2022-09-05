"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nedb_promises_1 = __importDefault(require("nedb-promises"));
const axios_1 = __importDefault(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
const processWithPage_1 = require("./processWithPage");
async function execute() {
    let datastore = nedb_promises_1.default.create('./storage/messi.db');
    await (0, processWithPage_1.processWithPage)({
        fetchPageData(index) {
            console.log("> fetch page index", index);
            return fetchPlayerEvents(12994, index);
        },
        async hasNextPage(pageData) {
            return lodash_1.default.get(pageData, "hasNextPage") || false;
        },
        async processPageData(pageData) {
            const events = lodash_1.default.get(pageData, "events") || [];
            const docs = events.map(e => {
                const key = e.id.toString();
                const incidents = lodash_1.default.get(pageData, `incidentsMap.${key}`);
                const statistics = lodash_1.default.get(pageData, `statisticsMap.${key}.rating`);
                const playedForTeam = lodash_1.default.get(pageData, `playedForTeamMap.${key}`);
                const onBench = lodash_1.default.get(pageData, `onBenchMap.${key}`);
                return Object.assign(Object.assign({}, e), { _id: key, incidents, statistics, playedForTeam, onBench });
            });
            await datastore.insert(docs);
        }
    });
}
async function fetchPlayerEvents(playerId, index) {
    // 12994
    const response = await axios_1.default.get(`https://api.sofascore.com/api/v1/player/${playerId}/events/last/${index}`);
    return response.data;
}
execute();
//# sourceMappingURL=scrape.js.map