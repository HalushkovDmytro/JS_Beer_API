import {ADD_MORE_BTN, INPUT_BOX, KEYCODE, RECENT_ARRAY, RECENT_CONTAINER, SCROLL_BTN, SEARCH_BTN} from "./Variables.js"
import {validInput, declineSearch, startSearch, additionalItems} from './Functions.js'

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
        scrollBtn.classList.remove('arrowUpHide')
    } else if (window.scrollY < 400) {
        scrollBtn.classList.add('arrowUpHide')
    }
});

SCROLL_BTN.addEventListener('click', function navigateToFirstEl(){
    window.scrollTo(0,100 + RECENT_ARRAY.length * 40)
})

ADD_MORE_BTN.addEventListener('click', additionalItems);


