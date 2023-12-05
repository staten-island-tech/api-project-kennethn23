import '../css/style.css'
import { DOMSelectors } from './dom';
import { insertCard, insertTitle, getData } from './inserts';

// const url = `https://valorant-api.com/v1/agents`;
const url = `https://api.quotable.io/random`;

/*async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
  } catch (error) {

  }
}

// getData(url);*/

insertTitle();

document.querySelector(".playButton").addEventListener("click", function() {
  DOMSelectors.box.innerHTML = "";
  getData();
})