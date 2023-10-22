// HTML elementtien referointi
const textInput = document.getElementById("textInput");
const addButton = document.getElementById("addButton");
const textList = document.getElementById("textList");

// Lataa valitut Local storagesta
document.addEventListener("DOMContentLoaded", () => {
    const savedItems = localStorage.getItem("todoItems");
    if (savedItems) {
        textList.innerHTML = savedItems;

        
        attachRemoveAndCheckEvents();
    }
});

// "Remove" and "Check" event listener nappulat
function attachRemoveAndCheckEvents() {
    const buttons = textList.querySelectorAll("li button");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const listItem = button.parentElement;
            if (button.textContent === "Remove") {
                listItem.remove();
            } else if (button.textContent === "Check") {
                listItem.style.backgroundColor = "#03ca03"; // background color
            }
            saveListToLocalStorage();
        });
    });
}

// Event listener lisää nappulalle
addButton.addEventListener("click", () => {
    const text = textInput.value;

    if (text.trim().length < 3) {
        alert("Please write at least three (3) letter words.");
    } else {
        // Luo uusi lista item
        const listItem = document.createElement("li");
        listItem.textContent = text;

        // Luo "Remove" napuula tälle itemille
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        // Luo "Check" napuula tälle itemille
        const checkButton = document.createElement("button");
        checkButton.textContent = "Check";

        // Append "Remove" ja "Check" nappulat itemeille
        listItem.appendChild(removeButton);
        listItem.appendChild(checkButton);

        // Lisää uusi itemi unordered listaan 
        textList.appendChild(listItem);

        // Attach event listeners "Remove" and "Check" nappuloille
        attachRemoveAndCheckEvents();

        // Tyhjennä syöttökenttä
        textInput.value = "";

        // Tallenna Local storageen
        saveListToLocalStorage();
    }
});

// Function tallenna lista  local storageen
function saveListToLocalStorage() {
    localStorage.setItem("todoItems", textList.innerHTML);
}
