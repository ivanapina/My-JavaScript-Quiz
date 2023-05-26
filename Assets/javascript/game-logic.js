var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var score = 0;
var container = document.querySelector("#container");
var quizContent = document.querySelector("#quizContent");

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

var countdown = function(num){
    

    for (var i=num; i > 0; i--) {

       console.log(i)

    }
}

var countdown = 75;

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

// This fuction creates a new question
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
// Function to check if answer is correct 
function checkAns(event) {
        var choice = event.target;
        quizContent.appendChild(newDiv);
        newDiv.appendChild(feedback);
        var next = document.createElement("button");
        next.setAttribute("id", "nextButton");
        next.textContent = "Next Question";

// Condition for correct answer
    if (choice.textContent == questions[questionIndex].answer) {
        score++;
        feedback.textContent = "Correct!";
        newDiv.appendChild(feedback);
        
        newDiv.appendChild(next);
        next.addEventListener("click", (movingOn));
// Condition for wrong answer
    } else {
        countdown = countdown - penalty;
        feedback.textContent = "Wrong!";
        newDiv.appendChild(feedback);
    }
}

// Function next question
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
// High scores page
    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "Finished!"
    quizContent.appendChild(newH1);


// Condition for final score
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

// Initials submission
    var initialsSub = document.createElement("label");
    initialsSub.setAttribute("for", "inputBox");
    initialsSub.textContent = "Enter your initials: ";
    quizContent.appendChild(initialsSub);

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

// Event listener for initial submission
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

