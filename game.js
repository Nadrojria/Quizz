import { quiz_nba } from './questions.js'; // Import des questions

/********RECUP HTML********
*********************/
const questionText = document.getElementById('question');
const answersText = document.getElementById('answers');
const nextButton = document.getElementById('next-button');
const replayButton = document.getElementById('replay-button');

let currentQuestionIndex = 0; // Commence à la première question

/****FONCTION PRINCIPALE****
**************************/
function loadQuestion() {
  answersText.innerHTML = ''; // Vider le conteneur des options
  const currentQuestion = quiz_nba.allQuestions[currentQuestionIndex];// Récupérer la question actuelle
  questionText.innerText = currentQuestion.question; // Injecter la question dans le HTML
  // Injecter les réponses dans le HTML 
  currentQuestion.answers.forEach(elem => {
    const answerButton = document.createElement('button');
    answerButton.innerText = elem;
    answersText.classList.add('answers');
    answersText.appendChild(answerButton);
  });
}

/********BOUTON SUIVANT*******
****************************/
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz_nba.allQuestions.length) { // Vérifier s'il reste des questions
    loadQuestion(); // Afficher la question suivante
  } else { // Si plus de questions, indiquer la fin du quiz
    questionText.innerText = 'Fin du quiz';
    answersText.innerHTML = ''; // Effacer les options
    nextButton.style.display = 'none'; // Enleve le bouton Suivant
    replayButton.style.display = 'inline-block'; // Ajoute le bouton rejouer
  }
});

/******BOUTON REPLAY******
 ***********************/
replayButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    replayButton.style.display = 'none'; // Enleve le bouton rejouer
    nextButton.style.display = 'inline-block'; // Ajoute le bouton suivant
    loadQuestion(); //Recharge la premeire question 
  });

/******PREMIERE QUESTION******
*****AU LANCEMENT DE LA PAGE****/
loadQuestion();