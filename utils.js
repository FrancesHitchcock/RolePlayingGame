function getDiceHtmlArray(numberOfDice, diceIdRoot){
    let idNum = 1
    return new Array(numberOfDice).fill(``).map(() => `<div class="dice" id="${diceIdRoot}${idNum++}"></div>`)
}

function getEachDiceRoll(diceArray, i, diceValue, diceIdRoot){
    const dice = document.getElementById(`${diceIdRoot}${i}`)
    for(let j = 0; j < 5; j++){
        setTimeout(() => { 
            const tempDiceValueIndex = Math.floor(Math.random() * diceArray.length)
            const tempDiceValue = diceArray[tempDiceValueIndex]
            diceArray.splice(tempDiceValueIndex, 1)
            dice.textContent = tempDiceValue
        }, 100 * j)
    }
    setTimeout(() => {
        dice.textContent = diceValue
    }, 600)
}

function getDiceSetRoll(numberOfDice, diceIdRoot){
    const diceTotalArray = []
    let iterator = 0
    for(let i = 1; i <= numberOfDice; i++){
        iterator++  
        const diceArray = [1, 2, 3, 4, 5, 6,]

        const diceValueIndex = Math.floor(Math.random() * diceArray.length)
        const diceValue = diceArray[diceValueIndex]
        diceArray.splice(diceValueIndex, 1)

        diceTotalArray.push(diceValue)

        setTimeout(() => {
            getEachDiceRoll(diceArray, i, diceValue, diceIdRoot)
        }, 175 * iterator)
    }

    const diceTotal = diceTotalArray.reduce(function(total, current){
        return total + current
    })
    return diceTotal
}

function getBlankPlayerDice(){
    document.getElementById("player-dice-1").textContent = ``
    document.getElementById("player-dice-2").textContent = ``
    document.getElementById("player-total").textContent = ``
}

function getPercentage(total, part){
    return part / total * 100
}

export { getDiceHtmlArray, getDiceSetRoll, getBlankPlayerDice, getPercentage }