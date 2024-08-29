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
        question: "كم عدد آيات سورة التكوير",
        options: ["34", "28", "29", "36"],
        correct: "29",
    },
    {
        id: "1",
        question: "ما هي السورة التي تأتي قبل سورة الجن",
        options: ["التين", "الحجرات", "نوح", "الحشر"],
        correct: "نوح",
    },
    {
        id: "2",
        question: "في أي سورة تقع الآية: الذي جمع مالا وعدده؟",
        options: ["الهُمَزة", "مُحمد", "المَائدة", "العَنكبُوت"],
        correct: "الهُمَزة",
    },
    {
        id: "3",
        question: "في أي سورة تقع الآية: بأن ربك أوحى لها؟",
        options: ["المؤمنُون", "الشُّوري", "الجاثِية", "الزَّلزَلة"],
        correct: "الزَّلزَلة",
    },
    {
        id: "4",
        question: "في أي سورة تقع الآية: إن في خلق السموات والأرض واختلاف الليل والنهار والفلك التي تجري في البحر بما ينفع الناس وما أنزل الله من السماء من ماء فأحيا به الأرض بعد موتها وبث فيها من كل دابة وتصريف الرياح والسحاب المسخر بين السماء والأرض لآيات لقوم يعقلون؟",
        options: ["الكَوثر", "التَّحرِيم", "الفِيل", "البَقَرَة"],
        correct: "البَقَرَة",
    },
    {
        id: "5",
        question: "في أي سورة تقع الآية: فإذا لقيتم الذين كفروا فضرب الرقاب حتى إذا أثخنتموهم فشدوا الوثاق فإما منا بعد وإما فداء حتى تضع الحرب أوزارها ذلك ولو يشاء الله لانتصر منهم ولكن ليبلو بعضكم ببعض والذين قتلوا في سبيل الله فلن يضل أعمالهم؟",
        options: ["الفُرقَان", "القَصَص", "الشَّمس", "مُحمد"],
        correct: "مُحمد",
    }, {
        id: "6",
        question: "في أي سورة تقع الآية: بل متعنا هؤلاء وآباءهم حتى طال عليهم العمر أفلا يرون أنا نأتي الأرض ننقصها من أطرافها أفهم الغالبون؟",
        options: ["الأنبيَاء", "الأنفَال", "الشُّوري", "الكَوثر"],
        correct: "الأنبيَاء",
    },
    {
        id: "7",
        question: "في أي سورة تقع الآية: ذلك بأنهم شاقوا الله ورسوله ومن يشاقق الله ورسوله فإن الله شديد العقاب؟",
        options: ["المَسَد", "الأنفَال", "المؤمنُون", "طه"],
        correct: "الأنفَال",
    },
    {
        id: "8",
        question: "ما هو ترتيب (نزول) سورة الطور؟",
        options: ["73", "75", "2", "76"],
        correct: "76",
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
            if (scoreCount >= 4) {
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

