function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="app-icon"
    />`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  timeElement.innerHTML = formatDate(date);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}
function formatDate(date) {
  let minute = date.getMinutes();
  let hour = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}
function searchCity(city) {
  let apiKey = "af2t2b01b7183a01344ffof31b4cb947";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = ['Sun', "Mon", "Tue", 'Wed', "Thu", "Fri", "Sat"];
  
  return day[date.getDay()];
}


function getForecast(city) {
  let apiKey = "af2t2b01b7183a01344ffof31b4cb947";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios(apiUrl).then(displayForecast);
}

function displayForecast (response) {
  console.log(response.data);

 
  let forecastHtml = "";
  response.data.daily.forEach(function(day, index) {
    if(index < 5) {
    forecastHtml= forecastHtml +
    `
    <div class="row">
   <div class="col-2">
     <div class="weather-forecast-date">
       ${formatDay(day.time)}
     </div>
     
   <img src="${day.condition.icon_url}"
    alt=""
     width="42"/>
     <div class="weather-forecast-temperature">
       <span class="weather-forecast-temp-max">
         ${Math.round(day.temperature.maximum)}°
       </span>
       <span class="weather-forecast-temp-min">
       ${Math.round(day.temperature.minimum)}°
       </span>
     </div>
    
   </div>
   </div>
   `;
    }
 });

 let forecastElement = document.querySelector("#forecast");
 forecastElement.innerHTML = forecastHtml ;
  };
  
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Harare");


