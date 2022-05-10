import {
    ADD_MORE_BTN,
    INPUT_BOX,
    KEYCODE,
    MAIN_CONTAINER,
    RECENT_ARRAY,
    RECENT_CONTAINER,
    SCROLL_BTN,
    SEARCH_BTN,
    FAVOURITE_LIST,
    FAVOURITE_BTN,
    FAVOURITE_MODAL,
    STYLE,
    FAVOURITE_INNER,
    ITEMS, BEER_LIST
} from "./Variables.js"
import {
    validInput,
    declineSearch,
    startSearch,
    additionalItems,
    addToFavourite,
    removeFromFavourite,
    removeFromModal,
    openSingleModal,
    recentStorage,
    modalStorage,
} from './Functions.js'

INPUT_BOX.addEventListener('keyup',  function onKeyValidation(e){
    if ((e.keyCode !== KEYCODE.ENTER) || (!INPUT_BOX)){
        return
    }
    
    const isValid = validInput(INPUT_BOX.value);

    if (isValid) {
        startSearch();
    } else {
        declineSearch();
    }
});

SEARCH_BTN.addEventListener('click', function onClickValidation(e){
    const isValid = validInput(INPUT_BOX.value);

    if (isValid) {
        startSearch();
    } else {
        declineSearch();
    }
});

RECENT_CONTAINER.addEventListener('click', function startRecentSearch(e) {
    const recentElMatch = e.target.classList.contains('recentEl')
    
    if (!recentElMatch){
        return
    }

    INPUT_BOX.value = e.target.innerText;
    startSearch();
});

window.addEventListener('scroll', function scrollIcon() {
    if (window.scrollY > 400) {
        SCROLL_BTN.classList.remove('arrowUpHide');
    } else if (window.scrollY < 400) {
        SCROLL_BTN.classList.add('arrowUpHide');
    }
});

SCROLL_BTN.addEventListener('click', function navigateToFirstEl(){
    window.scrollTo(0,100 + RECENT_ARRAY.length * 40);
})

ADD_MORE_BTN.addEventListener('click', additionalItems);

MAIN_CONTAINER.addEventListener('click', function addRemoveToFavourites(event){
    const target = event.target;
    const isAddBtn = target.classList.contains('addBtn');

    if (!isAddBtn){
        return
    }

    if (target.innerText === ITEMS.ADD){
        addToFavourite(target);
    } else if (target.innerText === ITEMS.REMOVE){
        removeFromFavourite(target);
    }

})

FAVOURITE_BTN.addEventListener('click', function showFavourite(){
    FAVOURITE_MODAL.style.display = STYLE.DISPLAY.BLOCK;
})

FAVOURITE_MODAL.addEventListener('click', function closeModal(event){
    if (event.target !== FAVOURITE_MODAL){
        return
    }

    FAVOURITE_MODAL.style.display = STYLE.DISPLAY.NONE;
})

FAVOURITE_INNER.addEventListener('click', function modalItemRemove(event){
    const target = event.target;

    if (!target.classList.contains('RemoveBtn')){
        return
    }

    removeFromModal(target);
})

MAIN_CONTAINER.addEventListener('click', function singleViewModal(event){
    const target = event.target;
    const isTitle = target.classList.contains('beerTitle');

    if (!isTitle){
        return
    }

    openSingleModal(target)
})

document.getElementById('singleModalContent').addEventListener('click', function singleViewModalBtn(event) {
    const target = event.target;
    const isAddBtn = target.classList.contains('addBtn');

    if (!isAddBtn){
        return
    }

    if (target.innerText === ITEMS.ADD){
        addToFavourite(target);

    } else if (target.innerText === ITEMS.REMOVE){
        removeFromFavourite(target);
    }
});

document.addEventListener('keyup', function(e) {
    if (e.keyCode === KEYCODE.ESCAPE){
        document.getElementById('singleModalContainer').style.display = STYLE.DISPLAY.NONE
    }
})

window.addEventListener('load', function onLoad() {
    recentStorage();
    modalStorage();
})