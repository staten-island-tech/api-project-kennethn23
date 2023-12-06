import { DOMSelectors } from './dom';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

async function getData() {
  const url = `https://valorant-api.com/v1/agents`;
  try {
    const response = await fetch(url);
    if (response.status < 200 || response.status > 299) {
      throw new Error(response);

    } else {
      const data = await response.json();
      const agentArray = data.data.filter((agent) => agent.isPlayableCharacter == true);
      const agent = agentArray[getRandomInt(0, agentArray.length)];

      function insertRandomCard (randomNumber) {
        console.log(agent);
        
        if (randomNumber == 0) {
          // agent description
          const agentDescription = agent.description.replace(agent.displayName, "_");
          DOMSelectors.box.insertAdjacentHTML("beforeend",
          `<div class="card">
            <h1 id="card-title">Name this agent using their description!</h1>
            <h3 id="card-desc">${agentDescription}</h3>
          </div>`)

        } else if (randomNumber == 1) {
          // ability description
          const agentAbilityDescription = agent.abilities[getRandomInt(0, agent.abilities.length)].description.replace(agent.displayName, "_");
          DOMSelectors.box.insertAdjacentHTML("beforeend",
          `<div class="card">
            <h1 id="card-title">Name this agent using one of their ability's descriptions!</h1>
            <h3 id="card-desc">${agentAbilityDescription}</h3>
          </div>`)

        } else if (randomNumber == 2) {
          // ability icon
          const filteredArray = agent.abilities.filter((ability) => ability.slot != "Passive")
          const agentAbilityIcon = filteredArray[getRandomInt(0, filteredArray.length)].displayIcon;
          const agentAbilityName = filteredArray[getRandomInt(0, filteredArray.length)].displayName;
          DOMSelectors.box.insertAdjacentHTML("beforeend",
            `<div class="card">
              <h1 id="card-title">Name this agent using one of their ability's icons!</h1>
              <img src="${agentAbilityIcon}" alt=${agentAbilityName}>
            </div>`)
        } else if (randomNumber == 3) {
          // ability name
          const agentAbilityName = agent.abilities[getRandomInt(0, agent.abilities.length)].displayName;
          DOMSelectors.box.insertAdjacentHTML("beforeend",
            `<div class="card">
              <h1 id="card-title">Name this agent using one of their ability's names!</h1>
              <h3 id="card-desc">${agentAbilityName}</h3>
            </div>`)
        }
      }

      function scoreCounter(outcome) {
        let counter = document.querySelector(".scoreCounter").textContent;

        if (outcome == true) {
          let updatedCounter = Number(counter) + 1;
          DOMSelectors.scoreCounter.innerHTML = "";
          DOMSelectors.scoreCounter.insertAdjacentHTML("beforeend",
            `<div class="scoreCounter">
              <p>${updatedCounter}<p>
            </div>`)

        } else if (outcome == false) {
          let updatedCounter = 0;
          DOMSelectors.scoreCounter.innerHTML = "";
          DOMSelectors.scoreCounter.insertAdjacentHTML("beforeend",
            `<div class="scoreCounter">
              <p>${updatedCounter}<p>
            </div>`)
        }
      };

      function checkAnswer(value) {
        if (value == agent.displayName) {
          DOMSelectors.box.innerHTML = "";
          DOMSelectors.box.insertAdjacentHTML("beforeend",
          `<div class="win">
            <h1 id="win-title">Congratulations! The answer was ${agent.displayName}</h1>
            <button type="submit" class="playButton">CONTINUE</button>
          </div>`)
          scoreCounter(true);
          document.querySelector(".playButton").addEventListener("click", function() {
            DOMSelectors.box.innerHTML = "";
            getData();
          });
        } else {
          DOMSelectors.box.innerHTML = "";
          DOMSelectors.box.insertAdjacentHTML("beforeend",
          `<div class="win">
            <h1 id="win-title">u suck The answer was ${agent.displayName}</h1>
            <button type="submit" class="playButton">RESTART</button>
          </div>`)
          scoreCounter(false);
          document.querySelector(".playButton").addEventListener("click", function() {
            DOMSelectors.box.innerHTML = "";
            insertTitle();
            document.querySelector(".playButton").addEventListener("click", function() {
              DOMSelectors.box.innerHTML = "";
              getData();
            });
          });
        }
      }

      function insertDropdown () {
        DOMSelectors.box.insertAdjacentHTML("beforeend",
        `<div class="submitField">
          <label for="agent-select">Submit your guess</label>
          <select name="agents" id="agent-select">
            <option value="">Choose an agent</option>
            <option value="Astra">Astra</option>
            <option value="Breach">Breach</option>
            <option value="Brimstone">Brimstone</option>
            <option value="Chamber">Chamber</option>
            <option value="Cypher">Cypher</option>
            <option value="Deadlock">Deadlock</option>
            <option value="Fade">Fade</option>
            <option value="Gekko">Gekko</option>
            <option value="Harbor">Harbor</option>
            <option value="Iso">Iso</option>
            <option value="Jett">Jett</option>
            <option value="KAY/O">KAY/O</option>
            <option value="Killjoy">Killjoy</option>
            <option value="Neon">Neon</option>
            <option value="Omen">Omen</option>
            <option value="Phoenix">Phoenix</option>
            <option value="Raze">Raze</option>
            <option value="Reyna">Reyna</option>
            <option value="Sage">Sage</option>
            <option value="Skye">Skye</option>
            <option value="Sova">Sova</option>
            <option value="Viper">Viper</option>
            <option value="Yoru">Yoru</option>
          </select>
        </div>`)

        document.querySelector("#agent-select").addEventListener("change", function() {
          checkAnswer(document.querySelector("#agent-select").value);
        });
      }
      
      insertRandomCard(getRandomInt(0, 4));
      insertDropdown();

    }

  } catch (error) {

  }
}; 

function insertTitle () {
  DOMSelectors.box.insertAdjacentHTML("beforeend", 
  `<div class="title">
    <h1 id="title">Guess the VALORANT Agent!</h1>
    <h3 id="description">You will be given a random agent's description, ability description, or ability icon.</h3>
  </div>
  <button type="submit" class="playButton">PLAY</button>
  `)
};

export { insertTitle, getData };