import { DOMSelectors } from './dom';

async function insertCard () {
    // get random agent
    // get random desc, ability icon, ability desc
}

async function insertTitle () {
    DOMSelectors.box.insertAdjacentHTML("beforeend", 
    `<div class="card">
      <h1 id="title">Guess the VALORANT Agent!</h1>
      <h3 id="description">You will be given a random agent's description, ability icon, or ability description.</h3>
    </div>
    <button type="submit" class="playButton">PLAY</button>
    `)
}

export { insertCard, insertTitle };