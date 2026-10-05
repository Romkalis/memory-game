import './style.css'
import './scripts/generateMarkup.js'
import { renderGame } from './scripts/game.js'
import { renderScores } from './scripts/scores.js'

const main = document.querySelector('main')

document.querySelector('.start').addEventListener('click', () => renderGame(main))
document.querySelector('.scores').addEventListener('click', () => renderScores(main))

renderGame(main)
