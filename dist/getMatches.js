"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allMatches = exports.barcaMatches = void 0;
const fs_1 = __importDefault(require("fs"));
const types_1 = require("./types");
const lodash_1 = require("lodash");
function fetchMatches(matchPath) {
    const content = fs_1.default.readFileSync(matchPath);
    return JSON.parse(content.toString());
}
function enrichMatch(matches) {
    return matches.map((item, index) => {
        const { date, year } = item;
        const [d, m] = date.split("-");
        const dateDB = `${year}-${m}-${d}`;
        const id = `m${year}${m}${d}`;
        return Object.assign(Object.assign({}, item), { dateDB,
            id, order: index + 1, benched: item.started === 0 });
    });
}
const matchPath = `src/analytics/matches.json`;
const allRawMatches = fetchMatches(matchPath);
const barcaMatches = enrichMatch((0, lodash_1.orderBy)(allRawMatches.filter(m => m.team === types_1.TeamEnum.Barcelona), "id").reverse());
exports.barcaMatches = barcaMatches;
const allMatches = enrichMatch((0, lodash_1.orderBy)(allRawMatches, "id").reverse());
exports.allMatches = allMatches;
//# sourceMappingURL=getMatches.js.map