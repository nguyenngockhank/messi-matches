import fs from "fs";



export function readJsonFromFile<T>(path: string): T {
    const content: string = fs.readFileSync(path, { encoding: 'utf8' });
    return JSON.parse(content);
}

export function writeJson(data: any, path: string) {
    fs.writeFileSync(path, JSON.stringify(data));
}
