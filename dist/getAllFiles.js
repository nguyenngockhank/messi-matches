"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getAllFiles = function (dirPath, arrayOfFiles) {
    const files = fs_1.default.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs_1.default.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = (0, exports.getAllFiles)(dirPath + "/" + file, arrayOfFiles);
        }
        else {
            arrayOfFiles.push(path_1.default.join(__dirname, dirPath, "/", file));
        }
    });
    return arrayOfFiles;
};
exports.getAllFiles = getAllFiles;
//# sourceMappingURL=getAllFiles.js.map