
function Hero(data){
    Object.assign(this, data)

    this.percentDistance = 100
    this.percentEnergy = 100

    this.fullDistance = this.distance
    this.fullEnergy = this.energy

    this.getHeroHtml = function(){
        const {heading, avatar, alt, distance, energy, percentDistance, percentEnergy} = this

        return `
            <h2>${heading}</h2>
            <img src="${avatar}" alt="${alt}">
            <h3>${distance} miles to go</h3>
            <div class="bar-container"><div class="bar" style="width: ${percentDistance}%"></div></div>
            <h3>Energy: ${energy}</h3>
            <div class="bar-container"><div class="bar ${percentEnergy <= 25 ? "red" : ""}" style="width: ${percentEnergy}%"></div></div>`
    }
}

export default Hero