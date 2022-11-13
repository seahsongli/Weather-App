export async function fetchForecastWeatherData(city = "Singapore") {
    try{
        const listOfForecastedDetails = [];
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0e5e41d3a0b1d9cfee583d3275dd1049&units=metric`)
        console.log(response);
        const data = await response.json();
        listOfForecastedDetails.push(data.list[0], data.list[7], data.list[15], data.list[23], data.list[31], data.list[39]);
        return listOfForecastedDetails;
    }
    catch(err){
        console.log(err);
    }
}

fetchForecastWeatherData();



