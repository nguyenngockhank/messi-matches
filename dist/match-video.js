"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tidy_1 = require("@tidyjs/tidy");
const lodash_1 = require("lodash");
const getAllFiles_1 = require("./getAllFiles");
const getMatches_1 = require("./getMatches");
const match_md_transfomers_1 = require("./match-md-transfomers");
const videoPath = `/Volumes/KHANKA DISK/Messi`;
const files = (0, getAllFiles_1.getAllFiles)(videoPath, []);
const videoFiles = files.filter(f => {
    const name = (0, lodash_1.last)(f.split("/"));
    const extension = (0, lodash_1.last)(name.split("."));
    return ["mp4", "wmv", "webm", "mkv"].includes(extension === null || extension === void 0 ? void 0 : extension.toLowerCase());
}).map(f => {
    const name = (0, lodash_1.last)(f.split("/"));
    const niceName = (0, lodash_1.replace)(name, "._", "");
    const [index] = niceName.split(".");
    return {
        index: parseInt(index),
        file: niceName,
        path: f,
    };
});
const joinData = (0, tidy_1.tidy)(getMatches_1.barcaMatches, (0, tidy_1.leftJoin)(videoFiles, { by: { index: "order" } }));
const missingVideo = joinData.filter(match => {
    return !match.path;
});
console.log(missingVideo.map(m => (0, match_md_transfomers_1.matchTitle)(m) + " " + m.dateDB));
//# sourceMappingURL=match-video.js.map