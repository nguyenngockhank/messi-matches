import { isHome } from "./isHome";

export function isWin(match) {
    const { scoreteam, scoreopponent, penscore } = match;
    if (scoreteam > scoreopponent) {
        return true;
    }

    if (penscore) {
        const [first, secord] = penscore.split('-');
        return isHome(match) ? first > secord : secord > first;
    }

    return false;
}