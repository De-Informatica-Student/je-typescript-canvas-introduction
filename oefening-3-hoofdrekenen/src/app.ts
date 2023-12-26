// Import the required components
import Calculation from './Calculation.js';

/** The question area on the website, contains the questions */
let questionArea: HTMLDivElement = null;

/** The questions that have been generated */
let questions: Calculation[] = [];

// Get the global HTML Elements and set the events
window.addEventListener('load', () => {
  document.getElementById('start-practice').addEventListener('click', startPractice);
  document.getElementById('check-calculations').addEventListener('click', checkAnswers);

  questionArea = document.getElementById('calculations') as HTMLDivElement;
});

/**
 * Starts the practice session by showing the practice area, generating questions,
 * clearing previous questions, and displaying the new questions.
 */
function startPractice(): void {
  showPracticeArea();
  generateQuestions();
  clearQuestions();
  showQuestions();
}

/**
 * Sets the class name of the 'practice-area' div element to an empty string.
 * This will reveal the area.
 */
function showPracticeArea(): void {
  (document.getElementById('practice-area') as HTMLDivElement).className = '';
}

/**
 * Generates an array of 20 Calculation objects based on the selected operator.
 * The generated calculations are saved in the questions variable.
 */
function generateQuestions(): void {
  const operator: string = getSelectedOperator();
  questions = Array.from({length: 20}, () => new Calculation(operator));
}

/**
 * Retrieve the selected operator from the calculation type dropdown.
 *
 * @returns he selected operator.
 */
function getSelectedOperator(): string {
  return (document.getElementById('calculation-type') as HTMLSelectElement).value;
}

/**
 * Clears the content of the question area.
 */
function clearQuestions(): void {
  questionArea.innerHTML = '';
}

/**
 * Displays the questions in a table format.
 */
function showQuestions(): void {
  const table: HTMLTableElement = document.createElement('table');
  const row: HTMLTableRowElement = document.createElement('tr');

  for (let column: number = 0; column < questions.length; column += 5) {
    const cell: HTMLTableCellElement = document.createElement('td');

    questions.slice(column, column + 5).forEach((question: Calculation, index: number) => {
      cell.appendChild(createQuestion(question, index + column));
    });

    row.appendChild(cell);
  }

  table.appendChild(row);
  questionArea.appendChild(table);
}

/**
 * Function to create a question paragraph with an input field for user to enter the answer.
 * The input field's id will be set to the index of the question.
 *
 * @param question The calculation object representing the question.
 * @param index The index of the question.
 * @returns The created question paragraph element.
 */
function createQuestion(question: Calculation, index: number): HTMLParagraphElement {
  const questionParagraph: HTMLParagraphElement = document.createElement('p');
  const answerField: HTMLInputElement = document.createElement('input');

  answerField.id = index.toString();
  questionParagraph.innerText = question.toString() + ' = ';

  questionParagraph.appendChild(answerField);
  return questionParagraph;
}

/**
 * Checks the answers for the questions and sets the class of the input fields accordingly.
 * If an answer is correct, the input field will receive the 'correct' class,
 * it will receive the 'incorrect' class otherwise.
 */
function checkAnswers(): void {
  const answers: NodeListOf<HTMLInputElement> = document.querySelectorAll('input');
  questions.forEach((question: Calculation, index: number) => {
    const answer: number = parseInt(answers[index].value);
    const result: boolean = question.checkAnswer(answer);
    answers[index].className = result ? 'correct' : 'incorrect';
  });
}
