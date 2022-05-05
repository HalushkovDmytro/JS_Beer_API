export const SEARCH_BTN = document.getElementById('searchId');
export const INPUT_BOX = document.getElementById('inputId');
export const MAIN_CONTAINER = document.getElementById('beerResultContainer'); //html list of all items
export const RECENT_CONTAINER = document.getElementById('recentContainer'); //html list of recent searches
export const REGEX = new RegExp("^[a-zA-Z0-9 ]+$"); //validation
export const SCROLL_BTN = document.getElementById('scrollTo') //arrow icon scrolling up
export const NO_MORE_DATA = document.getElementById('noMoreData'); //warning message
export const ADD_MORE_BTN = document.getElementById('addMoreBtn');
export const RECENT_ARRAY = []; //recent searched elements
export const BEER_LIST = []; //the list of all items showed
export const KEYCODE = {
                ENTER : 13
            };
export const STYLE = {
                DISPLAY: {
                    NONE: 'none',
                    BLOCK: 'block',
                    FLEX: 'flex'
                },
                OPACITY: {
                    TRUE: 1,
                    FALSE: 0
                }
            };
export const VALIDATION = {
                VALID:{
                    color : 'black',
                    fontWeight : 'normal',
                    border : 'none',
                    backgroundColor : 'white',
                },
                INVALID: {
                    color : 'rgba(246, 15, 15, 0.622)',
                    fontWeight : 'bold',
                    border : '1px solid rgba(246, 15, 15, 0.622)',
                    backgroundColor : 'rgba(215,24,24,0.57)',
                }
            }
