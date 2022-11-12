async function fetchCurrentWeatherData(city = "Singapore") {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0e5e41d3a0b1d9cfee583d3275dd1049&units=metric`, { mode: 'cors' });
    console.log(response);
    let data = await response.json();
    let weather = (data.weather[0].main);
    let temperature = data.main.temp;
    // console.log(weather)
    // console.log(temperature)
}


export async function fetchForecastWeatherData(city = "Singapore") {
    console.log("fetching");
    let listOfForecastedDetails = [];
    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0e5e41d3a0b1d9cfee583d3275dd1049&units=metric`);
    console.log(response);
    let data = await response.json();
    listOfForecastedDetails.push(data.list[0], data.list[7], data.list[15], data.list[23], data.list[31], data.list[39]);
    console.log(data);
    console.log("done!")
    console.log(listOfForecastedDetails);
    return listOfForecastedDetails;
}




fetchCurrentWeatherData();
fetchForecastWeatherData();



