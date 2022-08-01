var questions = [
    {
        question: "What is commonly refered to as the skeleton of a web page ?",
        optionA: "Css",
        optionB: "Web APIs",
        optionC: "Javascript",
        optionD: "Html",
        correctOption: "optionD"
    },

    {
        question: "Which Html <tag> is used to attach a link to another website ?",
        optionA: "<div>",
        optionB: "<a>",
        optionC: "<br>",
        optionD: "<src>",
        correctOption: "optionB"
    },

    {
        question: "Which of the following is used in Css to classify an id ?",
        optionA: ".testscore",
        optionB: "testscore",
        optionC: "testscore>",
        optionD: "#testscore",
        correctOption: "optionD"
    },

    {
        question: "Which of the following is not a primitive data type ?",
        optionA: "undefined",
        optionB: "Boolean",
        optionC: "jquerry",
        optionD: "String",
        correctOption: "optionC"
    },

    {
        question: "Which of the following is not an Array method ?",
        optionA: "string",
        optionB: "slice",
        optionC: "push",
        optionD: "sort",
        correctOption: "optionA"
    },

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 5 questions to shuffledQuestions array
//app would be dealing with 5questions per session
    while (shuffledQuestions.length <= 4) {
        var random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //the current question number
let userScore = 0  //display the user score
let wrongAttempt = 0 //amount of wrong answers picked by user
let indexNumber = 0 //will be used to display next question

// function for displaying next question in the array to DOM
//also handles displaying user and quiz information to DOM
function NextQuestion(index) {
    handleQuestions()
    var currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("user-score").innerHTML = userScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    var currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    var currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    var options = document.getElementsByName("option"); //gets all elements in DOM with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('quiz-option').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            userScore++ //adding to user's score
            indexNumber++ //adding 1 to index so has to display next question
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if user picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on user
    setTimeout(() => {
        if (indexNumber <= 4) {
//displays next question as long as index number isn't greater than 4, remember index number starts from 0, so index 4 is question 5
            NextQuestion(indexNumber)
        }
        else {
            handleEndQuiz()//ends quiz if index number greater than 4 meaning we're already at the 5th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    var options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    var options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndQuiz() {
    let remark = null
    let remarkColor = null

    // condition check for user remark and remark color
    if (userScore <= 2) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (userScore >= 3 && playerScore < 4) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (userScore >= 4) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (userScore / 5) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('score-percentage').innerHTML = user-score
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('correct-answers').innerHTML = user-Score
    document.getElementById('quiz-score').style.display = "flex"

}

//closes quiz score, resets quiz and reshuffles questions
function closequizscore() {
    questionNumber = 1
    userScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('quiz-score').style.display = "none"
}

//function to close warning modal
function closequizoption() {
    document.getElementById('quiz-option').style.display = "none"
}