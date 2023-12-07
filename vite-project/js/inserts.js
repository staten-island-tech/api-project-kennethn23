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
      const filteredAgentAbility = agent.abilities.filter((ability) => ability.slot != "Passive");
      const agentAbility = filteredAgentAbility[getRandomInt(0, agent.abilities.length)];

      function insertRandomCard (randomNumber) {
        console.log(agent);
        
        if (randomNumber == 0) {
          // agent description
          const agentDescription = agent.description.replace(agent.displayName, "_");
          DOMSelectors.box.insertAdjacentHTML("beforeend",
          `<div class="card">
            <h1 id="card-title">Name this agent using their description!</h1>
            <h3 id="card-desc">${agentDescription}</h3>
          </div>`);
          insertDropdown("agent", randomNumber);

        } else if (randomNumber == 1) {
          // ability description
          const agentAbilityDescription = agentAbility.description.replace(agent.displayName, "_");
          DOMSelectors.box.insertAdjacentHTML("beforeend",
          `<div class="card">
            <h1 id="card-title">Name this agent using one of their ability's descriptions!</h1>
            <h3 id="card-desc">${agentAbilityDescription}</h3>
          </div>`);
          console.log(randomNumber);
          insertDropdown("agent", randomNumber);

        } else if (randomNumber == 2) {
          // ability icon
          const agentAbilityIcon = agentAbility.displayIcon;
          const agentAbilityName = agentAbility.displayName;
          DOMSelectors.box.insertAdjacentHTML("beforeend",
            `<div class="card">
              <h1 id="card-title">Name this agent using one of their ability's icons!</h1>
              <img src="${agentAbilityIcon}" alt=${agentAbilityName}>
            </div>`)
            insertDropd;own("agent", randomNumber);

        } else if (randomNumber == 3) {
          // ability name
          const agentAbilityName = agentAbility.displayName;
          DOMSelectors.box.insertAdjacentHTML("beforeend",
            `<div class="card">
              <h1 id="card-title">Name this agent using one of their ability's names!</h1>
              <h3 id="card-desc">${agentAbilityName}</h3>
            </div>`);
            insertDropdown("agent", randomNumber);

        }
      }

      function scoreCounter(outcome) {
        let counter = document.querySelector("#score").textContent;

        if (outcome != 0) {
          let updatedCounter = Number(counter) + outcome;
          DOMSelectors.scoreCounter.innerHTML = "";
          DOMSelectors.scoreCounter.insertAdjacentHTML("beforeend",
            `<div class="scoreCounter">
              <h3>Score</h3>
              <p id="score">${updatedCounter}<p>
            </div>`)

        } else {
          let updatedCounter = 0;
          DOMSelectors.scoreCounter.innerHTML = "";
          DOMSelectors.scoreCounter.insertAdjacentHTML("beforeend",
            `<div class="scoreCounter">
              <h3>Score</h3>
              <p id="score">${updatedCounter}<p>
            </div>`)
        }
      };

      function checkAnswer(value, type, randomNumber) {
        if (type == "agent") {
          if (value == agent.displayName) {
            if (randomNumber >= 1) {
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
            `<div class="win">
              <h1 id="win-title">u suck The answer was ${agent.displayName}</h1>
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
          if (value == agentAbility.slot) {
            DOMSelectors.box.innerHTML = "";
            DOMSelectors.box.insertAdjacentHTML("beforeend",
            `<div class="win">
              <h1 id="win-title">Congratulations! The answer was ${agentAbility.slot}</h1>
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
            `<div class="win">
              <h1 id="win-title">u suck The answer was ${agentAbility.slot}</h1>
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
            console.log(randomNumber);
            checkAnswer(document.querySelector("#agent-select").value, "agent", randomNumber);
          });

        } else if (type == "ability") {
          function addSlots (agent) {
            document.querySelector(".submitField").insertAdjacentHTML("beforeend",
            `<option value ="${agent.abilities[0].slot}">Ability 1 (Q)</option>
            <option value ="${agent.abilities[1].slot}">Ability 2 (C)</option>
            <option value ="${agent.abilities[2].slot}">Signature (E)</option>
            <option value ="${agent.abilities[3].slot}">Ultimate (X)</option>`)
          }

          DOMSelectors.box.insertAdjacentHTML("beforeend",
          `<div class="submitField">
            <label for="ability-select">Submit your guess</label>
            <select name="abilities" id="ability-select">
              <option value="">Which ability slot is this ability</option>
              ${addSlots(agent)}
            </select>
          </div>`)

          document.querySelector("#ability-select").addEventListener("change", function() {
            checkAnswer(document.querySelector("#ability-select").value, "ability");
          });
          
        }
      }
      
      insertRandomCard(1);
      // insertRandomCard(getRandomInt(0, 4));

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