import { getDiceHtmlArray, getDiceSetRoll } from "./utils.js"

function Encounter(data){
    Object.assign(this, data)
    this.encounterDiceIdRoot = "encounter-dice-"

    this.diceHtml = getDiceHtmlArray(this.numberOfDice, this.encounterDiceIdRoot).join("")


    this.getEncounterHtml = function(){
        const {name, type, heading, avatar, message, numberOfDice, diceHtml} = this

        const energyType = type === "Hazard" ? "Total damage:" : "Energy boost"

        return `
        <h2>${type}: ${name}</h2>
        <h3>${message}</h3>
        <div class="encounter">
            <div class="emoji-container">
                ${avatar}
            </div>
            <div class="energy-container">
                <div class="dice-container" id="encounter-dice-container">
                    ${diceHtml}
                </div>
                <div class="energy-message-container">
                    <h4>${energyType}</h4> <div class="dice-total-container" id="energy-total-container"></div>
                </div>
            </div>
        </div>`
    }
}

export default Encounter