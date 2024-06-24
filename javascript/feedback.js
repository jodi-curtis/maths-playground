/*
 *File: feedback.js
 *-----------------
 *
 * This file contains all the Javascript for the Feedback Page. It updates the number displayed on screen when the sliders are 
 * moved and handles the form submission 
 *
 */


// Feeback elements
const slider1 = document.getElementById("slider1");
const slider2 = document.getElementById("slider2");
const slider3 = document.getElementById("slider3");
const slider4 = document.getElementById("slider4");
const sliderValue1 = document.getElementById("slider1Value");
const sliderValue2 = document.getElementById("slider2Value");
const sliderValue3 = document.getElementById("slider3Value");
const sliderValue4 = document.getElementById("slider4Value");
const form = document.getElementById('feedback-form');
const feedbackSubmittedDiv = document.getElementById('feedback-submitted-div');
const feedbackDiv = document.getElementById('feedback-div');


sliderValue1.textContent = slider1.value;
sliderValue2.textContent = slider2.value;
sliderValue3.textContent = slider3.value;
sliderValue4.textContent = slider4.value;


// When sliders are changed, update number value of slider
slider1.addEventListener('input', () => {
    sliderValue1.textContent = slider1.value;
});

slider2.addEventListener('input', () => {
    sliderValue2.textContent = slider2.value;
});

slider3.addEventListener('input', () => {
    sliderValue3.textContent = slider3.value;
});

slider4.addEventListener('input', () => {
    sliderValue4.textContent = slider4.value;
});


// On form submit
form.addEventListener('submit', function(event) {
    // Prevent default, hide feeback div and show submitted feedback div
    event.preventDefault();
    feedbackDiv.style.display="none";
    feedbackSubmittedDiv.style.display = "block";
});