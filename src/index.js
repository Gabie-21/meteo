function refreshweather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humididtyElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humididtyElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML = Math.round(temperature);
}
function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
         "Monday", 
         "Tuesday", 
         "Wednesday", 
         "Thursday", 
         "Friday", 
         "Saturday"];
         let day = days[date.getDay()];

         if(minutes < 10 ) {
            minutes = `0${minutes}`;
         }

         return `${day} ${hours}: ${minutes}`;

}

function searchCity(city){
    let apiKey = "dbo2dde1863fta62243f1bb03c43d733";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshweather);

}
function handlesearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city")
    
    searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handlesearchSubmit)

searchCity("#Lusaka");