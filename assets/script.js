let currentContainer = $("#today")
let forecastContainer = $("#forecast")
let historyContainter = $("#history")
//Step 1: Can you call information from the API?
// add url and API key with ajax call
const apiKey = "166a433c57516f51dfab1f7edaed8413";

//Step 2: Get information from text input
//This function handles event when "Search" button is click
$("#search-button").on("click", function(event){
    event.preventDefault();
    let cityName = $("#search-input").val().trim();
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
            let queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + coordLat + "&lon=" + coordlon + "&cnt=7&appid=" + apiKey;
            
            
            $.ajax({
                url: queryURL,
                method: "GET",
                success: function(weatherData){
                    console.log(weatherData);


// how to convert unix stamp---------------------------------
                let dateTime = weatherData.list[0].dt * 1000
                let dateObject = new Date(dateTime);
                console.log(moment(dateObject).format("DD/MMM/YYYY"));
                let currentDate = moment(dateObject).format("DD/MMM/YYYY")
                //-----------------------------------------------------------
    
                //creating values for Main information required
                let currentCity = $("<h2>").text(weatherData.city.name + " (" + currentDate + ")");
                let tempTotal = weatherData.list[0].temp.min + weatherData.list[0].temp.max;
                let tempConvert = tempTotal/2 - 273.15;
                let currentTempShort = $("<p>").text("Temp: " + tempConvert.toFixed(2) + "℃");
                let currentWind = $("<p>").text("Wind: " + weatherData.list[0].speed + " KPH");
                let currentHumidity = $("<p>").text("Humidity: " + weatherData.list[0].humidity + "%");
                //appending information
                currentContainer.append(currentCity, currentTempShort, currentWind, currentHumidity);

                //creating values for 5-day forecast in a loop

                let forecastDiv = $("<div>");
                forecastContainer.append(forecastDiv);
                forecastDiv.addClass("card col-10 col-sm-2 bg-info m-2");

                let forecastDate = $("<h3>").text("Date");
                let forecastTemp = $("<p>").text("Date");
                let forecastWind = $("<p>").text("Wind: " + weatherData.list[1].speed + " KPH");
                let forecastHumidity = $("<p>").text("Humidity: " + weatherData.list[1].humidity + "%");

                forecastDiv.append(forecastDate,forecastTemp,forecastWind,forecastHumidity);

                let forecastDi = $("<div>");
                forecastContainer.append(forecastDi);
                forecastDi.addClass("card col-10 col-sm-2 bg-info m-2");

                let forecastDat = $("<h3>").text("Date");
                let forecastTem = $("<p>").text("Date");
                let forecastWin = $("<p>").text("Wind: " + weatherData.list[2].speed + " KPH");
                let forecastHumidit = $("<p>").text("Humidity: " + weatherData.list[2].humidity + "%");

                forecastDi.append(forecastDat,forecastTem,forecastWin,forecastHumidit);        

                }
            })
        }
    })
   


        })
    // })

    // function generateData() {
    
    //     // how to convert unix stamp---------------------------------
    //             let dateTime = weatherData.list[0].dt * 1000
    //             let dateObject = new Date(dateTime);
    //             console.log(moment(dateObject).format("DD/MMM/YYYY"));
    //             let currentDate = moment(dateObject).format("DD/MMM/YYYY")
    //             //-----------------------------------------------------------
    
    //             //creating values for information required
    //             let currentCity = $("<h2>").text(weatherData.city.name + " (" + currentDate + ")");
    //             let tempConvert = response.main.temp - "273.15"
    //             let currentTempShort = $("<p>").text("Temp: " + tempConvert.toFixed(2) + "℃");
    //             let currentWind = $("<p>").text("Wind: " + response.wind.speed + " KPH");
    //             let currentHumidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
    //             //appending information
    //             currentContainer.append(currentCity);
    
                
                // currentContainer.append(currentCity, currentTempShort, currentWind, currentHumidity);
                // console.log(tempConvert);
    
                // let historyCity = $("<button>").text(response.name);
                // historyContainter.append(historyCity);
    
 // }).then(function(response){----original
    //         console.log(response);
            // console.log(queryURL);
            // console.log(response.city.name);
            // console.log(response.list[8].dt);
            // // console.log(moment.unix(response.dt));
            // console.log(response.main.temp - "273.15");
            // console.log(response.main.humidity + "%");
            // console.log(response.wind.speed + " KPH");

            //how to convert unix stamp---------------------------------
            // let dateTime = response.list[0].dt * 1000
            // let dateObject = new Date(dateTime);
            // console.log(moment(dateObject).format("DD/MMM/YYYY"));
            // let currentDate = moment(dateObject).format("DD/MMM/YYYY")
            // //-----------------------------------------------------------

            // //creating values for information required
            // let currentCity = $("<h2>").text(response.name + " (" + currentDate + ")");
            // let tempConvert = response.main.temp - "273.15"
            // let currentTempShort = $("<p>").text("Temp: " + tempConvert.toFixed(2) + "℃");
            // let currentWind = $("<p>").text("Wind: " + response.wind.speed + " KPH");
            // let currentHumidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
            // //appending information
            // currentContainer.append(currentCity, currentTempShort, currentWind, currentHumidity);
            // console.log(tempConvert);

            // let historyCity = $("<button>").text(response.name);
            // historyContainter.append(historyCity);
