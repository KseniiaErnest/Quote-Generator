'use scrict'

// DOM manupilation:
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

//Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Create a global veriable
let apiQuotes = [];

// function to show random new quote
function newQoute() {
loading();
const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

// To check if author field is blank and replace it with 'Unknown':
if (!randomQuote.author) {
  authorText.textContent = 'Unknow'
} else {
  authorText.textContent = randomQuote.author;
}

// To check if the quote texy is too long, then to apply class .long-quote:
if (randomQuote.text.length > 120) {
  quoteText.classList.add('long-quote');
} else {
  quoteText.classList.remove('long-quote');
}

// Set a quote and hide a loader
quoteText.textContent = randomQuote.text;
complete();
}

// Get quotes from API: https://jacintodesign.github.io/quotes-api/data/quotes.json
async function getQuotes() {
  loading();
  const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQoute();
  } catch (error) {
    // Handle the error here alert()
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
} 

// Event Listeners
newQuoteBtn.addEventListener('click', newQoute);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();



//--------*------*-------*-------*-------*-------*-------*------*-------*-------*-------*-------*
// If we do not want to use an API, but local array of quotes:
/*  function newQoute() {
const randomQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
}  */