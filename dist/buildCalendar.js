"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ics_1 = require("ics");
const getMatches_1 = require("./getMatches");
const match_md_transfomers_1 = require("./match-md-transfomers");
const events = getMatches_1.allMatches.map((match) => {
    const [year, month, date] = match.dateDB.split("-");
    return {
        start: [parseInt(year), parseInt(month), parseInt(date), 0, 0],
        duration: { minutes: match.minsPlayed },
        title: (0, match_md_transfomers_1.matchTitle)(match),
        status: 'CONFIRMED',
        description: `${match.competition}\n${(0, match_md_transfomers_1.roundTitle)(match)}`,
        categories: [match.competition, match.team]
    };
});
const result = (0, ics_1.createEvents)(events);
fs_1.default.writeFileSync(`docs/MessiMatches.ics`, result.value || "");
//# sourceMappingURL=buildCalendar.js.map