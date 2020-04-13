$(document).ready(function () {
    activateStart();

});


let usedQuestions = [];
let gotCorrect = [];
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
    // console.log(gotCorrect)
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

    $(questionContainer).text(question)
    $.each(choices, function (i, choice) {

        let choiceContent = `<li><input id='${i}' type="radio" name='choice'value='${choice}'>${choice}</input></li>`;
        $(answerContainer).append(choiceContent);

    })
    showScore();
    activateSubmit()
}
function randomNumber() {

    let randomNumber = Math.floor(Math.random() * STORE.length);

    while (!saveQuestions(randomNumber)) {
        // need to save it
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
    let userChoice = getUserChoice();
    let question = STORE[currentQuestion];
    let answer = question.correctAnswer;

}

function getUserChoice() {
    let correctImg = $("#correct")
    let incorrectImg = $("#incorrect")
    $('#submitButton').on("click", function () {

        //have to compare similar data types (boolean,string, etc)
        if (STORE[0].correctAnswer === $("#correct"))

            return $("#correct");

        else {
            return $("#incorrect");
        }
    });
}

function activateSubmit() {
    let button = $('#submitButton');
    // $('#submitButton').hide();

    button.off().on('click', function () {
        let userChoice = $('input[name=choice]:checked').val();
        // console.log(userChoice);
        // console.log (STORE[currentQuestion].correctAnswer);
        if (userChoice === STORE[currentQuestion].correctAnswer) {
            let answerDisplay = $('#results');
            answerDisplay.empty();
            answerDisplay.append(correctImage());
            answerDisplay.append(`<p> That's correct. The correct answer is ${STORE[currentQuestion].correctAnswer}</p>`);
            gotCorrect.push(currentQuestion);
            console.log('Correct!')
            $('#submitButton').hide();

        }
        else {
            let answerDisplay = $('#results');
            answerDisplay.empty();
            answerDisplay.append(incorrectImage());

            answerDisplay.append(`<p>Thats wrong. The correct answer is ${STORE[currentQuestion].correctAnswer}</p>`)







            $('#submitButton').hide();


        }
        showScore();
        let answerDisplay = $('#results');
        answerDisplay.append('<button id="next">Next</button>');
        $('#next').on('click', function () {
            answerDisplay.empty()
            if (usedQuestions.length + 1 > STORE.length) {
                gameOver();
            } else {
                console.log(usedQuestions.length, STORE.length)
                getQuestion();
            }
        })
    })

}

function correctImage() {
    return '<img src="./correct.png" id="correct" alt="Correct" height="" width="">'
}

function incorrectImage() {
    return '<img src="./incorrect.png" id="incorrect" alt="incorrect" height="" width="">'
}
//finish this


function questionNumber() {
    return `${usedQuestions.length}/${STORE.length}`
}

function currentScore() {
    // console.log(gotCorrect)
    // console.log("got correct")
    return `${gotCorrect.length}/${STORE.length}`;
}

function showScore() {
    $('#currentQ').text(questionNumber());
    $('#score').text(currentScore());
}

function gameOver() {
    $('#score').text(currentScore());
    $('.mainArea').empty()
    $('.mainArea').append(`<h3>Game Over. You got a score of ${gotCorrect.length}/${STORE.length}<h3>`)
}

//below needs to be fixed
function checkGame() {
    console.log('used', usedQuestions, 'store len', STORE.length)
    if (usedQuestions.length + 1 > STORE.length) {
        gameOver()
    }
}

// `${usedQuestions.length}/${STORE.length}`
// 1/8, 2/8, 3/8