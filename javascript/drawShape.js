/*
 *File: drawShape.js
 *-----------------
 *
 * This file contains Javascript used on both the Learn and Quiz pages. It is used to draw different shapes on a canvas
 *
 */

// Function to draw a random shape
function drawShape(selectedCanvas, selectedShape) {
    // Get context of selected Canvas
    const shapeContext = selectedCanvas.getContext('2d');

    // Clear the canvas
    shapeContext.clearRect(0, 0, selectedCanvas.width, selectedCanvas.height);

    // If a shape has not been passed to function
    if(!selectedShape){
        // Get shape from shuffled shapes array - use shapesCount to iterate through
        selectedShape = shuffledShapes[shapesCount];
    }

    // Set current shape as selectedShape
    currentShape = selectedShape;

    //fractions of canvas width and height
    const canvasWidth = selectedCanvas.width;
    const canvasHeight = selectedCanvas.height;
    const sixthOfWidth = canvasWidth / 6;
    const sixthOfHeight = canvasHeight / 6;
    const thirdOfWidth = canvasWidth / 3;
    const thirdOfHeight = canvasHeight / 3;
    const halfOfWidth = canvasWidth / 2;
    const halfOfHeight = canvasHeight / 2;
    const fifthOfHeight = canvasHeight / 5;
    

    // Draw the shape
    switch (selectedShape) {
        case 'square':
            // Square size
            const squareSize = thirdOfWidth * 2;

            // Draw square starting at 1/6th of width and height of canvas with a height and width of 2/3 height and width
            shapeContext.fillStyle = '#fd6666'; // Set color of shape
            shapeContext.fillRect(sixthOfWidth, sixthOfHeight, squareSize, squareSize);
            break;
        case 'circle':        
            // Draw circle with centre at centre of canvas and radious of 1/3 of canvas
            shapeContext.beginPath();
            shapeContext.arc(halfOfWidth, halfOfHeight, thirdOfWidth, 0, 2 * Math.PI, false);
            shapeContext.fillStyle = '#9370db'; // Set color of shape
            shapeContext.fill();
            break;
        case 'triangle':
            // Draw triangle - starting at top point at half of width and 1/6 of height
            // Bottom left point of 1/6 of width and 5/6 of height
            // Bottom right point of 5/6 of width and 5/6 of height
            shapeContext.beginPath();
            shapeContext.moveTo(halfOfWidth, sixthOfHeight); // Vertex at the top
            shapeContext.lineTo(sixthOfWidth, canvasHeight - sixthOfHeight); // Bottom left vertex
            shapeContext.lineTo(canvasWidth - sixthOfWidth, canvasHeight - sixthOfHeight); // Bottom right vertex
            shapeContext.closePath();
            shapeContext.fillStyle = '#00c853'; // Set color of shape
            shapeContext.fill();
            break;
        case 'rectangle':
            // Draw Rectangle starting at 1/6th of width and 1/3rd of height with a width of 2/3rds and height of 1/3rd
            shapeContext.fillStyle = '#ffd700'; // Set color of shape
            shapeContext.fillRect(sixthOfWidth, thirdOfHeight, thirdOfWidth*2, thirdOfHeight);
            break;
        case 'oval':
            //Draw Oval with centre at 1/2 of canvas width and 1/2 of canvas height. X radius of 1/3rd of width and Y radius of 1/5th of height
            shapeContext.beginPath();
            shapeContext.fillStyle = '#fd66b2'; // Set color of shape
            shapeContext.ellipse(halfOfWidth, halfOfHeight, thirdOfWidth, fifthOfHeight, 0, 0, Math.PI);
            shapeContext.fill();
            shapeContext.closePath();

            shapeContext.beginPath();
            shapeContext.fillStyle = '#fd66b2'; // Set color of shape
            shapeContext.ellipse(halfOfWidth, halfOfHeight, thirdOfWidth, fifthOfHeight, 0, 0, Math.PI, true);
            shapeContext.fill();
            shapeContext.closePath();
        default:
            break;
    }
}