import { gaColorMap } from '../data/static'

const defaultPercent = 0;
function calculatePercent(count, totalGA) {
    return count === 0 ? 
        defaultPercent : 
        Math.floor((count / totalGA) * (100 - delimiter));
}


const delimiter = 1; 
const delimiterColor = 'black';

export function goalContributrionBgColor(match)  {
    const { goals, assists } = match;

    let totalGA = assists  + goals;
    if (totalGA <= 0) {
        return undefined;
    }
    const goalColor = gaColorMap[goals];
    const assistColor = gaColorMap[assists];

    const goalPercent = calculatePercent(goals, totalGA);
    const assistPercent = calculatePercent(assists, totalGA);

    // https://stackoverflow.com/questions/45097591/generate-solid-colors-using-css-linear-gradient-not-smooth-colors
    const colorStack = [];
    colorStack.push(`${goalColor} ${goalPercent}%`)
    colorStack.push(`${delimiterColor} ${delimiter}%`)
    colorStack.push(`${delimiterColor} ${delimiter + goalPercent}%`)
    colorStack.push(`${assistColor} ${delimiter + goalPercent}%`)
    colorStack.push(`${assistColor} ${delimiter + goalPercent + assistPercent}%`)

    const bgColor = `linear-gradient(to right, ${colorStack.join(',')})`;
    return bgColor;
}