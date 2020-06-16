// Global Variables
var searchBtn = document.querySelector("#searchBtn");
var cityArray = [];

//Time
var day = moment().format('dddd MMMM Do YYYY');
var day1 = moment().add(1, 'days').format('dddd MMMM Do YYYY');
var day2 = moment().add(2, 'days').format('dddd MMMM Do YYYY');
var day3 = moment().add(3, 'days').format('dddd MMMM Do YYYY');
var day4 = moment().add(4, 'days').format('dddd MMMM Do YYYY');
var day5 = moment().add(5, 'days').format('dddd MMMM Do YYYY');

var cityName = "";

// API key for OpenWeatherMap
var apiKey = "6080c68b579c44bffd3df4cd757805fe";

// URL to query the database for today
var queryUrlToday = "";

// URL to query the database for UV forecast
var queryUrlUV = "";

// URL to query the database for 5-day forecast
var queryUrl5 = "";

// write function for a list tag every time user searches for new city



// Onclick-show
searchBtn.addEventListener("click", function () {
    console.log("hi");
    if ($(".hide")[0]) {
        for (var i = 0; i < 2; i++) {
            document.querySelector(".hide").setAttribute("class", "show");
            } 
    } else {

    }
  
    
    cityName = $(".inputBox").val();
    $(".inputBox").val(" ");
    queryUrlToday = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    queryUrl5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;


    // Run functions with argument = cityName
    $(".clear").empty();
    ajaxCallToday(cityName);
    ajaxCall5(cityName);
    // if i use other method put clear here
    // cityName.push(cityArray);
    // console.log(cityArray);

    function userInput(cityName) {
        var list = $("<li>").text(cityName);
        $(".searchHistory").prepend(list);
    }
    userInput(cityName);
    // 

    // Test build for getting uv api
    // API call:
    // queryUrlUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

    // // // ajaxCallUV(cityName);
    // ajaxCallUV();



    //NEED TO CLEAR
 



})

// var icons = "http://openweathermap.org/img/wn/" + iconNum + ".png"


// console.log(cityName);
// AJAX call - uv

// AJAX call - today 
function ajaxCallToday(city) {
    $.ajax({
        url: queryUrlToday,
        method: "GET"
    }).then(function (weatherData) {
        console.log(weatherData);
        var weatherIcon = $("<div>");

        //Name
        console.log(weatherData.name);
        $(".city").text(weatherData.name + "        " + day);

        // Set variables for latitude and longitude
        var lat = weatherData.coord.lat;
        console.log(lat);
        var lon = weatherData.coord.lon;
        console.log(lon);

        // Weather Icons
        var iconNum = weatherData.weather[0].icon;
        // console.log(iconNum);
        icons = "http://openweathermap.org/img/wn/" + iconNum + ".png"
        // console.log(icons);
        var imageTag = $("<img>").attr("src", icons);
        // Appends the icon
        $(".icon").append(imageTag);

        // //Temp
        console.log(weatherData.main.temp);
        var fTemp = (weatherData.main.temp - 273.15) * 1.80 + 32;
        console.log(fTemp.toFixed(0));
        $(".temp").html("Temperature: " + fTemp.toFixed(0) + "&deg;" + "F");

        // // Humidity
        console.log(weatherData.main.humidity);
        $(".humidity").html("Humidity: " + weatherData.main.humidity + "&deg;");


        // // Wind Speed
        console.log(weatherData.wind.speed);
        $(".wind").text("Wind Speed: " + weatherData.wind.speed + " mph");
    })
}

// AJAX call - UV (today)
// function ajaxCallUV(city) {
//     $.ajax({
//         url: queryUrlToday,
//         method: "GET"
//     }).then(function (weatherData) {
//         console.log(weatherData);


//     })
// }




// AJAX call - 5 day forecast

function ajaxCall5(city) {
    $.ajax({
        url: queryUrl5,
        method: "GET"
    }).then(function (weatherData) {
        console.log(weatherData);
        //Day 1-5 using list[4], list[12], list[20], list[28], list[36], respectively

        // Set title for box
        var title = $("<h5>").text("Five Day Forecast");
        $(".fiveDay").append(title);

        // Day 1
        // Date
        console.log(day1);
        $(".day1").text(day1);

        // Weather Icons
        var iconNum = weatherData.list[4].weather[0].icon;
        // console.log(iconNum);
        var icons = "http://openweathermap.org/img/wn/" + iconNum + ".png"
        // console.log(icons);
        var imageTag = $("<img>").attr("src", icons);
        // Appends the icon
        $("#icon1").append(imageTag);

        // Temp
        console.log(weatherData.list[4].main.temp);
        var fTemp = (weatherData.list[4].main.temp - 273.15) * 1.80 + 32;
        console.log(fTemp.toFixed(0));
        $(".temp1").html("Temperature: " + fTemp.toFixed(0) + "&deg;" + "F");

       // Humidity
        console.log(weatherData.list[4].main.humidity);
        $(".humidity1").html("Humidity: " + weatherData.list[4].main.humidity + "&deg;");


        // Day 2
        // Date
        $(".day2").text(day2);

        // Weather Icons
        var iconNum = weatherData.list[12].weather[0].icon;
        var icons = "http://openweathermap.org/img/wn/" + iconNum + ".png"
        var imageTag = $("<img>").attr("src", icons);
        // Appends the icon
        $("#icon2").append(imageTag);

        // Temp
        var fTemp = (weatherData.list[12].main.temp - 273.15) * 1.80 + 32;
        $(".temp2").html("Temperature: " + fTemp.toFixed(0) + "&deg;" + "F");

        // Humidity
        $(".humidity2").html("Humidity: " + weatherData.list[12].main.humidity + "&deg;");


        // Day 3
        // Date
        $(".day3").text(day3);

        // Weather Icons
        var iconNum = weatherData.list[20].weather[0].icon;
        var icons = "http://openweathermap.org/img/wn/" + iconNum + ".png"
        var imageTag = $("<img>").attr("src", icons);
        // Appends the icon
        $("#icon3").append(imageTag);

        // Temp
        var fTemp = (weatherData.list[20].main.temp - 273.15) * 1.80 + 32;
        $(".temp3").html("Temperature: " + fTemp.toFixed(0) + "&deg;" + "F");

        // Humidity
        $(".humidity3").html("Humidity: " + weatherData.list[20].main.humidity + "&deg;");



        // Day 4
        // Date
        $(".day4").text(day4);

        // Weather Icons
        var iconNum = weatherData.list[28].weather[0].icon;
        var icons = "http://openweathermap.org/img/wn/" + iconNum + ".png"
        var imageTag = $("<img>").attr("src", icons);
        // Appends the icon
        $("#icon4").append(imageTag);

        // Temp
        var fTemp = (weatherData.list[28].main.temp - 273.15) * 1.80 + 32;
        $(".temp4").html("Temperature: " + fTemp.toFixed(0) + "&deg;" + "F");

        // Humidity
        $(".humidity4").html("Humidity: " + weatherData.list[28].main.humidity + "&deg;");


        // Day 5
        // Date
        $(".day5").text(day5);

        // Weather Icons
        var iconNum = weatherData.list[36].weather[0].icon;
        var icons = "http://openweathermap.org/img/wn/" + iconNum + ".png"
        var imageTag = $("<img>").attr("src", icons);
        // Appends the icon
        $("#icon5").append(imageTag);

        // Temp
        var fTemp = (weatherData.list[36].main.temp - 273.15) * 1.80 + 32;
        $(".temp5").html("Temperature: " + fTemp.toFixed(0) + "&deg;" + "F");

        // Humidity
        $(".humidity5").html("Humidity: " + weatherData.list[36].main.humidity + "&deg;");
    })
}

