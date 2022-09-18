const configs = {
    freeKicks: { label: 'Free Kicks', color: 'rgb(255, 99, 132)', },
    pens:  { label: 'Penaties', color: 'rgb(54, 162, 235)', },
    outsideBox: { label: 'Outside the box (open play)', color: 'rgb(255, 205, 86)',  },
    insideBox:  { label: 'Inside the box', color:  'rgb(75, 192, 192)',  },
}

export function makeGoalByPositionData(matches) {
    const summary = matches.reduce((result, match) => {
        result.freeKicks += match.freeKicks || 0;
        result.pens += match.pens || 0;
        result.outsideBox += match.outsideBox || 0;
        result.insideBox += match.insideBox || 0;
        return result;
    }, { 
        freeKicks: 0,
        pens: 0,
        outsideBox: 0,
        insideBox: 0,
    })

    return [
       { ...configs.freeKicks, counter: summary.freeKicks },
       { ...configs.pens, counter: summary.pens },
       { ...configs.outsideBox, counter: summary.outsideBox },
       { ...configs.insideBox, counter: summary.insideBox },
    ]
}