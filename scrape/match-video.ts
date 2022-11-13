import { leftJoin, tidy } from "@tidyjs/tidy";
import { last, replace } from "lodash";
import { getAllFiles } from "./getAllFiles"
import { barcaMatches } from "./getMatches";
import { matchTitle } from "./match-md-transfomers"

const videoPath = `/Volumes/KHANKA DISK/Messi`;

const files = getAllFiles(videoPath, []);
const videoFiles = files.filter(f => {
    const name = last(f.split("/")) 
    const extension = last(name.split("."))
    return ["mp4", "wmv", "webm", "mkv"].includes(extension?.toLowerCase())
}).map(f => {
    const name = last(f.split("/")) 
    const niceName = replace(name, "._", "") 
    const [index] = niceName.split(".")
    return {
        index: parseInt(index),
        file: niceName,
        path: f,
    }
})

const joinData = tidy(barcaMatches, leftJoin(videoFiles, { by: { index: "order" } }))
const missingVideo = joinData.filter(match => {
    return !match.path;
})

console.log(missingVideo.map(m => matchTitle(m) + " " + m.dateDB));

