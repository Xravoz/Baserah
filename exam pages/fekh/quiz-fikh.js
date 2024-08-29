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
        question: "ماذا سمى النبي صلى الله عليه وسلم المجالس التي يتعلم فيها العلم النافع",
        options: ["مجالس الفقهاء", "رياض الصالحين", "مجالس العلم", "رياض الجنة"],
        correct: "رياض الجنة",
    },
    {
        id: "1",
        question: "ما حكم الشرب في آنية الذهب والفضة",
        options: ["محرم", "جائز", "مباح ولكن بشرط","لا يوجد اختيار صحيح"],
        correct: "محرم",
    },
    {
        id: "2",
        question: "ما حكم استعمال ثياب الكفار",
        options: ["مباح", "غير مباح", "مباح بشرط العلم بعدم نجاستها","لا يوجد اختيار صحيح"],
        correct: "مباح بشرط العلم بعدم نجاستها",
    },
    {
        id: "3",
        question: "هل يجوز المسح على الخفين",
        options: ["نعم يجوز", "لا يجوز", "يجوز ولكن بشرط","لا يوجد اختيار صحيح"],
        correct: "لا يجوز",
    },
    {
        id: "4",
        question: "متى ينوب التيمم عن الماء",
        options: ["إذا عدم الماء فقط", "إذا عدم الماء، إذا كان معه ماء يحتاجه لشرب وطبخ فلو تطهر منه لأضر حاجته", "لا ينوب التيمم عن الماء", "في جميع الأوقات"],
        correct: "إذا عدم الماء، إذا كان معه ماء يحتاجه لشرب وطبخ فلو تطهر منه لأضر حاجته",
    },
    {
        id: "5",
        question: "ما حكم من ترك الصلاة تهاونًا أو كسلًا من غير جحد لوجوبها",
        options: ["عدم رضى الله عنه إلى يوم الدين", "لن يقبل الله توبته", "كفر", "أشرك"],
        correct: "كفر",
    },
    {
        id: "6",
        question: "متى شرع الأذان",
        options: ["في السنة الأولى للهجرة", "في السنة الأولى للبعثة", "في السنة الثانية من الهجرة", "في السنة الثالثة للبعثة"],
        correct: "في السنة الأولى للهجرة",
    },
    {
        id: "7",
        question: "متى يصلي المأموم قاعدًا",
        options: ["ذا كان المأموم مرهقا", "إذا صلى الإمام قاعدًا", "إذا كان المأموم لا يقوى على الوقوف","لا يوجد اختيار صحيح"],
        correct: "إذا صلى الإمام قاعدًا",
    },
    {
        id: "8",
        question: "عدد أركان الصلاة",
        options: ["خمسة", "سبعة", "ثلاثة عشر", "أربعة عشر"],
        correct: "أربعة عشر",
    },
    {
        id: "9",
        question: "كم عدد واجبات الصلاة",
        options: ["8", "9", "5", "4"],
        correct: "8",
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

