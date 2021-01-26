const quoteContainer = document.querySelector('#quote-container')
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
// loading function:\
const loader=document.getElementById('loader');
// show loading function:
function loading(){
    loader.hidden=false; // means we wanna shoe it
    quoteContainer.hidden=true;  // means wanna hide the quote container
}
// loading compleate and wanna show quote -hide loading-
function complete(){
    if(!loader.hidden){ // if loader.hidden=false which means loader is visible
        quoteContainer.hidden =false;  // means wanna show the quote container
        loader.hidden = true; // means we wanna hide it
    }
}

// get quote from API
async function getQuote() {
    loading();
    // we will call our proxy api first then we will call our code API
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // means return response in json format

        // if author is blank, add unknown
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown Author';
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }
        // the upcoming to show how to add class to an HTML element to change css 
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
            // classList means will gonna do change on css for this class., the above to add class to an HTML element
        } else {
            quoteText.classList.remove('long-quote');

        }
        console.log()
        // no need for above line after finishing project
        quoteText.innerText = data.quoteText;
        complete();

    } catch (error) {
        getQuote();
        console.log("whooops", error);
    }
    // ? --> to add our query string 

}
// i want this func to run when i load page, so i will put it at the bottom coz i always want the function to be declared before i call it


// tweet quote:

function tweetQuote() {
    const quote1 = quoteText.innerText;
    const author1 = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote1} - ${author1}`;
    window.open(twitterURL, '_blank');
}
// event listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


//onload
getQuote();

