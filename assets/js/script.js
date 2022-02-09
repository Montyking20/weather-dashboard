
//API fetch Handler
async function callAPI(url) {
    const resp= await fetch(url)
    .then(response => {return response.json()})
    const jsonInfo= resp
    return jsonInfo
}

// Converts DT in API object to date format

// const convertDTtoDate = async (dt) => {
//     const day = new Date(dt * 1000)
//     return day.toDateString()
// }



 // Current Weather
async function displayWeather(forecast, cityName) {
    document.getElementById("main-weather-area").classList.remove("hide")
    
    const searchedCity= document.createElement("h1")
    const icon = document.createElement("img")
    // const day = document.convertDTtoDate (forecast.current.dt)
    const temp= document.createElement("li")
    const wind= document.createElement("li")
    const humidity= document.createElement("li")   
    const uvi= document.createElement("li")  
    
    

    temp.textContent = "Temp: " + forecast.current.temp
    searchedCity.textContent = cityName
    wind.textContent = "Wind: " + forecast.current.wind_speed
    searchedCity.textContent = cityName
    humidity.textContent = "Humidity: " + forecast.current.humidity + "%"
    searchedCity.textContent = cityName
    uvi.textContent = "UVI: " + forecast.current.uvi
    searchedCity.textContent = cityName

    const iconData = forecast.current.weather[0].icon
    const iconUrl= `https://openweathermap.org/img/wn/${iconData}.png `
    icon.setAttribute('src', iconUrl)
    
    // document.convertDTtoDate("main-box").appendChild(day)
    document.getElementById("main-box").appendChild(searchedCity)
    document.getElementById("main-box").appendChild(icon)
    document.getElementById("main-box").appendChild(temp)
    document.getElementById("main-box").appendChild(wind)
    document.getElementById("main-box").appendChild(humidity)
    document.getElementById("main-box").appendChild(uvi)
    
    

  
  
 // 5 day Forecast 
    const weekDays = document.querySelectorAll(".day");
    for (let I = 0; I < weekDays.length; I++) {
        let dayForecast = forecast.daily[I];
    
    const iconWeather = document.createElement("img")
    // const date = await convertDTtoDate(data.dt)
    const dayTemp= document.createElement("li")
    const dayWind= document.createElement("li")
    const dayHumidity= document.createElement("li")   
    const dayUvi= document.createElement("li")  
        
        dayTemp.textContent = "Temp: " + dayForecast.temp.day
        dayWind.textContent = "Wind: " + forecast.current.wind_speed
        dayHumidity.textContent = "Humidity: " + forecast.current.humidity + "%"
        dayUvi.textContent = "UVI: " + forecast.current.uvi
    
    
        const iconData = forecast.current.weather[0].icon
        const iconUrl= `https://openweathermap.org/img/wn/${iconData}.png `
        iconWeather.setAttribute('src', iconUrl)
          
         
       weekDays[I].appendChild(iconWeather)
       weekDays[I].appendChild(dayTemp)
       weekDays[I].appendChild(dayWind)
       weekDays[I].appendChild(dayHumidity)
       weekDays[I].appendChild(dayUvi)
    
    }     
}


// Function grabWeather Geocoding API
async function grabWeather(cityName){
    const APIkey= "8e70806bdc0d747fc69d3ace5e3331a1"
    const oneCallGeo= `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIkey}`
    const geoInfo= await callAPI(oneCallGeo)   
    const lat= geoInfo[0].lat
    const lon= geoInfo[0].lon

// Function get city weather OneWeather API
    const oneCallUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${APIkey}&units=imperial`
    const overallWeather= await callAPI(oneCallUrl)

 
   displayWeather(overallWeather, cityName)
   
}


// Search Form Handler
function searchFormGrabber(event) {
    event.preventDefault()
   const cityName= document.getElementById("city-search").value


   grabWeather(cityName)
}





// Event listener search form
document.getElementById("search-area").addEventListener("submit",searchFormGrabber)

