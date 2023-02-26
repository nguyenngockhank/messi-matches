"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJson = exports.readJsonFromFile = void 0;
const fs_1 = __importDefault(require("fs"));
function readJsonFromFile(path, defaultResponse) {
    if (!fs_1.default.existsSync(path)) {
        return defaultResponse || null;
    }
    const content = fs_1.default.readFileSync(path, { encoding: 'utf8' });
    return JSON.parse(content);
}
exports.readJsonFromFile = readJsonFromFile;
function writeJson(data, path) {
    fs_1.default.writeFileSync(path, JSON.stringify(data));
}
exports.writeJson = writeJson;
//# sourceMappingURL=fileHelpers.js.map