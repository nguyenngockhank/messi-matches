"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
const fs_1 = __importDefault(require("fs"));
async function fetchEvents() {
    const url = `https://www.messivsronaldo.app/page-data/match-histories/messi-match-history/page-data.json`;
    const response = await axios_1.default.get(url);
    return response.data;
}
function transformForFrontEnd(apiResult) {
    const matches = lodash_1.default.get(apiResult, "result.data.allSheetMessiMatchHistory.edges").map(edge => edge.node);
    console.log("> Found match", matches.length);
    const dateMatchesMap = lodash_1.default.groupBy(matches, "date");
    console.log("> Found match dates", Object.keys(dateMatchesMap).length);
    return lodash_1.default.mapValues(dateMatchesMap, (dateMatches) => {
        return lodash_1.default.map(dateMatches, (match) => {
            // trip date value
            const transformedMatch = lodash_1.default.omitBy(lodash_1.default.omit(match, "date"), v => v === null);
            // to Number
            const transformedMatch2 = lodash_1.default.mapValues(transformedMatch, (attr) => {
                const numVal = lodash_1.default.toNumber(attr);
                return lodash_1.default.isNaN(numVal) ? attr : numVal;
            });
            return lodash_1.default.mapKeys(transformedMatch2, function (v, k) { return k.toLowerCase(); });
        });
    });
}
function transformForAnalytics(apiResult) {
    const matches = lodash_1.default.get(apiResult, "result.data.allSheetMessiMatchHistory.edges").map(edge => edge.node);
    return matches.map(match => {
        return lodash_1.default.mapValues(match, (attr) => {
            const numVal = lodash_1.default.toNumber(attr);
            return lodash_1.default.isNaN(numVal) ? attr : numVal;
        });
    });
}
fetchEvents().then((apiResult) => {
    const feData = transformForFrontEnd(apiResult);
    const feStoredPath = 'frontend/js/matches.js';
    fs_1.default.writeFileSync(feStoredPath, `var dateMatchesMap = ${JSON.stringify(feData)}`);
    const matchesJson = transformForAnalytics(apiResult);
    const analyticStoredPath = 'src/analytics/matches.json';
    fs_1.default.writeFileSync(analyticStoredPath, JSON.stringify(matchesJson));
});
//# sourceMappingURL=fetch.js.map