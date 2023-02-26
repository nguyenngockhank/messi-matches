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
function removeDoubleSpace(text) {
    return text.replace(/\s+/g, ' ').trim();
}
function extractMatchExtraFields(htmlContent) {
    const $ = cheerio.load(htmlContent);
    const location = $('.misc span:first-child').first().text().trim();
    const visitors = $('.misc .visitors').text().trim();
    const referee = $('.misc .referee').text().trim();
    return {
        location: removeDoubleSpace(location),
        visitors: parseInt(visitors) || undefined,
        referee: removeDoubleSpace(referee)
    };
}
async function execute() {
    const storedMatchMap = (0, common_1.getStoredMatchMap)();
    for (const slug in storedMatchMap) {
        const match = storedMatchMap[slug];
        const shouldFetch = !match.location && !match.referee && !match.visitors;
        if (!shouldFetch) {
            console.log("> skip fetch", slug);
            continue;
        }
        const html = await (0, common_1.fetchMatchDetail)(match.href);
        const extraFields = extractMatchExtraFields(html);
        Object.assign(match, extraFields);
    }
    (0, common_1.storeMatches)(storedMatchMap);
    return storedMatchMap;
}
execute();
//# sourceMappingURL=fetch-match-details.js.map