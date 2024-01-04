import { DOMSelectors } from './dom';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

let counter = 0;
let highCounter = 0;

async function getData() {
  const url = `https://valorant-api.com/v1/agents`;
  const weaponURL = `https://valorant-api.com/v1/weapons`;
  try {
    const response = await fetch(url);
    const weaponResponse = await fetch(weaponURL);
    if (response.status < 200 || response.status > 299 || weaponResponse.status < 200 || weaponResponse.status > 299) {
      throw new Error(response.statusText);

    } else {
      const data = await response.json();
      const weaponData = await weaponResponse.json();
      // console.log(data);
      const agentArray = data.data.filter((agent) => agent.isPlayableCharacter == true);
      const agent = agentArray[getRandomInt(0, agentArray.length)];
      const filteredAgentAbility = agent.abilities.filter((ability) => ability.slot != "Passive");
      const agentAbility = filteredAgentAbility[getRandomInt(0, filteredAgentAbility.length)];

      const weaponArray = weaponData.data;
      const weapon = weaponArray[getRandomInt(0, weaponArray.length)];

      function insertRandomCard (randomNumber) {
        
        if (randomNumber == 0) {
          // agent description
          const agentDescription = agent.description.replace(agent.displayName, "_");
          DOMSelectors.box.insertAdjacentHTML("beforeend",
          `<div class="card">
            <h1 id="card-title">Name this agent using their description!</h1>
            <h2 id="card-desc">${agentDescription}</h2>
          </div>`);
          insertDropdown("agent", randomNumber);

        } else if (randomNumber == 1) {
          // ability description
          const agentAbilityDescription = agentAbility.description.replace(agent.displayName, "_");
          DOMSelectors.box.insertAdjacentHTML("beforeend",
          `<div class="card">
            <h1 id="card-title">Name this agent using one of their ability's descriptions!</h1>
            <h2 id="card-desc">${agentAbilityDescription}</h2>
          </div>`);
          insertDropdown("agent", randomNumber);

        } else if (randomNumber == 2) {
          // ability icon
          const agentAbilityIcon = agentAbility.displayIcon;
          const agentAbilityName = agentAbility.displayName;
          DOMSelectors.box.insertAdjacentHTML("beforeend",
            `<div class="card">
              <h1 id="card-title">Name this agent using one of their ability's icons!</h1>
              <img src="${agentAbilityIcon}" alt="Image of ${agentAbilityName}">
            </div>`);
          insertDropdown("agent", randomNumber);

        } else if (randomNumber == 3) {
          // ability name
          const agentAbilityName = agentAbility.displayName;
          DOMSelectors.box.insertAdjacentHTML("beforeend",
            `<div class="card">
              <h1 id="card-title">Name this agent using one of their ability's names!</h1>
              <h2 id="card-desc">${agentAbilityName}</h2>
            </div>`);
          insertDropdown("agent", randomNumber);

        } else if (randomNumber == 4) {
          // ability name
          const weaponIcon = weapon.displayIcon;
          const weaponName = weapon.displayName;
          DOMSelectors.box.insertAdjacentHTML("beforeend",
            `<div class="card">
              <h1 id="card-title">Name this weapon using its icon!</h1>
              <img src="${weaponIcon}" alt="Image of ${weaponName}" id="weapon-img">
            </div>`);
          insertDropdown("weapon", randomNumber);

        }
      }

      function highScore(currentScore) {
        const currentHighScore = Number(highCounter);

        if (Number(currentScore) > Number(currentHighScore)) {
          highCounter = currentScore;
          DOMSelectors.highScoreCounter.innerHTML = "";
          DOMSelectors.highScoreCounter.insertAdjacentHTML("beforeend",
          `<h3>High Score</h3>
          <p id="high-score">${currentScore}<p>`)
        }
      }

      function scoreCounter(outcome) {
        const currentCounter = Number(counter);

        if (outcome != 0) {
          counter = currentCounter + outcome;
          DOMSelectors.scoreCounter.innerHTML = "";
          DOMSelectors.scoreCounter.insertAdjacentHTML("beforeend",
            `<h3>Score</h3>
            <p id="score">${counter}<p>`)

        } else {
          counter = 0;
          DOMSelectors.scoreCounter.innerHTML = "";
          DOMSelectors.scoreCounter.insertAdjacentHTML("beforeend",
            `<h3>Score</h3>
            <p id="score">${counter}<p>`)
        }

        highScore(counter);
      };

      function checkAnswer(value, type, randomNumber) {
        if (type == "agent") {
          if (value == agent.displayName) {
            if (randomNumber == 1 || randomNumber == 2) {
              document.querySelector(".submitField").remove();
              insertDropdown("ability");
            } else {
              DOMSelectors.box.innerHTML = "";
              DOMSelectors.box.insertAdjacentHTML("beforeend",
              `<div class="win">
                <h1 id="win-title">Congratulations! The answer was ${agent.displayName}</h1>
                <button type="submit" class="playButton">CONTINUE</button>
              </div>`)
              scoreCounter(1);
              document.querySelector(".playButton").addEventListener("click", function() {
                DOMSelectors.box.innerHTML = "";
                getData();
              });
            }
            
          } else {
            DOMSelectors.box.innerHTML = "";
            DOMSelectors.box.insertAdjacentHTML("beforeend",
            `<div class="lose">
              <h1 id="win-title">The answer was actually ${agent.displayName} :(</h1>
              <button type="submit" class="playButton">RESTART</button>
            </div>`)
            scoreCounter(0);
            document.querySelector(".playButton").addEventListener("click", function() {
              DOMSelectors.box.innerHTML = "";
              insertTitle();
              document.querySelector(".playButton").addEventListener("click", function() {
                DOMSelectors.box.innerHTML = "";
                getData();
              });
            });
          }

        } else if (type == "ability") {
          if (value == agentAbility.displayName) {
            // console.log(value);
            DOMSelectors.box.innerHTML = "";
            DOMSelectors.box.insertAdjacentHTML("beforeend",
            `<div class="win">
              <h1 id="win-title">Congratulations! The answer was ${agentAbility.displayName}</h1>
              <button type="submit" class="playButton">CONTINUE</button>
            </div>`)
            scoreCounter(2);
            document.querySelector(".playButton").addEventListener("click", function() {
              DOMSelectors.box.innerHTML = "";
              getData();
            });
            
          } else {
            DOMSelectors.box.innerHTML = "";
            DOMSelectors.box.insertAdjacentHTML("beforeend",
            `<div class="lose">
              <h1 id="win-title">The answer was actually ${agentAbility.displayName} :(</h1>
              <button type="submit" class="playButton">RESTART</button>
            </div>`)
            scoreCounter(0);
            document.querySelector(".playButton").addEventListener("click", function() {
              DOMSelectors.box.innerHTML = "";
              insertTitle();
              document.querySelector(".playButton").addEventListener("click", function() {
                DOMSelectors.box.innerHTML = "";
                getData();
              });
            });
          }
        } else if (type == "weapon") {
          if (value == weapon.displayName) {
            // console.log(value);
            DOMSelectors.box.innerHTML = "";
            DOMSelectors.box.insertAdjacentHTML("beforeend",
            `<div class="win">
              <h1 id="win-title">Congratulations! The answer was ${weapon.displayName}</h1>
              <button type="submit" class="playButton">CONTINUE</button>
            </div>`)
            scoreCounter(1);
            document.querySelector(".playButton").addEventListener("click", function() {
              DOMSelectors.box.innerHTML = "";
              getData();
            });
            
          } else {
            DOMSelectors.box.innerHTML = "";
            DOMSelectors.box.insertAdjacentHTML("beforeend",
            `<div class="lose">
              <h1 id="win-title">The answer was actually ${weapon.displayName} :(</h1>
              <button type="submit" class="playButton">RESTART</button>
            </div>`)
            scoreCounter(0);
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
      }

      function insertDropdown (type, randomNumber) {
        if (type == "agent") {
          let agentArrayNames = [];
          agentArray.forEach((agent) => agentArrayNames.push(agent.displayName));
          agentArrayNames.sort();

          DOMSelectors.box.insertAdjacentHTML("beforeend",
          `<div class="submitField">
            <label for="agent-select">Which agent is this?</label>
            <select name="agents" id="agent-select">
              <option value="Choose an agent">Choose an agent</option>
            </select>
          </div>`)

          agentArrayNames.forEach((name) => {
            document.querySelector("#agent-select").insertAdjacentHTML("beforeend",
            `<option value="${name}">${name}</option>`)
          })

          document.querySelector("#agent-select").addEventListener("change", function() {
            checkAnswer(document.querySelector("#agent-select").value, "agent", randomNumber);
          });

        } else if (type == "ability") {

          DOMSelectors.box.insertAdjacentHTML("beforeend",
          `<div class="submitField" id="abilitySubmitField">
            <label for="ability-select">Which ability is this?</label>
            <select name="abilities" id="ability-select">
              <option value="Choose an ability">Choose an ability</option>
              <option value ="${agent.abilities[0].displayName}">${agent.abilities[0].displayName}</option>
              <option value ="${agent.abilities[1].displayName}">${agent.abilities[1].displayName}</option>
              <option value ="${agent.abilities[2].displayName}">${agent.abilities[2].displayName}</option>
              <option value ="${agent.abilities[3].displayName}">${agent.abilities[3].displayName}</option>
            </select>
          </div>`)

          document.querySelector("#ability-select").addEventListener("change", function() {
            checkAnswer(document.querySelector("#ability-select").value, "ability");
          });
          
        } else if (type == "weapon") {
          let weaponArrayNames = [];
          weaponArray.forEach((weapon) => weaponArrayNames.push(weapon.displayName));
          weaponArrayNames.sort();

          DOMSelectors.box.insertAdjacentHTML("beforeend",
          `<div class="submitField">
            <label for="weapon-select">Which weapon is this?</label>
            <select name="weapons" id="weapon-select">
              <option value="Choose a weapon">Choose a weapon</option>
            </select>
          </div>`)

          weaponArrayNames.forEach((name) => {
            document.querySelector("#weapon-select").insertAdjacentHTML("beforeend",
            `<option value="${name}">${name}</option>`)
          })

          document.querySelector("#weapon-select").addEventListener("change", function() {
            checkAnswer(document.querySelector("#weapon-select").value, "weapon");
          });
          
        }
      }
      
      // insertRandomCard(1);
      insertRandomCard(getRandomInt(0, 5));

    }

  } catch (error) {
    document.body.classList.add("retry");
    DOMSelectors.box.innerHTML = "";
    DOMSelectors.box.insertAdjacentHTML("beforeend",
              `<div class="retry">
                <h1 id="retry-title">Sorry!</h1>
                <h2>There was an error, please try again!</h2>
                <button type="submit" class="playButton">RETRY</button>
              </div>`)
    document.querySelector(".playButton").addEventListener("click", function() {
      document.body.classList.remove("retry");
      DOMSelectors.box.innerHTML = "";
      getData();
    });
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