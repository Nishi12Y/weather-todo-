import { API_KEY } from "./config.js";

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

const weatherCity = document.getElementById("weather-city")
const description = document.getElementById("weather-description")
const temp = document.getElementById("weather-temp")
const humidity = document.getElementById("weather-humidity")
const icon = document.getElementById("weather-icon")

export async function displayWeather(){
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