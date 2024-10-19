/*
*to defeat slime you just need a stick
*to defeat fangedBeast you just need a dagger
* 
*/
let xp = 0;
let health = 100;
let gold = 1000;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

//DOMS - Document Object Model, #button1 is a property of the html DOM.
//When browsers loads a document it creates DOM, a representation of the document that allows JS to access and manipulate elements.
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
//array of weapons
const weapons = [
  { 
    name: 'stick', 
    power: 5 
  },
  { 
    name: 'dagger', 
    power: 30 
  },
  { 
    name: 'claw hammer',
    power: 50 
  },
  { 
    name: 'sword', 
    power: 100  
  },  
  { 
    name: 'nuclear bomb', 
    power: 300  
  }
];

//array of monsters
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 10,
    health: 300
  }
]

//array of locations objects
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?","REPLAY?" ],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You found a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

//initialize buttons, iniatially buttons was set to this functions,
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

/*
* treat it like this, 
* location[index of the object]["property of the object with space"][index of the value].
* location[index of the object].property of object with no space[index of the value]
* the same as the multidimensional array
*/
function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  }

//functions for the initialized buttons
function goTown() {
//updates the interface to use the properties of object on index[n]
  update(locations[0]);
  monsterStats.style.display = "none";
  
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

// use gold has to be >=10 to buyHealth since the price of it was 10.
function buyHealth() {
  if (gold >= 10) {
    //updates var
    gold -= 10;
    health += 10;
    //updates text
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    //gold cost 10
    text.innerText = "You do not have enough gold to buy health.";
  }
}
/* 
  * Default currentWeaponIndex = 0
  * if currentWeaponIndex = to the last element which is weapon.length-1 since the index is 0, 
    decision will be permitted, to allow to buy or not.
    {
        * checks if the user gold is >=30, if true will allow to buy 
            {
        * -30 deducted, gold will be updated.
        * currentWeaponIndex will increment
        * newWeapon var is initialized, = to the weapon array [objectIndex].name
        * tell user what weapon they just bought
        * newWeapon will be pushed on inventory
        * tell user whats inside their inventory
            }
        * gold < 0 means false
            {
        * tell user do not have enough gold.    
            }
    }else the user weapon was already on last index
    {
        * change inner text to tell that they has the last weapon / Suggest to sell weapon
        * put onclick property if going to sell call sellWeapon function
    }        
*/
function buyWeapon() {
/* 
    * as long as the users currentWeaponIndex = last weapon object
    * will be permitted to buy weapons.
    * if and only if their gold >=30 since the weapon costs 30gold
*/
    if (currentWeaponIndex < weapons.length - 1) {
            if (gold >= 30) {
            gold -= 30;
            goldText.innerText = gold;
            //since player bought weapon, currentWeaponIndex will increment.
            currentWeaponIndex++;
            //get the new weapon object.name assigns it to newWeapon variable
            let newWeapon = weapons[currentWeaponIndex].name;
            text.innerText = "You now have a " + newWeapon + ".";
            //the same weapon object.name will be pushed on inventory array.
            inventory.push(newWeapon);
            //displays your current inventory
            text.innerText += " In your inventory you have: " + inventory;
            } else {
            //if user gold<30
            text.innerText = "You do not have enough gold to buy a weapon.";
            }
    } else {
    // Tell that player already has the last element on the weapons[]
    text.innerText = "You already have the most powerful weapon!";
    //Suggest to Sell weapon, changes the function of the button2
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
    }
}
/*
    *There must be atleast 1 weapon for user
    * Check if the user inventory.length > 1, if true selling will be permitted
    {
        *gold will be added
        *since you added a gold u should change the displayed text = gold;
        *since selling, have to shift(), this will remove and return the first element of an array.
        *and assign it to the variable currentWeapon, to tell user what weapon has been sold
        *tell what was the current weapon on inventory
    }else
    {
        *tell user not to sell the only weapon 
    }
*/
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    //shift property will remove the first element of an array and returns it, assins it ot currentWeapon
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}


function fightSlime() {
//initialized index, serves as the reference to what monsters[fighting].
  fighting = 0;
  goFight();
}

function fightBeast() {
//initialized index, serves as the reference to what monsters[fighting].
  fighting = 1;
  goFight();
}

function fightDragon() {
//initialized index, serves as the reference to what monsters[fighting].
  fighting = 2;
  goFight();
}

//for fight dragon button
function goFight() {
  update(locations[3]);
  //mosterStats div from display: none to block, showing the contents of it.
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  //assigns the monsters health
  monsterHealth = monsters[fighting].health;
  //then reassigns in here to update the monsterHealth
  monsterHealthText.innerText = monsterHealth;
}


function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeaponIndex].name + ".";
    //my health will be deducted based on the monster level. 
    health -= getMonsterAttackValue(monsters[fighting].level);
    
    //every time you attack it is not always guarateed that you hit the monster. Either you hit or miss, using the Math.random.
    if(isMonsterHit()){
        //isMonsterHit(true)
        //monsterHealth -= weapon power + a random number between my xp and 1
        monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
        }else {
        //isMonsterHit(false)
            text.innerText += " You miss.";
        }
    //update
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    //monitor if you already lose based on you health
    if (health <= 0) {
        lose();
       } else if (monsterHealth <= 0) {
        if(fighting === 2){
            winGame();
        } else{
            defeatMonster();
        }
       }
    //every attack theres a chance that the players weapon breaks.
    //we don want to break players weapon if they only has 1 weapon in their inventory.
    if(Math.random() <= .1 && inventory.length !== 1){
        //if weapons breaks it will return the element, wich will then be used to concatenate on the string.
        text.innerText += " Your "+inventory.pop()+" breaks.";
        //after popping, to use the preceeding weapon that you have in inventory.
        currentWeaponIndex --;
    }
}

function getMonsterAttackValue(level) {
    //monster attack is 5 times their level minus a random num between 0 and 1 and the player's xp.
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    //ternary operator
    return hit > 0 ?hit:0;
} 

    //The player should hit if either Math.random( )>.2 or if the player's health is less than 20.
function isMonsterHit() {
    //returns true if either of the condition is true
    //returns false if both of the condition is false.
    return Math.random() > .2 || health<20;
}  

function dodge() {
    text.innerText = "You dodge the attack from the "+monsters[fighting].name+""
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose(){
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}
//resets all
function restart() {
    xp = 0;
    health = 100;
    gold = 50;  
    currentWeaponIndex = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
  }

function easterEgg() {
    update(locations[7]);
}
//user choice to be pass on pick function
function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}
  
function pick(guess) {
    const numbers = [];
    //pushes random num on numbers[]
    while (numbers.length < 10) {
      numbers.push(Math.floor(Math.random() * 11));
    }
    //displays the generated elements on numbers[]
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for (let i = 0; i < 10; i++) {
      text.innerText += numbers[i] + "\n";
    }
    //check if the user choice was on the generated number
    if (numbers.includes(guess)) {
      text.innerText += "Right! You win 20 gold!";
      gold += 20;
      goldText.innerText = gold;
    } else {
      text.innerText += "Wrong! You lose 10 health!";
      health -= 10;
      healthText.innerText = health;
      //loses -=10 only if users health is <=0
      if (health<=0){
        lose();
      }
    }
  }