import '../css/style.css'
import { DOMSelectors } from './dom';
import { insertTitle, getData, insertSampleCards } from './inserts';

insertTitle();
insertSampleCards();

document.querySelector(".playButton").addEventListener("click", function() {
  DOMSelectors.box.innerHTML = "";
  getData();
});
