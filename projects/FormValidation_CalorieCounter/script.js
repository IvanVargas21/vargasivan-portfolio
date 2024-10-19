//Form
const calorieCounter = document.getElementById('calorie-counter');
//Form elements
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
//will be updated, if the user provides and invalid input
let isError = false;

//to convert any input to numerical values
function cleanInputString(str){
    //regex, character class [], \s means single space. to match each of these characters individually.
    const regex = /[+-\s]/g;
    //Since strings are immutable, the replace method returns a new string with the replaced characters.
    return str.replace(regex, "");
}
//
function isInvalidInput(str) {
    //+ modifier in regex allows you to match a pattern that occurs one or more times.
    const regex = /\d+e\d+/i;
    //returns null if no match is found, and an array if found.
    return str.match(regex);
  }
  function addEntry() {
    //#entryvalue .input-container
    let targetInputContainer  = document.querySelector(`#${entryDropdown.value} .input-container`)
    //input[type="text"] will be passed as argument, 
    //querySelectorAll() returns all the |#entryvalue .input-container| /inputfields that has a type text.
    //query first for input[type="text"] before addingthe new entry to the page. WRONG!
    //w/o + 1, it will start on 0 because theres no input element yet!, we will just insert input element on the last line.
    let entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length+1;
    //a single concatenated string
    const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name"> </input>

    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories"> </input>
    `;
    //this will be added on the innerHTML element of the targetInputContainer.
    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
  }

  //will be attached to submit event of the form
  function calculateCalories(e) {
    e.preventDefault( )
    isError = false;

    const lunchNumberInputs = document.querySelectorAll("#lunch input[type=number]");
    const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type=number]");
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);

    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
    if(isError) {
        return
      }
    
    const consumedCalories = breakfastCalories+lunchCalories+dinnerCalories+snacksCalories;
    const remainingCalories = (budgetCalories-consumedCalories)+exerciseCalories;

    const surplusOrDeficit = remainingCalories < 0 ?  "Surplus" : "Deficit";

    output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
    `;
    output.classList.remove("hide");
  }

  //list is the result of query selector which will return a Nodelist
  //NodeList, a list o elements like an array, contains elements that match the query selector.
  function getCaloriesFromInputs(list) {
    let calories = 0;
    
    //cleanInputString() first, invalidInputMatch() next
    for(const item of list){
        const currVal = cleanInputString(item.value);
        //either null(falsy value) or array
        const invalidInputMatch = isInvalidInput(currVal);
        if(invalidInputMatch){
            alert(`Invalid Input: ${invalidInputMatch[0]}`)
            isError = true;
            return null;
        }
        calories += Number(currVal);
    }
    return calories;
  }
  function clearForm() {
    const inputContainers = Array.from(document.querySelectorAll('.input-container'));
    for (const container of inputContainers) {
        container.innerHTML = '';
    }
    budgetNumberInput.value ='';
    output.innerText = '';
    output.classList.add("hide");
  }
  addEntryButton.addEventListener('click', addEntry);
  calorieCounter.addEventListener("submit", calculateCalories);
  clearButton.addEventListener("click", clearForm)