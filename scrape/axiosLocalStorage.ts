import {  buildStorage } from 'axios-cache-interceptor';
import fs from "fs";

export const storageDist = 'axios-cache';

export const axiosLocalStorage = buildStorage({
    async find(key) {
        // console.log("find key", key);
        const filePath = storageDist + "/"  + key;
        if(!fs.existsSync(filePath)) {
            // console.log("key not exists", key);
            return null;
        }

        const content: string = fs.readFileSync(filePath, { encoding: "utf-8"});
        return JSON.parse(content); 
    },
  
    // We use canStale function here because we shouldn't let
    // redis remove automatically the key if it can enter the
    // stale state.
    async set(key, value) { 
        // console.log("set key", key);
        fs.writeFileSync(storageDist + "/"  + key, JSON.stringify(value));
    },
    async remove(key) {
        console.log("remove key", key);
        fs.unlinkSync(storageDist + "/"  + key)
    }
});