export function isFinal(match) {
    const { round } = match;
    return round === "F";
}