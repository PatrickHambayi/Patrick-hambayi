const API_KEY = '5d67ecca30bfa52b4c8fd153e8c94584';

function openTab(event, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let tab of tabContents) {
    tab.style.display = "none";
  }
  const tabButtons = document.getElementsByClassName("tab-btn");
  for (let btn of tabButtons) {
    btn.className = btn.className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
}

function updateBackgroundVideo(condition) {
  const video = document.getElementById('backgroundVideo');
  let videoSource = '';

  switch (condition) {
    case 'Clear':
      videoSource = 'videos/clear.mp4';
      break;
    case 'night':
      videoSource = 'videos/night.mp4' ;  
    case 'thunderstorm' :
      videoSource = 'videos/thunderstorm.mp4' ;
    case 'Rain':
      videoSource = 'videos/rain.mp4';
      break;
      case 'light rain':
        videoSource= 'videos/light rain.mp4';
        break;
    case 'Clouds':
      videoSource = 'videos/so.mp4';
      break;
    case 'Snow':
      videoSource = 'videos/cloudy.mp4';
      break;
    default:
      videoSource = 'videos/default.mp4';
  }

  video.src = videoSource;
  video.load();
  video.play();
}
getLocation();



function darkMode() {
var element = document.body;
element.classList.toggle("dark-mode");


// -------------------------------------------------updateLocalTime-----------------------------

function updateLocalTime() {
const localTimeElement = document.getElementById("local-time");
const now = new Date();
const localTimeString = now.toLocaleTimeString();

localTimeElement.textContent = `${localTimeString}`;
}

updateLocalTime();

setInterval(updateLocalTime, 1000);
}
 // Update Local Time
 const timezoneOffset = data.timezone; // in seconds
 const localTime = new Date((data.dt + timezoneOffset) * 1000);
 localTimeElement.textContent = "Local Time: " + localTime.toLocaleTimeString();


function updateLocalTime(timezoneset) {
  const localTime = new Date((new Date().getTime()) + (timezoneset * 1000));
  const timeString = localTime.toLocaleString(); 
  document.getElementById('localTime').textContent = `Local Time: ${timeString}`;
}

function searchWeather() {
  const city = document.getElementById('cityInput').value;
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const condition = data.weather[0].main;

      document.getElementById('cityName').textContent = data.name;
      document.getElementById('temperature').textContent = `${data.main.temp} °C`;
      document.getElementById('weatherCondition').textContent = data.weather[0].description;
      document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
      document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

  
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      document.getElementById('weatherIcon').src = iconUrl;
      document.getElementById('weatherIcon').alt = data.weather[0].description;

      updateBackgroundVideo(condition);

    
      updateLocalTime(data.timezone);
    })
    .catch(error => console.error('Error fetching weather:', error));

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const forecastContainer = document.getElementById('forecast');
      forecastContainer.innerHTML = ''; 

      for (let i = 0; i < data.list.length; i += 8) { 
        const dayData = data.list[i];
        const date = new Date(dayData.dt * 1000).toLocaleDateString(undefined, { weekday: 'long' });
        const temp = dayData.main.temp;
        const iconCode = dayData.weather[0].icon;
        const description = dayData.weather[0].description;
        
      
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
          <h4>${date}</h4>
          <img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}">
          <p>${temp} °C</p>
          <p>${description}</p>
        `;
        
        forecastContainer.appendChild(forecastCard);
      }
    })
    .catch(error => console.error('Error fetching forecast:', error));
}//--------------------------------------getCurrentPosition-----------------------------------
let latitude;
let longitude;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  fetchWeatherData(latitude + "," + longitude);


  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  marker = L.marker([latitude, longitude]).addTo(map);
  marker.setLatLng([latitude, longitude]).update();
  map.setView([latitude, longitude]);

  const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;


    
  $.ajax({
    method: "GET",
    url: geoApiUrl,
    success: (resp) => {
      console.log('====================================');
      console.log(resp);
      console.log('====================================');
    }
  })
  
}
//-------------------------------------------handleSearch----------------------------------------

function handleSearch() {
  const location = document.getElementById("location-input").value;
  fetchWeatherData(location);
}
document.getElementById("search-button").addEventListener("click", handleSearch);

function fetchWeatherData(location) {
  $.ajax({
    method: "GET",
    url: `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`,
    success: ({ location, current }) => {
      countryP.text(location.country);
      idP.text(current.temp_c.toLocaleString(undefined,{style:"unit",unit:"celsius"}));
      latP.text(location.lat);
      lonP.text(location.lon);
      nameP.text(location.name);
     let locationName = location.name;
      
      regionP.text(location.region);
      urlP.text(current.condition.text);
      humidity.text(current.humidity);
      tz_id.text(location.tz_id);
      wind_kph.text(current.wind_kph + "kph");
      img.src = current.condition.icon;

      marker.setLatLng([location.lat, location.lon]).update();
      map.setView([location.lat, location.lon]);
    }
  });
}

function updateLocalTime() {
  const localTimeElement = document.getElementById("local-time");
  const now = new Date();
  const localTimeString = now.toLocaleTimeString();

  localTimeElement.textContent = `${localTimeString}`;

updateLocalTime();

setInterval(updateLocalTime, 1000);
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  fetchWeatherData(latitude + "," + longitude);


  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  marker = L.marker([latitude, longitude]).addTo(map);
  marker.setLatLng([latitude, longitude]).update();
  map.setView([latitude, longitude]);

  const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;


    
  $.ajax({
    method: "GET",
    url: geoApiUrl,
    success: (resp) => {
      console.log('====================================');
      console.log(resp);
      console.log('====================================');
    }
  })
  
}
//-------------------------------------------handleSearch----------------------------------------

function handleSearch() {
  const location = document.getElementById("location-input").value;
  fetchWeatherData(location);
}
document.getElementById("search-button").addEventListener("click", handleSearch);

function fetchWeatherData(location) {
  $.ajax({
    method: "GET",
    url: `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`,
    success: ({ location, current }) => {
      countryP.text(location.country);
      idP.text(current.temp_c.toLocaleString(undefined,{style:"unit",unit:"celsius"}));
      latP.text(location.lat);
      lonP.text(location.lon);
      nameP.text(location.name);
     let locationName = location.name;
      
      regionP.text(location.region);
      urlP.text(current.condition.text);
      humidity.text(current.humidity);
      tz_id.text(location.tz_id);
      wind_kph.text(current.wind_kph + "kph");
      img.src = current.condition.icon;

      marker.setLatLng([location.lat, location.lon]).update();
      map.setView([location.lat, location.lon]);
    }
  });
}
  


function searchWeather() {
  const city = document.getElementById('cityInput').value;
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const condition = data.weather[0].main;

      document.getElementById('cityName').textContent = data.name;
      document.getElementById('temperature').textContent = `${data.main.temp} °C`;
      document.getElementById('weatherCondition').textContent = data.weather[0].description;
      document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
      document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

  
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      document.getElementById('weatherIcon').src = iconUrl;
    
    
      updateLocalTime(data.timezone);
    })
    .catch(error => console.error('Error fetching weather:', error));

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const forecastContainer = document.getElementById('forecast');
      forecastContainer.innerHTML = ''; 

      for (let i = 0; i < data.list.length; i += 8) { 
        const dayData = data.list[i];
        const date = new Date(dayData.dt * 1000).toLocaleDateString(undefined, { weekday: 'long' });
        const temp = dayData.main.temp;
        const iconCode = dayData.weather[0].icon;
        const description = dayData.weather[0].description;
        
      
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
          <h4>${date}</h4>
          <img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}">
          <p>${temp} °C</p>
          <p>${description}</p>
        `;
        
        forecastContainer.appendChild(forecastCard);
      }
    })
    .catch(error => console.error('Error fetching forecast:', error));
}
//--------------------------------------getCurrentPosition-----------------------------------

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  fetchWeatherData(latitude + "," + longitude);


  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  marker = L.marker([latitude, longitude]).addTo(map);
  marker.setLatLng([latitude, longitude]).update();
  map.setView([latitude, longitude]);

  const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;


    
  $.ajax({
    method: "GET",
    url: geoApiUrl,
    success: (resp) => {
      console.log('====================================');
      console.log(resp);
      console.log('====================================');
    }
  })
  
}
  


function searchWeather() {
  const city = document.getElementById('cityInput').value;
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const condition = data.weather[0].main;

      document.getElementById('cityName').textContent = data.name;
      document.getElementById('temperature').textContent = `${data.main.temp} °C`;
      document.getElementById('weatherCondition').textContent = data.weather[0].description;
      document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
      document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

  
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      document.getElementById('weatherIcon').src = iconUrl;
      document.getElementById('weatherIcon').alt = data.weather[0].description;

      updateBackgroundVideo(condition);

    
      updateLocalTime(data.timezone);
    })
    .catch(error => console.error('Error fetching weather:', error));

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const forecastContainer = document.getElementById('forecast');
      forecastContainer.innerHTML = ''; 

      for (let i = 0; i < data.list.length; i += 8) { 
        const dayData = data.list[i];
        const date = new Date(dayData.dt * 1000).toLocaleDateString(undefined, { weekday: 'long' });
        const temp = dayData.main.temp;
        const iconCode = dayData.weather[0].icon;
        const description = dayData.weather[0].description;
        
      
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
          <h4>${date}</h4>
          <img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}">
          <p>${temp} °C</p>
          <p>${description}</p>
        `;
        
        forecastContainer.appendChild(forecastCard);
      }
    })
    .catch(error => console.error('Error fetching forecast:', error));
}
// Weather API Configuration
const apiKey = '5d67ecca30bfa52b4c8fd153e8c94584';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("location-input");
const searchBtn = document.getElementById("search-button");
const weatherIcon = document.getElementById("weatherIcon");
const locationElement = document.getElementById("location");
const temperatureElement = document.querySelector(".temperature");
const descriptionElement = document.querySelector(".description");
const localTimeElement = document.getElementById("local-time");

// Current Weather Details Table Elements
const tzId = document.querySelector(".tz_id");
const tempC = document.querySelector(".temp_c");
const humidity = document.querySelector(".humidity");
const windKph = document.querySelector(".wind_kph");
const condition = document.querySelector(".url");
const region = document.querySelector("copperbelt");
const country = document.querySelector(".zambia");
const lon = document.getElementById("lon");
const lat = document.getElementById("lat");

// Forecast Table Elements
const forecastDates = [
  { date: "date1", img: "img1", title: "title1" },
  { date: "date2", img: "img2", title: "title2" },
  { date: "date3", img: "img3", title: "title3" },
  { date: "date4", img: "img4", title: "title4" },
  { date: "date5", img: "img5", title: "title5" },
  { date: "date6", img: "img6", title: "title6" },
  { date: "date7", img: "img7", title: "title7" },
];

async function checkWeather(copperbelt) {
  if (!copperbelt) return;
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status === 404) {
      alert(copperbelt);
      return;
    } else {
      const data = await response.json();
      // Update Weather Information
      locationElement.textContent = data.name;
      temperatureElement.textContent = Math.round(data.main.temp) + "°C";
      descriptionElement.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
      humidity.textContent = data.main.humidity + "%";
      windKph.textContent = data.wind.speed + " KM/H";
      condition.textContent = data.weather[0].main;
      region.textContent = data.sys.zambia;
      country.textContent = data.sys.zambia;
      lon.textContent = data.coord.lon;
      lat.textContent = data.coord.lat;

      // Update Weather Icon
      const weatherMain = data.weather[0].main;
      const iconMap = {
        Clouds: "img/icons8-clouds-96.png",
        Clear: "img/icons8-clear-96.png",
        Rain: "img/icons8-rain-96.png",
        Drizzle: "img/icons8-drizzle-96.png",
        Mist: "img/icons8-mist-96.png",
        Snow: "img/icons8-snow-96.png",
        Thunderstorm: "img/icons8-thunderstorm-96.png",
        // Add more mappings as needed
      };
      weatherIcon.src = iconMap[weatherMain] || "img/icons8-wind-96.png";

      // Update Local Time
      const timezoneOffset = data.timezone; // in seconds
      const localTime = new Date((data.dt + timezoneOffset) * 1000);
      localTimeElement.textContent = "Local Time: " + localTime.toLocaleTimeString();

      // Display Sections
      document.querySelector(".weather-card").style.display = "flex";

      // Update Map
      updateMap(data.coord.lat, data.coord.lon);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("An error occurred while fetching weather data.");
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value.trim());
  }
});

// Initialize Map
let map = L.map("map").setView([-15.4206208, 28.311552], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let marker = L.marker([-15.4206208, 28.311552]).addTo(map);

function updateMap(latCoord, lonCoord) {
  map.setView([latCoord, lonCoord], 10);
  marker.setLatLng([latCoord, lonCoord]);
}

// Initial Load
checkWeather("copperbelt");

// Forecast Search Function (Placeholder)
function searchForecast() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  // Implement forecast search functionality here
  alert(`Searching forecast from ${startDate} to ${endDate}`);
}
