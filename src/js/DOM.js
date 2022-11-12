import * as APIfxn from "./API.js";
function updateDateTime(timezone = "Singapore"){
    const currentDateTime = new Date()
    //     hour:"numeric",
    //     minute:"numeric"});
    let timeDisplayed = document.querySelector("#currentTime");
    timeDisplayed.innerHTML= currentDateTime.toLocaleString("en-US", {timeZone: timezone}) 
    // { hour12:true,;
    
}
setInterval(updateDateTime, 1000);

let form = document.querySelector("form");
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let searchLocation = document.querySelector(".searchLocation");
    let currentLocation = document.querySelector("#currentLocation");
    render(searchLocation.value);
    currentLocation.textContent = searchLocation.value;
    searchLocation.value = "";
});


// async function fetchBackgroundImage(city = "Singapore Image"){
//     let img = document.querySelector(".background");
//     let response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=mnSo90HmdDUri6hCiCmL0EhSInAaCUbk&s=${city}`, {mode: 'cors'})
//     let details = await response.json();
//     img.src = details.data.images.original.url;
//   }

  
  
  // fetchBackgroundImage();


function getForecastedDays(date){
    const daysInWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date(date);
    let day = daysInWeek[d.getDay()];
    return day;
}

function setForecastedDays(){
    let forecastDays = Array.from(document.querySelectorAll("#day"));
    for (let i=0;i<forecastDays.length;i++){
        var someDate = new Date();
        var numberOfDaysToAdd = i;
        var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
        console.log(result);
        forecastDays[i].textContent = getForecastedDays(result);
    }
}

async function getForecastedWeather(city){
    const listOfForecastedDetails = await APIfxn.fetchForecastWeatherData(city);
    console.log(listOfForecastedDetails);
    let listOfWeather = [];
    for (let key in listOfForecastedDetails){
        listOfWeather.push(listOfForecastedDetails[key].weather[0].main);
    }
    return listOfWeather;
}

async function setForecastedWeather(city){
    let listOfWeather = await getForecastedWeather(city);
    console.log(listOfWeather);
    let weatherIcons = Array.from(document.querySelectorAll(".weatherIcon"));
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
    let listOfTemperatures = [];
    console.log(listOfForecastedDetails);
    for (let key in listOfForecastedDetails){
        
        listOfTemperatures.push(listOfForecastedDetails[key].main.temp);
    }
    return listOfTemperatures;
}

async function setForecastedTemperature(city){
    let listOfTemperatures = await getForecastedTemperature(city);
    console.log(listOfTemperatures);
    let temp = Array.from(document.querySelectorAll("#temp"));
    for (let i=0;i<temp.length;i++){
        temp[i].textContent = listOfTemperatures[i];
    }
}
function render(city = "singapore"){
    setForecastedDays();
    setForecastedWeather(city);
    setForecastedTemperature(city);
}

render();




