let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');
let searchBox = document.querySelector('.search-box');
let searchBtn = document.querySelector('.search-btn');


//let weatherPromise;
let weather;

let api = 'https://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = '&APPID=0f884d3d0b5139c561dac35f160f74b4';
let city;
let unit = '&units=metric';

window.addEventListener('load', function(){
    if (localStorage.length !== 0) {
        displayMainBody();
        weather = JSON.parse(localStorage.getItem("weather"));
        displayResults(weather);
    }
});

navBarToggle.addEventListener('click', function(){
    mainNav.classList.toggle('active');
});

searchBtn.addEventListener('click', function(){
    weatherAsk()
})

searchBox.addEventListener('keypress', function(){
    if(event.keyCode === 13) {
        weatherAsk()
    }    
})

function displayMainBody(){
    document.querySelector('main').classList.remove('display-none');
}

function weatherAsk (){
    city = searchBox.value;
    let url = api + city + apiKey + unit;
    console.log (url)
    getResults(url);
}

function getResults(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("weather", JSON.stringify(data));
            weather = JSON.parse(localStorage.getItem("weather"));
            displayMainBody();
            displayResults(weather);
        });
}

function displayResults (weather) {
    document.querySelector('.city').textContent = `${weather.name}, ${weather.sys.country}`;
    document.querySelector('time').textContent = dateBuilder(new Date());
    document.querySelector('.temperature').textContent = `${Math.round(weather.main.temp)} °C`;
    document.querySelector('.feels-like').textContent = `${Math.round(weather.main.feels_like)}°`;
    document.querySelector('.description').textContent = weather.weather[0].description;
    document.querySelector('.rain').textContent = weather.rain
    document.querySelector('.pressure').textContent = weather.main.pressure;
    document.querySelector('.humidity').textContent = `${weather.main.humidity}%`;
    document.querySelector('.wind').textContent = weather.wind.speed;
    document.querySelector('.sunrise').textContent = weather.sys.sunrise;
    document.querySelector('.sunset').textContent = weather.sys.sunset;
    document.querySelector('.grnd-level').textContent = weather.main.grnd_level;
    document.querySelector('.sea-level').textContent = weather.main.sea_level;
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    //let time = d..toLocaleDateString();
  
    return `${day} ${date} ${month} ${year}`;
}
