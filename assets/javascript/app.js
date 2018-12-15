var btnStart = $("<button>").attr({ "class": "btn btn-default" });
var questionDiv = $("<h2>");
var answerDiv = $("<p>")
var initialTimer = 30;
var timer;
var time;
var totalTime = 0;
var recordTime = 0;
var wins = 0;
var losses = 0;
var ties = 0;
var correctCount = 0;
var incorrectCount = 0;
var qCount = 0;
var correctAnswer;
var userAnswer;
var timerActive = false;
var intervalId;
var activeGame = false;
var scoreboardSwitcher = true;
var gameCount = 0;

var questionContent = [{
        question: "Which of the following actually exist?",
        options: ["Sasquatch", "Chupacrabra", "Jersey Devil", "Loch Ness Monster", "Tarzan"],
        answer: 'Sasquatch',
        userAnswer: '',
        correct: false,
        time: 0,
        bonus: 'Obviously...'
    },
    {
        question: "What is the estimated average height of the Sasquatch population?",
        options: ["7ft 10in", "6ft 0in", "8ft 2in", "6ft 11in", "9ft 1in"],
        answer: '7ft 10in',
        userAnswer: '',
        correct: false,
        time: 0,
        bonus: 'http://www.bigfootencounters.com/biology/henner.htm'
    },
    {
        question: "Was the so-called 'Patterson film' Sasquatch male or female?",
        options: ["Male", "Female", "Unknown"],
        answer: 'Female',
        userAnswer: '',
        correct: false,
        time: 0,
        bonus: 'http://www.bigfootencounters.com/biology/henner.htm'
    },
    {
        question: "How far back do Bigfoot legends date in North America?",
        options: ["at least 3000 years", "2000-3000 years", "1000-2000 years", "500-1000 years", "last 500 years"],
        answer: 'at least 3000 years',
        userAnswer: '',
        correct: false,
        time: 0,
        bonus: 'http://allthatsinteresting.com/bigfoot-facts#2'
    },
    {
        question: "Where do the majority of Bigfoot sightings occur (in the US)?",
        options: ["Pacific NW", "Southeast/Appalacian Mtns", "Midwest", "South FL", "Southwest"],
        answer: 'Pacific NW',
        userAnswer: '',
        correct: false,
        time: 0,
        bonus: 'Abouut 1/3 of all Bigfoot sightings occur in the Pacific Northwest'
    },
    {
        question: "According to the Bigfoot Field Researchers Org, what is the esitmated North American Sasquatch population size?",
        options: ["2000-6000", "3000-8000", "4000-9000", "10,000+", "500-2000"],
        answer: '2000-6000',
        userAnswer: '',
        correct: false,
        time: 0,
        bonus: 'https://www.bfro.net/gdb/show_FAQ.asp?id=415'
    },
    {
        question: "How many Bigfoot sightings have occured in North America that have been reported, investigated, and documented by the Bigfoot Field Researchers Org?",
        options: ["5000-5200", "4000-4200", "3000-3200", "6000-6200", "2000-2200"],
        answer: '5000-5200',
        userAnswer: '',
        correct: false,
        time: 0,
        bonus: '5,149 to be exact'
    },
    {
        question: "What's another name for Sasquatch?",
        options: ["Midnight Whistler", "Skunk Monkey", "Hairy Guy", "Gorrilla Man", "Swamp Creature"],
        answer: 'Midnight Whistler',
        userAnswer: '',
        correct: false,
        time: 0,
        bonus: 'Midnight Whistler is thought to be the earliest North American name of Bigfoot, a term originally coined by the Iroquois Indians'
    },
    {
        question: "What is Bigfoot called in South America?",
        options: ["Mapingauri", "Orang Pendek", "Wendigo", "Almas", "Mono de la Mofeta"],
        answer: 'Mapingauri',
        userAnswer: '',
        correct: false,
        time: 0,
        bonus: 'https://exemplore.com/cryptids/Names-for-Bigfoot-Around-the-World'
    },
    {
        question: "What county in Georgia has the most reported Bigfoot sightings?",
        options: ["White", "Fulton", "Bartow", "Paulding", "Cherokee", "Walker"],
        answer: 'White',
        userAnswer: '',
        correct: false,
        time: 0,
        bonus: 'White County has 11 sightings. Paulding comes in second at 9'
    }
]


window.onload = function() {

    var convertedTimer = convertTime(initialTimer)
    $("#timer").html(convertedTimer)


    updateScoreboard();


    btnStart.text("Start Game");

    answerDiv.html("<p>Hint: For a challenge, click the timer before starting the game!</p>" +
            "<p>Also, click the scoreboard labels to toggle its display between the current game score and overall score record</p>")
        .attr({ "class": "msg" });
    $("#content").append(btnStart, answerDiv);


    btnStart.on("click", function() {
        startGame();
    })

    $("#timer").on("click", function() {
        adjustTimer();
    })

    $("#scoreboard-title").on("click", function() {
        if (!activeGame) {
            if (scoreboardSwitcher) {
                scoreboardSwitcher = false;
            } else {
                scoreboardSwitcher = true;
            }
            updateScoreboard();
        }
    })
}





function adjustTimer() {
    if (!activeGame && scoreboardSwitcher) {
        if (initialTimer > 0) {
            initialTimer -= 5;
        } else {
            initialTimer = 30;
        }
        var convertedTimer = convertTime(initialTimer)
        $("#timer").html(convertedTimer)
    }
}




function startGame() {
    activeGame = true;

    questionContent = shuffle(questionContent)


    nextQuestion()
}




function nextQuestion() {

    startTimer(initialTimer);


    var shuffledOptions = shuffle(questionContent[qCount].options);
    answerDiv.text("");


    correctAnswer = questionContent[qCount].answer;


    questionDiv.text(questionContent[qCount].question);
    $("#content").html(questionDiv);
    $("#title").html("Question " + (qCount + 1) + " of " + questionContent.length);


    for (var i = 0; i < shuffledOptions.length; i++) {
        $("<button>")
            .attr({ "class": "btn btn-default ansBtn", "value": shuffledOptions[i] })
            .text(shuffledOptions[i])
            .appendTo(answerDiv)
            .click(function() {
                userAnswer = this.value;
                questionContent[qCount].userAnswer = userAnswer;
                showResult(userAnswer)
            });
    };


    $("#content").append(answerDiv);
};




function shuffle(array) {
    for (i = 0; i < array.length; i++) {
        var j = Math.floor(Math.random() * array.length)
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array;
}




function showResult(userAnswer) {
    var message;


    if (timerActive) {

        stopTimer();


        if (userAnswer == correctAnswer) {
            questionDiv.text("Correct!");
            message = "You got it! " + userAnswer + " is the correct answer!";
            correctCount++;
            questionContent[qCount].correct = true;


        } else {
            questionDiv.text("Wrong!");
            message = "Your Answer: " + userAnswer + "<br>" + "Correct Answer: " + correctAnswer;
            incorrectCount++;
        }


    } else {
        questionDiv.text("Time's Up!");
        message = "The Correct Answer was " + correctAnswer;
        incorrectCount++;
    }


    if (typeof time != 'number') {
        time = 0;
    }
    questionContent[qCount].time = time;
    totalTime += time;


    $("#content").html(questionDiv);
    $(answerDiv).html(message).appendTo("#content");
    qCount++
    updateScoreboard();


    if (activeGame) {
        setTimeout(nextQuestion, 3000)
    } else {
        setTimeout(gameOver, 3000)
    }
}




function startTimer(startValue) {
    if (!timerActive) {
        timer = startValue;
        intervalId = setInterval(timerCountdown, 1000)
        timerActive = true;
    }
}



function stopTimer() {
    clearInterval(intervalId);
    timerActive = false;
    $("#timer").html("00:00");
}


function timerCountdown() {
    timer--


    var convertedTimer = convertTime(timer)
    $("#timer").html(convertedTimer)


    time = initialTimer - timer


    if (timer === 0) {
        stopTimer();
        userAnswer = "";
        showResult(userAnswer)
    }

}



function convertTime(t) {
    if (t < 10) {
        t = "00:0" + t
    } else {
        t = "00:" + t
    }
    return t;
}




function updateScoreboard() {

    if (scoreboardSwitcher) {

        var convertedTimer = convertTime(initialTimer)
        $("#timer").html(convertedTimer)
        $("#scoreboard-lbl-left").html("HOME");
        $("#scoreboard-lbl-center").html("CLOCK");
        $("#scoreboard-lbl-right").html("AWAY");

        if (correctCount > 9) {
            $("#scoreboard-left").html(correctCount);
        } else {
            $("#scoreboard-left").html("0" + correctCount);
        }

        if (incorrectCount > 9) {
            $("#scoreboard-right").html(incorrectCount);
        } else {
            $("#scoreboard-right").html("0" + incorrectCount);
        }

    } else {
        var convertedRecord = convertTime(recordTime)
        $("#scoreboard-lbl-left").html("WINS");
        $("#scoreboard-lbl-center").html("BEST");
        $("#scoreboard-lbl-right").html("LOSSES");
        $("#scoreboard-left").html(wins)
        $("#timer").html(convertedRecord)
        $("#scoreboard-right").html(losses)
    }

    if (qCount === questionContent.length) {
        activeGame = false;
    }
}



function gameOver() {
    var message;
    var restartMessage = "<p>Don't forget to click the timer if you want to make next round harder or easier!</p>" +
        "<p>Also, click the scoreboard labels to see your overall record!"
    var percent = (Math.round((correctCount / qCount) * 100)) + "%"
    var avgTime = totalTime / qCount

    $("#title").html("Game Over")
    questionDiv.html("Grade: " + percent);
    answerDiv.html("<p><strong>You answered " + correctCount + " out of " + qCount + " questions correctly<br>" +
        "Average Time per Question: " + avgTime + " second(s)</strong></p><br>")



    if (gameCount === 0 || avgTime < recordTime) {
        answerDiv.append("<p>New Record Time! Previous record was " + recordTime + " seconds! </p>");

        recordTime = Math.round(avgTime);
    }



    if (correctCount === incorrectCount) {
        ties++
    } else if (correctCount > incorrectCount) {
        wins++
    } else {
        losses++
    }


    for (i = 0; i < questionContent.length; i++) {
        var result = "<strong>Result: "
        var qc = questionContent[i]

        if (qc.correct) {
            result = result + "Correct!</strong>"


            qc.correct = false;

        } else {
            result = result + "Incorrect</strong>"
        }

        message = "<br>Question " + [i + 1] + ": <i>" + qc.question + "</i><br>" +
            "Correct Answer: " + qc.answer + "<br>" +
            "Your Answer: " + qc.userAnswer + "<br>" +
            "Time: " + qc.time + " seconds <br>" +

            result + "<br>";
        answerDiv.append(message);


        qc.userAnswer = '';
        qc.time = 0;
    }


    btnStart.text("Play Again!").attr({ "id": "reset" })
    $("#restart").append(btnStart, restartMessage).attr({ "class": "msg" })

    btnStart.on("click", function() {
        resetVar();
    })
}



function resetVar() {
    qCount = 0;
    correctCount = 0;
    incorrectCount = 0;
    totalTime = 0;
    gameCount++;
    scoreboardSwitcher = true;
    $("#restart").html("")
    updateScoreboard();
    startGame();
}