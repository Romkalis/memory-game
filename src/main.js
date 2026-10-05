import './style.css'
import './scripts/generateMarkup.js'
import { renderGame } from './scripts/game.js'
import { openScores } from './scripts/scores.js'

const main = document.querySelector('main')

const startGame = () => renderGame(main)

document.querySelector('.start').addEventListener('click', startGame)
document.querySelector('.scores').addEventListener('click', () => openScores(startGame))

renderGame(main)
