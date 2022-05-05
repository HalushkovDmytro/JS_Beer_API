import {inputBox, mainContainer, recentArray, beerListArray, regex, recentContainer} from "./Variables.js";
import {CreateBeer} from './CreateBeer.js';

let pageStart = 1;

export function validInput(beerName){
    return beerName.match(regex)
}

export function startSearch(){
    createRecentSearch();
    getBeer();
    inputBox.placeholder = inputBox.value;
    inputBox.value = '';
    window.scrollTo(0,100 + recentArray.length * 40);
}

export function declineSearch() {
    inputBox.style.color = 'rgba(246, 15, 15, 0.622)';
    inputBox.style.fontWeight = 'bold';
    inputBox.style.border = '1px solid rgba(246, 15, 15, 0.622)';
    inputBox.style.backgroundColor = 'rgba(215,24,24,0.57)';
    setTimeout(() => {
        inputBox.style.color = 'black';
        inputBox.style.fontWeight = 'normal';
        inputBox.style.border = 'none';
        inputBox.style.backgroundColor = 'white';
    },500);
};

export function createRecentSearch(){
    const uniqueArray = [...new Set(recentArray)]

    if (uniqueArray.includes(inputBox.value)) {
        return
    }

    recentContainer.innerHTML += `
        <div class="recentEl" id="${inputBox.value}">${inputBox.value}</div>
        `;
    recentArray.push(inputBox.value);
};

export function getBeer() {
    const value = inputBox.value.replaceAll(' ', '_').trim();

    fetch(`https://api.punkapi.com/v2/beers?beer_name=${value}&page=${pageStart}&per_page=80`)
        .then((response) => response.json())
        .then((result) => {

            if(!result.length){
                return mainContainer.innerHTML = CreateBeer.getError();
            }

            mainContainer.innerHTML = '';
            beerListArray.length = 0;
            showBeerList(result)
        })
}

export function showBeerList(source){
    source.forEach((item) => {
        const newBeer = new CreateBeer({
            id: `${item.id}`,
            name:`${item.name}`,
            image: `${item.image_url}`,
            description: `${item.description}`
        });

        beerListArray.push(newBeer)
        mainContainer.innerHTML += newBeer.getInnerHtml()
    })
}



