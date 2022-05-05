import {INPUT_BOX , KEYCODE, RECENT_CONTAINER , SEARCH_BTN } from "./Variables.js"
import {validInput, declineSearch, startSearch} from './Functions.js'

inputBox.addEventListener('keyup',  function onKeyValidation(e){
    if ((e.keyCode !== KEYCODE.ENTER) || (!inputBox)){
        return
    }
    
    const isValid = validInput(inputBox.value);

    if (isValid) {
        startSearch();
    } else {
        declineSearch();
    }
});

searchBtn.addEventListener('click', function onClickValidation(e){
    const isValid = validInput(inputBox.value);

    if (isValid) {
        startSearch();
    } else {
        declineSearch();
    }
});

recentContainer.addEventListener('click', function startRecentSearch(e) {
    const recentElMatch = e.target.classList.contains('recentEl')
    
    if (recentElMatch){
        inputBox.value = e.target.innerText;
        startSearch();
    }
});



