import { DOMSelectors } from './dom';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    insertCard(data);
  } catch (error) {

  }
};

async function insertCard (array) {
  console.log(array);
  /*let questionType = 0;
  // let questionType = getRandomInt(0, 2);
  const url = `https://valorant-api.com/v1/agents`;

  if (questionType == 0) {
    // agent description
    // let agent = getRandomInt(0, getData(url).length)
    let data = getData(url);
    console.log(getData(url));

  } else if (questionType == 1) {
    // ability icon
    console.log("a")

  } else if (questionType == 2) {
    // ability description
    console.log("b")

  }*/
};

function insertTitle () {
  DOMSelectors.box.insertAdjacentHTML("beforeend", 
  `<div class="title">
    <h1 id="title">Guess the VALORANT Agent!</h1>
    <h3 id="description">You will be given a random agent's description, ability icon, or ability description.</h3>
  </div>
  <button type="submit" class="playButton">PLAY</button>
  `)
};

export { insertCard, insertTitle, getData };