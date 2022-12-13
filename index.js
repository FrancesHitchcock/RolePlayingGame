import Santa from "./Santa.js"
import Character from "./Character.js"
import {santaData, characterData} from "./data.js"
import {getCharacterDiceHtml, getDiceTotal, getPercentage, getBlankDiceHtml, getNewDiceArray} from "./utils.js"

const difficultyLevel = 10

const hazardsArray = ["shootingStar", "bottleOfBubbly", "whiteWitch", "poisonMushroom", "grinch"]
const helpersArray = ["bingCrosby", "mincePie", "carrot", "snowman"]

let character = {}
let playButtonOn = true

document.getElementById('play-btn').addEventListener('click', play)

function getNewCharacter(arr){
    const randomIndex = Math.floor(Math.random() * arr.length)
    const arrayItem = arr[randomIndex]
    return new Character(characterData[arrayItem])
}

function play(){
    if(playButtonOn){
        playButtonOn = false
        const playerDiceArray = getNewDiceArray(2)
        const playerDiceTotal = getDiceTotal(playerDiceArray)

        const hazardCharacter = playerDiceTotal > difficultyLevel ? false : true
        character = hazardCharacter ? getNewCharacter(hazardsArray) : getNewCharacter(helpersArray)

        renderPlayerDice(getCharacterDiceHtml(playerDiceArray))

        santa.distance -= 100

        if(santa.distance <= 0){
            santa.distance = 0
        }

        santa.percentDistance = getPercentage(santa.fullDistance, santa.distance)
        // character.diceHtml = getCharacterDiceHtml(character.diceArray)
        renderSanta()

        setTimeout(() => {
            renderTotalScoreValue(playerDiceTotal) 
            renderCharacter() 
        }, 2000)
        
        // renderBoard()
        // setTimeout(() => {
            // santa.distance -= 100

            // if(santa.distance <= 0){
            //     santa.distance = 0
            // }

            // santa.percentDistance = getPercentage(santa.fullDistance, santa.distance)
            // character.diceHtml = getCharacterDiceHtml(character.diceArray)
            // renderBoard()
        // }, 2000)
        setTimeout(() => {
            character.diceHtml = getCharacterDiceHtml(character.diceArray)
            character.diceTotal = getDiceTotal(character.diceArray)
            renderCharacter()

            hazardCharacter ? santa.energy -= character.diceTotal : santa.energy += character.diceTotal

            if(santa.energy >= 60){
                santa.energy = 60
            }
            else if(santa.energy <= 0){
                santa.energy = 0
            }

            santa.percentEnergy = getPercentage(santa.fullEnergy, santa.energy)
            // renderBoard()
            renderSanta()
            renderTotalScoreValue("")
            renderPlayerDice(getBlankDiceHtml(2))

            

            playButtonOn = true
        }, 3000)

        setTimeout(() => {
            if(santa.energy === 0 || santa.distance === 0){
                endGame()
            }
        }, 4000)
    }
}

function renderCharacter(){
    // document.getElementById("santa").innerHTML = santa.getTravellerHtml()
    document.getElementById("ui-panel").innerHTML = character.getCharacterHtml()
}

function renderSanta(){
    document.getElementById("santa").innerHTML = santa.getSantaHtml()
}

// function renderInstructions(){
//     document.getElementById("santa").innerHTML = santa.getTravellerHtml()
// }

function renderPlayerDice(playerDice){
    document.getElementById("player-dice-inner").innerHTML = `<div class="dice-container">${playerDice}</div>`
}

function renderTotalScoreValue(totalScore){
    document.getElementById("total-score-value").innerHTML = `<span>${totalScore}</span>`
}

function endGame() {

    const endMessage = santa.energy === 0 ?
        `Santa has run out of energy, and presents will be late this year!` :
        `Santa has completed his journey and delivered his presents!` 
        

    const endEmoji = santa.energy === 0 ?
        `🎄` :
        `🎁`  
        
    document.body.innerHTML = `
        <div class="endgame-wrapper">
            <h2>Game Over</h2>
            <p>${endMessage}</p>
            <p>${endEmoji}</p>
            <button type="button" id="play-again-button">Play again</button>
        </div>
    `
    document.getElementById("play-again-button").addEventListener('click', () => {
        location.reload()
    })
}

const santa = new Santa(santaData.santa)


// renderInstructions()
renderSanta()
renderPlayerDice(getBlankDiceHtml(2))




