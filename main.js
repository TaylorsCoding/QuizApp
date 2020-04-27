$(document).ready(function () {
    activateStart();

});


let usedQuestions = [];//Addressing the global variables. They are empty arrays to hold the questions that have been used so I dont pull up the same question more than once.
let gotCorrect = [];//This line is the same as above
let currentQuestion;
function activateStart() {
    let start = $('#startButton');
    start.on('click', function () {
        let submit = $('#submitButton');
        $(submit).show();
        $(this).hide();
        getQuestion();

    });
}

function getQuestion() {
    $('#submitButton').show();

    let questionNumber = randomNumber()
    currentQuestion = questionNumber;
    let questionObj = STORE[questionNumber];
    let question = questionObj.question;
    let choices = questionObj.answers;
    let questionContainer = $('#question p').first()
    let answerContainer = $('#question ul').first()

    $(questionContainer).html('')
    $(answerContainer).html('')
    $('.mainArea').show()
    $(questionContainer).text(question)
    $.each(choices, function (i, choice) {

        //label attribute
        let choiceContent = `<li><input id='${i}' type="radio" name='choice'value='${choice}'>${choice}</input></li>`;
        $(answerContainer).append(choiceContent);


    })
    $('form input[name="choice"]').prop("disabled", false);
    showScore();
    activateSubmit()
}
function randomNumber() {

    let randomNumber = Math.floor(Math.random() * STORE.length);

    while (!saveQuestions(randomNumber)) {
        randomNumber = Math.floor(Math.random() * STORE.length);
    }

    usedQuestions.push(randomNumber);
    return randomNumber;

}
function saveQuestions(questionNumber) {

    let askedBefore = usedQuestions.includes(questionNumber)

    if (askedBefore) {
        return false;
    }
    else {
        return true;
    }
}



function checkAnswers() {
    const userChoice = getUserChoice();
    const question = STORE[currentQuestion];
    const answer = question.correctAnswer;

}

function getUserChoice() {
    const correctImg = $("#correct")
    const incorrectImg = $("#incorrect")
    $('#submitButton').on("click", function () {

        if (STORE[0].correctAnswer === $("#correct"))

            return $("#correct");

        else {
            return $("#incorrect");
        }
    });
}

function activateSubmit() {
    let button = $('#submitButton');

    let form = $('#mainForm')
    form.on('submit', function (event) {
        event.preventDefault()
        let userChoice = $('input[name=choice]:checked', 'form').val()

        disableChoices()

            ;

        if (typeof userChoice == 'undefined') {
            alert("Choose an option");
            return;
        }
        if (userChoice === STORE[currentQuestion].correctAnswer) {
            let answerDisplay = $('#results');
            answerDisplay.empty();
            answerDisplay.append(correctImage());
            answerDisplay.append(`<p> That's correct. The correct answer is ${STORE[currentQuestion].correctAnswer}</p>`);
            gotCorrect.push(currentQuestion);
            $('#submitButton').hide();

        }
        else {
            let answerDisplay = $('#results');
            answerDisplay.empty();
            answerDisplay.append(incorrectImage());

            answerDisplay.append(`<p>Thats wrong. The correct answer is ${STORE[currentQuestion].correctAnswer}</p>`)

            $('#submitButton').hide();
        }
        $('form input[name="choice"]').prop("disabled", true);
        showScore();
        let answerDisplay = $('#results');
        answerDisplay.append('<button id="next">Next</button>');
        $('#next').on('click', function () {
            answerDisplay.empty()
            if (usedQuestions.length + 1 > STORE.length) {
                gameOver();
            } else {
                getQuestion();
            }
        })
    })

}

function disableChoices() {
    let choices = $('#question ul li input')
    $.each(choices, function (i, choice) {
        $(choice)
    })
}
function correctImage() {
    return '<img src="./correct.png" id="correct" alt="Correct" height="" width="">'
}

function incorrectImage() {
    return '<img src="./incorrect.png" id="incorrect" alt="incorrect" height="" width="">'
}


function questionNumber() {
    return `${usedQuestions.length}/${STORE.length}`
}

function currentScore() {
    return `${gotCorrect.length}/${STORE.length}`;
}

function showScore() {
    $('#currentQ').text(questionNumber());
    $('#score').text(currentScore());
}

function gameOver() {
    $('#score').text(currentScore());
    $('.mainArea').hide()
    $('#gameOver').html('')
    $('#gameOver').append(`<h3>Game Over. You got a score of ${gotCorrect.length}/${STORE.length}<h3>`)
    $('#gameOver').append('<button id="restartButton">Restart Quiz</button>');
    $('#gameOver').show();
    resetScore();
    restartGame();
}
function restartGame() {
    let restart = $('#restartButton');
    restart.on('click', function () {
        $('#gameOver').hide();

        getQuestion();
    })
}

function resetScore() {
    usedQuestions = []
    gotCorrect = []

}



function checkGame() {
    if (usedQuestions.length + 1 > STORE.length) {
        gameOver()
    }
}
