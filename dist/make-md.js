"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const types_1 = require("./types");
const lodash_1 = require("lodash");
const match_md_transfomers_1 = require("./match-md-transfomers");
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
function writeMatches(destFile, matches) {
    const contents = matches.map(m => (0, match_md_transfomers_1.matchToMdContent)(m));
    fs_1.default.writeFileSync(destFile, contents.join("\n\n"));
}
const matchPath = `src/analytics/matches.json`;
const allMatches = fetchMatches(matchPath);
const barcaMatches = enrichMatch((0, lodash_1.orderBy)(allMatches.filter(m => m.team === types_1.TeamEnum.Barcelona), "id").reverse());
const seasonMatchGroups = (0, lodash_1.groupBy)(barcaMatches, "season");
(0, lodash_1.map)(seasonMatchGroups, (matches, season) => {
    const name = `S${season}.md`;
    writeMatches(`docs/${name}`, matches);
});
// const matches2019 = barcaMatches.filter(m => m.season === '2018-2019')
// 
//# sourceMappingURL=make-md.js.map