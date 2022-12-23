import {heroData, encounterData} from "./data.js"
import Encounter from "./Encounter.js"
import Hero from "./Hero.js"
import { getDiceSetRoll, getBlankPlayerDice, getPercentage } from "./utils.js"

const numberOfPlayerDice = 2
const playerDiceIdRoot = "player-dice-"

const hazardsArray = ["shootingStar", "bottleOfBubbly", "whiteWitch", "poisonMushroom", "grinch"]
const helpersArray = ["bingCrosby", "mincePie", "carrot", "snowman"]

const rollPlayerDiceBtn = document.getElementById("roll-player-dice-btn")
const gameContainer = document.getElementById("game-container")
const instructionsContainer = document.getElementById("instructions-container")
const endgameContainer = document.getElementById("endgame-container")
const encounterPanel = document.getElementById("encounter-panel")

let rollButtonOn = true
let encounter = {}

let energyValue = 0

rollPlayerDiceBtn.addEventListener("click", rollDice)
document.getElementById("play-button"),addEventListener("click", startGame)

function rollDice(){

    if(rollButtonOn){
        rollButtonOn = false

        santa.distance -= 100
        if(santa.distance <= 0){
            santa.distance = 0
        }
        santa.percentDistance = getPercentage(santa.fullDistance, santa.distance)
        renderSanta()

        if (santa.distance === 0){
            endGame()
        }
        else{

            rollPlayerDiceBtn.classList.add("semi-opaque")

            document.getElementById("player-total").innerHTML = ``
            
            const playerDiceTotal = getDiceSetRoll(numberOfPlayerDice, playerDiceIdRoot)

            encounter = playerDiceTotal <= 10 ? getNewEncounter(hazardsArray) : getNewEncounter(helpersArray)

            setTimeout(() => {
                document.getElementById("player-total").innerHTML = `<div>${playerDiceTotal}</div>`
            }, 1500)

            setTimeout(() => {
                encounterPanel.classList.remove("semi-opaque")
                energyValue = renderEncounter()
                
            }, 2500)

            setTimeout(() => {
                document.getElementById("energy-total-container").textContent = energyValue
                
            }, 4000)

            setTimeout(() => {

                encounter.type === "Hazard" ? santa.energy -= energyValue : santa.energy += energyValue
                if (santa.energy >= 60){
                    santa.energy = 60
                }
                else if (santa.energy <= 0){
                    santa.energy = 0
                }

                if(santa.energy === 0){
                    endGame()
                }
                else{
                    santa.percentEnergy = getPercentage(santa.fullEnergy, santa.energy)
                    renderSanta()
                    encounterPanel.classList.add("semi-opaque")
                    rollButtonOn = true
                    rollPlayerDiceBtn.classList.remove("semi-opaque")
                    getBlankPlayerDice()
                }
            }, 5000)    
        }
    }
}

function startGame(){
    instructionsContainer.classList.add("hidden")
    instructionsContainer.classList.remove("flex")
    gameContainer.classList.add("flex")
    gameContainer.classList.remove("hidden")
}

function renderSanta(){
    document.getElementById("hero-panel").innerHTML = santa.getHeroHtml()
}

function getNewEncounter(arr){
    const randomIndex = Math.floor(Math.random() * arr.length)
    const arrayItem = arr[randomIndex]
    return new Encounter(encounterData[arrayItem])
}

function renderEncounter(){
    document.getElementById("encounter-panel").innerHTML = encounter.getEncounterHtml()
    return getDiceSetRoll(encounter.numberOfDice, encounter.encounterDiceIdRoot)
}

function endGame(){
    setTimeout(() => {
        const endMessage = santa.distance === 0 ?
            `Yippee, Santa has completed his journey and delivered his presents!` :
            `Sorry kids, Santa has run out of energy, so presents will be late this year!` 
            
        const endEmoji = santa.distance === 0 ?
            `🎁` :
            `🎄`
             
        document.getElementById("endgame-container").innerHTML = `
            <div class="panel endgame-panel">
                <h2>Game over!</h2>
                <h3>${endMessage}</h3>
                <div class="end-emoji">${endEmoji}</div>
                <button type="button" id="play-again-btn">Play again</button>
            </div>`   

        endgameContainer.classList.add("flex")
        endgameContainer.classList.remove("hidden")

        gameContainer.classList.add("hidden")
        gameContainer.classList.remove("flex")

        document.getElementById("play-again-btn").addEventListener("click", () => {
            location.reload()
        })
    }, 800)
}

const santa = new Hero(heroData.santa)
renderSanta()
