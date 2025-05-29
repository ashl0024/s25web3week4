

//create global variables
let colourPool = ["red", "red", "orange", "orange", "yellow", "yellow", "green", "green", "blue", "blue", "purple", "purple"];
//when the user clicks on a card for the first time, we'll pick a random colour from this array and assign it to that card

//clickedCards will store the cards the user is currently clicking on, by ID - when two cards are in the array, we'll check if there is a matching ID, and if there is, then there is a match.  However, if the IDs do not match, then we'll flip the two cards back over
let clickedCards = [];


//these two globals are to keep track of the user's progress - one for their score, and one for the number of moves
let score=0, moves=0;
//you can declare multiple variables with one 'let' keyword, by separating them with commas

/********************************
 * 	Scripts added in class
********************************/

//use a loop to add multiple cards
//a dor loop has three parts:
//set the counter variable (let i=0) and start it at a number
//give the loop a condition to keep counting(i.e.keep going as long as i less than 12)
// tell the counter to increment each time the loop runs (i++ = add 1 to i)
//  how to keep looping as long we cannot add that i is equal to 12 its a condition 
for(let i=0; i<12; i++){
//create the new card (a div element)
const card = document.createElement("div");

//add the class "card" to the new element
card.classList.add("card");

//create the paragraph element
const para = document.createElement("p")

//add the question mark inside the paargraph 
para.textContent = "?";

//add the new paargraph to the card
card.appendChild(para);

//add an event listner to the card, when the user clicks
//this actually says:
//when te user clicks on a card, run the function"flipcard"
card.addEventListener("click",flipCard);

//add the card to the page
document.querySelector("main").appendChild(card);
}
// when user clicks on the card..
function flipCard(){
    //check to make sure this card isnot click on already- that it's
    //class has not been set to cardFlipped
    //! = checks if something is not equal to
    if(this.className !="cardFlipped"){
    // change the cards class
    this.className = "cardFlipped"; //this is the class list used to tell which card we clicked on it
//get a random number between 0 and 11 (because the firsdt position of an array is 0)
//Math.random() gets you  a random decimal between 0 and 1 (like0.45, 0.87)
//Math.floor() rounds a number down
//multiply the random number by 12, then subtract a small amount so it never actually 
//hits 12
    let ran = Math.floor(Math.random()*12-0.001);
   
    // based on the random number, assign the card an ID ( from the colourpool array)
    this.id = colourPool[ran];

    //since the card has been clicked, add it to the array that holds which
    //cards are clicked
    //.push adds something to the end of an array
    clickedCards.push(this);
    
    //check to see if there are two cards in the array
    //then check to see if there is match
    if (clickedCards.length == 2){
        // check to see if two cards have the same id
        if(clickedCards[0].id == clickedCards[1].id){
            //call the function to create an overlay message
            //send it the value "match"
            createOverlay("match");
        }else{
            //call the function to craete an overlay message
            createOverlay("nomatch");

           //if it's not a match, flip the cards back over....
           //the forEach loop looks at an array and does something to each thing 
           // in the array
           //you have to pss it  atemporary variable (we are using this card)
           // to store each item in the array
          
           clickedCards.forEach(function(thisCard) {
            thisCard.className = "card";
           });
       }
       //make the array an empty array, regardless of whether there is a match or not
       clickedCards = [];

    }
    }
}

//this function creates an overlay to display a message to the user
//"messagetype" is a variable to store the information sent
// to the function (when we called it )
function createOverlay(messageType){
    //create a div for the overlay background, give it an id 
    //add  it to the body elemt (outside of the rest of the HTML)
   const overlay = document.createElement("div");
   overlay.id = "overlay";
   //add the event listener to remove the overlay when clicked
   overlay.addEventListener("click",totalExistenceFailure);

   //add a message to the overlay
const para = document.createElement("p");
//check which type of overlay this is
// use the switch statement for mutiple options 
switch(messageType){
    case "nomatch":
        para.textContent = "No Match!";
        break; //stops the switch statement from running
    case "match":
         para.textContent = "Match!";
        break; //stops the switch statement from running

}

overlay.appendChild(para);
   document.querySelector("body").appendChild(overlay);



}

function totalExistenceFailure(){
    //we have to get the elemt's parent to remove the element
    this.parentNode.removeChild(this);
}


