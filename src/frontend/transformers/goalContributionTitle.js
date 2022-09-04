
export function goalContributionTitle(match) {
    const { goals, assists } = match;
    return `${goals}G & ${assists}A`;
}