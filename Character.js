import {getNewDiceArray, getBlankDiceHtml} from "./utils.js"

function Character(data){
    Object.assign(this, data)
    
    this.energyMessage = this.type === "Hazard"? 'Total damage' : 'Energy boost'
    this.diceArray = getNewDiceArray(this.numberOfDice)
    this.diceTotal = ''
    this.diceHtml = getBlankDiceHtml(this.numberOfDice)
    
    this.getCharacterHtml = function(){
        const{heading, avatar, message, type, energyMessage, diceTotal, diceHtml} = this
            return `
            <div class="character-container-outer">
                <h2 class="character-heading">${type}: ${heading}</h2>
                <h3 class="character-message">${message}</h3>
                <div class="character-container-inner">
                    <div class="character-avatar">${avatar}</div>
                    <div class="energy-container">
                        <div class="dice-container">
                            ${diceHtml}
                        </div>
                        <div class="energy-message-container">
                            <h4>${energyMessage}:</h4> <div class="dice-total-container">${diceTotal}</div>
                        </div>
                    </div>
                </div>
            <div>`
    }
}

export default Character