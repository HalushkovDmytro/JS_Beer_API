import {INPUT_BOX , MAIN_CONTAINER , RECENT_ARRAY , BEER_LIST , REGEX , RECENT_CONTAINER } from "./Variables.js";
import {CreateBeer} from './CreateBeer.js';

let pageStart = 1;

export function validInput(beerName){
    return beerName.match(REGEX)
}

export function startSearch(){
    createRecentSearch();
    getBeer();
    INPUT_BOX.placeholder = INPUT_BOX.value;
    INPUT_BOX.value = '';
    window.scrollTo(0,100 + RECENT_ARRAY.length * 40);
}

export function declineSearch() {
    INPUT_BOX.style.color = 'rgba(246, 15, 15, 0.622)';
    INPUT_BOX.style.fontWeight = 'bold';
    INPUT_BOX.style.border = '1px solid rgba(246, 15, 15, 0.622)';
    INPUT_BOX.style.backgroundColor = 'rgba(215,24,24,0.57)';
    
    setTimeout(() => {
        INPUT_BOX.style.color = 'black';
        INPUT_BOX.style.fontWeight = 'normal';
        INPUT_BOX.style.border = 'none';
        INPUT_BOX.style.backgroundColor = 'white';
    },500);
};

export function createRecentSearch(){
    const uniqueArray = Array.from(new Set(RECENT_ARRAY))

    if (uniqueArray.includes(INPUT_BOX.value)) {
        return
    }

    RECENT_CONTAINER.innerHTML += `
        <div class="recentEl" id="${INPUT_BOX.value}">${INPUT_BOX.value}</div>
        `;
    RECENT_ARRAY.push(INPUT_BOX.value);
};

export function getBeer() {
    const value = INPUT_BOX.value.replaceAll(' ', '_').trim();

    fetch(`https://api.punkapi.com/v2/beers?beer_name=${value}&page=${pageStart}&per_page=80`)
        .then((response) => response.json())
        .then((result) => {

            if (!result.length){
                return MAIN_CONTAINER.innerHTML = CreateBeer.getError();
            }

            MAIN_CONTAINER.innerHTML = '';
            BEER_LIST.length = 0;
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

        BEER_LIST.push(newBeer)
        MAIN_CONTAINER.innerHTML += newBeer.getInnerHtml()
    })
}



