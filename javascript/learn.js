/*
 *File: learn.js
 *-----------------
 *
 * This file contains all the Javascript for the Learn Page.
 *
 */


//--------------------------------------------------------------------------------------------
// COUNT
//--------------------------------------------------------------------------------------------
// Count Elements
const btnCountAdd = document.getElementById("btn-count-add");
const btnCountSub = document.getElementById("btn-count-sub");
const countCounter = document.getElementById("count-counter");
const containerCount = document.getElementById("container-count");


// Function that disables + and - buttons so no more than 20 boxes can be added
function checkCountButtons(){
    if(containerCount.children.length < 1){
        btnCountSub.disabled = true;
    }else if(containerCount.children.length >= 20){
        btnCountAdd.disabled = true;
    }else{
        btnCountSub.disabled = false;
        btnCountAdd.disabled = false;
    }
}

// Function called on load to disable - button
checkCountButtons();

// Function to add a new box to the container
function countAdd() {
    // Create new div, add styling and add to container
    const countItem = document.createElement("div");
    countItem.classList.add("countItem");
    containerCount.appendChild(countItem);
    // Update number in counter
    countCounter.textContent = containerCount.children.length;
    // Disable plus or minus button if applicable
    checkCountButtons();
}

// Function to remove the last box from the container
function countSubtract() {
    // Get last div within container and remove
    const lastCountItem = containerCount.lastElementChild;
    if (lastCountItem) {
        containerCount.removeChild(lastCountItem);
    }
    // Update number in counter
    countCounter.textContent = containerCount.children.length;
    // Disable plus or minus button if applicable
    checkCountButtons();    
}

// On Click, call countAdd function
btnCountAdd.addEventListener("click", function () {
    countAdd();
});

// On Click, call countSubtract function
btnCountSub.addEventListener("click", function () {
    countSubtract();
});










//--------------------------------------------------------------------------------------------
// ADD 
//--------------------------------------------------------------------------------------------
// Add Learn Elements
const btnAddAdd1 = document.getElementById("btn-add-add1");
const btnAddSub1 = document.getElementById("btn-add-sub1");
const btnAddAdd2 = document.getElementById("btn-add-add2");
const btnAddSub2 = document.getElementById("btn-add-sub2");
const addNum1Counter = document.getElementById("add-num1-counter");
const addNum2Counter = document.getElementById("add-num2-counter");
const containerAddNum1 = document.getElementById("container-add-num1");
const containerAddNum2 = document.getElementById("container-add-num2");
const addTotalCounter = document.getElementById("add-total-counter");



// Function that disables + and - buttons so no more than 10 boxes can be added to each container
function checkAddButtons(selectedContainer, selectedAdd, selectedSub){
    if(selectedContainer.children.length < 1){
        selectedSub.disabled = true;
    }else if(selectedContainer.children.length >= 10){
        selectedAdd.disabled = true;
    }else{
        selectedSub.disabled = false;
        selectedAdd.disabled = false;
    }
}

// Function called on load to disable - buttons
checkAddButtons(containerAddNum1, btnAddAdd1, btnAddSub1);
checkAddButtons(containerAddNum2, btnAddAdd2, btnAddSub2);


// Function to update the total counter
function updateTotalCounter() {
    // Get content of counter 1 and counter 2, convert to int and add together
    const addtotal = parseInt(addNum1Counter.textContent) + parseInt(addNum2Counter.textContent);
    addTotalCounter.textContent = addtotal;
}


// Function to add a new box to the container
function addAdd(selectedContainer,selectedCounter, selectedAdd, selectedSub) {
    // Create new div, add styling and add to container
    const countItem = document.createElement("div");
    countItem.classList.add("countItem");
    selectedContainer.appendChild(countItem);
    // Update number in counter
    selectedCounter.textContent = selectedContainer.children.length;
    // Update Total Counter
    updateTotalCounter();
    // Disable plus or minus button if applicable
    checkAddButtons(selectedContainer, selectedAdd, selectedSub);
}

// Function remove the last box from the container
function addSubtract(selectedContainer,selectedCounter, selectedAdd, selectedSub) {
    // Get last div within container and remove
    const lastAddNumber = selectedContainer.lastElementChild;
    if (lastAddNumber) {
        selectedContainer.removeChild(lastAddNumber);
    }
    // Update number in counter
    selectedCounter.textContent = selectedContainer.children.length;
    // Update Total Counter
    updateTotalCounter();
    // Disable plus or minus button if applicable
    checkAddButtons(selectedContainer, selectedAdd, selectedSub);    
}

// On Click, call addAdd function for first number
btnAddAdd1.addEventListener("click", function () {
    addAdd(containerAddNum1, addNum1Counter, btnAddAdd1, btnAddSub1);
});

// On Click, call addAdd function for second number
btnAddAdd2.addEventListener("click", function () {
    addAdd(containerAddNum2, addNum2Counter, btnAddAdd2, btnAddSub2);
});

// On Click, call addSubtract function for first number
btnAddSub1.addEventListener("click", function () {
    addSubtract(containerAddNum1, addNum1Counter, btnAddAdd1, btnAddSub1);
});

// On Click, call addSubtract function for second number
btnAddSub2.addEventListener("click", function () {
    addSubtract(containerAddNum2, addNum2Counter, btnAddAdd2, btnAddSub2);
});










//--------------------------------------------------------------------------------------------
// SHAPES
//--------------------------------------------------------------------------------------------
// Shapes Learn Elements
const learnShapeCanvas = document.getElementById('canvas-shapes-learn');
const btnSquare = document.getElementById("btn-square");
const btnCircle = document.getElementById("btn-circle");
const btnTriangle = document.getElementById("btn-triangle");
const btnRectangle = document.getElementById("btn-rectangle");
const btnOval = document.getElementById("btn-oval");
const btnsShapes = document.querySelectorAll('.btns-shapes');

// Call drawShape function to draw square on learn canvas and make square button appear selected
drawShape(learnShapeCanvas, 'square');
btnSquare.classList.add('selected');

// Function to clear active class styling from shape buttons
function clearSelectedShape(){
    btnsShapes.forEach(button => {
        button.classList.remove('selected');
    });    
}

// Square Button Event Listener
btnSquare.addEventListener("click", function () {
    // Call drawShape function to draw a square on the learn canvas 
    drawShape(learnShapeCanvas, 'square');
    clearSelectedShape();
    btnSquare.classList.add('selected');
});

// Circle Button Event Listener
btnCircle.addEventListener("click", function () {
    // Call drawShape function to draw a circle on the learn canvas 
    drawShape(learnShapeCanvas, 'circle');
    clearSelectedShape();
    btnCircle.classList.add('selected');
});

// Triangle Button Event Listener
btnTriangle.addEventListener("click", function () {
    // Call drawShape function to draw a triangle on the learn canvas 
    drawShape(learnShapeCanvas, 'triangle');
    clearSelectedShape();
    btnTriangle.classList.add('selected');
});

// Rectangle Button Event Listener
btnRectangle.addEventListener("click", function () {
    // Call drawShape function to draw a rectangle on the learn canvas 
    drawShape(learnShapeCanvas, 'rectangle');
    clearSelectedShape();
    btnRectangle.classList.add('selected');
});

// Oval Button Event Listener
btnOval.addEventListener("click", function () {
    // Call drawShape function to draw a oval on the learn canvas 
    drawShape(learnShapeCanvas, 'oval');
    clearSelectedShape();
    btnOval.classList.add('selected');
});










//--------------------------------------------------------------------------------------------
// FRACTIONS
//--------------------------------------------------------------------------------------------
// Fraction Learn Elements
const learnFractionCanvas = document.getElementById('canvas-fractions-learn');
const learnFractionCtx = learnFractionCanvas.getContext('2d');
const btnQuarter = document.getElementById("btn-quarter");
const btnHalf = document.getElementById("btn-half");
const btnThreeQuarters = document.getElementById("btn-three-quarters");
const btnFull = document.getElementById("btn-full");
const btnsFractions = document.querySelectorAll('.btns-fractions');


// Initial draw circle and highlight 1/4 and make button appear selected
drawCircle(learnFractionCanvas, learnFractionCtx);
highlightFraction("1/4", learnFractionCanvas, learnFractionCtx);
btnQuarter.classList.add('selected');

// Function to clear selected class styling from fraction buttons
function clearSelectedFraction(){
    btnsFractions.forEach(button => {
        button.classList.remove('selected');
    });    
}


// Quarter button Event Listener
btnQuarter.addEventListener("click", function () {
    // Call highlighFraction function to show 1/4 on learn canvas
    highlightFraction("1/4", learnFractionCanvas, learnFractionCtx);
    clearSelectedFraction();
    btnQuarter.classList.add('selected');
});

// Half button Event Listener
btnHalf.addEventListener("click", function () {
    // Call highlighFraction function to show 1/2 on learn canvas
    highlightFraction("1/2", learnFractionCanvas, learnFractionCtx);
    clearSelectedFraction();
    btnHalf.classList.add('selected');
});

// Three quarters button Event Listener
btnThreeQuarters.addEventListener("click", function () {
    // Call highlighFraction function to show 3/4 on learn canvas
    highlightFraction("3/4", learnFractionCanvas, learnFractionCtx);
    clearSelectedFraction();
    btnThreeQuarters.classList.add('selected');
});

// Full button Event Listener
btnFull.addEventListener("click", function () {
    // Call highlighFraction function to show 1 on learn canvas
    highlightFraction("1", learnFractionCanvas, learnFractionCtx);
    clearSelectedFraction();
    btnFull.classList.add('selected');
});