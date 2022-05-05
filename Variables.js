export const searchBtn = document.getElementById('searchId');
export const inputBox = document.getElementById('inputId');
export const mainContainer = document.getElementById('beerResultContainer'); //html list of all items
export const recentContainer = document.getElementById('recentContainer'); //html list of recent searches
export const regex = new RegExp("^[a-zA-Z0-9 ]+$"); //validation
export const recentArray = []; //recent searched elements
export const beerListArray = []; //the list of all items showed
export const KEYCODE = {
                ENTER : 13
            };
