import * as APIfxn from "./API.js";

function updateDateTime(timezone = "Singapore"){
    const currentDateTime = new Date()
    const timeDisplayed = document.querySelector("#currentTime");
    timeDisplayed.innerHTML= currentDateTime.toLocaleString("en-US", {timeZone: timezone}) 
}
setInterval(updateDateTime, 1000);

const form = document.querySelector("form");
form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const currentLocation = document.querySelector("#currentLocation");
    const searchLocation = document.querySelector(".searchLocation");
    const error = document.querySelector(".error");
    const response = await APIfxn.fetchForecastWeatherData(searchLocation.value);
    if (response !== undefined){
        error.style.display = "none";
        render(searchLocation.value);
        currentLocation.textContent = searchLocation.value;
    }
    else {
        error.style.display = "flex";
        throw new Error("Unable to fetch content");
    }
   
});

function getForecastedDays(date){
    const daysInWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date(date);
    const day = daysInWeek[d.getDay()];
    return day;
}

function setForecastedDays(){
    const forecastDays = Array.from(document.querySelectorAll("#day"));
    for (let i=0;i<forecastDays.length;i++){
        const someDate = new Date();
        const numberOfDaysToAdd = i;
        const result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
        console.log(result);
        forecastDays[i].textContent = getForecastedDays(result);
    }
}

async function getForecastedWeather(city){
    const listOfForecastedDetails = await APIfxn.fetchForecastWeatherData(city);
    console.log(listOfForecastedDetails);
    const listOfWeather = [];
    for (const key in listOfForecastedDetails){
        listOfWeather.push(listOfForecastedDetails[key].weather[0].main);
    }
    return listOfWeather;
}

async function setForecastedWeather(city){
    const listOfWeather = await getForecastedWeather(city);
    console.log(listOfWeather);
    const weatherIcons = Array.from(document.querySelectorAll(".weatherIcon"));
    for (let i=0;i<weatherIcons.length;i++){
        if (listOfWeather[i] == "Rain"){
            weatherIcons[i].src = "../src/icons/cloud-lightning.svg";
        }
        else if (listOfWeather[i] == "Clouds"){
            weatherIcons[i].src = "../src/icons/cloud.svg";
        }
        else if (listOfWeather[i] == "Sun"){
            weatherIcons[i].src = "../src/icons/sun.svg";
        }
    }
}

async function getForecastedTemperature(city){
    const listOfForecastedDetails = await APIfxn.fetchForecastWeatherData(city);
    const listOfTemperatures = [];
    console.log(listOfForecastedDetails);
    for (const key in listOfForecastedDetails){
        
        listOfTemperatures.push(listOfForecastedDetails[key].main.temp);
    }
    return listOfTemperatures;
}

async function setForecastedTemperature(city){
    const listOfTemperatures = await getForecastedTemperature(city);
    console.log(listOfTemperatures);
    const temp = Array.from(document.querySelectorAll("#temp"));
    for (let i=0;i<temp.length;i++){
        temp[i].textContent = `${Math.round(listOfTemperatures[i]*10)/10  }°`;
    }
}

function render(city = "singapore"){
    setForecastedDays();
    setForecastedWeather(city);
    setForecastedTemperature(city);
}
render();





