import '../css/style.css'
import { DOMSelectors } from './dom';
import { insertTitle, getData } from './inserts';

insertTitle();

document.querySelector(".playButton").addEventListener("click", function() {
  DOMSelectors.box.innerHTML = "";
  getData();
});
