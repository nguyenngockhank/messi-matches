"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function fetchEvents() {
    const url = `https://www.messivsronaldo.app/page-data/match-histories/messi-match-history/page-data.json`;
    const response = await axios_1.default.get(url);
    return response.data;
}
function transformResult(apiResult) {
    const matches = lodash_1.default.get(apiResult, "result.data.allSheetMessiMatchHistory.edges").map(edge => edge.node);
    console.log("> Found match", matches.length);
    const dateMatchesMap = lodash_1.default.groupBy(matches, "date");
    console.log("> Found match dates", Object.keys(dateMatchesMap).length);
    return lodash_1.default.mapValues(dateMatchesMap, (dateMatches) => {
        return lodash_1.default.map(dateMatches, (match) => {
            // trip date value
            const transformedMatch = lodash_1.default.omitBy(lodash_1.default.omit(match, "date"), v => v === null);
            // to Number
            return lodash_1.default.mapValues(transformedMatch, (attr) => {
                const numVal = lodash_1.default.toNumber(attr);
                return lodash_1.default.isNaN(numVal) ? attr : numVal;
            });
        });
    });
}
function storeAsJsFile(data, path) {
    fs_1.default.writeFileSync(path, `var dateMatchesMap = ${JSON.stringify(data)}`);
}
fetchEvents().then((apiResult) => {
    const data = transformResult(apiResult);
    console.log(__dirname)
    const storedPath = 'frontend/js/matches.js';
    storeAsJsFile(data, storedPath);
});
//# sourceMappingURL=fetch.js.map