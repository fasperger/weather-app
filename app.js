const express = require("express");
const https = require("https");
const app = express();



app.get("/", function(req, res){
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=mexico&units=metric&appid=";
    https.get(url, function(response){

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const city = weatherData.name;
            const weatherIcon = weatherData.weather[0].icon;
            const weatherImg = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celsius.</h1>");
            res.write("<img src="+weatherImg+">");
            res.send();
        });
    });
});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
