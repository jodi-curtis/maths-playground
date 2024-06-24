/*
 *File: quiz.js
 *-----------------
 *
 * This file contains all the Javascript for the Quiz Page.
 *
 */

//--------------------------------------------------------------------------------------------
// COMPLETE SECTION - Only shown once all quizzes are complete
//--------------------------------------------------------------------------------------------
const btnGoToResults = document.getElementById("go-to-results");
const sectionComplete = document.getElementById("complete-section");

// Array to store results of quiz to be passed to results page
const quizResults = [];

// On Click, pass array of results to results page
btnGoToResults.addEventListener('click', function() {
    const serializedArray = encodeURIComponent(JSON.stringify(quizResults));
    window.location.href = 'results.html?varName=' + serializedArray;
});


//--------------------------------------------------------------------------------------------
// COUNT
//--------------------------------------------------------------------------------------------
// Count Quiz Elements 
const btnCountStart = document.getElementById("btn-count-start");
const countQuizIntro = document.getElementById("count-intro");
const containerCountQuiz = document.getElementById("container-count-quiz");
const countQTracker = document.getElementById("count-Q-tracker");
const countQuiz = document.getElementById("count-quiz");
const formCount = document.getElementById("form-count-quiz");
const inputCountAnswer = document.getElementById("input-count-answer");
const countInputError = document.getElementById("input-error-count");
const btnCountSubmit = document.getElementById("btn-count-submit");
const msgResultCount = document.getElementById("count-result");
const finalResultCount = document.getElementById("final-result-count");


// Random Number variable which will store random number for the Quiz question
let randomNumber;

// Count variable to keep track of question number
let countCount = 0;

// Score variable to keep track of users score
let countScore = 0;

// Array to store asked numbers. Used to prevent same number being asked twice
const askedNumbers = [];


// On Click, set up new Quiz question 
btnCountStart.addEventListener("click", function () {
    countQuizIntro.style.display = "none"; // Hide quiz intro
    countQuiz.style.display = "block"; // Show quiz container form
    resetCountQuiz();
});

formCount.addEventListener("submit", function(event) {
    event.preventDefault(); 
});


// On Click, submit answer
btnCountSubmit.addEventListener("click", function () {
    submitAnswer();
});


// Function to set up a new quiz question
function resetCountQuiz() {
    inputCountAnswer.value = ""; //Clear answer input
    inputCountAnswer.disabled = false; // Enable the answer input
    countInputError.style.display = "none"; // Hide validation error message
    btnCountSubmit.disabled = false; // Enable the submit button
    msgResultCount.innerText = ""; // Clear the result message
    inputCountAnswer.classList.remove('invalid-input');
    msgResultCount.classList.remove('correct'); // Remove correct styling from result message   
    msgResultCount.classList.remove('incorrect'); // Remove incorrect styling from result message   
    containerCountQuiz.innerHTML = ""; // Clear the count container
    countQTracker.innerText = "Question " + (countCount+1) + " of 5"; // Update question tracker
    showRandomNum(); // Show random number of divs in container
}

// Function to add a random number of divs to the container
function showRandomNum() {
    // Get random number between 1 and 20 which hasn't already been asked before and add that many divs to the container
    do{
        randomNumber = Math.floor(Math.random() * 20) + 1;
    } while (askedNumbers.includes(randomNumber));
    askedNumbers.push(randomNumber);
    for (let i = 0; i < randomNumber; i++) {
        const countItem = document.createElement("div");
        countItem.classList.add("countItem");
        containerCountQuiz.appendChild(countItem);
    }
}


// Function to highlight each of the divs in the conatiner
function highlightDivs(callback) {
    const divs = document.querySelectorAll("#container-count-quiz .countItem");
    let count = 0;
    // For each div, add highlight class for half a second then remove
    divs.forEach((div, index) => {
        setTimeout(() => {
            div.classList.add("highlight");
            setTimeout(() => {
                div.classList.remove("highlight");
                count++;
                // If all divs have been highlighed and callback exists
                if (count === divs.length && callback) {
                    // Call callback function
                    callback();
                }
            }, 500);
        }, index * 500);
    });
}

// Function called when answer is submitted
function submitAnswer(){
    const answer = inputCountAnswer.value.trim();

    // Check if submitted answer is NOT a number
    if(isNaN(answer)){
        // Show error message and add error styling
        countInputError.style.display = "block";
        countInputError.innerText = "That is not a number, try again";
        inputCountAnswer.classList.add('invalid-input');
    // If answer is left blank
    }else if(answer === ''){
        // Show error message and add error styling
        countInputError.style.display = "block";
        countInputError.innerText = "Nothing was entered, try again";
        inputCountAnswer.classList.add('invalid-input');
    // If Valid answer is input
    }else{
        countInputError.style.display = "none"; // Hide error message
        inputCountAnswer.classList.remove('invalid-input'); // Remove error styling
        countCount++; // Increment count by 1
        btnCountSubmit.disabled = true; // Disable Submit button and input
        inputCountAnswer.disabled = true;
        // First highlight each div in container 1 by 1
        highlightDivs(() => {
            // Then if check submitted answer is correct
            if(answer == randomNumber){
                countScore++; // Increment score by 1
                msgResultCount.innerText = "Correct!"; // Display correct message 
                msgResultCount.classList.add('correct'); // Add correct styling to result message   
            }else{
                msgResultCount.innerText = "Incorrect! The correct answer is " + randomNumber; // Display incorrect message and show correct answer 
                msgResultCount.classList.add('incorrect'); // Add incorrect styling to result message     
            }
            // After 3 seconds
            setTimeout(() => {
                if(countCount >= 5){
                    // If 5 questions have been completed, show final score
                    finalResultCount.style.display = "block";
                    finalResultCount.innerText = "DONE! - You scored " + countScore + "/" + countCount;
                    countQuiz.style.display = "none"; // Hide quiz
                    let quiz1Results = {
                        quizNumber: 1,
                        quizName: 'Count',
                        quizScore: countScore
                    };
                    // Push results of this quiz to the quizResults array
                    quizResults.push(quiz1Results);
                    if(quizResults.length == 5){
                        // Show complete section and scroll into view
                        sectionComplete.style.display = 'block';
                        sectionComplete.scrollIntoView({behavior: 'smooth'});
                    }
                }else{
                    // Else reset quiz for next question
                    resetCountQuiz();
                }
            }, 3000); 
        });  
    }

}










//--------------------------------------------------------------------------------------------
// ADD 
//--------------------------------------------------------------------------------------------
// Add Quiz Elements
const btnAddStart = document.getElementById("btn-add-start");
const addQuizIntro = document.getElementById("add-intro");
const addQTracker = document.getElementById("add-Q-tracker");
const addQuiz = document.getElementById("add-quiz");
const containerAddQuiz1 = document.getElementById("container-addQuiz-num1");
const containerAddQuiz2 = document.getElementById("container-addQuiz-num2");
const formAdd = document.getElementById("form-add-quiz");
const inputAddAnswer = document.getElementById("add-answer-input");
const addInputError = document.getElementById("input-error-add");
const btnAddSubmit = document.getElementById("btn-add-submit");
const msgResultAdd = document.getElementById("result-add");
const finalResultAdd = document.getElementById("final-result-add");
const addSum = document.getElementById("add-sum");




// Random number variables to store random numbers for quiz questions
let addRandomNumber1;
let addRandomNumber2;
// Count variable to keep track of question number
let addCount = 0;
// Score variable to keep track of users score
let addScore = 0;


// Start Button Event Listener
btnAddStart.addEventListener("click", function () {
    // Hide quiz intro
    addQuizIntro.style.display = "none";
    // Call resetAddQuiz function
    resetAddQuiz();
});


formAdd.addEventListener("submit", function(event) {
    event.preventDefault(); 
});


// Submit Button Event Listener
btnAddSubmit.addEventListener("click", function () {
    // Call submitAddAnswer function
    submitAddAnswer();
});


// Function to set up a new quiz question
function resetAddQuiz() {
    addQuiz.style.display = "block"; // Show quiz container
    inputAddAnswer.value = ""; // Clear answer input
    inputAddAnswer.disabled = false; // Enable answer input
    addInputError.style.display = "none"; // Hide validation error message
    inputAddAnswer.classList.remove('invalid-input'); // remove invalid input red border
    btnAddSubmit.disabled = false; // Enable the submit button
    msgResultAdd.innerText = ""; // Clear the result message
    msgResultAdd.classList.remove('correct'); // Remove correct styling from result message   
    msgResultAdd.classList.remove('incorrect'); // Remove incorrect styling from result message  
    containerAddQuiz1.innerHTML = ""; // Clear the quiz area
    containerAddQuiz2.innerHTML = ""; // Clear the quiz area
    addSum.innerText = ""; // Reset Sum Text
    addQTracker.innerText = "Question " + (addCount + 1) + " of 5"; // Update question tracker

    // Get random number between 1 and 10 and call showRandomNumAdd function that many times
    addRandomNumber1 = Math.floor(Math.random() * 10) + 1;
    for (let i = 0; i < addRandomNumber1; i++) {
        showRandomNumAdd(containerAddQuiz1);
      }

    // Get random number between 1 and 10 and call showRandomNumAdd function that many times
    addRandomNumber2 = Math.floor(Math.random() * 10) + 1;
    for (let i = 0; i < addRandomNumber2; i++) {
        showRandomNumAdd(containerAddQuiz2);
    }

}


// Function to add a random number of divs to the selected container
function showRandomNumAdd(selectedContainer) {
    const countItem = document.createElement("div");
    countItem.classList.add("countItem");
    selectedContainer.appendChild(countItem);
}


// Function to highlight each of the divs in the selected container
function highlightAddDivs(container, counterDisplay, callback) {
    const addDivs = container.querySelectorAll(".countItem");
    let count = 0;
    // For each div, add highlight class for half a second then remove
    addDivs.forEach((div, index) => {
        setTimeout(() => {
            div.classList.add("highlight");
            setTimeout(() => {
                div.classList.remove("highlight");
                count++;
                // If all divs have been highlighted and callback function exists
                if (count === addDivs.length && callback) {
                    // Add number to sum
                    counterDisplay.innerText += (' ' + addDivs.length);
                    // Call callback function
                    callback();
                }
            }, 500);
        }, index * 500);
    });
}


// Function called when answer is submitted
function submitAddAnswer(){
    const answer = inputAddAnswer.value.trim();

    // Check if submitted answer is NOT a number
    if(isNaN(answer)){
        // Show error message and add error styling
        addInputError.style.display = "block";
        addInputError.innerText = "That is not a number, try again";
        inputAddAnswer.classList.add('invalid-input');
    // If answer is left blank
    }else if(answer === ''){
        // Show error message and add error styling
        addInputError.style.display = "block";
        addInputError.innerText = "Nothing was entered, try again";
        inputAddAnswer.classList.add('invalid-input');
    // If Valid answer is input
    }else{
        addInputError.style.display = "none"; // Hide error message
        inputAddAnswer.classList.remove('invalid-input'); // Remover error styling
        addCount++; // Increment count by 1
        btnAddSubmit.disabled = true; //Disable submit button and input
        inputAddAnswer.disabled = true;
        // Highlight each div in the first container 1 by 1
        highlightAddDivs(containerAddQuiz1, addSum, () => {
            // After half a second, add + to sum 
            setTimeout(()=>{
                addSum.innerText += ' +';
            },500);
            // After a second
            setTimeout(()=>{
                // Highlight each div in the second container 1 by 1
                highlightAddDivs(containerAddQuiz2, addSum, () => {
                    // After half a second add = to sum
                    setTimeout(()=>{
                        addSum.innerText += ' =';
                    },500);

                    // After a second add the result of the 2 numbers to sum
                    setTimeout(()=>{
                        addSum.innerText += (' ' + (addRandomNumber1 + addRandomNumber2));
                    },1000);

                    // After 4 seconds
                    setTimeout(() => {
                        // Check if correct answer has been submitted
                        if(answer == (addRandomNumber1 + addRandomNumber2)){
                            addScore++; // Increment score by 1
                            msgResultAdd.innerText = "Correct!"; // Display correct message 
                            msgResultAdd.classList.add('correct'); // Add correct styling to result message   

                        }else{
                            msgResultAdd.innerText = "Incorrect! The correct answer is " + (addRandomNumber1 + addRandomNumber2); // Display incorrect message and show correct answer
                            msgResultAdd.classList.add('incorrect'); // Add incorrect styling to result message   
                        }
                        // After 3 seconds
                        setTimeout(() => {
                            if(addCount>=5){
                                // If 5 questions have been completed, show final score
                                finalResultAdd.style.display = "block";
                                finalResultAdd.innerText = "DONE! - You scored " + addScore + "/" + addCount;
                                addQuiz.style.display = "none"; // Hide quiz
                                let quiz2Results = {
                                    quizNumber: 2,
                                    quizName: 'Add',
                                    quizScore: addScore
                                };
                                // Push results of this quiz to the quizResults array
                                quizResults.push(quiz2Results);
                                if(quizResults.length == 5){
                                    // Show complete section and scroll into view
                                    sectionComplete.style.display = 'block';
                                    sectionComplete.scrollIntoView({behavior: 'smooth'});
                                }
                            }else{
                                // Else reset quiz for next question
                                resetAddQuiz();
                            }
                        }, 3000); 
                    }, 4000);
                });  
            }, 1000);
        });  
    }
}










//--------------------------------------------------------------------------------------------
// ODD OR EVEN 
//--------------------------------------------------------------------------------------------
// Odd or Even Quiz Elements
const btnsOddEvenStart = document.getElementById("btn-odd-even-start");
const oddEvenQuizIntro = document.getElementById("odd-even-intro");
const oddEvenQTracker = document.getElementById("odd-even-Q-tracker");
const oddEvenQuiz = document.getElementById("odd-even-quiz");
const btnGenerateNumber = document.getElementById('generate-number-button');
const numberGenerator = document.getElementById('generate-number-odd-even');
const btnsOddEven = document.getElementById("btns-odd-even");
const btnOdd = document.getElementById("btn-odd");
const btnEven = document.getElementById("btn-even");
const resultOddEven = document.getElementById("result-odd-even");
const finalResultOddEven = document.getElementById("final-result-odd-even");


// Final Number variable
let finalNumber;
// Count variable to keep track of question number
let oddEvenCount = 0;
// Score variable to keep track of users score
let oddEvenScore = 0;


// Start Button Event Listener
btnsOddEvenStart.addEventListener("click", function () {
    // Hide quiz intro
    oddEvenQuizIntro.style.display = "none";
    // Call resetAddQuiz function
    resetOddEvenQuiz();
});

// Generate Number button event listener
btnGenerateNumber.addEventListener('click', () => {
    btnGenerateNumber.disabled = true;  // Disable button
    let currentNumber = 0; // Set variable to store current generated number

    // Generate and display a random number between 1 and 100 every 50 miliseconds
    const interval = setInterval(() => {
        currentNumber = Math.floor(Math.random() * 100) + 1;
        numberGenerator.textContent = currentNumber;
    }, 50);

    // After 3 seconds
    setTimeout(() => {
        clearInterval(interval); // Stop the interval
        // Generate a final number between 1 and 100 and display in number generator
        finalNumber = Math.floor(Math.random() * 100) + 1;
        numberGenerator.textContent = finalNumber;
        btnsOddEven.style.display = "block"; // Show answer buttons
    }, 3000);
});


// Odd button event listener
btnOdd.addEventListener('click', () => {
    // Add selected styling to selected button
    btnOdd.classList.add('selected');
    // Call submitOddEvenAnswer with the answer of 'Odd'
    submitOddEvenAnswer('Odd', btnOdd);
});

// Even button event listener
btnEven.addEventListener('click', () => {
    // Add selected styling to selected button
    btnEven.classList.add('selected');
    // Call submitOddEvenAnswer with the answer of 'Even'
    submitOddEvenAnswer('Even', btnEven);
});


// Function to set up a new quiz question
function resetOddEvenQuiz(){
    oddEvenQuiz.style.display = "block"; // Show quiz container
    btnsOddEven.style.display = "none"; // Hide answer buttons
    btnGenerateNumber.disabled = false; // Enable number generator button
    numberGenerator.textContent = "0"; // Reset text to 0
    resultOddEven.innerText = ""; // Clear the result message
    btnOdd.disabled = false; // Enable Odd button
    btnEven.disabled = false; // Enable Even button
    btnOdd.classList.remove('selected'); // Remove selected styling from odd button
    btnEven.classList.remove('selected'); // Remove selected styling from even button
    btnOdd.classList.remove('correct'); // Remove correct styling from odd button
    btnEven.classList.remove('correct'); // Remove correct styling from even button
    btnOdd.classList.remove('incorrect'); // Remove incorrect styling from odd button
    btnEven.classList.remove('incorrect'); // Remove incorrect styling from even button
    resultOddEven.classList.remove('correct'); // Remove correct styling from result message
    resultOddEven.classList.remove('incorrect'); // Remove incorrect styling from result message
    oddEvenQTracker.innerText = "Question " + (oddEvenCount + 1) + " of 5"; // Update question tracker
}



// Function called when answer is submitted
function submitOddEvenAnswer(oddoreven, clickedButton){
    oddEvenCount++; // Increment by 1
    btnOdd.disabled = true; // Disable Odd Button
    btnEven.disabled = true; // Disable Even Button
    // After 1.5 seconds
    setTimeout(() => {
        let randomNumberOddEven;
        // Remainder operator used to calculate if number is odd or even
        if(finalNumber % 2 == 0){
            randomNumberOddEven = 'Even';
        }else{
            randomNumberOddEven = 'Odd';
        }
        
        // Check if user selected correct button
        if(oddoreven == randomNumberOddEven){
            oddEvenScore++; // Increment score by 1
            resultOddEven.innerText="Correct!"; // Display correct message
            clickedButton.classList.add('correct'); // Add correct styling
            resultOddEven.classList.add('correct'); // Add correct styling to result message   
        }else{
            resultOddEven.innerText="Incorrect!"; // Display incorrect message
            clickedButton.classList.add('incorrect'); // Add incorrect styling
            resultOddEven.classList.add('incorrect'); // Add incorrect styling to result message   


        }
        // After 3 seconds
        setTimeout(() => {
            // If 5 questions have been completed, show final score
            if(oddEvenCount>=5){
                finalResultOddEven.style.display = "block";
                finalResultOddEven.innerText = "DONE! - You scored " + oddEvenScore + "/" + oddEvenCount;
                oddEvenQuiz.style.display = "none"; // Hide quiz
                let quiz3Results = {
                    quizNumber: 3,
                    quizName: 'Odd or Even',
                    quizScore: oddEvenScore
                };
                // Push results of this quiz to the quizResults array
                quizResults.push(quiz3Results);
                if(quizResults.length == 5){
                    // Show complete section and scroll into view
                    sectionComplete.style.display = 'block';
                    sectionComplete.scrollIntoView({behavior: 'smooth'});
                }
            }else{
                // Else reset quiz for next question
                resetOddEvenQuiz();
            }
        }, 3000); 
    }, 1500); 
}










//--------------------------------------------------------------------------------------------
// SHAPES
//--------------------------------------------------------------------------------------------
// Shapes Quiz Elements
const btnShapesStart = document.getElementById("btn-shapes-start");
const shapesQuizIntro = document.getElementById("shapes-intro");
const shapesQTracker = document.getElementById("shapes-Q-tracker");
const shapesQuiz = document.getElementById("container-shapes-quiz");
const quizShapeCanvas = document.getElementById('canvas-shapes-quiz');
const msgResultShapes = document.getElementById("result-shapes");
const finalResultShapes = document.getElementById("final-result-shapes");
const shapeNames = document.querySelectorAll('.shape-name');
const shapeDropZone = document.getElementById('shape-drop-zone');

// Array of shapes
const shapes = ['square', 'circle', 'triangle', 'rectangle', 'oval'];

// Current Shape variable to store current selected shape
let currentShape = '';

// Function to shuffle array of shapes into random order
function shuffleShapes (array) { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 
    
// Variable containing shuffled array of shapes
const shuffledShapes = shuffleShapes(shapes); 

// Count variable to keep track of question number
let shapesCount = 0;

// Score variable to keep track of users score
let shapesScore = 0;


// Start Button Event Listener
btnShapesStart.addEventListener("click", function() {
    shapesQuizIntro.style.display = "none"; // Hide quiz intro
    shapesQuiz.style.display =  "block"; // Show Quiz Container
    // Call resetShapesQuiz function
    resetShapesQuiz();
});


// Function to set up new quiz question
function resetShapesQuiz(){
    shapeDropZone.textContent = "Drop answer here"; // Reset text in drop zone
    msgResultShapes.innerText = ""; // Clear results message
    msgResultShapes.classList.remove('correct'); // Remove correct styling from result message   
    msgResultShapes.classList.remove('incorrect'); // Remove incorrect styling from result message 
    enableDragDrop(); // Call enableDragDrop function
    shapeDropZone.classList.remove("selected"); // Remove selected styling form drop zone
    shapeDropZone.classList.remove('correct'); // Remove correct styling from drop zone
    shapeDropZone.classList.remove('incorrect'); // Remove incorrect styling from drop zone
    shapesQTracker.innerText = "Question " + (shapesCount + 1) + " of 5"; // Update question tracker
    drawShape(quizShapeCanvas); // Call drawShape function and pass the quiz canvas
}



// Function to enable drag and drop
function enableDragDrop() {
    // For each of the draggable shape names
    shapeNames.forEach(shape => {
        shape.draggable = true; // Set as draggable
        shape.classList.remove('shapesDisabled'); // Remove disabled styling
        shape.addEventListener('dragstart', dragStart); // Add dragstart event listener 
    });
    shapeDropZone.addEventListener('dragover', dragOver); // Add dragover event listener to drop zone 
    shapeDropZone.addEventListener('drop', dropShape); // Add drop event listener to drop zone
}

// Function to disable drag and drop
function disableDragDrop() {
    // For each of the draggable shape names
    shapeNames.forEach(shape => {
        shape.draggable = false; // Make non-draggable
        shape.classList.add('shapesDisabled'); // Add disabled styling
        shape.removeEventListener('dragstart', dragStart); // Remove dragstart event listener
    });
    shapeDropZone.removeEventListener('dragover', dragOver); // Remove dragover event listener from drop zone
    shapeDropZone.removeEventListener('drop', dropShape); // Remove drop event listener from drop zone
}

function dragStart(event) {
    // Capture id of dragged element
    event.dataTransfer.setData('text', event.target.id);
}

function dragOver(event) {
    // Prevent default behaviour
    event.preventDefault();
}



function dropShape(event) {
    event.preventDefault(); // Prevent default
    const shapeName = event.dataTransfer.getData('text'); // Get ID of dragged element
    const shapeText = document.getElementById(shapeName).textContent; // Get text content of dragged element
    shapeDropZone.textContent = shapeText; // Set drop zone text as text from dragged element
    shapeDropZone.classList.add("selected"); // Add selected styling to selected shape in drop zone
    shapesCount++; // Increment by 1

    disableDragDrop(); // Call disableDragDrop function

    //After 1.5 seconds
    setTimeout(() => {
        // If text of dragged element = shape currently displayed in canvas
        if (shapeText.toLowerCase() == currentShape) {
            shapesScore ++; // Increment by 1
            msgResultShapes.innerText = 'Correct!'; // Display correct message
            msgResultShapes.classList.add('correct'); // Add correct styling to result message   
            shapeDropZone.classList.add('correct'); // Add correct styling
        } else {
            msgResultShapes.innerText = 'Incorrect!'; // Display incorrect message
            msgResultShapes.classList.add('incorrect'); // Add incorrect styling to result message   
            shapeDropZone.classList.add('incorrect'); // Add correct styling
        }

        setTimeout(() => {
            if(shapesCount>=5){
                finalResultShapes.style.display = "block";
                finalResultShapes.innerText = "DONE! - You scored " + shapesScore + "/" + shapesCount;
                shapesQuiz.style.display = "none"; // Hide quiz
                let quiz4Results = {
                    quizNumber: 4,
                    quizName: 'Shapes',
                    quizScore: shapesScore
                };
                // Push results of this quiz to the quizResults array
                quizResults.push(quiz4Results);
                if(quizResults.length == 5){
                    // Show complete section and scroll into view
                    sectionComplete.style.display = 'block';
                    sectionComplete.scrollIntoView({behavior: 'smooth'});
                }
            }else{
                resetShapesQuiz();
            }
        }, 3000); 
    }, 1500); 


}










//--------------------------------------------------------------------------------------------
// FRACTIONS
//--------------------------------------------------------------------------------------------
// Fraction Quiz Elements
const btnFractionsStart = document.getElementById("btn-fractions-start");
const fractionsQuizIntro = document.getElementById("fractions-intro");
const fractionsQTracker = document.getElementById("fractions-Q-tracker");
const fractionsQuiz = document.getElementById("container-fractions-quiz");
const fractionQuizCanvas = document.getElementById('canvas-fractions-quiz');
const fractionQuizCtx = fractionQuizCanvas.getContext('2d');
const btnQuizQuarter = document.getElementById("btn-quiz-quarter");
const btnQuizHalf = document.getElementById("btn-quiz-half");
const btnQuizThreeQuarters = document.getElementById("btn-quiz-three-quarters");
const btnQuizFull = document.getElementById("btn-quiz-full");
const fractionNames = document.querySelectorAll('.fraction-name');
const resultFractions = document.getElementById("result-fractions");
const finalResultFractions = document.getElementById("final-result-fractions");


// Array of fractions
const fractions = ["1/4", "1/2", "3/4", "1"];

// Random fraction variable to store random fraction for quiz questions
let randomFraction;
let previousFraction = null;
// Count variable to keep track of question number
let fractionCount = 0;
// Score variable to keep track of users score
let fractionsScore = 0;

// Start Button Event Listener
btnFractionsStart.addEventListener("click", function() {
    fractionsQuizIntro.style.display = "none"; // Hide quiz intro
    fractionsQuiz.style.display =  "block"; // Show quiz container
    // Call resetFractionsQuiz function
    resetFractionsQuiz();
});

// Function to set up a new quiz question
function resetFractionsQuiz(){
    // Disable fraction answer buttons
    btnQuizQuarter.disabled = false; 
    btnQuizHalf.disabled = false;
    btnQuizThreeQuarters.disabled = false;
    btnQuizFull.disabled = false
    resultFractions.innerText = ""; // Clear answer input
    resultFractions.classList.remove('correct'); // Remove correct styling from result message   
    resultFractions.classList.remove('incorrect'); // Remove incorrect styling from result message 
    fractionNames.forEach(fraction => {
        fraction.classList.remove('selected'); // Remove selected styling from fraction buttons
        fraction.classList.remove('correct'); // Remove correct styling from fraction buttons
        fraction.classList.remove('incorrect'); // Remove incorrect styling from fraction buttons
    });

    fractionsQTracker.innerText = "Question " + (fractionCount + 1) + " of 5"; // Update question tracker
    // Call drawCircle function to draw circle in quiz canvas
    drawCircle(fractionQuizCanvas, fractionQuizCtx);

    let newFraction;
    // Get random fraction from the freactions array which is not the same as the previous fraction
    do{
        newFraction = fractions[Math.floor(Math.random() * fractions.length)];
    } while (newFraction === previousFraction);
    randomFraction = newFraction;
    previousFraction = randomFraction;

    // Call highlightFraction function to highlight random fraction in the quiz canvas
    highlightFraction(randomFraction, fractionQuizCanvas, fractionQuizCtx);
}

// Quarter Button Event Listener
btnQuizQuarter.addEventListener("click", function () {
    // Add selected styling to selected button
    btnQuizQuarter.classList.add('selected');
    // Call submitFractionAnswer function to submit 1/4 as answer
    submitFractionAnswer("1/4", btnQuizQuarter);
});

// Half Button Event Listener
btnQuizHalf.addEventListener("click", function () {
    // Add selected styling to selected button
    btnQuizHalf.classList.add('selected');
    // Call submitFractionAnswer function to submit 1/2 as answer
    submitFractionAnswer("1/2", btnQuizHalf);
});

// Three quarters Button Event Listener
btnQuizThreeQuarters.addEventListener("click", function () {
    // Add selected styling to selected button
    btnQuizThreeQuarters.classList.add('selected');
    // Call submitFractionAnswer function to submit 3/4 as answer
    submitFractionAnswer("3/4", btnQuizThreeQuarters);
});

// Full Button Event Listener
btnQuizFull.addEventListener("click", function () {
    // Add selected styling to selected button
    btnQuizFull.classList.add('selected');
    // Call submitFractionAnswer function to submit 1 as answer
    submitFractionAnswer("1", btnQuizFull);
});

// Function called when answer is submitted 
function submitFractionAnswer(inputAnswer, clickedButton){
    fractionCount ++; // Increment count by 1
    // Disable answer buttons
    btnQuizQuarter.disabled = true; 
    btnQuizHalf.disabled = true;
    btnQuizThreeQuarters.disabled = true;
    btnQuizFull.disabled = true
    // After 1.5 seconds
    setTimeout(() => {



    // Check selected answer = the random fraction shown
    if(inputAnswer == randomFraction){
        fractionsScore ++; // Increment score by 1
        resultFractions.innerText = 'Correct!'; // Show correct message
        resultFractions.classList.add('correct'); // Add correct styling to result message
        clickedButton.classList.add('correct'); // Add correct styling
    }else{
        resultFractions.innerText = 'Incorrect!'; // Show incorrect message
        resultFractions.classList.add('incorrect'); // Add incorrect styling to result message
        clickedButton.classList.add('incorrect'); // Add incorrect styling
    }
    // After 3 seconds
    setTimeout(() => {
        if(fractionCount>=5){
            // If 5 questions have been completed, show final score
            finalResultFractions.style.display = "block";
            finalResultFractions.innerText = "DONE! - You scored " + fractionsScore + "/" + fractionCount;
            fractionsQuiz.style.display =  "none"; // Hide quiz container
            let quiz5Results = {
                quizNumber: 5,
                quizName: 'Fractions',
                quizScore: fractionsScore
            };
            // Push results of this quiz to the quizResults array
            quizResults.push(quiz5Results);
            if(quizResults.length == 5){
                // Show complete section and scroll into view
                sectionComplete.style.display = 'block';
                sectionComplete.scrollIntoView({behavior: 'smooth'});
            }
        }else{
            // Else reset quiz for next question
            resetFractionsQuiz();
        }
    }, 3000); 
}, 1500); 
}
