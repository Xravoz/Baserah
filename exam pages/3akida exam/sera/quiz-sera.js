const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');

hamburgerMenu.addEventListener('click', () => {
    menu.classList.toggle('active');
});
window.onscroll = function () { updateProgressBar() };

function updateProgressBar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
}

document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('.about-section');
    const aniCards = document.querySelector('.ani-cards');

    function checkVisibility(element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            element.classList.add('visible');
        }
    }

    function onScroll() {
        checkVisibility(aboutSection);
        checkVisibility(aniCards);
        checkVisibility(test-main);
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Check visibility on page load
});







//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "كم عدد إخوة رسول الله - صلى الله عليه وسلم - من الرضاعة؟",
        options: ["اثنان", "ثلاثة", "أربعة", "واحد"],
        correct: "ثلاثة",
    },
    {
        id: "1",
        question: "كم كان عمر رسول الله - صلى الله عليه وسلم - عند وفاة أمه آمنة؟",
        options: ["خمس سنوات", "سبع سنوات", "أربع سنوات", "ست سنوات"],
        correct: "ست سنوات",
    },
    {
        id: "2",
        question: "كم كان عمر رسول الله - صلى الله عليه وسلم - عند وفاة جده عبد المطلب؟",
        options: ["8", "12", "7", "14"],
        correct: "8",
    },
    {
        id: "3",
        question: "كم كان عمر رسول الله - صلى الله عليه وسلم - عندما بعثه الله تعالى بالرسالة؟",
        options: ["20", "35", "40", "45"],
        correct: "40",
    },
    {
        id: "4",
        question: "متى وقعت معركة بدر؟",
        options: ["السنة الثانية من الهجرة", "السنة الثالثة من الهجرة", "السنة الرابعة من الهجرة", "السنة الخامسة من الهجرة"],
        correct: "السنة الثانية من الهجرة",
    },
    {
        id: "5",
        question: "ما هي السنة اللي وقعت فيها غزوة مؤتة؟",
        options: ["السنة السابعة", "السنة الثامنة", "السنة التاسعة", "السنة العاشرة"],
        correct: "السنة الثامنة",
    },
    {
        id: "6",
        question: "كم عدد أولاد الرسول - صلى الله عليه وسلم - الذكور؟",
        options: ["ستة", "اربعة", "خمسة", "ثلاثة"],
        correct: "ثلاثة",
    },
    {
        id: "7",
        question: "كم عدد أولاد الرسول - صلى الله عليه وسلم - الإناث ؟",
        options: ["ستة", "أربعة", "خمسة", "ثلاثة"],
        correct: "أربعة",
    },
    {
        id: "8",
        question: "من هي آخر زوجات رسول الله ؟",
        options: ["ميمونة بنت الحارث", "خديجة", "حفصة", "فاطمة"],
        correct: "ميمونة بنت الحارث",
    },
    {
        id: "9",
        question: "كم مرة حجّ رسول الله ؟",
        options: ["مرة واحدة", "مرتان", "ثلاث مرات", "اربع مرات"],
        correct: "مرة واحدة",
    }, 
   
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                " الدرجة النهائية " + scoreCount + " من " + questionCount;

            // Check if the user scored maximum points
            if (scoreCount === quizArray.length) {
                // Display celebration and certificate button
                let celebrationMessage = document.createElement("p");
                celebrationMessage.innerHTML = "تهانينا! لقد حصلت على الدرجة النهائية!";
                scoreContainer.appendChild(celebrationMessage);

                let certificateButton = document.createElement("button");
                certificateButton.innerHTML = "استلم الشهادة من هنا";
                certificateButton.onclick = function() {
                    // Redirect to certificate URL or handle certificate logic here
                    window.location.href = "/cer.html"; // Change URL as needed
                };
                scoreContainer.appendChild(certificateButton);
            }

            // Add confetti celebration only if score is 5 or more
            if (scoreCount >= 5) {
                confetti({
                    particleCount: 100,
                    spread: 1000,
                    origin: { y: 0.6 }
                });
            }
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);


//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};

