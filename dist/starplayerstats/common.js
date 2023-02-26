"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeMatches = exports.getStoredMatchMap = exports.starplayerstatsDist = exports.fetchMatchDetail = exports.fetchAllMatches = void 0;
const axios_1 = __importDefault(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
const axios_cache_interceptor_1 = require("axios-cache-interceptor");
const axiosLocalStorage_1 = require("../axiosLocalStorage");
const fileHelpers_1 = require("../fileHelpers");
(0, axios_cache_interceptor_1.setupCache)(axios_1.default, {
    storage: axiosLocalStorage_1.axiosLocalStorage,
    // debug: console.log,
    cacheTakeover: false,
    interpretHeader: false,
    ttl: Number.MAX_SAFE_INTEGER,
    //  
});
async function fetchAllMatches() {
    const url = `https://messi.starplayerstats.com/en/locations`;
    const response = await axios_1.default.get(url, {
        responseType: 'text',
        cache: {
            ttl: 1000 * 60 * 10 * 24 // 1day. 
        }
    });
    return response.data;
}
exports.fetchAllMatches = fetchAllMatches;
async function fetchMatchDetail(matchHref) {
    // await sleep(50);
    const url = `https://messi.starplayerstats.com${matchHref}`;
    const response = await axios_1.default.get(url, {
        responseType: 'text',
    });
    return response.data;
}
exports.fetchMatchDetail = fetchMatchDetail;
exports.starplayerstatsDist = "dist/data/starplayerstats-messi.json";
function getStoredMatchMap() {
    const result = (0, fileHelpers_1.readJsonFromFile)(exports.starplayerstatsDist, []);
    if (Array.isArray(result)) {
        return lodash_1.default.keyBy(result, "matchslug");
    }
    return result;
}
exports.getStoredMatchMap = getStoredMatchMap;
function storeMatches(matches) {
    return (0, fileHelpers_1.writeJson)(matches, exports.starplayerstatsDist);
}
exports.storeMatches = storeMatches;
//# sourceMappingURL=common.js.map