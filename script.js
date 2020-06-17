// Global Variables
var searchBtn = document.querySelector("#searchBtn");
var lat;
var lon;
var list;
var cityName = "";

//Time
var day = moment().format('dddd MMMM Do YYYY');
var day1 = moment().add(1, 'days').format('dddd MMMM Do YYYY');
var day2 = moment().add(2, 'days').format('dddd MMMM Do YYYY');
var day3 = moment().add(3, 'days').format('dddd MMMM Do YYYY');
var day4 = moment().add(4, 'days').format('dddd MMMM Do YYYY');
var day5 = moment().add(5, 'days').format('dddd MMMM Do YYYY');

// API key for OpenWeatherMap
var apiKey = "6080c68b579c44bffd3df4cd757805fe";

// URL to query the database for today
var queryUrlToday = "";

// URL to query the database for UV forecast
var queryUrlUV = "";

// URL to query the database for 5-day forecast
var queryUrl5 = "";

// write function for a list tag every time user searches for new city

// localStorage get - Short form
var arrayCity = JSON.parse(localStorage.getItem("keyCity")) || [];
var counter = 0;

// Display localStorage to sidebar
console.log(arrayCity.length);
for (var i = 0; i < arrayCity.length && counter < 10; i++) {
    userInput(arrayCity[i].city)
    counter++
}

if ($(".hide")[0]) {
    for (var i = 0; i < 1; i++) {
        document.querySelector(".hide").setAttribute("class", "show");
    }
} else {

}

// If localStorage is not empty, take last stored city and initialize the page
if (localStorage.length !== 0) {
    cityName = arrayCity[arrayCity.length - 1].city;
    queryUrlToday = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    queryUrl5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
    ajaxCallToday();
    ajaxCall5();
}


// Create buttons for each city user inputs and adding new class and prepending to sidebar on page
function userInput(arg1) {
    list = $("<button>");
    list.attr("class", "cityBtn").text(arg1);
    $("#searchHistory").prepend(list);
}

// Creates an onclick event for button with class cityBtn to call weather data functions
$(".cityBtn").on("click", function () {
    if ($(".hide")[0]) {
        for (var i = 0; i < 1; i++) {
            document.querySelector(".hide").setAttribute("class", "show");
        }
    } else {

    }
    cityName = $(this).text();
    queryUrlToday = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    queryUrl5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
    $(".clear").empty();
    ajaxCallToday();
    ajaxCall5();
})


// Onclick-show
searchBtn.addEventListener("click", function () {
    // Show hidden buttons on first click. Do nothing after first click
    console.log("hi");
    if ($(".hide")[0]) {
        for (var i = 0; i < 1; i++) {
            document.querySelector(".hide").setAttribute("class", "show");
        }
    } else {

    }

    //Set variable for user input
    cityName = $(".inputBox").val();
    //Clear input box 
    $(".inputBox").val("");
    if (cityName !== "") {

        // Assigning query urls
        queryUrlToday = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
        queryUrl5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;


        // Clear all values BEFORE running AJAX calls so new cities info will appear on each click
        // $(".uvi").attr("class", "hide")
        $(".clear").empty();

        // AJAX calls
        ajaxCallToday();
        ajaxCall5();


        userInput(cityName);
        // Call function to save to localStorage
        saveCity();

    }
})


// AJAX call - today 
function ajaxCallToday() {
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
        lat = weatherData.coord.lat;
        console.log(lat);
        lon = weatherData.coord.lon;
        console.log(lon);

        // Weather Icons
        var iconNum = weatherData.weather[0].icon;
        // console.log(iconNum);
        icons = "http://openweathermap.org/img/wn/" + iconNum + ".png";
        // console.log(icons);
        var imageTag = $("<img>").attr("src", icons);
        // Appends the icon
        $(".icon").append(imageTag);

        //Temp
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

        // AJAX callUrlUV after variables for lat and lon are set in parent function above
    }).then(function ajaxCallUV() {
        console.log("TESTING", lat, lon);
        queryUrlUV = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + apiKey;
        $.ajax({
            url: queryUrlUV,
            method: "GET"
        }).then(function (weatherData) {
            console.log(weatherData);

            // UV
            console.log(weatherData.current.uvi);
            var uv = weatherData.current.uvi
            $(".uv").text("UV Index: ");
            $(".uvi").html(weatherData.current.uvi);
            if (uv < 4) {
                $(".uvi").attr("class", "fave card uvi ml-2 pb-1 pt-1 px-1 mt-0 mb-3")
            } else if (uv > 3 && uv < 6) {
                $(".uvi").attr("class", "mod card uvi ml-2 pb-1 pt-1 px-1 mt-0 mb-3")
            } else {
                $(".uvi").attr("class", "sev card uvi ml-2 pb-1 pt-1 px-1 mt-0 mb-3 clear")
            }
        })
    }
    )
}

// AJAX call - 5 day forecast

function ajaxCall5() {
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
        $(".temp1").html("Temp: " + fTemp.toFixed(0) + "&deg;" + "F");

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
        $(".temp2").html("Temp: " + fTemp.toFixed(0) + "&deg;" + "F");

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
        $(".temp3").html("Temp: " + fTemp.toFixed(0) + "&deg;" + "F");

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
        $(".temp4").html("Temp: " + fTemp.toFixed(0) + "&deg;" + "F");

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
        $(".temp5").html("Temp: " + fTemp.toFixed(0) + "&deg;" + "F");

        // Humidity
        $(".humidity5").html("Humidity: " + weatherData.list[36].main.humidity + "&deg;");
    })
}

// function to push searched cities to array and set to localStorage
function saveCity() {
    arrayCity.push({ city: cityName });
    localStorage.setItem("keyCity", JSON.stringify(arrayCity));
}

