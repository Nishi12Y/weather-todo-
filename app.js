
const lat = 35.4122
const lon = 139.4130
const lang = 'ja';
const units = 'metric';
const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${lang}&units=${units}`;

async function fetchWeather() {
    try {
        const response = await fetch(requestUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
        return null;
    }
}

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

const weatherCity = document.getElementById("weather-city")
const description = document.getElementById("weather-description")
const temp = document.getElementById("weather-temp")
const humidity = document.getElementById("weather-humidity")
const icon = document.getElementById("weather-icon")

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

async function displayWeather(){
    const value = await fetchWeather();
    if (value){
        const { name,weather,main:{temp:tempValue,humidity:humidityValue}} = value;
        weatherCity.textContent = name;
        description.textContent = weather[0].description;
        temp.textContent = tempValue+ "°C";
        humidity.textContent = "湿度:"+humidityValue+"%";
        icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

        // 天気に応じてbodyのクラスを切り替える
        const weatherMain = weather[0].main.toLowerCase();
        document.body.className = `weather-${weatherMain}`;
    }
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
