import { quiz_nba } from './questions.js';

/********RECUP HTML********
***********************/
const questionText = document.getElementById('question');
const answersText = document.getElementById('answers');
const nextButton = document.getElementById('next-button');
const replayButton = document.getElementById('replay-button');
const scoreText =  document.getElementById('score-text');
const countdownTimer = document.getElementById('timer');
const progressBar = document.getElementById('progressBar');

/*****INDEX et COMPTEURS***** 
 **************************/
let currentQuestionIndex = 0;
let score = 0; 
let correctButton; // Déclaration variable pour stocker la bonne réponse actuelle
let timer; 
let maxBar = quiz_nba.allQuestions.length;

/******FONCTIONS SECONDAIRES ******
 ********************************/
function checkAnswer(playerChoice, goodAnswer) {
    if (playerChoice == goodAnswer) {
        return true;
    } else {
        return false;
    }
};

function rightAnswer (playerChoice, goodAnswer ) {
    if (playerChoice.innerText == goodAnswer) { // stocke la bonne réponse dans correctButton dès que le foreach tombe dessus
        correctButton = playerChoice;
    }
};

function scoringText () {
    if (score == 0) {
        scoreText.innerText = "Le football est fait pour Toi";
        } else if (score == 1) {
        scoreText.innerText = "Tu mérites d'être sur le banc";
        } else if (score == 2) {
            scoreText.innerText = "Joli tes progrès, tu touches maintenant la planche";
        } else if (score == 3) {
            scoreText.innerText = "Ahhh les Basketix...";
        } else if (score == 4) {
            scoreText.innerText = "T'as fumé le League Pass toi non ?";
        } else if (score == 5) {
            scoreText.innerText = "Bravo, tu obtiens la nationalité Amérindienne";
        }
};

function colorAnswerAndScore (check, responsButton) {
    if (check) {
        score++;
        responsButton.style.backgroundColor = '#00b33c';
    } else {
        responsButton.style.backgroundColor = '#cc0000';
        correctButton.style.backgroundColor = '#00b33c';
    } 
};

function displayQuestionAndAnswers () {
    const currentQuestion = quiz_nba.allQuestions[currentQuestionIndex];// Récup "Question" actuelle
    const correctAnswer = quiz_nba.allQuestions[currentQuestionIndex].correct_answer; // Recup bonne réponse actuelle
    questionText.innerText = currentQuestion.question; // Injecter la question dans le HTML
    currentQuestion.answers.forEach(elem => { // Injecter les réponses dans le HTML 
        const answerButton = document.createElement('button');
        answerButton.innerText = elem;
        answersText.classList.add('answers');
        answersText.appendChild(answerButton);
        rightAnswer(answerButton, correctAnswer);
        answerButton.addEventListener('click', () => {
            let verifyAnswer = checkAnswer(answerButton.innerText, correctAnswer);
            colorAnswerAndScore(verifyAnswer, answerButton);
            nextButton.disabled = false; 
            document.querySelectorAll('#answers button').forEach(elem => { //Désactive les réponses
                elem.disabled = true;
            })
        })
    }) 
}

function countdown() { 
    let counter = 24;
    if (timer) { //Nettoie le timer précédent avant d'en mettre un nouveau
        clearInterval(timer);
    }
    countdownTimer.innerText = `Temps restant : ${counter} secondes`; 
    
    timer = setInterval(function () {
        counter--;
        countdownTimer.innerText = `Temps restant : ${counter} secondes`;
        if (counter == 0) {
            clearInterval(timer);
            currentQuestionIndex++;
            if (currentQuestionIndex < quiz_nba.allQuestions.length) {
                loadQuestion();
            } else { 
                progressBar.value = maxBar;
                scorePage();
            }
        } else if (nextButton.disabled == false) {
            clearInterval(timer);
        }
    }, 1000);
};

function displayBar() {
    progressBar.value = currentQuestionIndex;
    progressBar.max = maxBar;
  };

function scorePage () {
    answersText.innerHTML = ''; 
    countdownTimer.style.display = 'none'; 
    progressBar.style.display = 'none';
    questionText.innerText = `Ton score est de ${score}/5`;
    scoringText(); // phrase en fonction du score
    scoreText.style.display = 'block';
    nextButton.style.display = 'none'; 
    replayButton.style.display = 'inline-block'; 
}

/****FONCTION PRINCIPALE****
**************************/
function loadQuestion() {
    answersText.innerHTML = ''; 
    nextButton.disabled = true; 
    displayQuestionAndAnswers();
    countdown();
    displayBar();
};

/********BOUTON SUIVANT*******
****************************/
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz_nba.allQuestions.length) { // Vérifier s'il reste des questions
        loadQuestion(); // Afficher la question suivante
    } else { // Si plus de questions, indiquer la fin du quiz
        progressBar.value = maxBar;
        scorePage();
    }   
});

/******BOUTON REPLAY******
 ***********************/
replayButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    countdownTimer.style.display = 'block'; // Ajoute le timer
    progressBar.style.display = 'block'; // Ajoute la barre de progression
    replayButton.style.display = 'none';
    nextButton.style.display = 'inline-block';
    scoreText.innerHTML = '';
    loadQuestion();
});

/******PREMIERE QUESTION******
*****AU LANCEMENT DE LA PAGE****/
loadQuestion();