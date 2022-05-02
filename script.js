import {searchId, inputId, ENTER } from "./Variables.js"
import {validInput, declineSearch, startSearch} from './Functions.js'

inputId.addEventListener('keyup',  function onKeyValidation(e){
    if (e.keyCode !== ENTER) return;

    if (!inputId) return;

    const isValid = validInput(inputId.value);

    isValid ? startSearch() : declineSearch();
});

searchId.addEventListener('click', function onClickValidation(e){
    const isValid = validInput(inputId.value);

    isValid ? startSearch() : declineSearch();
});

