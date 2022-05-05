export class CreateBeer {
    this.id
    this.name
    this.image
    this.description

    constructor(BeerData) {
        Object.assign(this, {...BeerData})
    }

    getInnerHtml(){
        return `
             <div class="beerDiv" id="${this.id}">
                 <h3 class="beerTitle">${this.name}</h3>
                 <div class="beerImgContainer">
                     <img class="beerImg" src="${this.image || ('./img/beerBottle2.png') } " alt="beerImage">
                 </div>
                     <p class="beerDescription">${this.description}</p>
                     <p class="beerPrice">
                         PRICE
                     </p>
             </div>
        `
    }

    static getError(){
        return `
        <div class="errorMessage">
            There were no properties found for the given location.
        </div>`
    }
}
