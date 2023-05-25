var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#start");

// 
var score = 0;
var container = document.querySelector("#container");
var quizContent = document.querySelector("#quizContent");
var questionTitle = document.querySelector("#qTitle")
//

var countdown = function(num){
    

    for (var i=num; i > 0; i--) {

       console.log(i)

    }
}

var countdown = 75;

// 
var questionIndex = 0;

var createList = document.createElement("ul");
createList.setAttribute("id", "optionsUl")

var timeInterval = 0;
var countdown = 75;
var penalty = 10;

startBtn.addEventListener("click", function() {
    if (timeInterval === 0) {
        timeInterval = setInterval(function() {
            countdown--;
            timer.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(timeInterval);
                theEnd();
            }
        }, 1000);
    }
    newQuestion(questionIndex)
});


////

var score = 0;
var container = document.querySelector("#container");
var quizContent = document.querySelector("#quizContent");
var questionTitle = document.querySelector("#qTitle")
var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#start");

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ['strings','booleans', 'alerts','numbers'],
        answer: 'alerts',
    },
    {
        question: "The condition in an if / else statement is enclosed within ________",
        choices: ['quotes','curly brackets','parentheses','square brackets'],
        answer: 'parentheses',
    },  {
        question: "Arrays in JavaScroipt can be used to store ______",
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 'all of the above',
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ['commas', 'curly brackets', 'quotes', 'parantheses'],
        answer: 'curly brackets',
    },
    {
        question: "A very useful tool used during development and debbuging for printing content to the debugger is:",
        choices: ['JavaScript', 'terminal/bash', 'for loops', 'console log'],
        answer: 'console log',
    }
];
var questionIndex = 0;

var createUl = document.createElement("ul");
createUl.setAttribute("id", "optionsUl")

var timeInterval = 0;
var countdown = 75;
var penalty = 10;

startBtn.addEventListener("click", function() {
    if (timeInterval === 0) {
        timeInterval = setInterval(function() {
            countdown--;
            timer.textContent = "Time: " + countdown;
            if (countdown <= 0) {
                clearInterval(timeInterval);
                theEnd();
            }
        }, 1000);
    }
    newQuestion(questionIndex)
});

// generates a new question
function newQuestion(questionIndex) {
    quizContent.innerHTML = "";
    createUl.innerHTML = "";
    var displayQuestion = document.createElement("h2");

    for (var i = 0; i < questions.length; i++) {
        displayQuestion.innerHTML = questions[questionIndex].question;
        var displayChoices = questions[questionIndex].choices;
        quizContent.appendChild(displayQuestion);
    }
    console.log(displayChoices);
    displayChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.innerHTML += "<button>" + newItem + "</button>";
        quizContent.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (checkAns));
    })
}

var i = 0;
var newDiv = document.createElement("div");
var feedback = document.createElement("h3");
newDiv.setAttribute("id", "newDiv");
// checks to see if selected answer is correct & inserts feedback (correct/incorrect)
function checkAns(event) {
        var choice = event.target;
        quizContent.appendChild(newDiv);
        newDiv.appendChild(feedback);
        var next = document.createElement("button");
        next.setAttribute("id", "nextButton");
        next.textContent = "Next Question";

// condition that selected answer is correct
    if (choice.textContent == questions[questionIndex].answer) {
        score++;
        feedback.textContent = "Correct!";
        newDiv.appendChild(feedback);
        
        newDiv.appendChild(next);
        next.addEventListener("click", (movingOn));
//condition that the selected answer is incorrect
    } else {
        countdown = countdown - penalty;
        feedback.textContent = "Wrong!";
        newDiv.appendChild(feedback);
    }
}
// Decides whether to initiate final pages or to cycle through next question
function movingOn(event) {
    newDiv.innerHTML = "";
    questionIndex++;
    if (questionIndex >= questions.length) {
        theEnd();
    } else {
        newQuestion(questionIndex);

    }
}


function theEnd() {
    quizContent.innerHTML = "";
    timer.innerHTML = "";
// Sets up high score page
    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "Finished!"
    quizContent.appendChild(newH1);


// Calculation and display of final score
    if (countdown >= 0) {
        score = countdown;
        clearInterval(timeInterval);
        var newP = document.createElement("p");
        newP.textContent = "Your final score is: " + score;
        quizContent.appendChild(newP);
    } else {
        score = 0;
        var outOfTime = document.createElement("h2");
        outOfTime.textContent = "Time is up!";
        quizContent.appendChild(outOfTime);
        var newP = document.createElement("p");
        newP.textContent = "Your final score is: " + score;
        quizContent.appendChild(newP);
    }

// Initials submission box and button
    var initialsPrompt = document.createElement("label");
    initialsPrompt.setAttribute("for", "inputBox");
    initialsPrompt.textContent = "Enter your initials: ";
    quizContent.appendChild(initialsPrompt);

    var inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("id", "inputBox")  
    inputBox.textContent = "";
    quizContent.appendChild(inputBox)
    
    var submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";
    quizContent.appendChild(submit);

// Event listener for submission button and storage initials and score
    submit.addEventListener("click", function() {
        var initials = inputBox.value;

        if (initials === "") {
            console.log("No initials entered")
            window.alert("Please enter your initials");

        } else {
            var finalScore = {
                initials: initials,
                score: score
            }
    // Storage of past scores
            var storeScores = localStorage.getItem("storeScores");
            if (storeScores === null) {
                storeScores = [];
            } else {
                storeScores = JSON.parse(storeScores);
            }
            storeScores.push(finalScore);
            var newScore = JSON.stringify(storeScores);
            localStorage.setItem("storeScores", newScore);
            window.location.replace("highscores.html");
        }
    });
};