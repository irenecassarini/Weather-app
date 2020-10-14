var apiKey = "031369b53f5190f2eabd8e78f7c7d4f4";
var celsiusTemp = "";
var feelsLikeTemperature = "";
let now = new Date();

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = "0" + minutes;
}

let showTime = document.querySelector("#date");
showTime.innerHTML = `${day}, ${hour}:${minutes} <small> (GMT+2) </small>`;

//////////////////////////////
// GEO-CURRENT POSITION

let button = document.querySelector("#search-clocation");
button.addEventListener("click", getCurrentPosition);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&precipitation=yes`;
  //let searchCity = document.querySelector("#current-city");
  //searchCity.innerHTML = `${lat}`;
  axios.get(apiUrl).then(showTemperature);

  let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiForecast).then(showForecast);
}

// SEARCH CITY DEFAULT
function search(city) {
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&precipitation=yes`;
  let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=45&appid=${apiKey}&units=metric`;
  axios.get(apiUrl2).then(showTemperature);
  axios.get(apiForecast).then(showForecast);
}
//////////////////////////////
// CITY TYPED IN FROM INPUT FORM
let searchCity = document.querySelector("#search-ccity");
searchCity.addEventListener("click", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#searchinput").value;
  let newCity = document.querySelector("#current-city");
  newCity.innerHTML = `${cityName}`;
  search(cityName);
}

search("New York");
//Show temperature Function

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data);

  document.querySelector("#current-city").innerHTML = response.data.name;

  document.querySelector("#tempNumber").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;

  document.querySelector("#whatWeather").innerHTML =
    response.data.weather[0].description;

  let feelsLikeTemp = Math.round(response.data.main.feels_like);
  document.querySelector("#feelsLike").innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )} °C`;

  let datahumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${datahumidity} %`;

  let windSpeed = document.querySelector("#windSpeed");
  let windSpeedRounded = Math.round(response.data.wind.speed * 3.6);
  windSpeed.innerHTML = `Wind Speed: ${windSpeedRounded} km/h`;

  let emoji = document.querySelector("#whatEmoji");
  if (response.data.weather[0].main === "Clouds") {
    emoji.innerHTML = `☁️`;
  } else {
    if (response.data.weather[0].main === "Rain") {
      emoji.innerHTML = `🌧`;
    } else {
      emoji.innerHTML = ` ☀️ `;
    }
  }

  celsiusTemp = temperature;
  feelsLikeTemperature = feelsLikeTemp;
}

// show Forecast TOMORROW
function showForecast(response) {
  console.log(response.data);
  let tomorrow = days[now.getDay() + 1];
  let day2 = days[now.getDay() + 2];
  let day3 = days[now.getDay() + 3];
  let day4 = days[now.getDay() + 4];
  console.log(day2);
  console.log(day3);
  console.log(day4);
  console.log(now.getDay());

  // quando è Mercoledì
  if (now.getDay() >= 3) {
    let newDay = (days.length - [now.getDay()] );

    console.log(newDay);
    day3 = days[newDay+2];
    day4 = days[newDay-4];


  }

  // TOMORROW
  let day1 = document.querySelector("#predDay1");
  day1.innerHTML = `${tomorrow}`;
  document.querySelector("#tmrwTemp").innerHTML = `${
    response.data.list[7].weather[0].description
  } 
  <br />${Math.round(response.data.list[7].main.temp)} °C`;

  // DAY 2
  let day2forecast = document.querySelector("#predDay2");
  day2forecast.innerHTML = `${day2}`;

  let tempday2 = document.querySelector("#tmrwTemp2");
  tempday2.innerHTML = `${response.data.list[12].weather[0].description}, 
<br />
  ${Math.round(response.data.list[12].main.temp)} °C`;

  // DAY 3
  document.querySelector("#predDay3").innerHTML = `${day3}`;
  document.querySelector("#tmrwTemp3").innerHTML = `${
    response.data.list[31].weather[0].description
  }, 
<br />
  ${Math.round(response.data.list[31].main.temp)} °C`;

  // DAY 4
  document.querySelector("#predDay4").innerHTML = `${day4}`;
  document.querySelector("#tmrwTemp4").innerHTML = `${
    response.data.list[39].weather[0].description
  }, 
<br />
  ${Math.round(response.data.list[39].main.temp)} °C`;

  // EMOJIS FORECAST
  let emoji = document.querySelector("#emojiForecast1");
  if (response.data.list[7].weather[0].main === "Clouds") {
    emoji.innerHTML = `☁️`;
  } else {
    if (response.data.list[7].weather[0].main === "Rain") {
      emoji.innerHTML = `🌧`;
    } else {
      emoji.innerHTML = ` ☀️ `;
    }
  }
  let emoji2 = document.querySelector("#emojiForecast2");
  if (response.data.list[12].weather[0].main === "Clouds") {
    emoji2.innerHTML = `☁️`;
  } else {
    if (response.data.list[12].weather[0].main === "Rain") {
      emoji2.innerHTML = `🌧`;
    } else {
      emoji2.innerHTML = ` ☀️ `;
    }
  }
  let emoji3 = document.querySelector("#emojiForecast3");
  if (response.data.list[31].weather[0].main === "Clouds") {
    emoji3.innerHTML = `☁️`;
  } else {
    if (response.data.list[31].weather[0].main === "Rain") {
      emoji3.innerHTML = `🌧`;
    } else {
      emoji3.innerHTML = ` ☀️ `;
    }
  }
  let emoji4 = document.querySelector("#emojiForecast4");
  if (response.data.list[39].weather[0].main === "Clouds") {
    emoji4.innerHTML = `☁️`;
  } else {
    if (response.data.list[39].weather[0].main === "Rain") {
      emoji4.innerHTML = `🌧`;
    } else {
      emoji4.innerHTML = ` ☀️ `;
    }
  }
}

// conversion F° - C°
function changeTempF(event) {
  event.preventDefault();
  let change = document.querySelector("#tempNumber");
  change.innerHTML = `${Math.round((celsiusTemp * 9) / 5 + 32)} °F`;
  let change2 = document.querySelector("#feelsLike");
  change2.innerHTML = `Feels like: ${Math.round(
    (feelsLikeTemperature * 9) / 5 + 32
  )} °F`;
}

let temperatureF = document.querySelector("#fahrenheit");
temperatureF.addEventListener("click", changeTempF);

function changeTempC(event) {
  event.preventDefault();
  document.querySelector("#tempNumber").innerHTML = `${celsiusTemp} °C`;
  document.querySelector(
    "#feelsLike"
  ).innerHTML = `Feels like: ${feelsLikeTemperature} °C`;
}

let temperatureC = document.querySelector("#celsius");
temperatureC.addEventListener("click", changeTempC);
