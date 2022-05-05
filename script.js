import {INPUT_BOX , KEYCODE, RECENT_CONTAINER , SEARCH_BTN } from "./Variables.js"
import {validInput, declineSearch, startSearch} from './Functions.js'

inputBox.addEventListener('keyup',  function onKeyValidation(e){
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

searchBtn.addEventListener('click', function onClickValidation(e){
    const isValid = validInput(INPUT_BOX.value);

    if (isValid) {
        startSearch();
    } else {
        declineSearch();
    }
});

recentContainer.addEventListener('click', function startRecentSearch(e) {
    const recentElMatch = e.target.classList.contains('recentEl')
    
    if (recentElMatch){
        INPUT_BOX.value = e.target.innerText;
        startSearch();
    }
});



