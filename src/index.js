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
if (hour < 10) {
  hour = "0" + hour;
}

let showTime = document.querySelector("#date");
showTime.innerHTML = `${day}, ${hour}:${minutes} <small> (GMT+2) </small>`;

// Current position from GPS
let button = document.querySelector("#search-clocation");
button.addEventListener("click", getCurrentPosition);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&precipitation=yes`;
  axios.get(apiUrl).then(showTemperature);

  let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiForecast).then(showForecast);
}

// Default city
function search(city) {
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&precipitation=yes`;
  let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=45&appid=${apiKey}&units=metric`;
  axios.get(apiUrl2).then(showTemperature);
  axios.get(apiForecast).then(showForecast);
}

// Sumbit from input form
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

//Show temperature
function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;

  document.querySelector("#tempNumber").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;

  document.querySelector("#whatWeather").innerHTML =
    response.data.weather[0].description;


  document.querySelector("#feelsLike").innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )} °C`;

  let datahumidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `Humidity: ${datahumidity} %`;

  
  let windSpeedRounded = Math.round(response.data.wind.speed * 3.6);
  document.querySelector("#windSpeed").innerHTML = `Wind Speed: ${windSpeedRounded} km/h`;


  let iconElement = document.querySelector("#whatIcon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  celsiusTemp = Math.round(response.data.main.temp);
  feelsLikeTemperature = Math.round(response.data.main.feels_like);;
}

// Forecast
function showForecast(response) {
  console.log(response);
  document.querySelector("#tmrwTemp").innerHTML = `${
    response.data.list[7].weather[0].description} 
<br /> 
${Math.round(response.data.list[7].main.temp_max)} °C`;

document.querySelector("#tmrwTemp2").innerHTML = `${response.data.list[12].weather[0].description} 
<br />
${Math.round(response.data.list[12].main.temp_max)}°C `;

  document.querySelector("#tmrwTemp3").innerHTML = `${
    response.data.list[31].weather[0].description
  }
<br />
  ${Math.round(response.data.list[31].main.temp)} °C`;

  document.querySelector("#tmrwTemp4").innerHTML = `${
    response.data.list[39].weather[0].description
  }
<br />
  ${Math.round(response.data.list[39].main.temp)} °C`;

// Weather emojis
  let emoji = document.querySelector("#emojiForecast1");
  if (response.data.list[7].weather[0].main === "Clouds") {
    emoji.innerHTML = `☁️ `;
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

// Unit conversion F° - C°
function changeTempF(event) {
  event.preventDefault();
  document.querySelector("#tempNumber").innerHTML = `${Math.round((celsiusTemp * 9) / 5 + 32)} °F`;
  document.querySelector("#feelsLike").innerHTML = `Feels like: ${Math.round(
    (feelsLikeTemperature * 9) / 5 + 32
  )} °F`;
}

function ftocconversion(event) {
  event.preventDefault();
  document.querySelector("#tempNumber").innerHTML = `${celsiusTemp} °C`;
  document.querySelector(
    "#feelsLike"
  ).innerHTML = `Feels like: ${feelsLikeTemperature} °C`;
}

// Days
 if ((now.getDay() + 1) >= 7) {
    let forth = document.querySelector("#predDay1");
    forth.innerHTML = days[now.getDay() + 1 - 7];
} else {
    let first = document.querySelector("#predDay1");
    first.innerHTML = days[now.getDay() + 1];
}
if ((now.getDay() + 2) >= 7) {
    let forth = document.querySelector("#predDay2");
    forth.innerHTML = days[now.getDay() + 2 - 7];
} else {
    let second = document.querySelector("#predDay2");
    second.innerHTML = days[now.getDay() + 2];
}
if ((now.getDay() + 3) >= 7) {
    let forth = document.querySelector("#predDay3");
    forth.innerHTML = days[now.getDay() + 3 - 7];
} else {
    let third = document.querySelector("#predDay3");
    third.innerHTML = days[now.getDay() + 3];
}
if ((now.getDay() + 4) >= 7) {
    let forth = document.querySelector("#predDay4");
    forth.innerHTML = days[now.getDay() + 4 - 7];
} else {
    let forth = document.querySelector("#predDay4");
    forth.innerHTML = days[now.getDay() + 4];
}

// Event listeners
let temperatureF = document.querySelector("#fahrenheit");
temperatureF.addEventListener("click", changeTempF);

let temperatureC = document.querySelector("#celsius");
temperatureC.addEventListener("click", ftocconversion);