import { quiz_nba } from './questions.js'; // Import des questions

/********RECUP HTML********
***********************/
const questionText = document.getElementById('question');
const answersText = document.getElementById('answers');
const nextButton = document.getElementById('next-button');
const replayButton = document.getElementById('replay-button');
const scoreText =  document.getElementById('score-text');

/*****INDEX et COMPTEURS***** 
 **************************/
let currentQuestionIndex = 0;
let score = 0; 

/****FONCTION PRINCIPALE****
**************************/
function loadQuestion() {
    answersText.innerHTML = ''; // Vider le conteneur des options
    nextButton.disabled = true; // désactive bouton suivant
    const currentQuestion = quiz_nba.allQuestions[currentQuestionIndex];// Récup "Question" actuelle
    const correctAnswer = quiz_nba.allQuestions[currentQuestionIndex].correct_answer; // Recup bonne réponse actuelle
    let correctButton; // Déclarer une variable pour stocker la bonne réponse actuelle

    questionText.innerText = currentQuestion.question; // Injecter la question dans le HTML
    currentQuestion.answers.forEach(elem => { // Injecter les réponses dans le HTML 
        const answerButton = document.createElement('button');
        answerButton.innerText = elem;
        answersText.classList.add('answers');
        answersText.appendChild(answerButton);
        if (answerButton.innerText == correctAnswer) { // stocke la bonne réponse dans correctButton dès que le foreach tombe dessus
            correctButton = answerButton;
        }
        answerButton.addEventListener('click', () => {
            let verifyAnswer = checkAnswer(answerButton.innerText, correctAnswer);
            if (verifyAnswer) {
                score++;
                answerButton.style.borderColor = 'green';
            } else {
                answerButton.style.borderColor = 'red';
                correctButton.style.borderColor = 'green';
            }
            nextButton.disabled = false; // Active le bouton suivant
            document.querySelectorAll('#answers button').forEach(elem => {
                elem.disabled = true;
            })
        })
    })  
};


/***********FONCTION************ 
****BONNE ou MAUVAISE REPONSE****/
function checkAnswer(playerChoice, goodAnswer) {
    if (playerChoice == goodAnswer) {
        return true;
    } else {
        return false;
    }
};

/********BOUTON SUIVANT*******
****************************/
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz_nba.allQuestions.length) { // Vérifier s'il reste des questions
        loadQuestion(); // Afficher la question suivante
    } else { // Si plus de questions, indiquer la fin du quiz
        questionText.innerText = `Ton score est de ${score}/5`;
        answersText.innerHTML = ''; // Effacer les options
        nextButton.style.display = 'none'; // Enleve le bouton Suivant
        replayButton.style.display = 'inline-block'; // Ajoute le bouton rejouer
        scoreText.style.display = 'block';
        scoringText();
    }   
});

/****FONCTION TEXT du SCORE***
 *****************************/
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
}

/******BOUTON REPLAY******
 ***********************/
replayButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    replayButton.style.display = 'none'; // Enleve le bouton rejouer
    nextButton.style.display = 'inline-block'; // Ajoute le bouton suivant
    scoreText.innerHTML = '';
    loadQuestion(); //Recharge la premeire question 
});

/******PREMIERE QUESTION******
*****AU LANCEMENT DE LA PAGE****/
loadQuestion();