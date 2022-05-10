export class CreateBeer {

    constructor(BeerData) {

        Object.assign(this, {...BeerData})
    }

    getInnerHtml(){
        return `
             <div class="beerDiv" id="${this.mainId}">
                 <h3 class="beerTitle" id="${this.name}">${this.name}</h3>
                 <div class="beerImgContainer">
                     <img class="beerImg" src="${this.image || ('./img/beerBottle2.png') } " alt="beerImage">
                 </div>
                     <p class="beerDescription">${this.description}</p>
                     <p class="beerPrice">
                         PRICE
                     </p>
                     <a class="addBtn " id="${this.addBtnId}">Add</a>
             </div>
        `
    }

    getModalInnerHtml(){
            return `
             <div class="beerDivModal" id="${this.mainIdModal}">
                 <h3 class="beerTitleModal">${this.nameModal}</h3>
                    <div class="contentContainerModal">
                        <div class="beerImgContainer">
                            <img class="beerImgModal" src="${this.imageModal || ('./img/beerBottle2.png') } " alt="beerImage">
                        </div>
                        <p class="beerDescriptionModal">${this.descriptionModal}</p>
                    </div>
                     <a class="RemoveBtn" id="${this.addRemoveId}">Remove</a>
             </div>
        `
    }

    getSingleModalHtml(){
        return `
             <div class="beerDiv" id="${this.mainId}">
                 <h3 class="beerTitle" id="${this.name}">${this.name}</h3>
                 <div class="beerImgContainer">
                     <img class="beerImg" src="${this.image || ('./img/beerBottle2.png') } " alt="beerImage">
                 </div>
                     <p class="beerDescription">${this.description}</p>
                     <a class="addBtn" id="${this.addBtnId}">Add</a>
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
