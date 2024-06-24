/*
 *File: fractionsFunctions.js
 *-----------------
 *
 * This file contains Javascript used on both the Learn and Quiz pages. It is used to highlight different fractions of a circle on a canvas
 *
 */


// Function to draw the circle
function drawCircle(selectedCanvas, selectedCtx) {
    const fractionWidth = selectedCanvas.width;
    const fractionHeight = selectedCanvas.height;
    const radius = fractionWidth / 3;
    const centerX = fractionWidth / 2;
    const centerY = fractionHeight / 2;
    // Clear canvas
    selectedCtx.clearRect(0, 0, fractionWidth, fractionHeight);
    selectedCtx.beginPath();
    // Draw circle with centre at centre of canvas and radius of 1/3rd of width
    selectedCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    selectedCtx.stroke();
}

// Function to highlight a part of the circle
function highlightArc(startAngle, endAngle, selectedCanvas, selectedCtx) {
    const fractionWidth = selectedCanvas.width;
    const fractionHeight = selectedCanvas.height;
    const radius = fractionWidth / 3;
    const centerX = fractionWidth / 2;
    const centerY = fractionHeight / 2;
    drawCircle(selectedCanvas, selectedCtx);
    selectedCtx.beginPath();
    selectedCtx.moveTo(centerX, centerY);
    selectedCtx.arc(centerX, centerY, radius, startAngle, endAngle);
    selectedCtx.closePath();
    selectedCtx.fillStyle = '#82DDF0'; // Set color of fraction
    selectedCtx.fill();
}

// Functions for button clicks
function highlightFraction(fraction, selectedCanvas, selectedCtx){
    switch(fraction){
    case "1/4":
        highlightArc(0, 0.5 * Math.PI, selectedCanvas, selectedCtx);
        break;
    case "1/2":
        highlightArc(0, Math.PI, selectedCanvas, selectedCtx);
        break;
    case "3/4":
        highlightArc(0, 1.5 * Math.PI, selectedCanvas, selectedCtx);
        break;
    case "1":
        highlightArc(0, 2 * Math.PI, selectedCanvas, selectedCtx);
        break;
    }
}

