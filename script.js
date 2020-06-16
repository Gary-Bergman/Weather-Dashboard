// Global Variables
var searchBtn = document.querySelector("#searchBtn");
//Time
var day = moment().format('dddd MMMM Do YYYY');
var day1 = moment().add(1, 'days').format('dddd MMMM Do YYYY');
var day2 = moment().add(2, 'days').format('dddd MMMM Do YYYY');
var day3 = moment().add(3, 'days').format('dddd MMMM Do YYYY');
var day4 = moment().add(4, 'days').format('dddd MMMM Do YYYY');
var day5 = moment().add(5, 'days').format('dddd MMMM Do YYYY');


// Onclick-show
searchBtn.addEventListener("click", function () {
    console.log("hi");
    for (var i = 0; i < 2; i++) {
        document.querySelector(".hide").setAttribute("class", "show");
    };
    var cityName = "New York"
    // $(".inputBox").val();
    ajaxCallToday(cityName);
    ajaxCall5(cityName);
})

// API key for OpenWeatherMap
var apiKey = "6080c68b579c44bffd3df4cd757805fe";

// URL to query the database for today
var queryUrlToday = "https://api.openweathermap.org/data/2.5/weather?q=" + "New York" + "&appid=" + apiKey;
// "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}"

// URL to query the database for 5-day forecast
var queryUrl5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + "New York" + "&appid=" + apiKey;
// api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={your api key}






// console.log(cityName);
// AJAX call - uv

// AJAX call - today 
function ajaxCallToday(city) {
    $.ajax({
        url: queryUrlToday,
        method: "GET"
    }).then(function (weatherData) {
        console.log(weatherData);

        //Name
        console.log(weatherData.name);
        $(".city").text(weatherData.name + "        " + day);

        // //Temp
        console.log(weatherData.main.temp);
        var fTemp = (weatherData.main.temp - 273.15) * 1.80 + 32;
        console.log(fTemp.toFixed(2));
        $(".temp").html("Temperature: " + fTemp.toFixed(2) + "&deg;");

        // // Humidity
        console.log(weatherData.main.humidity);
        $(".humidity").html("Humidity: " + weatherData.main.humidity + "&deg;");


        // // Wind Speed
        console.log(weatherData.wind.speed);
        $(".wind").text("Wind Speed: " + weatherData.wind.speed + " mph");

        // uvindex

        //  
    })
}


// AJAX call - 5 day forecast

function ajaxCall5(city) {
    $.ajax({
        url: queryUrl5,
        method: "GET"
    }).then(function (weatherData) {
        console.log(weatherData);
        //Day 1 using list[4]
        // Date
        console.log(day1);
        $(".day1").text(day1);

        //Temp
        console.log(weatherData.list[4].main.temp);
        var fTemp = (weatherData.list[4].main.temp - 273.15) * 1.80 + 32;
        console.log(fTemp.toFixed(2));
        $(".temp1").html("Temperature: " + fTemp.toFixed(2) + "&deg;");

        // // Humidity
        console.log(weatherData.list[4].main.humidity);
        $(".humidity1").html("Humidity: " + weatherData.list[4].main.humidity + "&deg;");
    })
}

