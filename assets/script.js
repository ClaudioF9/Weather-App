let currentContainer = $("#today")
let forecastContainer = $("#forecast")
let historyContainer = $("#history")
let cities = [];
//Step 1: Can you call information from the API?
// add url and API key with ajax call
const apiKey = "166a433c57516f51dfab1f7edaed8413";

//Step 2: Get information from text input
//This function handles event when "Search" button is click
$("#search-button").on("click", function(event){
    event.preventDefault();
    $(currentContainer).empty();
    $(forecastContainer).empty();

    let cityName = $("#search-input").val().trim();
    cities.push(cityName);
    //variable for API
    let queryLat = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;
    //get input from text box
    
    $.ajax({
        url: queryLat,
        method: "GET",
        success: function(geoData) {
            console.log(geoData);
            let coordLat = geoData[0].lat;
            let coordlon = geoData[0].lon;
            let queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + coordLat + "&lon=" + coordlon + "&cnt=6&appid=" + apiKey;
            
            
            $.ajax({
                url: queryURL,
                method: "GET",
                success: function(weatherData){
                    console.log(weatherData);


// how to convert unix stamp---------------------------------
                let dateTime = weatherData.list[0].dt * 1000
                let dateObject = new Date(dateTime);
                console.log(moment(dateObject).format("DD/MMM/YYYY"));
                let currentDate = moment(dateObject).format("DD/M/YYYY")
                //-----------------------------------------------------------
                        console.log(weatherData);
                //creating values for Main information required
                let currentCity = $("<h2>").text(weatherData.city.name + " (" + currentDate + ")");
                let tempTotal = weatherData.list[0].temp.min + weatherData.list[0].temp.max;
                let tempConvert = tempTotal/2 - 273.15;
                let currentTempShort = $("<p>").text("Temp: " + tempConvert.toFixed(2) + "℃");
                let currentWind = $("<p>").text("Wind: " + weatherData.list[0].speed + " KPH");
                let currentHumidity = $("<p>").text("Humidity: " + weatherData.list[0].humidity + "%");
                let weatherIcon = weatherData.list[0].weather[0].icon;  
                let weatherImage = $("<img>");
                weatherImage.attr("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
                //appending information
                currentCity.append(weatherImage);
                currentContainer.append(currentCity, currentTempShort, currentWind, currentHumidity);
                currentContainer.addClass("border border-dark");

                //creating values for 5-day forecast in a loop

                let forecastFive = $("<h2>").text("5-day Forecast:");
                forecastContainer.append(forecastFive);
                forecastFive.addClass("col-12");
                
                for (let i = 1; i < weatherData.list.length; i++) {
                    let forecastDiv = $("<div>");
                    forecastContainer.append(forecastDiv);
                    forecastDiv.addClass("card col-10 col-sm-2 bg-primary m-2");
                  
                    let forecastDate = $("<h4>").text(moment(new Date(weatherData.list[i].dt * 1000)).format("DD/M/YYYY"));

                    let forecastIcon = weatherData.list[i].weather[0].icon;  
                    let forecastImage = $("<img>");
                    forecastImage.attr("src", "http://openweathermap.org/img/wn/" + forecastIcon + "@2x.png");    

                    let avgTemp = (weatherData.list[i].temp.min + weatherData.list[i].temp.max)/2 - "273.15";
                    let formattedTemp = avgTemp.toFixed(2)
                    let forecastTemp = $("<p>").text("Temp: " + formattedTemp + "℃");
                    let forecastWind = $("<p>").text("Wind: " + weatherData.list[i].speed + " KPH");
                    let forecastHumidity = $("<p>").text("Humidity: " + weatherData.list[i].humidity + "%");
                  
                    forecastDiv.append(forecastDate, forecastImage, forecastTemp, forecastWind, forecastHumidity);
                  }

                    let historyCity = $("<button>").text(weatherData.city.name);
                    historyCity.addClass("btn btn-secondary history-button");
                    $(".history-button").data("city", weatherData.city.name);
                    historyContainer.append(historyCity);     
                    console.log(historyCity.text());
                }
            })
        }
    })
})


$(document).on("click", ".history-button", function() {

    console.log("click click");
    console.log(cities);
})


//     event.preventDefault();
//     $(currentContainer).empty();
//     $(forecastContainer).empty();

//     let cityName = .history-button.text();
//     //variable for API
//     let queryLat = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;
//     //get input from text box
    
//     $.ajax({
//         url: queryLat,
//         method: "GET",
//         success: function(geoData) {
//             console.log(geoData);
//             let coordLat = geoData[0].lat;
//             let coordlon = geoData[0].lon;
//             let queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + coordLat + "&lon=" + coordlon + "&cnt=6&appid=" + apiKey;
            
            
//             $.ajax({
//                 url: queryURL,
//                 method: "GET",
//                 success: function(weatherData){
//                     console.log(weatherData);


// // how to convert unix stamp---------------------------------
//                 let dateTime = weatherData.list[0].dt * 1000
//                 let dateObject = new Date(dateTime);
//                 console.log(moment(dateObject).format("DD/MMM/YYYY"));
//                 let currentDate = moment(dateObject).format("DD/M/YYYY")
//                 //-----------------------------------------------------------
//                         console.log(weatherData);
//                 //creating values for Main information required
//                 let currentCity = $("<h2>").text(weatherData.city.name + " (" + currentDate + ")");
//                 let tempTotal = weatherData.list[0].temp.min + weatherData.list[0].temp.max;
//                 let tempConvert = tempTotal/2 - 273.15;
//                 let currentTempShort = $("<p>").text("Temp: " + tempConvert.toFixed(2) + "℃");
//                 let currentWind = $("<p>").text("Wind: " + weatherData.list[0].speed + " KPH");
//                 let currentHumidity = $("<p>").text("Humidity: " + weatherData.list[0].humidity + "%");
//                 let weatherIcon = weatherData.list[0].weather[0].icon;  
//                 let weatherImage = $("<img>");
//                 weatherImage.attr("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
//                 //appending information
//                 currentCity.append(weatherImage);
//                 currentContainer.append(currentCity, currentTempShort, currentWind, currentHumidity);
//                 currentContainer.addClass("border border-dark");

//                 //creating values for 5-day forecast in a loop

//                 let forecastFive = $("<h2>").text("5-day Forecast:");
//                 forecastContainer.append(forecastFive);
//                 forecastFive.addClass("col-12");
                
//                 for (let i = 1; i < weatherData.list.length; i++) {
//                     let forecastDiv = $("<div>");
//                     forecastContainer.append(forecastDiv);
//                     forecastDiv.addClass("card col-10 col-sm-2 bg-primary m-2");
                  
//                     let forecastDate = $("<h4>").text(moment(new Date(weatherData.list[i].dt * 1000)).format("DD/M/YYYY"));

//                     let forecastIcon = weatherData.list[i].weather[0].icon;  
//                     let forecastImage = $("<img>");
//                     forecastImage.attr("src", "http://openweathermap.org/img/wn/" + forecastIcon + "@2x.png");    

//                     let avgTemp = (weatherData.list[i].temp.min + weatherData.list[i].temp.max)/2 - "273.15";
//                     let formattedTemp = avgTemp.toFixed(2)
//                     let forecastTemp = $("<p>").text("Temp: " + formattedTemp + "℃");
//                     let forecastWind = $("<p>").text("Wind: " + weatherData.list[i].speed + " KPH");
//                     let forecastHumidity = $("<p>").text("Humidity: " + weatherData.list[i].humidity + "%");
                  
//                     forecastDiv.append(forecastDate, forecastImage, forecastTemp, forecastWind, forecastHumidity);
//                   }  
//                 }
//             })
//         }
//     })


// })