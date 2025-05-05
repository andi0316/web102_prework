/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++){
        const current = games[i];

        const element = document.createElement("div");   // create a new div element, which will become the game card
        element.classList.add("game-card");      // add the class game-card to the list
 
        element.innerHTML = `
            <img src ="${current.img}" class="game-img" />
            <h2>${current.name}</h2>
            <p>${current.description}</p>
            <p>Backers: ${current.backers} </p>
        `;

        //my OWN addition!! <3 An "extra info" box that appears upon click!

        const extra = document.createElement("div");
        extra.classList.add("extra-info");
        extra.style.display = "none";

        extra.innerHTML = `
            <p>Pledged: $${current.pledged.toLocaleString()}</p>
            <p>Goal: $${current.goal.toLocaleString()}</p>
        `;

        element.appendChild(extra);


        element.addEventListener("click", () =>{
            extra.style.display = (extra.style.display == "none") ? "block" : "none";
        });

        gamesContainer.appendChild(element);    // append the game to the games-container
    }

}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals

1.grab the contributions card element
2.use reduce() to count the number of total contributions by summing the backers
3.set the inner HTML using a template literal and toLocaleString to get a number with commas
*/

const contributionsCard = document.getElementById("num-contributions"); 

const totalContributions = GAMES_JSON.reduce( (temp, game) => {return temp + game.backers} ,0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
// set inner HTML using template literal
const raisedCard = document.getElementById("total-raised");

const totalPledged = GAMES_JSON.reduce( (temp, game) => {return temp + game.pledged} ,0);
raisedCard.innerHTML = totalPledged.toLocaleString();

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = totalGames.toLocaleString();


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listNeedFunding = GAMES_JSON.filter( (game) => {return game.goal > game.pledged});

    console.log(listNeedFunding.length);
    addGamesToPage(listNeedFunding);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    // use the function we previously created to add unfunded games to the DOM

    let listHasFunding = GAMES_JSON.filter( (game) => {return game.goal < game.pledged});
    addGamesToPage(listHasFunding);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let listNeedFunding = GAMES_JSON.filter( (game) => {return game.goal > game.pledged});
const numUnfunded = listNeedFunding.length;

// create a string that explains the number of unfunded games using the ternary operator 
const displayStr = `
A total of $${totalPledged.toLocaleString()} has been raised for ${totalGames} game${totalGames > 1? 's' : ''}!
Currently, ${numUnfunded} game${numUnfunded > 1? 's' : ''} remain unfunded. We need your help to fund these amazing games!
`

// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement("p");
paragraph.textContent = displayStr;
descriptionContainer.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topFunded = document.createElement("h4");
topFunded.textContent = firstGame.name;
firstGameContainer.appendChild(topFunded);

// do the same for the runner up item
const runnerUp = document.createElement("h4");
runnerUp.textContent = secondGame.name;
secondGameContainer.appendChild(runnerUp);