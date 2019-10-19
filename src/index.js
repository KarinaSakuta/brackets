module.exports = function check(str, bracketsConfig) {
    const brackets = str.split('');

    let openingBrackets = bracketsConfig.map((bracketsPair) => bracketsPair[0]);
    let closingBrackets = bracketsConfig.map((bracketsPair) => bracketsPair[1]);
    let bothSidesBrackets = openingBrackets.filter((bracket) => closingBrackets.includes(bracket));

    openingBrackets = openingBrackets.filter((bracket) => !bothSidesBrackets.includes(bracket));
    closingBrackets = closingBrackets.filter((bracket) => !bothSidesBrackets.includes(bracket));

    let openingBracketByClosing = {};
    bracketsConfig.forEach(function (bracketsPair) {
        openingBracketByClosing[bracketsPair[1]] = bracketsPair[0];
    });

    let hasErrors = false;
    const bracketsStack = [];

    for(let index = 0; index <= brackets.length - 1; index++) {
        const currentBracket = brackets[index];
        const isBothSidesBracket = bothSidesBrackets.includes(currentBracket);
        const isOpeningBracket = openingBrackets.includes(currentBracket);
        const isClosingBracket = closingBrackets.includes(currentBracket);
        const isMatchingOpeningBracketInStack = bracketsStack[bracketsStack.length - 1] === openingBracketByClosing[currentBracket];

        if (isOpeningBracket || isBothSidesBracket && !isMatchingOpeningBracketInStack) {
            bracketsStack.push(currentBracket);
            continue;
        }

        if (isClosingBracket && isMatchingOpeningBracketInStack || isBothSidesBracket && isMatchingOpeningBracketInStack) {
            bracketsStack.splice(bracketsStack.length - 1);
            continue
        }

        hasErrors = true;
        break;
    }

    return bracketsStack.length === 0 && !hasErrors;
}
