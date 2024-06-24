/*
 *File: results.js
 *-----------------
 *
 * This file contains all the Javascript for the Results Page.
 *
 */

const bestScore = document.getElementById("best-result");
const worstScore = document.getElementById("worst-result");
const allSameScore = document.getElementById("same-result");
const totalResult = document.getElementById("total-result");


// Get the URL parameter passed from quiz page
const urlParams = new URLSearchParams(window.location.search);
const serializedArray = urlParams.get('varName');

// Decode and parse the serialized array
const myArray = JSON.parse(decodeURIComponent(serializedArray));

// Sort array by quiz number
myArray.sort(function(a, b){return a.quizNumber - b.quizNumber});

// Select the table body where the rows will be added
const tableBody = document.querySelector('table tbody');

// Variable to store total score of all quizzes
let totalScore = 0;

// Iterate over each object in the array and create a table row
myArray.forEach(item => {
    // Create a new row
    const row = document.createElement('tr');

    // Create cell to display quiz number
    const quizNumCell = document.createElement('td');
    quizNumCell.textContent = item.quizNumber;
    quizNumCell.classList.add('middle');
    row.appendChild(quizNumCell);

    // Create cell to display quiz name
    const quizNameCell = document.createElement('td');
    quizNameCell.textContent = item.quizName;
    row.appendChild(quizNameCell);

    // Create cell to display quiz score
    const quizScoreCell = document.createElement('td');
    quizScoreCell.textContent = item.quizScore + " / 5";
    // If score is greater then 3, add green background
    if(item.quizScore > 3){
        quizScoreCell.style.backgroundColor = '#37975f';
        quizScoreCell.style.color = '#ffffff';
    // If score is less than 3, add red background
    }else if(item.quizScore < 3){
        quizScoreCell.style.backgroundColor = '#fd6666';
        quizScoreCell.style.color = '#ffffff';
    //Else add orange background
    }else{
        quizScoreCell.style.backgroundColor = '#f9b92f';
        quizScoreCell.style.color = '#ffffff';
    }
    quizScoreCell.classList.add('middle');
    row.appendChild(quizScoreCell);

    // Add the row to the table body
    tableBody.appendChild(row);

    // Add quiz total score to overall total score
    totalScore += item.quizScore;
});

// Display total score
totalResult.innerText = "You scored a total of " + totalScore + "/25 questions correct";




// Function to check if every quiz has the same score
function sameScore(score){
    return myArray.every(function(myArray){return myArray.quizScore === score});
}

// If score is 1 or 2 in all quizzes
if(sameScore(1) || sameScore(2)){
    allSameScore.textContent = "You did POORLY in all topics. Spend more time learning!";
// If score is 3 in all quizzes
}else if(sameScore(3)){
    allSameScore.textContent = "You did OK in all topics. A little more practice will help!";
// If score is 4 or 5 in all quizzes
}else if(sameScore(4) || sameScore(5)){
    allSameScore.textContent = "You did FANTASIC in all topics. Well Done!";
// If not all quizes have the same score
}else{
    // Sort array by quiz score
    myArray.sort(function(a, b){return a.quizScore - b.quizScore});
    bestScore.textContent = "You scored highest in the " + myArray[myArray.length-1].quizName + " quiz.";
    worstScore.textContent = "You scored lowest in the " + myArray[0].quizName + " quiz. Spend more time revising this topic";
}




// Google pie chart
google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    // Number of incorrect answers = 25 - number of correct answers
    let incorrect = 25 - totalScore;

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Result');
    data.addColumn('number', 'Score');
    data.addRows([
        ['Correct', totalScore],
        ['Incorrect', incorrect]
    ]);

    // Set chart options
    var options = {'title':'Final Score',
                    'width':350,
                    'height':300,
                    'colors':['green','red']};

    // Draw chart using data and options
    var chart = new google.visualization.PieChart(document.getElementById('chart-div'));
    chart.draw(data, options);
}