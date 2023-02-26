"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosLocalStorage = exports.storageDist = void 0;
const axios_cache_interceptor_1 = require("axios-cache-interceptor");
const fs_1 = __importDefault(require("fs"));
exports.storageDist = 'axios-cache';
exports.axiosLocalStorage = (0, axios_cache_interceptor_1.buildStorage)({
    async find(key) {
        console.log("find key", key);
        const filePath = exports.storageDist + "/" + key;
        if (!fs_1.default.existsSync(filePath)) {
            // console.log("key not exists", key);
            return null;
        }
        const content = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
        return JSON.parse(content);
    },
    // We use canStale function here because we shouldn't let
    // redis remove automatically the key if it can enter the
    // stale state.
    async set(key, value) {
        // console.log("set key", key);
        fs_1.default.writeFileSync(exports.storageDist + "/" + key, JSON.stringify(value));
    },
    async remove(key) {
        console.log("remove key", key);
        fs_1.default.unlinkSync(exports.storageDist + "/" + key);
    }
});
//# sourceMappingURL=axiosLocalStorage.js.map