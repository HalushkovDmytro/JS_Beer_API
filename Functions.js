import {
    INPUT_BOX,
    MAIN_CONTAINER,
    RECENT_ARRAY,
    BEER_LIST,
    REGEX,
    RECENT_CONTAINER,
    ADD_MORE_BTN,
    NO_MORE_DATA,
    STYLE,
    VALIDATION,
    FAVOURITE_LIST,
    FAVOURITE_INNER, ITEMS,
} from "./Variables.js";
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
    NO_MORE_DATA.style.display = STYLE.DISPLAY.NONE;
    window.scrollTo(0, 100 + RECENT_ARRAY.length * 40);
}

export function declineSearch(){
    inputValidation(INPUT_BOX, VALIDATION.INVALID);

    setTimeout( () => {
        inputValidation(INPUT_BOX, VALIDATION.VALID);
    }, 500)
}

export function inputValidation(input, validation){
    input.style.color = validation.color;
    input.style.fontWeight = validation.fontWeight;
    input.style.border = validation.border;
    input.style.backgroundColor = validation.backgroundColor;
}

export function createRecentSearch(){
    const uniqueArray = Array.from(new Set(RECENT_ARRAY));

    const isIncludes = uniqueArray.includes(INPUT_BOX.value.toLowerCase());

    if (isIncludes) {
        return
    }

    RECENT_CONTAINER.innerHTML += `
        <div class="recentEl" id="${INPUT_BOX.value}">${INPUT_BOX.value}</div>
        `;
    RECENT_ARRAY.push(INPUT_BOX.value);
};

export function getBeer() {
    const value = INPUT_BOX.value.replaceAll(' ', '_').trim();

    pageStart = 1;
    fetch(`https://api.punkapi.com/v2/beers?beer_name=${value}&page=${pageStart}&per_page=5`)
        .then((response) => response.json())
        .then((result) => {
            MAIN_CONTAINER.innerHTML = '';

            if (!result.length){
                return MAIN_CONTAINER.innerHTML = CreateBeer.getError();
            }

            ADD_MORE_BTN.style.display = STYLE.DISPLAY.BLOCK;
            BEER_LIST.length = 0;
            showBeerList(result);
        })
}

export function showBeerList(source){
    source.forEach((item) => {
        const newBeer = new CreateBeer({
            mainId: `${item.id}`,
            name:`${item.name}`,
            image: `${item.image_url}`,
            description: `${item.description}`,
            addBtnId: `Add${item.id}`,
        });

        BEER_LIST.push(newBeer);

        MAIN_CONTAINER.innerHTML += newBeer.getInnerHtml();
    })
}

export function additionalItems(){ //adding 5 more items to the list
    const value = INPUT_BOX.placeholder;

    pageStart +=  5;
    fetch(`https://api.punkapi.com/v2/beers?page=${pageStart}&per_page=5&beer_name=${value}`)
        .then((response) => response.json())
        .then((result) => {
            if (!result.length){
                warningModal();

                if (CreateBeer.getError()){
                    return
                }
            }

            showBeerList(result);
        })
};

export function warningModal(){
    showModal(STYLE.DISPLAY.FLEX, STYLE.OPACITY.FALSE);

    setTimeout(() => {
        showModal(STYLE.DISPLAY.NONE, STYLE.OPACITY.TRUE);
    }, 2000)
}

export function showModal(modalDisplay, buttonOpacity){
    ADD_MORE_BTN.style.opacity = buttonOpacity;
    NO_MORE_DATA.style.display = modalDisplay;
}
//create new item in the modal display
export function addToFavourite(el){
    const addItem = BEER_LIST.find( (item) => item.addBtnId === el.id);

    const newBeer = new CreateBeer({
        mainIdModal: `${addItem.mainId}`,
        nameModal: `${addItem.name}`,
        imageModal: `${addItem.image}`,
        descriptionModal: `${addItem.description}`,
        addRemoveId: `RemoveId${addItem.mainId}`
    });

    FAVOURITE_INNER.innerHTML += newBeer.getModalInnerHtml();
    el.classList.add('addBtnActive');
    el.innerText = ITEMS.REMOVE;
    FAVOURITE_LIST.push(newBeer);
}
//removing items from the list of "Favourites" and from modal display
export function removeFromFavourite(el){
    const removePoint = BEER_LIST.find( (item) => item.addBtnId === el.id);
    const removeModal = FAVOURITE_LIST.find( (item) => item.mainIdModal === removePoint.mainId);
    const removeIndex = FAVOURITE_LIST.findIndex( (item) => item.addBtnId === el.id);

    if (!removeModal){
        return
    }

    document.getElementById(removeModal.mainIdModal).remove();
    FAVOURITE_LIST.splice(removeIndex, 1);
    el.classList.remove('addBtnActive');
    el.innerText = ITEMS.ADD;
}

export function removeFromModal(click){
    const deletingItem = FAVOURITE_LIST.find( (item) => item.addRemoveId === click.id);
    const mainListItem = BEER_LIST.find( (item) => item.mainId === deletingItem.mainIdModal);
    const removeIndex = FAVOURITE_LIST.findIndex( (item) => item.addRemoveId === click.id);

    document.getElementById(deletingItem.mainIdModal).remove() //remove from modal display
    document.getElementById(mainListItem.addBtnId).classList.remove('addBtnActive');
    document.getElementById(mainListItem.addBtnId).innerText = ITEMS.ADD;
    FAVOURITE_LIST.splice(removeIndex, 1);
}
