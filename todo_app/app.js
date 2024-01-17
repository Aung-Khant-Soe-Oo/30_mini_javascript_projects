const inputBox = document.querySelector(".row input");
const addBtn = document.querySelector(".add-btn");
const listContainer = document.querySelector("#list-container");

// add task function
const addTask = () => {
  let inputValue = inputBox.value.trim();
  if (inputValue === "") {
    alert("You must write something to add");
  } else {
    let li = document.createElement("li");
    li.innerText = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.classList.add("cross");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
};
// add task listener
addBtn.addEventListener("click", addTask);

// check and remove task
listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

// function for save data
const saveData = () => {
  localStorage.setItem("data", listContainer.innerHTML);
};

// show tasks from local storage
const showTask = () => {
  listContainer.innerHTML = localStorage.getItem("data");
};

showTask();
