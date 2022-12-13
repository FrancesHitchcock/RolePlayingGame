function getCharacterDiceHtml(diceArray){
    return diceArray.map((num) => `<div class="dice">${num}</div>`).join('')
}

function getBlankDiceHtml(numberOfDice){
    return new Array(numberOfDice).fill(`<div class="dice"></div>`).join('')
}

function getNewDiceArray(numberOfDice){
    return new Array(numberOfDice).fill(0).map(function(){
        return Math.floor(Math.random() * 6) + 1
    })
}

function getDiceTotal(diceArray){
    return diceArray.reduce((total, current) => total + current)
}

function getPercentage(total, part){
    return part / total * 100
}

export {getCharacterDiceHtml, getNewDiceArray, getBlankDiceHtml, getDiceTotal, getPercentage}