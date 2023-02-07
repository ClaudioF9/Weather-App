let currentContainer = $("#today")
let historyContainter = $("#history")
//Step 1: Can you call information from the API?
// add url and API key with ajax call
const apiKey = "100afa0316a40c62945590aac8697cda";

//Step 2: Get information from text input
//This function handles event when "Search" button is click
$("#search-button").on("click", function(event){
    event.preventDefault();
    let cityName = $("#search-input").val().trim();
    //variable for API
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    //get input from text box
    
    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
            console.log(response);
            console.log(queryURL);
            console.log(response.name);
            console.log(response.weather.icon);
            // console.log(moment.unix(response.dt));
            console.log(response.main.temp - "273.15");
            console.log(response.main.humidity + "%");
            console.log(response.wind.speed + " KPH");

            //how to convert unix stamp---------------------------------
            let dateTime = response.dt * 1000
            let dateObject = new Date(dateTime);
            console.log(moment(dateObject).format("DD/MMM/YYYY"));
            let currentDate = moment(dateObject).format("DD/MMM/YYYY")
            //-----------------------------------------------------------

            //creating values for information required
            let currentCity = $("<h2>").text(response.name + " (" + currentDate + ")");
            let tempConvert = response.main.temp - "273.15"
            let currentTempShort = $("<p>").text("Temp: " + tempConvert.toFixed(2) + "℃");
            let currentWind = $("<p>").text("Wind: " + response.wind.speed + " KPH");
            let currentHumidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
            //appending information
            currentContainer.append(currentCity, currentTempShort, currentWind, currentHumidity);
            console.log(tempConvert);

            let historyCity = $("<button>").text(response.name);
            historyContainter.append(historyCity);


        })
    })



