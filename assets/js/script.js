//global variable
let cityHistory = [];

//API fetch Handler
async function callAPI(url) {
  const resp = await fetch(url).then((response) => {
    return response.json();
  });
  const jsonInfo = resp;
  return jsonInfo;
}

// Current Weather
async function displayWeather(forecast, cityName) {
  document.getElementById("main-weather-area").classList.remove("hide");
  document.getElementById("main-box").innerHTML = "";

  const searchedCity = document.createElement("h1");
  const day = document.createElement("h1");
  const icon = document.createElement("img");
  const temp = document.createElement("li");
  const wind = document.createElement("li");
  const humidity = document.createElement("li");
  const uvi = document.createElement("li");
  let utcTime = forecast.current.dt * 1000;

  day.textContent = new Date(utcTime).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  temp.textContent = "Temp: " + forecast.current.temp;
  searchedCity.textContent = cityName;
  wind.textContent = "Wind: " + forecast.current.wind_speed;
  searchedCity.textContent = cityName;
  humidity.textContent = "Humidity: " + forecast.current.humidity + "%";
  searchedCity.textContent = cityName;
  uvi.textContent = "UVI: " + forecast.current.uvi;
  searchedCity.textContent = cityName;

  const iconData = forecast.current.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconData}.png `;
  icon.setAttribute("src", iconUrl);

  document.getElementById("main-box").appendChild(searchedCity);
  document.getElementById("main-box").appendChild(day);
  document.getElementById("main-box").appendChild(icon);
  document.getElementById("main-box").appendChild(temp);
  document.getElementById("main-box").appendChild(wind);
  document.getElementById("main-box").appendChild(humidity);
  document.getElementById("main-box").appendChild(uvi);

  // 5 day Forecast
  const weekDays = document.querySelectorAll(".day");
  weekDays.forEach((element) => {
    element.innerHTML = "";
  });
  for (let I = 0; I < weekDays.length; I++) {
    let dayForecast = forecast.daily[I];
    const fiveDay = document.createElement("h1");
    const iconWeather = document.createElement("img");
    const dayTemp = document.createElement("li");
    const dayWind = document.createElement("li");
    const dayHumidity = document.createElement("li");
    const dayUvi = document.createElement("li");
    let fiveUTC = dayForecast.dt * 1000 + 86400;

    fiveDay.textContent = new Date(fiveUTC).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    dayTemp.textContent = "Temp: " + dayForecast.temp.day;
    dayWind.textContent = "Wind: " + dayForecast.wind_speed;
    dayHumidity.textContent = "Humidity: " + dayForecast.humidity + "%";
    dayUvi.textContent = "UVI: " + dayForecast.uvi;

    const iconData = dayForecast.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconData}.png `;
    iconWeather.setAttribute("src", iconUrl);
    weekDays[I].appendChild(fiveDay);
    weekDays[I].appendChild(iconWeather);
    weekDays[I].appendChild(dayTemp);
    weekDays[I].appendChild(dayWind);
    weekDays[I].appendChild(dayHumidity);
    weekDays[I].appendChild(dayUvi);
  }
}

// Function grabWeather Geocoding API
async function grabWeather(cityName) {
  const APIkey = "8e70806bdc0d747fc69d3ace5e3331a1";
  const oneCallGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIkey}`;
  const geoInfo = await callAPI(oneCallGeo);
  const lat = geoInfo[0].lat;
  const lon = geoInfo[0].lon;

  // Function get city weather OneWeather API
  const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${APIkey}&units=imperial`;
  const overallWeather = await callAPI(oneCallUrl);

  displayWeather(overallWeather, cityName);
}

// Search Form Handler
function searchFormGrabber(event) {
  event.preventDefault();
  const cityNameUpper = document.getElementById("city-search").value;
  const cityName = cityNameUpper.toUpperCase();
  // const searchHistory = document.getElementById("search-history-list");
  const newCityButton = document.createElement("button");
  newCityButton.textContent = cityName;

  newCityButton.classList.add("city-button");

  setToLocal(cityName);

  // searchHistory.appendChild(newCityButton);
  getLocal();
  grabWeather(cityName);
}

//  local storage
function setToLocal(city) {
  let oldSearch = [];
  if (localStorage.searchName) {
    oldSearch = JSON.parse(localStorage.getItem("searchName"));
  }
  if (oldSearch && oldSearch.includes(city)) {
    return;
  } else {
    cityHistory.push(city);
    localStorage.setItem("searchName", JSON.stringify(cityHistory));
  }
}
function getLocal() {
  document.getElementById("search-history-list").innerHTML = "";
  let getHistory = localStorage.getItem("searchName");
  cityHistory = JSON.parse(getHistory);
  for (let i = 0; i < cityHistory.length; i++) {
    const searchHistory = document.getElementById("search-history-list");
    const newCityButton = document.createElement("button");
    newCityButton.textContent = cityHistory[i];
    newCityButton.classList.add("city-button");

    searchHistory.appendChild(newCityButton);
  }
}

if (localStorage.searchName) {
  getLocal();
}

// Event listeners
document
  .getElementById("search-area")
  .addEventListener("submit", searchFormGrabber);

document
  .getElementById("search-history-list")
  .addEventListener("click", function (event) {
    let cityButtonName = event.target.textContent;
    grabWeather(cityButtonName);
  });
