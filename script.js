var timeEl = document.getElementById('time');
var dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const APIKEY = '8DU2SFoiqLBnEVxiL7xYgZHAqlsF2s3L';
const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';



getWeatherData();
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

            console.log(data)
            showWeatherData(data);
        })

    })
}

function showWeatherData(data) {
    let { humidity, pressure, wind_speed } = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon + 'E'

    currentWeatherItemsEl.innerHTML =
        `<div class="weather-item">
          <div class="h">
        <div>Humidity -</div></div>
        <div>${humidity}%</div>
        </div>
    
    
    <div class="weather-item">
    <div class="p">
        <div>Pressure&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</div></div>
        <div>${pressure}hPa</div>      

    </div>
    <div class="weather-item">
    <div class="w">
        <div>Wind Speed&nbsp;-&nbsp;</div></div>
        <div>${wind_speed}m/s</div>
       </div>
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" width="100" height="100" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
                <div class="temp">Precipitation - ${day.pop} %</div>
            </div>
            
            `
        } else {
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
                <div class="temp">Precipitation -${day.pop}%</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}

document.getElementById('search').addEventListener('click', () => {
    var place = document.getElementById('input').value;
    var urlsearch = `http://api.openweathermap.org/data/2.5/weather?q=${place}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`;
    fetch(urlsearch).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        showsearchedWeatherData(data);

    })

})



function showsearchedWeatherData(data) {
    let { humidity, pressure } = data.main;
    let { speed } = data.wind;
    let { lat, lon } = data.coord;
    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = lat + 'N ' + lon + 'E'



    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);


        function currentglobalTime() {

            var d = new Date();
            time = d.toLocaleTimeString('en-US', { timeZone: data.timezone })
            console.log(time);
            timeEl = time;
        }

        currentglobalTime();

    })

}
showsearchedWeatherData();










