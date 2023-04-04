// Basic skeleton of the Math Game
// Next step Improve the UX and UI

const problemElement = document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const progressBar = document.querySelector(".progress-inner")
const endMessage = document.querySelector(".end-message")
const resetButton = document.querySelector(".reset-game")
const checkbox = document.getElementById('checkbox')

let state = {
  score: 0,
  wrongAnswers: 0
}

function updateProblem() {
  state.currentProblem = generateProblem()
  problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
  ourField.value = ""
  ourField.focus()
}

updateProblem()

function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1))
}

function generateProblem() {
  return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(10),
    operator: ["+", "-", "x"][generateNumber(2)]
  }
}

ourForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

  let correctAnswer
  const p = state.currentProblem
  if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
  if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo
  if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo

  if (parseInt(ourField.value, 10) === correctAnswer) {
    state.score++
    pointsNeeded.textContent = 10 - state.score
    renderProgressBar()
    updateProblem()
  } else {
    state.wrongAnswers++
    mistakesAllowed.textContent = 2 - state.wrongAnswers
    problemElement.classList.add("on-error")
    setTimeout(() => problemElement.classList.remove("on-error"), 450)
  }
  checkLogic()
}

function checkLogic() {
  // if you won
  if (state.score === 10) {
    endMessage.textContent = "Congrats you Won!"
    document.body.classList.add("overlay-is-open")
    setTimeout(() => resetButton.focus(), 300)
  }

  // if you lost
  if (state.wrongAnswers === 3) {
    endMessage.textContent = "Sorry, you lost."
    document.body.classList.add("overlay-is-open")
    setTimeout(() => resetButton.focus(), 300)
  }
}

resetButton.addEventListener("click", resetGame) /* reset game button on the overlay */

function resetGame() {
  updateProblem()
  state.score = 0
  state.wrongAnswers = 0
  pointsNeeded.textContent = 10
  mistakesAllowed.textContent = 2
  renderProgressBar()
  document.body.classList.remove("overlay-is-open")
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score / 10})`
}


checkbox.addEventListener('change', () => {
  // change the theme of the website
  document.body.classList.toggle('dark')
  ourField.focus()
})