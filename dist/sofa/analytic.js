"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nedb_promises_1 = __importDefault(require("nedb-promises"));
const lodash_1 = __importDefault(require("lodash"));
let db = nedb_promises_1.default.create('./storage/messi.db');
db.find({}).sort({ startTimestamp: -1 }).then((events) => {
    const officialEvents = lodash_1.default.filter(events, (event) => !event.tournament.name.includes('Club Friendly'));
    console.log(">>> first match", lodash_1.default.minBy(events, 'startTimestamp'));
    console.log(">>> last match", lodash_1.default.maxBy(events, 'startTimestamp'));
    console.log({ officialEvents: officialEvents.length });
    const incidents = incidentsAllTime(officialEvents);
    console.log(" >>> incidents", incidents);
    const incidentsYears = incidentsByYears(officialEvents);
    console.log(" >>> incidentsYears", incidentsYears);
});
function mergeIncidentFn(sumAll, event) {
    const step = lodash_1.default.mergeWith(sumAll, event.incidents, (objValue, srcValue) => {
        return lodash_1.default.sum([objValue, srcValue]);
    });
    return step;
}
function incidentsByYears(events) {
    return (0, lodash_1.default)(events).groupBy((event) => {
        return new Date(event.startTimestamp * 1000).getUTCFullYear() + "";
    }).mapValues((eventsByYear) => {
        return lodash_1.default.reduce(eventsByYear, mergeIncidentFn, {});
    }).value();
}
function incidentsAllTime(events) {
    return lodash_1.default.reduce(events, mergeIncidentFn, {});
}
//# sourceMappingURL=analytic.js.map