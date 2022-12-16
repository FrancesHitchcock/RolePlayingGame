function Santa(data){
    Object.assign(this, data)

    this.percentDistance = 100
    this.percentEnergy = 100

    this.fullDistance = this.distance
    this.fullEnergy = this.energy

    this.getSantaHtml = function(){
        const {heading, avatar, distance, energy, percentDistance, percentEnergy} = this

        return `
            <h2 class="santa-heading">${heading}</h2>
            <img class="santa-avatar" src="${avatar}">
            <h3 class="distance">${distance} miles to go!</h3>
            <div class="progress-bar-container">
                <div class="progress-bar distance-bar" style="width:${percentDistance}%;"></div>
            </div>
            <h3 class="energy">Energy: ${energy}</h3>
            <div class="progress-bar-container">
                <div class="progress-bar energy-bar ${percentEnergy < 26 ? "red" : ""}" style="width:${percentEnergy}%;"></div>
            </div>`
    }
}

export default Santa