import {inputId, mainContainer, recentArray, regex, recentContainer} from "./Variables.js";

export function validInput(beerName){
    return beerName.match(regex)
}

export function startSearch(){
    createRecentSearch();
    fetchName();
    inputId.placeholder = inputId.value;
    inputId.value = '';
}

export function declineSearch() {
    inputId.style.color = 'rgba(246, 15, 15, 0.622)';
    inputId.style.fontWeight = 'bold';
    inputId.style.border = '1px solid rgba(246, 15, 15, 0.622)';
    setTimeout(() => {
        inputId.style.color = 'black';
        inputId.style.fontWeight = 'normal';
        inputId.style.border = 'none';
    },2000);
};

export function createRecentSearch(){
    const recentItem = document.createElement('div');

    recentItem.setAttribute('id',`${inputId.value}`)
    recentItem.className = 'recentEl';
    recentItem.innerHTML = `<a>${inputId.value}</a>`;
    recentContainer.prepend(recentItem);
    recentArray.push(inputId.value);
    recentItem.addEventListener('click', function repeatSearch(){
        inputId.value = recentItem.innerText;
        recentItem.remove();
        recentArray.splice(recentArray[recentItem + 1], 1);
    })
};


export function createElements(arr){
    if (!arr.length) {
        const errorContainer = document.createElement('div');

        errorContainer.className = 'beerDiv';
        errorContainer.setAttribute('id', `errorContainer`)
        mainContainer.appendChild(errorContainer);

        const errorElement = document.createElement('p');

        errorElement.className = 'errorMessage';
        errorElement.setAttribute('id', 'error');
        errorElement.innerText = 'There were no properties found for the given location.'
        errorContainer.appendChild(errorElement);

    }

    arr.forEach((item) => {
        const elementContainer = document.createElement('div');

        elementContainer.className = 'beerDiv';
        elementContainer.setAttribute('id', `${item.id}`)
        mainContainer.appendChild(elementContainer);

        const beerTitle = document.createElement('h3');

        beerTitle.className = 'beerTitle';
        beerTitle.innerText = item.name;
        elementContainer.appendChild(beerTitle);

        const imgContainer = document.createElement('div');

        imgContainer.className = 'beerImgContainer';
        elementContainer.appendChild(imgContainer)

        const beerImage = document.createElement('img');

        beerImage.className = 'beerImage';
        beerImage.src = item.image_url || './img/beerBottle2.png';
        imgContainer.append(beerImage);

        const beerAboutContainer = document.createElement('div');

        beerAboutContainer.className = 'beerAbout';
        elementContainer.appendChild(beerAboutContainer);

        const beerDescription = document.createElement('p');

        beerDescription.className = 'beerDescription';
        beerDescription.innerText = item.description;
        beerAboutContainer.appendChild(beerDescription);

        const beerPriceContainer = document.createElement('div');

        beerPriceContainer.className = 'beerPriceContainer';
        elementContainer.appendChild(beerPriceContainer);

        const beerPrice = document.createElement('p');

        beerPrice.className = 'beerPrice';
        beerPrice.innerText = 'PRICE';
        beerPriceContainer.appendChild(beerPrice);
    })

}

export function fetchName() {
    const value = inputId.value.replaceAll(' ', '_').trim();

    fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=80&beer_name=${value}`)
        .then((response) => response.json())
        .then((result) => {
            mainContainer.innerText = '';
            createElements(result);
        })
}

