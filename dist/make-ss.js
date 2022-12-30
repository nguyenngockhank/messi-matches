"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const showdown_1 = __importDefault(require("showdown"));
const lodash_1 = require("lodash");
const match_md_transfomers_1 = require("./match-md-transfomers");
const getMatches_1 = require("./getMatches");
function getSeasonMdContent(season, matches) {
    const title = `# S${season}\n`;
    const contents = matches.map(m => (0, match_md_transfomers_1.matchToMdContent)(m));
    return title + contents.join("\n\n");
}
const converter = new showdown_1.default.Converter();
function getSeasonHtmlContent(options) {
    const mdContent = typeof options === "string"
        ? options
        : getSeasonMdContent(options.season, options.matches);
    return converter.makeHtml(mdContent);
}
const seasonMatchGroups = (0, lodash_1.groupBy)(getMatches_1.barcaMatches, "season");
(0, lodash_1.map)(seasonMatchGroups, (matches, season) => {
    const mdFile = `docs/S${season}.md`;
    fs_1.default.writeFileSync(mdFile, getSeasonMdContent(season, matches));
    const htmlFile = `frontend/s${season}.html`;
    fs_1.default.writeFileSync(htmlFile, getSeasonHtmlContent({ season, matches }));
});
//# sourceMappingURL=make-ss.js.map