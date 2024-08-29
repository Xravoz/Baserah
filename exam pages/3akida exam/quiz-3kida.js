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
        question: "ماهي الأصول التي يجب على الإنسان معرفتها؟",
        options: ["معرفة العبد ربه ودينه فقط", "معرفة العبد ربه ودينه ونبيه محمد", "معرفة العبد ربه ودينه ونبيه وملائكته", "معرفة العبد ربه"],
        correct: "معرفة العبد ربه ودينه ونبيه وملائكته",
    },
    {
        id: "1",
        question: "بُني الدين على",
        options: ["ثلاثة أركان", "أربع أركان", "ستة أركان", "خمسة أركان"],
        correct: "خمسة أركان",
    },
    {
        id: "2",
        question: "ما هو الإيمان؟",
        options: [" أن تؤمن بالله وباليوم الآخر", "أن تعبد الله كأنك تراه", "أن تؤمن بما أنزل الله على نبينا محمد صلى الله عليه وسلم", "أن تؤمن بالله وملائكته وكتبه ورسله واليوم الآخر وتؤمن بالقدر خيره وشره"],
        correct: "أن تؤمن بالله وملائكته وكتبه ورسله واليوم الآخر وتؤمن بالقدر خيره وشره",
    },
    {
        id: "3",
        question: "ما المقصود بالإحسان؟",
        options: ["هو ان تحسن إلى من أذاك وأساء إليك", "أن تحسن ف عملك وحياتك", "أن تعبد الله كأنك تراه", "أن تحسن من عباداتك وتزيدها ليحبك الله"],
        correct: "أن تعبد الله كأنك تراه",
    },
    {
        id: "4",
        question: "بأي شيء نُبئ رسولنا، و بأي شيء أُرسل",
        options: ["أُرسل بالفاتحة ونُبئ بالمدثر", "نُبئ بالمدثر، وأُرسل باقرأ", "نُبئ باقرأ، وأُرسل بالفاتحة", "نُبئ باقرأ، وأُرسل بالمدثر"],
        correct: "نُبئ باقرأ، وأُرسل بالمدثر",
    },
    {
        id: "5",
        question: "ما الفرق بين توحيد الربوبية وتوحيد الألوهية؟",
        options: ["توحيد الربوبية فعل الرب، توحيد الالوهية فعل العبد", "توحيد الربوبية فعل الرب، توحيد الالوهية فعل الرب", "توحيد الربوبية فعل العبد، توحيد الالوهية فعل الإله", "توحيد الربوبية فعل الرب، توحيد الالوهية فعل الملائكة"],
        correct: "توحيد الربوبية فعل الرب، توحيد الالوهية فعل العبد",
    }, {
        id: "6",
        question: "ما أجلّ أمْر أمَر الله به، وأعظم نهْي نهَى الله عنه مع الترتيب",
        options: ["عدم الشرك به، عدم توحيده بالعباه", "توحيده بالعبادة، عدم الشرك به", "توحيده بالعباده، عدم ترك الصلاة", "توحيده بالعبادة، الشرك به"],
        correct: "توحيده بالعبادة، الشرك به",
    },
    {
        id: "7",
        question: "أول ما فرض الله علينا",
        options: ["الصلاة", "الكفر بالطاغوت والإيمان بالله", "حسن الخلق", "نطق الشهادة"],
        correct: "الكفر بالطاغوت والإيمان بالله",
    },
    {
        id: "8",
        question: "اذكر المرتبة الثانية من مراتب دين الإسلام، وأفضل الأعمال بعد الشهادتين مع الترتيب",
        options: ["الإيمان، الصلوات الخمسة", "التوحيد، الإيمان", "الإحسان، الصلوات الخمسة", "الإيمان، الزكاة"],
        correct: "الإيمان، الصلوات الخمسة",
    },
    {
        id: "9",
        question: " كم شعب الإيمان",
        options: ["خمسون شعبة", "بضع وثلاثون شعبة", "ستون شعبة", "بضع وسبعون شعبة"],
        correct: "بضع وسبعون شعبة",
    },
    {
        id: "10",
        question: "المرتبة الثالثة من مراتب دين الإسلام",
        options: ["الإيمان", "الصدق", "الإحسان", "حسن الخلق"],
        correct: "الإحسان",
    },
    {
        id: "11",
        question: "عدد أنواع الشرك",
        options: ["ثلاثة", "أربعه", "اثنان", "خمسة"],
        correct: "ثلاثة",
    },
     {
        id: "12",
        question: "الكفر الذي يخرج صاحبه من الملة كم نوع؟",
        options: ["ثلاثة", "أربعه", "اثنان", "خمسة"],
        correct: "خمسة",
    },
      {
        id: "13",
        question: "الكفر الذي لا يخرج عن الملة",
        options: ["كفر التكذيب", "كفر النعمة", "كفر الشك", "كفر الإعراض"],
        correct: "كفر النعمة",
    },
       {
        id: "14",
        question: "كم أركان الإيمان",
        options: ["خمسة", "واحد", "ستة", "سبعة"],
        correct: "ستة",
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



