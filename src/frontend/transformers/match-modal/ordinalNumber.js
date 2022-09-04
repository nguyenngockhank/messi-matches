const quotientOrdinalNumberPostfixMap = {
    '1': 'st',
    '2': 'nd',
    '3': 'rd',
}

export function ordinalNumber(number) {
    // https://www.britannica.com/dictionary/eb/qa/How-To-Write-Ordinal-Numbers
    if (number >= 11 && number <= 19) {
        return number + 'th';
    }

    const postfix =  quotientOrdinalNumberPostfixMap[number % 10] || 'th'
    return number + postfix;
}
