export function isDraw(match) {
    const { scoreteam, scoreopponent, penscore } = match;
    return scoreteam === scoreopponent && !penscore;
}