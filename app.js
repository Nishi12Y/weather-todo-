
import { displayWeather } from "./weather.js";

const addButton = document.getElementById("task-add-btn");

addButton.addEventListener("click", clickAddButton);

const taskList = document.getElementById("task-list");

// タスクリスト
let inputTaskList = [];

// リストにタスクを加える関数
function addTask(task) {
    const listItem = document.createElement("li");
    // タスクアイテムの生成
    listItem.textContent = task;

    // 削除ボタンの実装
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", function () {
        taskList.removeChild(listItem);
        inputTaskList.splice(inputTaskList.indexOf(task), 1);
        localStorage.setItem("taskList", JSON.stringify(inputTaskList));
    });
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
}


function clickAddButton() {
    const inputTask = document.getElementById("task-input");
    const task = inputTask.value.trim();

    if (task !== "") {
        inputTaskList.push(task);
        addTask(task);
        inputTask.value = "";
        
        localStorage.setItem("taskList", JSON.stringify(inputTaskList));
    }
}

// 検索エリア
const taskSearchArea = document.getElementById("task-search")

taskSearchArea.addEventListener("input",searchTask)

function searchTask(event){
    const filterTask = inputTaskList.filter((task)=>task.indexOf(event.target.value)>-1)
    clearTaskArea()
    filterTask.forEach(task => {
        addTask(task)})
}

function clearTaskArea(){
    taskList.innerHTML = "";
}

window.onload =  function () {
    console.log("開始")
    displayWeather();
    loadTasks();
}



function loadTasks(){
    const savedTasks = localStorage.getItem("taskList");
    if (savedTasks) {
        inputTaskList = JSON.parse(savedTasks);
        inputTaskList.forEach(task => {
            addTask(task);
        });
    }
}
