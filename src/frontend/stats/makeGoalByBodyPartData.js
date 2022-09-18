const configs = {
    head: { label: 'Header', color: 'rgb(255, 99, 132)', },
    left:  { label: 'Left foot', color: 'rgb(54, 162, 235)', },
    right: { label: 'Right foot', color: 'rgb(255, 205, 86)',  },
    other:  { label: 'Other', color:  'rgb(75, 192, 192)',  },
}

export function makeGoalByBodyPartData(matches) {
    const summary = matches.reduce((result, match) => {
        result.head += match.head || 0;
        result.left += match.left || 0;
        result.right += match.right || 0;
        result.other += match.other || 0;
        return result;
    }, { 
        head: 0,
        left: 0,
        right: 0,
        other: 0,
    })

    return [
       { ...configs.head, counter: summary.head },
       { ...configs.left, counter: summary.left },
       { ...configs.right, counter: summary.right },
       { ...configs.other, counter: summary.other },
    ]
}