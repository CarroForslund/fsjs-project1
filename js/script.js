/* Everytime the page loads a new interval is set
**
*/
window.onload = function(){
  setIntervalQuoteAutoChange();
}

/* DECLARE VARIABLES
** Variables that has to be outside of the functions scope
*/
var displayedQuotes = []; //Displayed quotes will be saved here until all quotes have been displayed once
var intervalID;           //Interval ID for changing the quotes automatically

/* QUOTES ARRAY
** With 5 quotes to meet the project expectations
** Each quote have to have a quote property (string) and a source property (string)
** May have a citation property (string), year property (number) and a tag property (string array)
*/
var quotes = [
    {
      quote: "You only live once, but if you do it right, once is enough.",
      source: "Mae West",
      tags: ["humor", "life"]
    },
    {
      quote: "Be the change that you wish to see in the world.",
      source: "Mahatma Gandhi",
      tags: ["action", "change", "inspirational", "philosophy", "wish"]
    },
    {
      quote: "JavaScript is fun! Learn as much as you can while you can.",
      source: "Caroline Forslund",
      citation: "for the first JS-project",
      year: 2017,
      tags: ["programming"]
    },
    {
      quote: "Live, laugh, love",
      source: "Unknown",
      tags: ["life", "philosophy", "action"]
    },
    {
      quote: "A smile is the prettiest thing you can wear",
      source: "Unknown",
      tags: ["life", "philosophy"]
    }
];

/* CHANGE QUOTE AUTOMATICALLY
** 30 seconds after page load or after button is clicked
*/
var setIntervalQuoteAutoChange = function(){
  if(intervalID !== null){
    clearInterval(intervalID);
  }
  intervalID = setInterval(printQuote, 30000);
}

/* GET RANDOM QUOTE
** Selects a random quote object from the quotes array
** Returns the randomly selected quote object
** Call change background function
*/
var getRandomQuote = function(){
  var randomQuote;

  /* Get a randomQuote that isn't already displayed
  ** I chose to create 2 separate functions to check this
  ** quoteIsAlreadyDisplayed and allQuotesHasBeenDisplayed
  */
  do{
    randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
  } while(quoteIsAlreadyDisplayed(randomQuote) && !allQuotesHasBeenDisplayed());

  //Save and display randomQuote, and change background color
  console.log(randomQuote);
  displayedQuotes.push(randomQuote);
  changeBackgroundColor();
  setIntervalQuoteAutoChange();
  return randomQuote;
};

/* CHECK IF RANDOM QUOTE HAS BEEN DISPLAYED
** Don't display a random quote more than once until ALL quotes from the array have been displayed
*/
var quoteIsAlreadyDisplayed = function(randomQuote){
  //as long as it's already is displayed, get new random quote
  for(var i = 0; i < displayedQuotes.length; i++){
    if(displayedQuotes[i] === randomQuote){
      return true;
    }
  }
  return false;
}

/* CHECK IF ALL QUOTES HAS BEEN DISPLAYED
** if so, reset displayedQuotes
*/
var allQuotesHasBeenDisplayed = function(){
  if(displayedQuotes.length === quotes.length){
    displayedQuotes = [];
    return true;
  }
  return false;
}

/* CHANGE BACKGROUND COLOR
** Everytime the quote changes, change background color of the body
*/
var changeBackgroundColor = function(){
  var colorCodeLength = 6;
  var validChars = '0123456789ABCDEF';
  var hex = '#';
  while(colorCodeLength--) hex += validChars[(Math.random() * 16) | 0];
  document.body.style.backgroundColor = hex;
};

/* PRINT QUOTE TO PAGE
** Stores a quote from the getRandomQuote function
** Creates html content based on actual quote properties
** Prints html in the Quote Box
*/
var printQuote = function(){
  var quote
  var html;

  quote = getRandomQuote();

  html = '<p class="quote">' + quote.quote + '</p> <p class="source">' + quote.source;
  if (quote.citation){
    html += '<span class="citation">' + quote.citation + '</span>';
  };
  if (quote.year){
    html += '<span class="year">' + quote.year + '</span>';
  };
  if (quote.tags){
    html += '<br><span class="tags">';
    for(var i = 0; i < quote.tags.length; i++){
      html += quote.tags[i];
      if(i < (quote.tags.length - 1)){
        html += ', ';
      }
    };
    html += '</span>';
  };

  html += '</p>';

  document.getElementById('quote-box').innerHTML = html;
};

/* EVENT LISTENER FOR "Show another quote"
** event listener to respond to "Show another quote" button clicks
** when user clicks anywhere on the button, the "printQuote" function is called
*/
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
