"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const common_1 = require("./common");
function extractMatchesOnPage(content) {
    const $ = cheerio.load(content);
    const $table = $('.nextlevel');
    const matchList = [];
    $table.find('tbody tr').each((index, el) => {
        const matchHref = el.attributes.find(attr => attr.name === 'data-href');
        if (!matchHref) {
            return;
        }
        const $row = cheerio.load(el);
        const textAppIndex = $row('td:first-child').text().trim();
        const textDate = $row('td:nth-child(2)').text().trim();
        const homeTeam = $row('td:nth-child(4)').text().trim();
        const awayTeam = $row('td:nth-child(6)').text().trim();
        const goals = $row('td:nth-child(9)').text().trim();
        const assists = $row('td:nth-child(10)').text().trim();
        const matchslug = textDate.split("-").reverse().join("-");
        matchList.push({
            href: matchHref.value,
            appIndex: parseInt(textAppIndex),
            matchslug,
            date: matchslug,
            homeTeam,
            awayTeam,
            goals: parseInt(goals),
            assists: parseInt(assists),
        });
    });
    return matchList;
}
(0, common_1.fetchAllMatches)().then(content => {
    const storedMatchMap = (0, common_1.getStoredMatchMap)();
    const pageMatches = extractMatchesOnPage(content);
    // enrich old s
    let hasChanged = false;
    pageMatches.forEach(match => {
        if (!storedMatchMap[match.matchslug]) {
            hasChanged = true;
            return storedMatchMap[match.matchslug] = match;
        }
    });
    if (hasChanged) {
        (0, common_1.storeMatches)(storedMatchMap);
    }
});
//# sourceMappingURL=fetch-matches.js.map