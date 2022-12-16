import Santa from "./Santa.js"
import Character from "./Character.js"
import {santaData, characterData} from "./data.js"
import {getCharacterDiceHtml, getDiceTotal, getPercentage, getBlankDiceHtml, getNewDiceArray} from "./utils.js"

const difficultyLevel = 10

const timeoutInterval = 1500

const uiPanel = document.getElementById("ui-panel")
const playButton = document.getElementById('play-btn')

const hazardsArray = ["shootingStar", "bottleOfBubbly", "whiteWitch", "poisonMushroom", "grinch"]
const helpersArray = ["bingCrosby", "mincePie", "carrot", "snowman"]

let character = {}
let playButtonOn = true

playButton.addEventListener('click', play)

function getNewCharacter(arr){
    const randomIndex = Math.floor(Math.random() * arr.length)
    const arrayItem = arr[randomIndex]
    return new Character(characterData[arrayItem])
}

function play(){
    if(playButtonOn){
        playButtonOn = false
        playButton.style.opacity = .4 
        const playerDiceArray = getNewDiceArray(2)
        const playerDiceTotal = getDiceTotal(playerDiceArray)

        const hazardCharacter = playerDiceTotal > difficultyLevel ? false : true
        character = hazardCharacter ? getNewCharacter(hazardsArray) : getNewCharacter(helpersArray)

        renderPlayerDice(getCharacterDiceHtml(playerDiceArray))

        santa.distance -= 100

        santa.percentDistance = getPercentage(santa.fullDistance, santa.distance)
        renderSanta()

        if(santa.distance <= 0){
            santa.distance = 0
            endGame()
        }
        else{
            setTimeout(() => {
                renderTotalScoreValue(playerDiceTotal) 
            }, timeoutInterval * 1)
    
            setTimeout(() => {
                character.diceHtml = getBlankDiceHtml(character.numberOfDice) 
                renderCharacter()
                uiPanel.style.opacity = 1 
            }, timeoutInterval * 2)
    
            setTimeout(()=> {
                character.diceHtml = getCharacterDiceHtml(character.diceArray)
                renderCharacter()
            }, timeoutInterval * 3)
    
            setTimeout(() => {
                character.diceTotal = getDiceTotal(character.diceArray)
                renderCharacter()
            }, timeoutInterval * 4)
                
            setTimeout(() => {
                hazardCharacter ? santa.energy -= character.diceTotal : santa.energy += character.diceTotal
    
                if(santa.energy >= 60){
                    santa.energy = 60
                }
                else if(santa.energy <= 0){
                    santa.energy = 0
                }
    
                santa.percentEnergy = getPercentage(santa.fullEnergy, santa.energy)
                renderSanta()
            }, timeoutInterval * 5)
            
            setTimeout(() =>{
                uiPanel.style.opacity = .4

                renderTotalScoreValue("")
                renderPlayerDice(getBlankDiceHtml(2))

                if(santa.energy === 0){
                    endGame()
                }
                else{
                    playButtonOn = true
                    playButton.style.opacity = 1 
                }

            }, timeoutInterval * 6)           
        }
    }
}

function renderCharacter(){
    document.getElementById("ui-panel").innerHTML = character.getCharacterHtml()
}

function renderSanta(){
    document.getElementById("santa").innerHTML = santa.getSantaHtml()
}

function renderPlayerDice(playerDice){
    document.getElementById("player-dice-inner").innerHTML = `<div class="dice-container">${playerDice}</div>`
}

function renderTotalScoreValue(totalScore){
    document.getElementById("total-score-value").innerHTML = `<span>${totalScore}</span>`
}

function endGame() {
    setTimeout(() => {
        const endMessage = santa.energy === 0 ?
            `Santa has run out of energy, so presents will be late this year!` : 
            `Santa has completed his journey and delivered his presents!`

        const endEmoji = santa.energy === 0 ?
            `🎄` :
            `🎁` 
            
        document.body.innerHTML = `
            <div class="endgame-wrapper">
                <h1>Game Over</h1>
                <h5>${endMessage}</h5>
                <div class="end-emoji">${endEmoji}</div>
                <button type="button" id="play-again-button">Play again</button>
            </div>
        `
        document.getElementById("play-again-button").addEventListener('click', () => {
            location.reload()
        })
    }, 1000)
}

const santa = new Santa(santaData.santa)


renderSanta()
renderPlayerDice(getBlankDiceHtml(2))




