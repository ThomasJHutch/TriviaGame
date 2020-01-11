// going to need a timer
// display the timer
// display the question with answers
// 3-5 questions DONE
// clicking one or the other, not both
// can switch answers before submitting
// answer button
// clicking answer button creates the answers at the bottom


var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var qImg = document.getElementById("qImg");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");


// create questions
var questions = [
    {
        imgSrc: "./assets/images/danger.jpg",
        question: "What movie is the song Danger Zone Featured in?",
        choiceA: "The Breakfast Club",
        choiceB: "Fast Times at Ridgemont High",
        choiceC: "Top Gun",
        correct: "C"
    }, {
        imgSrc: "./assets/images/batmanlogo.jpg",
        question: "Who Played as Batman in 1989's Batman?",
        choiceA: "Michael Keaton",
        choiceB: "Tom Cruise",
        choiceC: "Jack Nicholson",
        correct: "A"
    }, {
        imgSrc: "./assets/images/miamivice.jpg",
        question: "What kind of car did James Crockett from Miami Vice Drive?",
        choiceA: "Lamborghini",
        choiceB: "Jaguar",
        choiceC: "Ferrari",
        correct: "C"
    }, {
        imgSrc: "./assets/images/FerrisBueller.jpg",
        question: "Life moves pretty fast. If you don't slow down once in a while, you might miss it.",
        choiceA: "Star Wars: Return of the Jedi",
        choiceB: "Ferris Bueller's Day Off",
        choiceC: "Back to the Future",
        correct: "B"
    }
];


// create some variables
var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 10; // 10s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0;

// render a question
function renderQuestion() {
    var q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
    alert("you got " + score + "/" + questions.length);
};